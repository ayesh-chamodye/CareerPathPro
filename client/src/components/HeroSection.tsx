import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const HeroSection = () => {
  const scrollToForm = () => {
    document.getElementById('career-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Discover Your Ideal Career Path After A/Ls
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Our machine learning algorithm analyzes your subjects, grades, and interests to recommend
            personalized career options in Sri Lanka.
          </p>
          <Button
            onClick={scrollToForm}
            className="bg-white text-primary-700 hover:bg-gray-100 font-medium px-6 py-6 rounded-lg shadow-md inline-flex items-center transition-all"
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
