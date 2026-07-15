"use client"

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
              <span className="font-bold text-xl">CareerPathPro</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Guiding you towards your ideal career path with personalized recommendations
              and comprehensive resources.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/career-paths" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Career Paths
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/resources?type=universities" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Universities
                </Link>
              </li>
              <li>
                <Link href="/resources?type=scholarships" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Scholarships
                </Link>
              </li>
              <li>
                <Link href="/resources?type=courses" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Online Courses
                </Link>
              </li>
              <li>
                <Link href="/resources?type=training" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Vocational Training
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                <strong>Email:</strong>{' '}
                <a href="mailto:ayeshchamodye@gmail.com" className="hover:text-primary transition-colors">
                  ayeshchamodye@gmail.com
                </a>
              </li>
              <li className="text-sm text-muted-foreground">
                <strong>Phone:</strong>{' '}
                <a href="tel:+94112345678" className="hover:text-primary transition-colors">
                  +94 76 656 8369
                </a>
              </li>
              <li className="text-sm text-muted-foreground">
                <strong>Address:</strong><br />
                47 Malagane,<br />
                Kurunegala,<br />
                Sri Lanka
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} CareerPathPro. All rights reserved.
              
              Developed by <strong>Ayesh Chamodya.</strong>
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
