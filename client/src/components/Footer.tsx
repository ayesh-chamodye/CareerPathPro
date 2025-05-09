import { Link } from "wouter";
import { School } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    
    setEmail("");
  };

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <School className="text-primary-500 mr-2 h-5 w-5" />
              <h3 className="text-xl font-bold">
                CareerPath<span className="text-secondary-500">SL</span>
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              Helping Sri Lankan A/L students discover their ideal career paths through
              personalized recommendations and educational resources.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-white transition">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/#about">
                  <a className="text-gray-400 hover:text-white transition">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/#career-paths">
                  <a className="text-gray-400 hover:text-white transition">Career Paths</a>
                </Link>
              </li>
              <li>
                <Link href="/#resources">
                  <a className="text-gray-400 hover:text-white transition">Resources</a>
                </Link>
              </li>
              <li>
                <Link href="/#contact">
                  <a className="text-gray-400 hover:text-white transition">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#universities">
                  <a className="text-gray-400 hover:text-white transition">Universities</a>
                </Link>
              </li>
              <li>
                <Link href="/#scholarships">
                  <a className="text-gray-400 hover:text-white transition">Scholarships</a>
                </Link>
              </li>
              <li>
                <Link href="/#career-guides">
                  <a className="text-gray-400 hover:text-white transition">Career Guides</a>
                </Link>
              </li>
              <li>
                <Link href="/#skills">
                  <a className="text-gray-400 hover:text-white transition">Skills Development</a>
                </Link>
              </li>
              <li>
                <Link href="/#courses">
                  <a className="text-gray-400 hover:text-white transition">Online Courses</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary-600 transition">
                <span className="material-icons text-lg">facebook</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary-600 transition">
                <span className="material-icons text-lg">instagram</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary-600 transition">
                <span className="material-icons text-lg">twitter</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary-600 transition">
                <span className="material-icons text-lg">linkedin</span>
              </a>
            </div>
            <p className="text-gray-400 text-sm">Subscribe to our newsletter for updates</p>
            <form onSubmit={handleSubscribe} className="flex mt-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-gray-700 rounded-l text-white border-gray-600 focus-visible:ring-primary-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" className="bg-primary-600 hover:bg-primary-700 rounded-l-none">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} CareerPathSL. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
