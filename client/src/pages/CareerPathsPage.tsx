import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import { careerPathsData } from "../data/careerData";
import { InsertCareerPath } from "@shared/schema";

const CareerPathsPage = () => {
  const [careerPaths, setCareerPaths] = useState<InsertCareerPath[]>([]);

  useEffect(() => {
    // Simulate fetching 10 career paths from the database
    const fetchCareerPaths = async () => {
      const fetchedPaths = careerPathsData.slice(0, 10); // Fetch first 10 paths
      setCareerPaths(fetchedPaths);
    };

    fetchCareerPaths();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Available Career Paths</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerPaths.map((career, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <img
                src={`https://picsum.photos/300/200?random=${index}`}
                alt={career.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <CardContent>
                <h2 className="text-xl font-semibold mb-2">{career.name}</h2>
                <p className="text-gray-600">{career.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CareerPathsPage;
