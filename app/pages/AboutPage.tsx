"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

export const dynamic = 'force-dynamic';

const AboutPage = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState("about");

  return (
    <div className="min-h-screen flex flex-col">      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('about.title')}</h1>
        <center><h1 className="text-2xl font-bold mb-6">{t('about.welcome')}</h1></center>
        <p className="text-gray-700 leading-relaxed">
          {t('about.mission')}        
          {t('about.believe')}        
          {t('about.platform')}
        </p>
      </main>      
    </div>
  );
};

export default AboutPage;
