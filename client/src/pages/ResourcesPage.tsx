import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent } from "../components/ui/card";

const ResourcesPage = () => {
  const [currentPage, setCurrentPage] = useState("resources");

  const resources = {
    universities: [
      { name: "University A", description: "Top-ranked university." },
      { name: "University B", description: "Known for its research programs." },
    ],
    scholarships: [
      { name: "Scholarship X", description: "Covers full tuition." },
      { name: "Scholarship Y", description: "For outstanding students." },
    ],
  };

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
              {resources.universities.map((university, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent>
                    <h2 className="text-xl font-semibold mb-2">{university.name}</h2>
                    <p className="text-gray-600">{university.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="scholarships">
            <div className="grid md:grid-cols-2 gap-6">
              {resources.scholarships.map((scholarship, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent>
                    <h2 className="text-xl font-semibold mb-2">{scholarship.name}</h2>
                    <p className="text-gray-600">{scholarship.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default ResourcesPage;
