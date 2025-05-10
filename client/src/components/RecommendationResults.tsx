import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { getMatchColor } from "@/lib/utils";
import { CareerRecommendation, EducationalResource } from "@shared/schema";
import { educationalResourcesData } from "@/data/resourcesData";

interface RecommendationResultsProps {
  recommendations: CareerRecommendation[];
  activeResourceTab: string;
  setActiveResourceTab: (tab: string) => void;
  onReset: () => void;
}

const RecommendationResults = ({ 
  recommendations, 
  activeResourceTab, 
  setActiveResourceTab,
  onReset 
}: RecommendationResultsProps) => {
  const [filter, setFilter] = useState<string>("all");
  const [filteredRecommendations, setFilteredRecommendations] = useState<CareerRecommendation[]>(recommendations);
  const [selectedCareer, setSelectedCareer] = useState<CareerRecommendation | null>(null);
  const [scholarshipsByResults, setScholarshipsByResults] = useState<any[]>([]);
  const [universitiesByResults, setUniversitiesByResults] = useState<any[]>([]);

  // Fetch educational resources
  const { data: resources, isLoading, isError } = useQuery({
    queryKey: ['/api/educational-resources'],
    queryFn: async () => {
      const response = await fetch('/api/educational-resources');
      if (!response.ok) {
        throw new Error('Failed to fetch educational resources');
      }
      return response.json();
    },
  });

  const educationalResources = resources || educationalResourcesData; // Fallback to local data if API fails

  useEffect(() => {
    const fetchScholarshipsByResults = async () => {
      try {
        const response = await fetch('/api/scholarships-by-results');
        if (response.ok) {
          const data = await response.json();
          setScholarshipsByResults(data);
        } else {
          console.error('Failed to fetch scholarships by results');
        }
      } catch (error) {
        console.error('Error fetching scholarships by results:', error);
      }
    };

    const fetchUniversitiesByResults = async () => {
      try {
        const response = await fetch('https://api.example.com/universities?results=yourResults');
        if (response.ok) {
          const data = await response.json();
          setUniversitiesByResults(data);
        } else {
          console.error('Failed to fetch universities by results');
        }
      } catch (error) {
        console.error('Error fetching universities by results:', error);
      }
    };

    fetchScholarshipsByResults();
    fetchUniversitiesByResults();
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredRecommendations(recommendations);
    } else {
      setFilteredRecommendations(recommendations.filter(rec => 
        rec.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
      ));
    }
  }, [filter, recommendations]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const groupResourcesByType = (resourcesData: any[]) => {
    if (!resourcesData) return {};

    return resourcesData.reduce((acc: Record<string, any[]>, resource) => {
      const type = resource.type || 'other';
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(resource);
      return acc;
    }, {});
  };

  const groupedResources = groupResourcesByType(educationalResources); // Ensure fallback data is grouped correctly

  console.log('Grouped Resources:', groupedResources); // Debug log to verify grouped resources

  const fetchScholarships = async (tags: string[]) => {
    try {
      const response = await fetch(`/api/scholarships?tags=${tags.join(',')}`);
      if (!response.ok) {
        throw new Error('Failed to fetch scholarships');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      return [];
    }
  };

  const CareerDetailDialog = ({ career }: { career: CareerRecommendation }) => {
    const [scholarships, setScholarships] = useState<any[]>([]);

    useEffect(() => {
      const fetchScholarships = async () => {
        try {
          const response = await fetch(`/api/scholarships?tags=${career.tags.join(',')}`);
          if (response.ok) {
            const data = await response.json();
            setScholarships(data);
          } else {
            console.error('Failed to fetch scholarships');
          }
        } catch (error) {
          console.error('Error fetching scholarships:', error);
        }
      };

      fetchScholarships();
    }, [career.tags]);

    const relatedResources = educationalResources.filter((resource: any) => {
      return resource.tags.some((tag: string) => career.tags.includes(tag));
    });

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="link" 
            className="text-blue-600 hover:text-blue-700 p-0 h-auto"
            onClick={() => setSelectedCareer(career)}
          >
            <span className="material-icons text-sm mr-1">info</span>
            More Details
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{career.name}</DialogTitle>
            <div className="flex items-center mt-2">
              <span className={`${getMatchColor(career.matchPercentage)} rounded-full px-2 py-1 text-xs font-medium text-white`}>
                {career.matchPercentage}% Match
              </span>
            </div>
          </DialogHeader>
          <div className="mt-4">
            <div className="flex items-start mb-4">
              <span className="material-icons text-blue-600 mr-2">{career.iconName}</span>
              <p className="text-gray-700">{career.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 p-3 rounded">
                <h4 className="text-xs font-medium text-gray-500 mb-1">Key Subjects</h4>
                <p className="text-sm">{career.keySubjects}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <h4 className="text-xs font-medium text-gray-500 mb-1">Avg. Starting Salary</h4>
                <p className="text-sm">{career.salarySriLanka}</p>
              </div>
            </div>
            <div className="flex gap-2 mb-4 flex-wrap">
              {career.tags.map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs px-2 py-1">
                  {tag}
                </Badge>
              ))}
            </div>
            <Separator className="my-4" />
            <h3 className="font-semibold text-lg mb-3">Related Educational Paths</h3>
            <ul className="space-y-2">
              {relatedResources.map((resource: any, idx: number) => (
                <li key={idx} className="rounded-lg border p-3">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{resource.name || 'Unknown'}</h4>
                    <div className="flex items-center">
                      <span className="material-icons text-amber-500 text-sm">star</span>
                      <span className="text-sm text-gray-500 ml-1">{resource.rating || '0'}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{resource.description || ''}</p>
                  {resource.websiteUrl && (
                    <div className="mt-2">
                      <a 
                        href={resource.websiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                      >
                        <span className="material-icons text-sm mr-1">open_in_new</span>
                        Visit Website
                      </a>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <Separator className="my-4" />
            <h3 className="font-semibold text-lg mb-3">Scholarships You Can Apply For</h3>
            <ul className="space-y-2">
              {scholarships.length > 0 ? (
                scholarships.map((scholarship, idx) => (
                  <li key={idx} className="rounded-lg border p-3">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{scholarship.name || 'Unknown'}</h4>
                      <div className="flex items-center">
                        <span className="material-icons text-amber-500 text-sm">star</span>
                        <span className="text-sm text-gray-500 ml-1">{scholarship.rating || '0'}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{scholarship.description || ''}</p>
                    {scholarship.websiteUrl && (
                      <div className="mt-2">
                        <a 
                          href={scholarship.websiteUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                        >
                          <span className="material-icons text-sm mr-1">open_in_new</span>
                          Visit Website
                        </a>
                      </div>
                    )}
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-600">No scholarships available at the moment.</p>
              )}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Failed to load educational resources. Please try again later.
      </div>
    );
  }

  return (
    <section id="recommendations" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-blue-50 rounded-lg p-4 md:p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="material-icons text-4xl text-blue-600">psychology</span>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Career Recommendations</h2>
                <p className="text-gray-600">
                  Based on your A/L subjects, grades, and interests, we've identified these career paths as potentially suitable for you.
                </p>
              </div>
            </div>
          </div>
          
          {/* Filter Options */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-3">Filter Recommendations:</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => handleFilterChange("all")}
                className={filter === "all" ? "bg-blue-600" : ""}
              >
                All Recommendations
              </Button>
              <Button
                variant={filter === "high demand" ? "default" : "outline"}
                onClick={() => handleFilterChange("high demand")}
                className={filter === "high demand" ? "bg-blue-600" : ""}
              >
                High Demand
              </Button>
              <Button
                variant={filter === "growth" ? "default" : "outline"}
                onClick={() => handleFilterChange("growth")}
                className={filter === "growth" ? "bg-blue-600" : ""}
              >
                Growth Potential
              </Button>
              <Button
                variant={filter === "technical" ? "default" : "outline"}
                onClick={() => handleFilterChange("technical")}
                className={filter === "technical" ? "bg-blue-600" : ""}
              >
                Technical
              </Button>
              <Button
                variant={filter === "business" ? "default" : "outline"}
                onClick={() => handleFilterChange("business")}
                className={filter === "business" ? "bg-blue-600" : ""}
              >
                Business
              </Button>
            </div>
          </div>
          
          {/* Recommendation Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {filteredRecommendations.map((recommendation, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-500 px-4 py-3 text-white">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">{recommendation.name}</h3>
                    <div className="flex items-center">
                      <span className={`${getMatchColor(recommendation.matchPercentage)} rounded-full px-2 py-1 text-xs font-medium text-white`}>
                        {recommendation.matchPercentage}% Match
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-start mb-4">
                    <span className="material-icons text-blue-600 mr-2">{recommendation.iconName}</span>
                    <p className="text-gray-700 text-sm">{recommendation.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <h4 className="text-xs font-medium text-gray-500 mb-1">Key Subjects</h4>
                      <p className="text-sm">{recommendation.keySubjects}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <h4 className="text-xs font-medium text-gray-500 mb-1">Avg. Starting Salary</h4>
                      <p className="text-sm">{recommendation.salarySriLanka}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {recommendation.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs px-2 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-between">
                    <CareerDetailDialog career={recommendation} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Resources Section */}
          <div className="mt-12" id="resources">
            <h2 className="text-2xl font-bold mb-6">Educational Resources</h2>
            
            {/* Resource Tabs */}
            <Tabs value={activeResourceTab} onValueChange={setActiveResourceTab}>
              <TabsList className="border-b border-gray-200 w-full">
                <TabsTrigger value="universities">Universities</TabsTrigger>
                <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
                <TabsTrigger value="vocational">Vocational Training</TabsTrigger>
                <TabsTrigger value="online">Online Courses</TabsTrigger>
              </TabsList>
              
              {/* Resources Content */}
              {Object.keys(groupedResources).map((resourceType) => (
                <TabsContent key={resourceType} value={resourceType} className="py-6">
                  {isLoading ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {[1, 2].map((i) => (
                        <Card key={i}>
                          <CardContent className="p-4">
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-2/4 mb-3" />
                            <Skeleton className="h-20 w-full mb-3" />
                            <div className="flex gap-1 mb-3">
                              <Skeleton className="h-5 w-20" />
                              <Skeleton className="h-5 w-20" />
                              <Skeleton className="h-5 w-20" />
                            </div>
                            <Skeleton className="h-6 w-28" />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      {groupedResources[resourceType]?.map((resource: any, index: number) => (
                        <Card key={index} className="overflow-hidden">
                          <CardContent className="p-4">
                            <h3 className="font-bold text-lg mb-2">{resource.name || 'Unknown'}</h3>
                            <div className="flex items-center mb-3">
                              {[...Array(Math.floor(parseFloat(resource.rating || '0')))].map((_, i) => (
                                <span key={i} className="material-icons text-amber-500 text-sm">star</span>
                              ))}
                              {parseFloat(resource.rating || '0') % 1 !== 0 && (
                                <span className="material-icons text-amber-500 text-sm">star_half</span>
                              )}
                              <span className="text-sm text-gray-500 ml-1">({resource.rating || '0'})</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{resource.description || ''}</p>
                            
                            <div className="flex flex-wrap gap-1 mb-3">
                              {resource.tags && resource.tags.map((tag: string, idx: number) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            {resource.websiteUrl && (
                              <a 
                                href={resource.websiteUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                              >
                                <span className="material-icons text-sm mr-1">open_in_new</span>
                                Visit Website
                              </a>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}

              {/* Universities Tab */}
              <TabsContent value="universities" className="py-6">
                {universitiesByResults.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {universitiesByResults.map((university, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg mb-2">{university.name || 'Unknown'}</h3>
                          <p className="text-sm text-gray-600 mb-3">{university.description || ''}</p>
                          {university.websiteUrl && (
                            <a 
                              href={university.websiteUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                            >
                              <span className="material-icons text-sm mr-1">open_in_new</span>
                              Visit Website
                            </a>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">No universities available based on your results at the moment.</p>
                )}
              </TabsContent>

              {/* Scholarships Tab */}
              <TabsContent value="scholarships" className="py-6">
                {scholarshipsByResults.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {scholarshipsByResults.map((scholarship, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg mb-2">{scholarship.name || 'Unknown'}</h3>
                          <p className="text-sm text-gray-600 mb-3">{scholarship.description || ''}</p>
                          {scholarship.websiteUrl && (
                            <a 
                              href={scholarship.websiteUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                            >
                              <span className="material-icons text-sm mr-1">open_in_new</span>
                              Visit Website
                            </a>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">No scholarships available based on your results at the moment.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Start Over Button */}
          <div className="mt-8 text-center">
            <Button 
              onClick={onReset} 
              variant="outline" 
              className="inline-flex items-center"
            >
              <span className="material-icons mr-2">refresh</span>
              Start Over
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendationResults;
