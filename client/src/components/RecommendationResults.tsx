import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

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

const RecommendationResults: React.FC<RecommendationResultsProps> = ({ recommendations }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="py-8 px-4 md:px-6 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          {t('recommendations.title')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((career, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-700">
              <CardHeader className="bg-blue-50 dark:bg-blue-900">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    {career.title}
                  </CardTitle>
                  <Badge variant="secondary" className="ml-2">
                    {career.matchScore ? `${career.matchScore}% ${t('recommendations.match')}` : t('recommendations.noMatch')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-gray-600 dark:text-gray-300">{career.description}</p>
                
                {career.skills && career.skills.length > 0 && (
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

                <div className="pt-4 flex space-x-3">
                  <Button
                    onClick={() => navigate(`/resources?career=${encodeURIComponent(career.title)}`)}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white"
                  >
                    {t('recommendations.viewResources')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationResults;
