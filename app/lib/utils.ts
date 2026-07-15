"use client"

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert grade to numeric value
export function gradeToValue(grade: string): number {
  const gradeMap: Record<string, number> = {
    'A': 4,
    'B': 3,
    'C': 2,
    'S': 1,
    'F': 0,
  };
  
  return gradeMap[grade] || 0;
}

// Format match percentage for display
export function formatMatchPercentage(percentage: number): string {
  if (percentage >= 90) return "Excellent match";
  if (percentage >= 75) return "Very good match";
  if (percentage >= 60) return "Good match";
  if (percentage >= 40) return "Fair match";
  return "Low match";
}

// Get color for match percentage
export function getMatchColor(percentage: number): string {
  if (percentage >= 90) return "bg-green-500";
  if (percentage >= 75) return "bg-green-500";
  if (percentage >= 60) return "bg-green-400";
  if (percentage >= 40) return "bg-amber-500";
  return "bg-red-500";
}

// Group educational resources by type
export function groupResourcesByType(resources: any[]) {
  return resources.reduce((acc, resource) => {
    const type = resource.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(resource);
    return acc;
  }, {} as Record<string, any[]>);
}

// Validate email address
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
