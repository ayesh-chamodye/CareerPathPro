"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";

export const dynamic = 'force-dynamic';

const AboutPage = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState("about");

  return (
    <div className="min-h-screen flex flex-col">      
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('about.title')}</h1>
        <center><h2 className="text-2xl font-bold mb-6">{t('about.welcome')}</h2></center>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-blue-800 dark:text-blue-200">{t('about.mission')}</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('about.believe')}
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">About Us</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('about.description')}
            </p>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-blue-800 dark:text-blue-200">{t('about.platform')}</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>AI-powered career recommendations based on A/L subjects and interests</li>
              <li>Comprehensive database of Sri Lankan career paths and opportunities</li>
              <li>University, scholarship, course, and training program suggestions</li>
              <li>Multi-language support for Sinhala, Tamil, and English</li>
              <li>Personalized guidance tailored to each student's unique profile</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
