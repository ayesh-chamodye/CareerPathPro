import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { careerInputSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import express from 'express';
import axios from 'axios';

const router = express.Router();

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

  // Route to fetch universities
  app.get('/api/universities', async (req: Request, res: Response) => {
    const { tags } = req.query;

    try {
      const response = await axios.get('https://api.scribe.com/universities', {
        params: { tags },
      });

      if (response.status === 200) {
        return res.json(response.data);
      } else {
        return res.status(response.status).json({ message: 'Failed to fetch universities from Scribe API' });
      }
    } catch (error) {
      console.error('Error fetching universities from Scribe API:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Updated `/api/scholarships` to include dynamically fetched Open Graph images
  app.get('/api/scholarships', async (req, res) => {
    const { tags } = req.query;

    try {
      // Scholarships data
      const scholarships = [
        {
          name: 'Mahapola Higher Education Scholarship',
          description: 'Government scholarship for university students based on A/L results and family income.',
          rating: '4.0/5',
          websiteUrl: 'https://www.mohe.gov.lk/',
        },
        {
          name: 'Presidential Scholarship',
          description: 'Merit-based scholarship for top performers in A/L examinations to study abroad.',
          rating: '4.8/5',
          websiteUrl: 'https://www.mohe.gov.lk/',
        },
        {
          name: 'University Bursary',
          description: 'Financial assistance for university students from low-income families.',
          rating: '3.7/5',
          websiteUrl: 'https://www.ugc.ac.lk/',
        },
        {
          name: 'Fulbright Student Program',
          description: 'Scholarship for Sri Lankan graduates to pursue master\'s or PhD studies in the United States.',
          rating: '4.7/5',
          websiteUrl: 'https://lk.usembassy.gov/education-culture/fulbright-program/',
        },
        {
          name: 'Commonwealth Scholarship',
          description: 'Scholarships for Sri Lankan students to study in the UK and other Commonwealth countries.',
          rating: '4.5/5',
          websiteUrl: 'https://cscuk.fcdo.gov.uk/scholarships/',
        },
      ];

      // Filter scholarships by tags if provided
      if (typeof tags === 'string') {
        const tagArray = tags.split(',');
        const filteredScholarships = scholarships.filter((scholarship) =>
          tagArray.some((tag: string) => scholarship.name.toLowerCase().includes(tag.toLowerCase()))
        );
        return res.json(filteredScholarships);
      }

      res.json(scholarships);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Ensure registerRoutes function returns the server
  return createServer(app);
}
