import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutPage = () => {
    const [currentPage, setCurrentPage] = useState("about");
  return (
    <div className="min-h-screen flex flex-col">      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        <p className="text-gray-700 leading-relaxed">
          Welcome to CareerPathPro! Our mission is to help students and professionals
          discover the best career paths, educational resources, and opportunities
          tailored to their interests and qualifications. We believe in empowering
          individuals to make informed decisions about their future.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Our platform provides personalized career recommendations, access to
          scholarships, and information about universities and training programs.
          Whether you're just starting your journey or looking to advance your career,
          we're here to guide you every step of the way.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
