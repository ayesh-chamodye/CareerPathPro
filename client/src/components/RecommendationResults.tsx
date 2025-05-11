import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  return (
    <div className="py-8 px-4 md:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Career Matches</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((career, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-blue-50">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold text-gray-800">
                    {career.title}
                  </CardTitle>
                  <Badge variant="secondary" className="ml-2">
                    {career.matchScore}% Match
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-gray-600">{career.description}</p>
                
                {career.skills && career.skills.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700">Key Skills Required:</h4>
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
                  <h4 className="font-semibold text-gray-700">Required Subjects:</h4>
                  <p className="text-gray-600">{career.keySubjects}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700">Salary Range:</h4>
                  <p className="text-gray-600">{career.salarySriLanka}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700">Career Tags:</h4>
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
                    className="w-full"
                  >
                    View Resources
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
