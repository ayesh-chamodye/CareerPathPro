import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { CareerInput, CareerRecommendation } from "@shared/schema";

export function useCareerRecommendations() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);

  const mutation = useMutation({
    mutationFn: async (data: CareerInput) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await apiRequest('POST', '/api/career-recommendations', data);
        const result = await response.json();
        setRecommendations(result);
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    }
  });

  const filterRecommendationsBySubjects = (recommendations: CareerRecommendation[], selectedSubjects: string[]) => {
    return recommendations.filter((recommendation) => {
      if (!Array.isArray(recommendation.keySubjects)) return false;
      return recommendation.keySubjects.some((subject: string) => selectedSubjects.includes(subject));
    });
  };

  return {
    getRecommendations: mutation.mutate,
    isLoading,
    error,
    recommendations,
    reset: () => {
      setRecommendations([]);
      setError(null);
    }
  };
}
