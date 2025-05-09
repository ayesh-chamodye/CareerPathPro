import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import CareerForm from "@/components/CareerForm";
import RecommendationResults from "@/components/RecommendationResults";
import TestimonialsSection from "@/components/TestimonialsSection";
import { CareerInput, CareerRecommendation } from "@shared/schema";

const HomePage = () => {
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [activeResourceTab, setActiveResourceTab] = useState<string>("universities");

  const handleGetRecommendations = (results: CareerRecommendation[]) => {
    setRecommendations(results);
    setShowResults(true);
    
    // Scroll to recommendations
    setTimeout(() => {
      document.getElementById('recommendations')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleResetForm = () => {
    setShowResults(false);
    
    // Scroll to form
    setTimeout(() => {
      document.getElementById('career-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <HeroSection />
      <HowItWorks />
      
      {!showResults ? (
        <CareerForm onGetRecommendations={handleGetRecommendations} />
      ) : (
        <RecommendationResults 
          recommendations={recommendations} 
          activeResourceTab={activeResourceTab}
          setActiveResourceTab={setActiveResourceTab}
          onReset={handleResetForm}
        />
      )}
      
      <TestimonialsSection />
    </>
  );
};

export default HomePage;
