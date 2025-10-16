import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { careerInputSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import express from 'express';
import axios from 'axios';
import { load } from 'cheerio';
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

// Real-time search scraper using multiple sources
const scrapeSearchResults = async (query: string, category: 'universities' | 'scholarships' | 'courses' | 'training') => {
  try {
    // Build category-focused query
    let searchQuery = '';

    if (query && query.trim()) {
      // User provided a custom query - enhance it with Sri Lanka context
      const lowerQuery = query.toLowerCase();
      if (lowerQuery.includes('sri lanka') || lowerQuery.includes('srilanka')) {
        searchQuery = `${query} ${category}`;
      } else {
        searchQuery = `Sri Lanka ${query} ${category}`;
      }
    } else {
      // No custom query - use optimized default category searches (simple queries to avoid rate limiting)
      switch (category) {
        case 'universities':
          searchQuery = 'Sri Lanka universities programs courses admission UGC';
          break;
        case 'scholarships':
          searchQuery = 'Sri Lanka scholarships students grants financial aid education';
          break;
        case 'courses':
          searchQuery = 'Sri Lanka online courses OUSL SLIATE certifications learning';
          break;
        case 'training':
          searchQuery = 'Sri Lanka TVEC vocational training technical skills development';
          break;
      }
    }

    console.log(`[Search] Category: ${category}, Query: "${query}", Final search: "${searchQuery}"`);

    // Use DuckDuckGo Lite as primary (more reliable for Sri Lankan content)
    const ddgUrl = `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(searchQuery)}`;

    const ddgResponse = await axios.get(ddgUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      timeout: 15000,
    });

    const $ = load(ddgResponse.data);
    const results: any[] = [];
    const seenUrls = new Set<string>();

    // DuckDuckGo Lite uses table-based layout
    const rows = $('table tr');
    console.log(`[DDG] Found ${rows.length} table rows`);

    rows.each((_, row) => {
      const $row = $(row);
      const links = $row.find('a');

      links.each((_, link) => {
        const $link = $(link);
        let href = $link.attr('href');
        const title = $link.text().trim();

        // Skip if no href or title
        if (!href || !title || title.length < 10) return;

        // DuckDuckGo uses redirect links starting with //duckduckgo.com/l/?uddg=
        // Extract the actual URL from the uddg parameter
        if (href.startsWith('//duckduckgo.com/l/')) {
          try {
            const url = new URL('https:' + href);
            const actualUrl = url.searchParams.get('uddg');
            if (actualUrl) {
              href = decodeURIComponent(actualUrl);
            }
          } catch (e) {
            return; // Skip if we can't parse the URL
          }
        }

        // Now check if it's a valid HTTP URL
        if (!href.startsWith('http')) return;

        // Skip duplicates
        if (seenUrls.has(href)) return;
        seenUrls.add(href);

        // Filter for Sri Lankan relevance
        const isSriLankanDomain = href.includes('.lk/') || href.includes('.lk?') || href.endsWith('.lk');
        const titleLower = title.toLowerCase();
        const mentionsSriLanka = titleLower.includes('sri lanka') || titleLower.includes('srilanka');

        // Exclude known false positives
        const isFalsePositive = href.includes('sri.com') ||
                                 href.includes('yahoo.co.jp') ||
                                 href.includes('zhihu.com');

        // Only include if it's a .lk domain OR explicitly mentions Sri Lanka
        if (!isSriLankanDomain && !mentionsSriLanka) return;
        if (isFalsePositive) return;

        // Get description from next cells or surrounding text
        const snippet = $row.find('td').eq(1).text().trim() ||
                       $row.text().replace(title, '').trim().substring(0, 200);

        const fullText = `${title} ${snippet}`;

        results.push({
          title,
          url: href,
          snippet,
          description: snippet,
          details: {
            duration: fullText.match(/duration:?\s*([^\n.;]+)/i)?.[1]?.trim(),
            fee: fullText.match(/fee:?\s*([^\n.;]+)/i)?.[1]?.trim() ||
                 fullText.match(/cost:?\s*([^\n.;]+)/i)?.[1]?.trim(),
            location: fullText.match(/location:?\s*([^\n.;]+)/i)?.[1]?.trim() ||
                     fullText.match(/(?:in|at)\s+(Sri Lanka|Colombo|Kandy|[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/)?.[1]?.trim(),
            requirements: fullText.match(/requirements?:?\s*([^\n.;]+)/i)?.[1]?.trim() ||
                         fullText.match(/(?:requires?|need)\s+([^\n.;]+A[\/-]L[^\n.;]*)/i)?.[1]?.trim(),
          },
        });
      });
    });

    console.log(`[DDG] Extracted ${results.length} relevant Sri Lankan results`);

    return results.slice(0, 20);
  } catch (error: any) {
    console.error('[Search] Scraping error:', error.message);
    return [];
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
      const query = req.query.q as string || '';
      const results = await scrapeSearchResults(query, 'universities');
      res.json(results);
    } catch (error) {
      console.error('Error fetching universities:', error);
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

      // Search universities based on subjects in real-time
      const searchQuery = `Sri Lanka universities ${subjects.join(' ')} programs courses`;
      const results = await scrapeSearchResults(searchQuery, 'universities');
      res.json(results);
    } catch (error) {
      console.error('Error searching universities:', error);
      res.status(500).json({ error: 'Failed to fetch university data' });
    }
  });


  // Route to fetch scholarships with detailed information
  app.get('/api/scholarships', async (req, res) => {
    try {
      const query = req.query.q as string || '';
      const results = await scrapeSearchResults(query, 'scholarships');
      res.json(results);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      res.status(500).json({ error: 'Failed to fetch scholarships' });
    }
  });

  // New route to fetch online courses
  app.get('/api/courses', async (req, res) => {
    try {
      const query = req.query.q as string || '';
      const results = await scrapeSearchResults(query, 'courses');
      res.json(results);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ error: 'Failed to fetch courses' });
    }
  });

  // New route to fetch vocational training programs
  app.get('/api/training', async (req, res) => {
    try {
      const query = req.query.q as string || '';
      const results = await scrapeSearchResults(query, 'training');
      res.json(results);
    } catch (error) {
      console.error('Error fetching training programs:', error);
      res.status(500).json({ error: 'Failed to fetch training programs' });
    }
  });

  // Ensure registerRoutes function returns the server
  return createServer(app);
}

