"use client";

import React from 'react';
import { useState,useEffect } from 'react';  // Add this line
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";

interface CareerRecommendation {
  title: string;
  description: string;
  matchScore: number;
  skills: string[];
  keySubjects: string;
  salarySriLanka: string;
  salary: { min: number; max: number };
  tags: string[];
  iconName: string;
}

interface RecommendationResultsProps {
  recommendations: CareerRecommendation[];
}




const Modal: React.FC<{ onClose: () => void; children: React.ReactNode }> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white dark:bg-gray-900 rounded-lg p-6 w-11/12 max-w-xl max-h-[90vh] shadow-lg">
        
        {/* Top bar with close button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Education Pathways</h2>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-300 hover:text-red-500 font-bold text-lg"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

const RecommendationResults: React.FC<RecommendationResultsProps> = ({ recommendations }) => {
  const { t } = useTranslation();

  // Add state for the modal and API results
  const [universityResults, setUniversityResults] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<CareerRecommendation | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMoreDetails = async (career: CareerRecommendation) => {
    try {
      setLoading(true);
      setSelectedCareer(career);
      setIsModalOpen(true);
      const response = await fetch(`/api/university-search?subjects=${encodeURIComponent(career.keySubjects)}`);
      const data = await response.json();
      setUniversityResults(data.slice(0, 5)); // Only show top 5 results
    } catch (error) {
      console.error("Error fetching university data:", error);
    } finally {
      setLoading(false);
    }
  };


  // Get the maximum score for comparison
  const maxScore = Math.max(...recommendations.map(c => c.matchScore)) || 1;

  return (
    <div className="py-8 px-4 md:px-6 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          {t('recommendations.title')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((career, index) => {     


            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-700">
                <CardHeader className="bg-blue-50 dark:bg-blue-900">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
                      {career.title}
                    </CardTitle>
                    <Badge variant="secondary" className="ml-2" >                      
              {career.matchScore}% Match  
                    </Badge>
                  </div>
                  <div className="w-full mt-2 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
          career.matchScore >= 75
            ? 'bg-green-500'
            : career.matchScore >= 50
            ? 'bg-yellow-500'
            : 'bg-red-500'
        }`}
        style={{ width: `${career.matchScore}%` }}
                    />
                  </div>                  
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">{career.description}</p>

                  {career.skills?.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-700 dark:text-gray-200">
                        {t('recommendations.keySkills')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.map((skill, idx) => (
                          <Badge key={idx} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}      


                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200">
                      {t('recommendations.requiredSubjects')}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">{career.keySubjects}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200">
                      {t('recommendations.salaryRange')}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">{career.salarySriLanka}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200">
                      {t('recommendations.careerTags')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {career.tags?.map((tag, idx) => (
                        <Badge key={idx} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button variant="outline" onClick={() => handleMoreDetails(career)}>
                      {t('recommendations.moreDetails')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    


        {isModalOpen && selectedCareer && (
  <Modal onClose={() => setIsModalOpen(false)}>
    <div className="max-h-[75vh] overflow-y-auto pr-2 space-y-4">
      <h2 className="text-xl font-bold text-blue-900 dark:text-blue-200">
        {t('recommendations.universityResults')}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {t('recommendations.universitiesFor')} <strong>{selectedCareer.keySubjects}</strong>
      </p>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="h-20 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {universityResults.slice(0, 5).map((university, idx) => (
            <Card
              key={idx}
              className="p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm"
            >
              <div className="space-y-1">
                <CardTitle className="text-base font-semibold text-blue-800 dark:text-blue-300">
                  🎓{" "}
                  <a
                    href={university.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {university.title}
                  </a>
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {university.snippet}
                </p>

                {university.scholarships && university.scholarships.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-green-700 dark:text-green-300">
                      🎁 {t('recommendations.availableScholarships')}
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                      {university.scholarships.map((scholarship: string, sIdx: number) => (
                        <li key={sIdx}>{scholarship}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  </Modal>
)}

    </div>

);
};

export default RecommendationResults;
