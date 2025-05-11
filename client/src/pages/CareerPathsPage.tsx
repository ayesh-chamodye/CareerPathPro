import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import type { Career } from '../types/career.types';
import { useTranslation } from "react-i18next";
import { useDebounce } from "../hooks/use-debounce";
import { CareerCardSkeleton } from "../components/CareerCardSkeleton";

const ITEMS_PER_PAGE = 12;

const CareerPathsPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  const fetchCareers = async ({ pageParam = 0 }) => {
    const searchParams = new URLSearchParams({
      limit: String(ITEMS_PER_PAGE),
      offset: String(pageParam),
      ...(debouncedSearch && { search: debouncedSearch }),
    });

    const response = await fetch(`/api/careers?${searchParams}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteQuery({
    queryKey: ['careers', debouncedSearch],
    queryFn: fetchCareers,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.hasMore) return undefined;
      return pages.length * ITEMS_PER_PAGE;
    },
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col">      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">{t('careers.title')}</h1>
          <Input
            type="search"
            placeholder={t('careers.searchPlaceholder')}
            className="max-w-xs"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {isError && (
          <div className="text-center py-8 text-red-500">
            <p>{t('common.error')}: {(error as Error).message}</p>
          </div>
        )}

        {isLoading ? (
          <CareerCardSkeleton />
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.pages.map((page) => 
                page.careers.map((career: Career) => (
                  <Card key={career.id} className="hover:shadow-lg transition-shadow">
                    {career.imagePath ? (
                      <img
                        src={career.imagePath}
                        alt={career.title}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                    ) : (
                      <div className="w-full h-40 bg-muted rounded-t-lg flex items-center justify-center">
                        <span className="text-muted-foreground">{t('careers.noImage')}</span>
                      </div>
                    )}
                    <CardContent className="p-4">
                      <h2 className="text-xl font-semibold mb-2">{career.title}</h2>
                      <p className="text-muted-foreground text-sm mb-4">{career.brief}</p>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {career.skills.length > 3 && (
                          <span className="text-xs text-muted-foreground">
                            +{career.skills.length - 3} {t('careers.moreSkills')}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {hasNextPage && (
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  variant="outline"
                >
                  {isFetchingNextPage ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('common.loading')}
                    </>
                  ) : (
                    t('careers.loadMore')
                  )}
                </Button>
              </div>
            )}

            {!hasNextPage && data?.pages[0].total > 0 && (
              <p className="text-center text-muted-foreground mt-8">
                {t('careers.noMoreResults')}
              </p>
            )}

            {data?.pages[0].total === 0 && (
              <p className="text-center py-12 text-muted-foreground">
                {t('careers.noResults')}
              </p>
            )}
          </>
        )}
      </main>      
    </div>
  );
};

export default CareerPathsPage;
