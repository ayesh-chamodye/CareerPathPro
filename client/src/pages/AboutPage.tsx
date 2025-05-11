import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('about.title')}</h1>
        <div className="space-y-6">
          <div className="card bg-card text-card-foreground p-6 rounded-lg shadow-lg">
            <p className="leading-relaxed">
              {t('about.welcome')}
            </p>
          </div>
          <div className="card bg-card text-card-foreground p-6 rounded-lg shadow-lg">
            <p className="leading-relaxed">
              {t('about.mission')}
            </p>
          </div>
        </div>
      </main>      
    </div>
  );
};

export default AboutPage;
