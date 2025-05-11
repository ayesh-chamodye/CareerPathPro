import { careerPathsData } from "../data/careerData";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useDebounce } from "../hooks/use-debounce";

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
              className="border rounded px-2 py-1"
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
                <CardHeader className="bg-blue-50">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold text-gray-800">
                      {career.name}
                    </CardTitle>
                    <Badge variant="secondary" className="ml-2">
                      {career.tags[0]}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <p className="text-gray-600">{career.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700">{t('careers.requiredSubjects')}</h4>
                    <p className="text-gray-600">{career.keySubjects}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700">{t('careers.salaryRange')}</h4>
                    <p className="text-gray-600">{career.salarySriLanka}</p>
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
