import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const scrollToForm = () => {
    document.getElementById('career-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section relative overflow-hidden py-12 md:py-20 text-white">
      {/* Animated background */}
      <div className="animated-background absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-700 z-0">
        <div className="circles">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="circle"></div>
          ))}
        </div>
      </div>
      
      {/* Content with higher z-index to appear above the animated background */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">
            Discover Your Ideal Career Path After A/Ls
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white">
            Our machine learning algorithm analyzes your subjects, grades, and interests to recommend
            personalized career options in Sri Lanka.
          </p>
          <Button
            onClick={scrollToForm}
            className="bg-white text-primary-700 hover:bg-gray-100 font-medium px-6 py-6 rounded-lg shadow-lg inline-flex items-center transition-all hover:shadow-xl"
          >
            <span className="material-icons mr-2">explore</span>
            Find My Career Path
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
