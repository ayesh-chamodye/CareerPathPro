import React from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import CareerPathsPage from "@/pages/CareerPathsPage";
import ResourcesPage from "@/pages/ResourcesPage";
import AboutPage from "@/pages/AboutPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const setCurrentPage = (page: string) => {
    console.log(`Current page set to: ${page}`);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="career-pro-theme">
        <TooltipProvider>
          <Toaster />        
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/career-paths" element={<CareerPathsPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
