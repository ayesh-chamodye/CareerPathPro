import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { careerInputSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

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

  const httpServer = createServer(app);

  return httpServer;
}
