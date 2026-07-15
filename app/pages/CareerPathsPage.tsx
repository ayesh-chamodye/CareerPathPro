"use client";

import { careerPathsData } from "../data/careerData";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useDebounce } from "../hooks/use-debounce";

export const dynamic = 'force-dynamic';

const CareerPathsPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredCareers = careerPathsData
    .filter((career) =>
      career.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "salary") {
        const salaryA = parseInt(a.salarySriLanka.split("-")[0].replace(/\D/g, ""));
        const salaryB = parseInt(b.salarySriLanka.split("-")[0].replace(/\D/g, ""));
        return salaryB - salaryA;
      }
      return 0;
    });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">{t('careers.title')}</h1>
          <div className="flex gap-4 items-center">
            <Input
              type="search"
              placeholder={t('careers.searchPlaceholder')}
              className="max-w-xs"
              value={searchTerm}
              onChange={handleSearch}
            />
            <select
              className="border rounded px-2 py-1 bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-600 text-gray-900 dark:text-white"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="name">{t('careers.sortByName')}</option>
              <option value="salary">{t('careers.sortBySalary')}</option>
            </select>
          </div>
        </div>

        {filteredCareers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>{t('careers.noResults')}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCareers.map((career, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-blue-50 dark:bg-blue-900">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
                      {career.name}
                    </CardTitle>
                    <Badge variant="secondary" className="ml-2">
                      {career.tags[0]}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start mb-4">
                    <span className="material-icons text-blue-600 mr-2">{career.iconName}</span>
                    <p className="text-gray-700 text-sm">{career.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded ">
                      <h4 className="text-xs font-medium text-gray-500 mb-1">Key Subjects</h4>
                      <p className="text-sm">{career.keySubjects}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                      <h4 className="text-xs font-medium text-gray-500 mb-1">Avg. Starting Salary</h4>
                      <p className="text-sm">{career.salarySriLanka}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {career.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs px-2 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>                                    
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CareerPathsPage;
