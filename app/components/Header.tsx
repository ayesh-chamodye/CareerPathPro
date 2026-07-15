"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Moon, Sun, Globe, Laptop, Menu } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useTranslation } from "react-i18next";
import "../i18n";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = React.useState(
    typeof window !== "undefined" ? localStorage.getItem("career-pro-language") || "en" : "en",
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const languages = {
    English: { code: "en", nativeName: "English" },
    සිංහල: { code: "si", nativeName: "සිංහල" },
    தமிழ்: { code: "ta", nativeName: "தமிழ்" },
  };

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    i18n.changeLanguage(langCode);
    if (typeof window !== "undefined") {
      localStorage.setItem("career-pro-language", langCode);
      document.documentElement.lang = langCode;
    }
  };

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("career-pro-theme", newTheme);
    }
  };

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const savedLang = localStorage.getItem("career-pro-language");
    if (savedLang) {
      handleLanguageChange(savedLang);
    }
    const savedTheme = localStorage.getItem("career-pro-theme") as
      | "light"
      | "dark"
      | "system"
      | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    if (isMobileMenuOpen) {
      document.documentElement.classList.add("mobile-nav-open");
    } else {
      document.documentElement.classList.remove("mobile-nav-open");
    }
  }, [isMobileMenuOpen]);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-3">
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-10 w-10 transition-transform hover:scale-105"
          />
          <span className="font-bold text-2xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            CareerPathPro
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          <Link
            href="/"
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all hover:bg-primary/10 hover:text-primary active:scale-95 ${
              isActive("/")
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            {t("header.home")}
          </Link>
          <Link
            href="/career-paths"
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all hover:bg-primary/10 hover:text-primary active:scale-95 ${
              isActive("/career-paths")
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            {t("header.careerPaths")}
          </Link>
          <Link
            href="/resources"
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all hover:bg-primary/10 hover:text-primary active:scale-95 ${
              isActive("/resources")
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            {t("header.resources")}
          </Link>
          <Link
            href="/about"
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all hover:bg-primary/10 hover:text-primary active:scale-95 ${
              isActive("/about")
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            {t("header.about")}
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Globe className="h-5 w-5" />
                <span className="sr-only">{t("header.toggleLanguage")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {Object.entries(languages).map(([key, { code, nativeName }]) => (
                <DropdownMenuItem
                  key={code}
                  onClick={() => handleLanguageChange(code)}
                  className={language === code ? "bg-primary/10 text-primary" : ""}
                >
                  {nativeName}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">{t("header.toggleTheme")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleThemeChange("light")}>
                <Sun className="mr-2 h-4 w-4" />
                <span>{t("header.light")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                <span>{t("header.dark")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange("system")}>
                <Laptop className="mr-2 h-4 w-4" />
                <span>{t("header.system")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button
          className="md:hidden hover:bg-primary/10 hover:text-primary transition-colors"
          variant="ghost"
          size="icon"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden mobile-nav bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <nav className="container py-4 space-y-2 px-4">
            <div className="space-y-1 mb-4">
              <Link
                href="/"
                className={`block px-4 py-2 text-sm font-medium rounded-md transition-all hover:bg-primary/10 hover:text-primary active:scale-95 ${
                  isActive("/")
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.home")}
              </Link>
              <Link
                href="/career-paths"
                className={`block px-4 py-2 text-sm font-medium rounded-md transition-all hover:bg-primary/10 hover:text-primary active:scale-95 ${
                  isActive("/career-paths")
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.careerPaths")}
              </Link>
              <Link
                href="/resources"
                className={`block px-4 py-2 text-sm font-medium rounded-md transition-all hover:bg-primary/10 hover:text-primary active:scale-95 ${
                  isActive("/resources")
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.resources")}
              </Link>
              <Link
                href="/about"
                className={`block px-4 py-2 text-sm font-medium rounded-md transition-all hover:bg-primary/10 hover:text-primary active:scale-95 ${
                  isActive("/about")
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.about")}
              </Link>
            </div>

            <div className="space-y-4 border-t pt-4">
              <div className="px-4">
                <p className="text-sm font-medium mb-2">
                  {t("header.toggleLanguage")}
                </p>
                <div className="grid gap-1">
                  {Object.entries(languages).map(
                    ([key, { code, nativeName }]) => (
                      <button
                        key={code}
                        onClick={() => {
                          handleLanguageChange(code);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`text-left px-2 py-1.5 text-sm rounded-md transition-colors ${
                          language === code
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-primary/10 hover:text-primary"
                        }`}
                      >
                        {nativeName}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div className="px-4">
                <p className="text-sm font-medium mb-2">
                  {t("header.toggleTheme")}
                </p>
                <div className="grid gap-1">
                  <button
                    onClick={() => {
                      handleThemeChange("light");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 text-left px-2 py-1.5 text-sm rounded-md transition-colors ${
                      theme === "light"
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    <Sun className="h-4 w-4" />
                    <span>{t("header.light")}</span>
                  </button>
                  <button
                    onClick={() => {
                      handleThemeChange("dark");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 text-left px-2 py-1.5 text-sm rounded-md transition-colors ${
                      theme === "dark"
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    <Moon className="h-4 w-4" />
                    <span>{t("header.dark")}</span>
                  </button>
                  <button
                    onClick={() => {
                      handleThemeChange("system");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 text-left px-2 py-1.5 text-sm rounded-md transition-colors ${
                      theme === "system"
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    <Laptop className="h-4 w-4" />
                    <span>{t("header.system")}</span>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
