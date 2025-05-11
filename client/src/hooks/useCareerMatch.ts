import { useMemo } from 'react';
import type { CareerInput, CareerRecommendation } from '@/types/career';
import type { InsertCareerPath } from '@/types/career.types';

// Function to calculate match score based on subjects and interests
const calculateMatchScore = (
  career: InsertCareerPath,
  userInput: CareerInput
): number => {
  let score = 0;
  const weights = {
    stream: 0.3,
    subjects: 0.4,
    interests: 0.3,
  };

  // Stream match
  if (career.matchCriteria.streams.includes(userInput.stream.toLowerCase())) {
    score += weights.stream;
  }

  // Subject match with grades consideration
  const userSubjects = userInput.subjects.map(s => ({
    name: s.name.toLowerCase(),
    grade: s.grade
  }));
  const careerSubjects = Object.entries(career.matchCriteria.subjects)
    .map(([name, weight]) => ({ name: name.toLowerCase(), weight }));
  
  let subjectScore = 0;
  careerSubjects.forEach(({ name, weight }) => {
    const userSubject = userSubjects.find(s => s.name === name);
    if (userSubject) {
      // Add grade-based weighting
      const gradeMultiplier = 
        userSubject.grade === 'A' ? 1.0 :
        userSubject.grade === 'B' ? 0.8 :
        userSubject.grade === 'C' ? 0.6 :
        userSubject.grade === 'S' ? 0.4 : 0.2;
      
      subjectScore += (weight as number / 100) * gradeMultiplier;
    }
  });
  score += subjectScore * weights.subjects;

  // Interest match
  const userInterests = userInput.interests.map(i => i.toLowerCase());
  const careerInterests = career.matchCriteria.interests;
  const matchingInterests = careerInterests.filter(i => userInterests.includes(i.toLowerCase()));
  score += (matchingInterests.length / careerInterests.length) * weights.interests;

  return Math.round(score * 100);
};

// Extract salary range from string
const extractSalaryRange = (salaryString: string): { min: number; max: number } => {
  const numbers = salaryString.match(/\d+(?:,\d+)?/g);
  if (numbers && numbers.length >= 2) {
    return {
      min: parseInt(numbers[0].replace(',', '')),
      max: parseInt(numbers[1].replace(',', '')),
    };
  }
  return { min: 0, max: 0 };
};

// Extract skills from career data
const extractSkills = (career: InsertCareerPath): string[] => {
  const skills = new Set<string>();
  
  // Add skills based on key subjects
  career.keySubjects.split(',').forEach(subject => {
    skills.add(subject.trim());
  });
  
  // Add skills based on matching criteria subjects
  Object.keys(career.matchCriteria.subjects).forEach(subject => {
    skills.add(subject.charAt(0).toUpperCase() + subject.slice(1));
  });
  
  return Array.from(skills);
};

export const useCareerMatch = (careers: InsertCareerPath[], userInput: CareerInput): CareerRecommendation[] => {
  return useMemo(() => {
    if (!careers || !userInput) return [];

    return careers
      .map(career => {
        const matchScore = calculateMatchScore(career, userInput);
        const salary = extractSalaryRange(career.salarySriLanka);

        return {
          title: career.name,
          description: career.description,
          matchScore,
          skills: extractSkills(career),
          keySubjects: career.keySubjects,
          salarySriLanka: career.salarySriLanka,
          salary,
          tags: career.tags,
          iconName: career.iconName
        };
      })
      .filter(career => career.matchScore > 30) // Only show careers with >30% match
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 6); // Show top 6 matches
  }, [careers, userInput]);
};
