import { useState } from "react";
import { Link } from "wouter";
import { School } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => {
    setIsOpen(false);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <School className="text-primary mr-2 h-6 w-6" />
          <h1 className="text-2xl font-bold text-primary">
            CareerPath<span className="text-secondary-500">SL</span>
          </h1>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link href="/">
                <a className="font-medium text-gray-700 hover:text-primary transition">
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href="/#career-paths">
                <a className="font-medium text-gray-700 hover:text-primary transition">
                  Career Paths
                </a>
              </Link>
            </li>
            <li>
              <Link href="/#resources">
                <a className="font-medium text-gray-700 hover:text-primary transition">
                  Resources
                </a>
              </Link>
            </li>
            <li>
              <Link href="/#about">
                <a className="font-medium text-gray-700 hover:text-primary transition">
                  About
                </a>
              </Link>
            </li>
          </ul>
        </nav>
        
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <span className="material-icons">menu</span>
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/" onClick={closeSheet}>
                <a className="px-4 py-2 text-lg font-medium hover:text-primary">
                  Home
                </a>
              </Link>
              <Link href="/#career-paths" onClick={closeSheet}>
                <a className="px-4 py-2 text-lg font-medium hover:text-primary">
                  Career Paths
                </a>
              </Link>
              <Link href="/#resources" onClick={closeSheet}>
                <a className="px-4 py-2 text-lg font-medium hover:text-primary">
                  Resources
                </a>
              </Link>
              <Link href="/#about" onClick={closeSheet}>
                <a className="px-4 py-2 text-lg font-medium hover:text-primary">
                  About
                </a>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
