import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent } from "../components/ui/card";

interface Resource {
  name: string;
  description: string;
  imageUrl?: string;
  websiteUrl: string;
  relatedFields?: string[];
}

const ResourcesPage = () => {
  const [universities, setUniversities] = useState<Resource[]>([]);
  const [scholarships, setScholarships] = useState<Resource[]>([]);
  const [fallbackUniversities, setFallbackUniversities] = useState<Resource[]>([]);
  const [fallbackScholarships, setFallbackScholarships] = useState<Resource[]>([]);

  useEffect(() => {
    // Load fallback data from the database
    setFallbackUniversities([
      {
        name: "University of Colombo",
        description: "Sri Lanka's oldest university with programs in science, medicine, arts, management, and law.",
        websiteUrl: "https://cmb.ac.lk/",
        imageUrl: "https://via.placeholder.com/150",
      },
      // Add more fallback universities here
    ]);

    setFallbackScholarships([
      {
        name: "Mahapola Higher Education Scholarship",
        description: "Government scholarship for university students based on A/L results and family income.",
        websiteUrl: "https://www.mohe.gov.lk/",
        imageUrl: "https://via.placeholder.com/150",
      },
      // Add more fallback scholarships here
    ]);
  }, []);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const apiKey = "AIzaSyCvxoaYvFMRDyNll9RCdxTaSS9uEKfW0wo";
        const cx = "07bef8d58095e42da";

        const universityResponse = await axios.get(
          `https://www.googleapis.com/customsearch/v1`,
          {
            params: {
              key: apiKey,
              cx,
              q: "Sri Lanka university",
            },
          }
        );

        const scholarshipResponse = await axios.get(
          `https://www.googleapis.com/customsearch/v1`,
          {
            params: {
              key: apiKey,
              cx,
              q: "Sri Lanka scholarship",
            },
          }
        );

        setUniversities(
          universityResponse.data.items.map((item: any) => ({
            name: item.title,
            description: item.snippet,
            websiteUrl: item.link,
            imageUrl: item.pagemap?.cse_image?.[0]?.src || "https://via.placeholder.com/150",
          }))
        );

        setScholarships(
          scholarshipResponse.data.items.map((item: any) => ({
            name: item.title,
            description: item.snippet,
            websiteUrl: item.link,
            imageUrl: item.pagemap?.cse_image?.[0]?.src || "https://via.placeholder.com/150",
          }))
        );
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();
  }, []);

  const displayedUniversities = universities.length > 0 ? universities : fallbackUniversities;
  const displayedScholarships = scholarships.length > 0 ? scholarships : fallbackScholarships;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Educational Resources</h1>
        <Tabs defaultValue="universities">
          <TabsList className="mb-4">
            <TabsTrigger value="universities">Universities</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
          </TabsList>
          <TabsContent value="universities">
            <div className="grid md:grid-cols-2 gap-6">
              {displayedUniversities.map((university, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <img
                    src={university.imageUrl}
                    alt={university.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent>
                    <h2 className="text-xl font-semibold mb-2">{university.name}</h2>
                    <p className="text-gray-600 mb-4">{university.description}</p>
                    <a
                      href={university.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Visit Website
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="scholarships">
            <div className="grid md:grid-cols-2 gap-6">
              {displayedScholarships.map((scholarship, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <img
                    src={scholarship.imageUrl}
                    alt={scholarship.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent>
                    <h2 className="text-xl font-semibold mb-2">{scholarship.name}</h2>
                    <p className="text-gray-600 mb-4">{scholarship.description}</p>
                    <a
                      href={scholarship.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Visit Website
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ResourcesPage;
