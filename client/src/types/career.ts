import { z } from "zod";

export interface CareerRecommendation {
  title: string;
  description: string;
  matchScore: number;
  skills: string[];
  keySubjects: string;
  salarySriLanka: string;
  salary: {
    min: number;
    max: number;
  };
  tags: string[];
  iconName: string;
}

export interface CareerInput {
  fullName: string;
  email: string;
  district: string;
  gender: string;
  stream: string;
  subjects: {
    name: string;
    grade: string;
  }[];
  zscore?: string;
  interests: string[];
  additionalInfo?: string;
}

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
