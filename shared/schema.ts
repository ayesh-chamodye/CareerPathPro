import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User profile for students
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  email: text("email"),
  district: text("district"),
  gender: text("gender"),
});

// Career recommendation input schema
export const careerInputSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  district: z.string().min(1, "District is required"),
  gender: z.string().min(1, "Gender is required"),
  stream: z.string().min(1, "Stream is required"),
  subjects: z.array(
    z.object({
      name: z.string().min(1, "Subject name is required"),
      grade: z.string().min(1, "Grade is required"),
    })
  ).min(3, "At least 3 subjects are required"),
  zscore: z.string().optional(),
  interests: z.array(z.string()).min(3, "At least 3 interests are required"),
  additionalInfo: z.string().optional(),
});

// Career paths
export const careerPaths = pgTable("career_paths", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  keySubjects: text("key_subjects").notNull(),
  salarySriLanka: text("salary_sri_lanka").notNull(),
  tags: text("tags").array().notNull(),
  matchCriteria: jsonb("match_criteria").notNull(),
  iconName: text("icon_name").notNull(),
});

// Educational resources
export const educationalResources = pgTable("educational_resources", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // university, scholarship, vocational, online
  description: text("description").notNull(),
  rating: text("rating"),
  tags: text("tags").array(),
  websiteUrl: text("website_url"),
  imageUrl: text("image_url"), // Added to store dynamically fetched images
});

// Create insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertCareerPathSchema = createInsertSchema(careerPaths).omit({ id: true });
export const insertEducationalResourceSchema = createInsertSchema(educationalResources).omit({ id: true });

// Define types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCareerPath = z.infer<typeof insertCareerPathSchema>;
export type CareerPath = typeof careerPaths.$inferSelect;

export type InsertEducationalResource = z.infer<typeof insertEducationalResourceSchema>;
export type EducationalResource = typeof educationalResources.$inferSelect;

export type CareerInput = z.infer<typeof careerInputSchema>;
export type CareerRecommendation = CareerPath & {
  matchPercentage: number;
};
