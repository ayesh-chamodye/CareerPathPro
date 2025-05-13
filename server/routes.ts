import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { careerInputSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import express from 'express';
import axios from 'axios';
import puppeteer from 'puppeteer';
import type { Career } from './types';
import CareerScraper from './scraper';

const router = express.Router();
let cachedCareers: Career[] = [];
let lastCacheTime = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Initialize career scraper
const careerScraper = new CareerScraper();

// Function to refresh career data cache
async function refreshCareerCache() {
  try {
    await careerScraper.initialize();
    const careers = await careerScraper.scrapeCareersList();
    await careerScraper.close();
    
    // Add unique IDs to careers if they don't have them
    const careersWithIds = careers.map((career: Career, index: number) => ({
      ...career,
      id: career.id || `career-${index + 1}`
    }));
    
    cachedCareers = careersWithIds;
    lastCacheTime = Date.now();
    return careersWithIds;
  } catch (error) {
    console.error('Error refreshing career cache:', error);
    return [];
  }
}

// Career routes
router.get('/api/careers', async (req: Request, res: Response) => {
  try {
    // Check if cache needs refreshing
    if (Date.now() - lastCacheTime > CACHE_DURATION || cachedCareers.length === 0) {
      await refreshCareerCache();
    }
    
    const { search, limit = 20, offset = 0 } = req.query;
    let filteredCareers = cachedCareers;

    // Apply search filter if provided
    if (search) {
      const searchLower = String(search).toLowerCase();
      filteredCareers = cachedCareers.filter(career => 
        career.title.toLowerCase().includes(searchLower) ||
        career.description.toLowerCase().includes(searchLower) ||
        career.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }

    // Apply pagination
    const paginatedCareers = filteredCareers.slice(
      Number(offset), 
      Number(offset) + Number(limit)
    );

    res.json({
      careers: paginatedCareers,
      total: filteredCareers.length,
      hasMore: Number(offset) + Number(limit) < filteredCareers.length
    });
  } catch (error) {
    console.error('Error fetching careers:', error);
    res.status(500).json({ error: 'Failed to fetch career data' });
  }
});

router.get('/api/careers/:id', async (req: Request, res: Response) => {
  try {
    // Check if cache needs refreshing
    if (Date.now() - lastCacheTime > CACHE_DURATION || cachedCareers.length === 0) {
      await refreshCareerCache();
    }
    
    const career = cachedCareers.find(c => c.id === req.params.id);
    if (!career) {
      return res.status(404).json({ error: 'Career not found' });
    }
    
    res.json(career);
  } catch (error) {
    console.error('Error fetching career details:', error);
    res.status(500).json({ error: 'Failed to fetch career details' });
  }
});

// Function to scrape Bing search results
const scrapeBingResults = async (query: string, category: 'universities' | 'scholarships' | 'courses' | 'training') => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Customize search query based on category
    let searchQuery = '';
    switch (category) {
      case 'universities':
        searchQuery = 'site:.ac.lk OR site:.edu.lk Sri Lanka universities programs departments';
        break;
      case 'scholarships':
        searchQuery = 'Sri Lanka scholarships financial aid education grants';
        break;
      case 'courses':
        searchQuery = 'Sri Lanka online courses certification programs distance learning';
        break;
      case 'training':
        searchQuery = 'Sri Lanka vocational training technical institutes skills development';
        break;
      default:
        searchQuery = query;
    }
      
    await page.goto(`https://www.bing.com/search?q=${encodeURIComponent(searchQuery)}`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    await page.waitForSelector('.b_algo');

    const results = await page.evaluate(() => {
      const items: {
        title: string;
        url: string;
        snippet: string;
        description: string;
        details: {
          duration?: string;
          fee?: string;
          location?: string;
          requirements?: string;
        };
      }[] = [];

      Array.from(document.querySelectorAll('.b_algo')).forEach((item) => {
        const titleElement = item.querySelector('h2');
        const linkElement = item.querySelector('a');
        const snippetElement = item.querySelector('.b_caption p');
        const descriptionElement = item.querySelector('.b_snippet');

        if (titleElement && linkElement) {
          const url = linkElement.getAttribute('href') || '';
          if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            // Extract additional details from the snippet
            const fullText = (snippetElement?.textContent || '') + (descriptionElement?.textContent || '');
            const details = {
              duration: fullText.match(/duration:?\s*([^.]*)/i)?.[1]?.trim(),
              fee: fullText.match(/fee:?\s*([^.]*)/i)?.[1]?.trim(),
              location: fullText.match(/location:?\s*([^.]*)/i)?.[1]?.trim(),
              requirements: fullText.match(/requirements?:?\s*([^.]*)/i)?.[1]?.trim(),
            };

            items.push({
              title: titleElement.textContent?.trim() || '',
              url: url,
              snippet: snippetElement?.textContent?.trim() || '',
              description: descriptionElement?.textContent?.trim() || snippetElement?.textContent?.trim() || '',
              details
            });
          }
        }
      });
      return items;
    });

    return results.filter(item => item.title && item.url);
  } catch (error) {
    console.error('Error during scraping:', error);
    throw error;
  } finally {
    await browser.close();
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for career recommendations
  app.post("/api/career-recommendations", async (req: Request, res: Response) => {
    try {
      // Validate the input data
      const validatedData = careerInputSchema.parse(req.body);
      
      // Get career recommendations
      const recommendations = await storage.getCareerRecommendations(validatedData);
      
      // Return the recommendations
      return res.json(recommendations);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details 
        });
      }
      
      return res.status(500).json({ 
        message: "Error generating career recommendations" 
      });
    }
  });
  
  // API route to get all career paths
  app.get("/api/career-paths", async (_req: Request, res: Response) => {
    try {
      const careerPaths = await storage.getCareerPaths();
      return res.json(careerPaths);
    } catch (error) {
      return res.status(500).json({ 
        message: "Error retrieving career paths" 
      });
    }
  });
  
  // API route to get a specific career path
  app.get("/api/career-paths/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid career path ID" });
      }
      
      const careerPath = await storage.getCareerPathById(id);
      if (!careerPath) {
        return res.status(404).json({ message: "Career path not found" });
      }
      
      return res.json(careerPath);
    } catch (error) {
      return res.status(500).json({ 
        message: "Error retrieving career path" 
      });
    }
  });
  
  // API route to get educational resources
  app.get("/api/educational-resources", async (req: Request, res: Response) => {
    try {
      const type = req.query.type as string | undefined;
      const resources = await storage.getEducationalResources(type);
      return res.json(resources);
    } catch (error) {
      return res.status(500).json({ 
        message: "Error retrieving educational resources" 
      });
    }
  });
  
  // API route to get a specific educational resource
  app.get("/api/educational-resources/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid resource ID" });
      }
      
      const resource = await storage.getEducationalResourceById(id);
      if (!resource) {
        return res.status(404).json({ message: "Educational resource not found" });
      }
      
      return res.json(resource);
    } catch (error) {
      return res.status(500).json({ 
        message: "Error retrieving educational resource" 
      });
    }
  });

  // Route to fetch universities with detailed information
  app.get('/api/universities', async (req, res) => {
    try {
      const results = await scrapeBingResults('', 'universities');
      res.json(results);
    } catch (error) {
      console.error('Error scraping universities:', error);
      res.status(500).json({ error: 'Failed to fetch universities' });
    }
  });

  // Route to fetch universities best to subjects with brief information
app.get('/api/university-search', async (req, res) => {
  try {
    const subjectsParam = req.query.subjects;

    // Support both single and multiple subjects
    const subjects = typeof subjectsParam === 'string'
      ? subjectsParam.split(',').map(sub => sub.trim())
      : [];

    if (!subjects || subjects.length === 0) {
      return res.status(400).json({ error: 'Please provide a list of subjects as query parameters' });
    }

    const subjectQuery = subjects.map(sub => `"${sub}"`).join(' OR ');
    const searchQuery = `top universities in Sri Lanka offering ${subjectQuery}`;

    const results = await scrapeBingResults(searchQuery, 'universities');
    res.json(results);
  } catch (error) {
    console.error('Error scraping university search:', error);
    res.status(500).json({ error: 'Failed to fetch university data' });
  }
});


  // Route to fetch scholarships with detailed information
  app.get('/api/scholarships', async (req, res) => {
    try {
      const results = await scrapeBingResults('', 'scholarships');
      res.json(results);
    } catch (error) {
      console.error('Error scraping scholarships:', error);
      res.status(500).json({ error: 'Failed to fetch scholarships' });
    }
  });

  // New route to fetch online courses
  app.get('/api/courses', async (req, res) => {
    try {
      const results = await scrapeBingResults('', 'courses');
      res.json(results);
    } catch (error) {
      console.error('Error scraping courses:', error);
      res.status(500).json({ error: 'Failed to fetch courses' });
    }
  });

  // New route to fetch vocational training programs
  app.get('/api/training', async (req, res) => {
    try {
      const results = await scrapeBingResults('', 'training');
      res.json(results);
    } catch (error) {
      console.error('Error scraping training programs:', error);
      res.status(500).json({ error: 'Failed to fetch training programs' });
    }
  });

  // Ensure registerRoutes function returns the server
  return createServer(app);
}

