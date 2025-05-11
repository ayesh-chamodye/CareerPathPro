import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Badge } from "../components/ui/badge";

interface ResourceDetails {
  duration?: string;
  fee?: string;
  location?: string;
  requirements?: string;
}

interface Resource {
  name: string;
  description: string;
  imageUrl?: string;
  websiteUrl: string;
  snippet?: string;
  details?: ResourceDetails;
}

const ResourcesPage = () => {
  const [universities, setUniversities] = useState<Resource[]>([]);
  const [scholarships, setScholarships] = useState<Resource[]>([]);
  const [courses, setCourses] = useState<Resource[]>([]);
  const [training, setTraining] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResources = async () => {
    setLoading(true);
    setError(null);
    try {
      const [universityRes, scholarshipRes, coursesRes, trainingRes] = await Promise.all([
        axios.get("/api/universities"),
        axios.get("/api/scholarships"),
        axios.get("/api/courses"),
        axios.get("/api/training")
      ]);

      setUniversities(universityRes.data.map((item: any) => ({
        name: item.title,
        description: item.description,
        snippet: item.snippet,
        websiteUrl: item.url,
        details: item.details,
        imageUrl: "https://via.placeholder.com/150"
      })));

      setScholarships(scholarshipRes.data.map((item: any) => ({
        name: item.title,
        description: item.description,
        snippet: item.snippet,
        websiteUrl: item.url,
        details: item.details,
        imageUrl: "https://via.placeholder.com/150"
      })));

      setCourses(coursesRes.data.map((item: any) => ({
        name: item.title,
        description: item.description,
        snippet: item.snippet,
        websiteUrl: item.url,
        details: item.details,
        imageUrl: "https://via.placeholder.com/150"
      })));

      setTraining(trainingRes.data.map((item: any) => ({
        name: item.title,
        description: item.description,
        snippet: item.snippet,
        websiteUrl: item.url,
        details: item.details,
        imageUrl: "https://via.placeholder.com/150"
      })));

    } catch (error) {
      console.error("Error fetching resources:", error);
      setError("Failed to fetch resources. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const ResourceCard = ({ resource }: { resource: Resource }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl">{resource.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {resource.imageUrl && (
          <img
            src={resource.imageUrl}
            alt={resource.name}
            className="w-full h-40 object-cover mb-4 rounded"
          />
        )}
        {resource.snippet && (
          <p className="text-sm text-gray-500 mb-2">{resource.snippet}</p>
        )}
        <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
        
        {resource.details && (
          <div className="space-y-2 mb-4">
            {resource.details.duration && (
              <Badge variant="outline" className="mr-2">
                Duration: {resource.details.duration}
              </Badge>
            )}
            {resource.details.fee && (
              <Badge variant="outline" className="mr-2">
                Fee: {resource.details.fee}
              </Badge>
            )}
            {resource.details.location && (
              <Badge variant="outline" className="mr-2">
                Location: {resource.details.location}
              </Badge>
            )}
            {resource.details.requirements && (
              <div className="text-sm text-gray-600 mt-2">
                <strong>Requirements:</strong> {resource.details.requirements}
              </div>
            )}
          </div>
        )}

        <a
          href={resource.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Visit Website
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </CardContent>
    </Card>
  );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Educational Resources</h1>
        <Tabs defaultValue="universities" className="space-y-4">
          <TabsList className="flex space-x-1 rounded-xl bg-blue-100 p-1">
            <TabsTrigger value="universities">Universities</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
            <TabsTrigger value="courses">Online Courses</TabsTrigger>
            <TabsTrigger value="training">Vocational Training</TabsTrigger>
          </TabsList>

          {['universities', 'scholarships', 'courses', 'training'].map((tab) => (
            <TabsContent key={tab} value={tab}>
              {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <Skeleton className="h-40 w-full mb-4" />
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-full mb-2" />
                        <Skeleton className="h-3 w-full mb-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(tab === 'universities' ? universities :
                    tab === 'scholarships' ? scholarships :
                    tab === 'courses' ? courses :
                    training).map((resource, index) => (
                    <ResourceCard key={index} resource={resource} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default ResourcesPage;
