"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Badge } from "../components/ui/badge";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";

export const dynamic = 'force-dynamic';

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
  const { t } = useTranslation();
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

      const parseResponse = (response: { data: any[] }) => {
        try {
          return response.data.map((item: any) => ({
            name: item.title,
            description: item.description,
            snippet: item.snippet,
            websiteUrl: item.url,
            details: item.details,
            imageUrl: "https://via.placeholder.com/150",
          }));
        } catch (err) {
          console.error("Error parsing response:", response);
          throw new Error("Invalid response format");
        }
      };

      setUniversities(parseResponse(universityRes));
      setScholarships(parseResponse(scholarshipRes));
      setCourses(parseResponse(coursesRes));
      setTraining(parseResponse(trainingRes));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching resources:", error);
        if (error.response) {
          console.error("Server responded with:", error.response.data);
        }
      } else {
        console.error("Unexpected error:", error);
      }
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
        <iframe
          src={resource.websiteUrl || '/public/fallback-image.png'}          
          className="w-full h-40 object-cover mb-4 rounded "
            style={{    
    border: 'none',
    overflow: 'hidden'
  }}
   scrolling="no"
          sandbox="allow-same-origin allow-scripts"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/public/fallback-image.png';
          }}
        />
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
              <Badge variant="outline" className="mr-2">
                Requirements: {resource.details.requirements}
              </Badge>
            )}
          </div>
        )}
        <a
          href={resource.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Visit Website
        </a>
      </CardContent>
    </Card>
  );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{t('resources.error')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">{t('resources.title')}</h1>
        <Tabs defaultValue="universities" className="space-y-4 ">
          <TabsList className="flex space-x-1 rounded-xl bg-blue-100 p-1 dark:bg-gray-700">
            <TabsTrigger value="universities">{t('resources.tabs.universities')}</TabsTrigger>
            <TabsTrigger value="scholarships">{t('resources.tabs.scholarships')}</TabsTrigger>
            <TabsTrigger value="courses">{t('resources.tabs.courses')}</TabsTrigger>
            <TabsTrigger value="training">{t('resources.tabs.training')}</TabsTrigger>
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
