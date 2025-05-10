import React, { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import CareerPathsPage from "@/pages/CareerPathsPage";
import ResourcesPage from "@/pages/ResourcesPage";
import AboutPage from "@/pages/AboutPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "career-paths":
        return <CareerPathsPage />;
      case "resources":
        return <ResourcesPage />;
      case "about":
        return <AboutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />        
        <main>
          <Header setCurrentPage={setCurrentPage} />
          <main>{renderPage()}</main>
        </main>
        <Footer />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
