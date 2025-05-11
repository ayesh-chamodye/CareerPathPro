import { useState } from "react";
import { School } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Header = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => {
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
              <a href="/" className="font-medium text-gray-700 hover:text-primary transition">
                Home
              </a>
            </li>
            <li>
              <a href="/career-paths" className="font-medium text-gray-700 hover:text-primary transition">
                Career Paths
              </a>
            </li>
            <li>
              <a href="/resources" className="font-medium text-gray-700 hover:text-primary transition">
                Resources
              </a>
            </li>
            <li>
              <a href="/about" className="font-medium text-gray-700 hover:text-primary transition">
                About
              </a>
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
              <a href="/" className="px-4 py-2 text-lg font-medium hover:text-primary">
                Home
              </a>
              <a href="/career-paths" className="px-4 py-2 text-lg font-medium hover:text-primary">
                Career Paths
              </a>
              <a href="/resources" className="px-4 py-2 text-lg font-medium hover:text-primary">
                Resources
              </a>
              <a href="/about" className="px-4 py-2 text-lg font-medium hover:text-primary">
                About
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
