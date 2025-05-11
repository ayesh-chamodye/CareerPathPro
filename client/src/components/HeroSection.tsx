import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();

  const scrollToForm = () => {
    document.getElementById('career-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section relative overflow-hidden py-12 md:py-20 text-white">
      {/* Animated background */}
      <div className="animated-background absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-500 z-0">
        <div className="circles">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="circle"></div>
          ))}
        </div>
      </div>
      
      {/* Content with higher z-index to appear above the animated background */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-200 to-blue-100 bg-opacity-70 px-4 py-2 rounded-lg shadow-inner inline-block">
              <span className="bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                {t('home.hero.title')}
              </span>
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white">
            {t('home.hero.subtitle')}
          </p>
          <Button
            onClick={scrollToForm}
            className="bg-gradient-to-r from-blue-100 to-white text-blue-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-50 font-medium px-6 py-6 rounded-lg shadow-lg inline-flex items-center transition-all hover:shadow-xl border-2 border-blue-200"
          >
            <span className="material-icons mr-2 text-blue-600">explore</span>
            <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent font-bold">
              {t('home.hero.cta')}
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
