import { NextRequest, NextResponse } from "next/server";
import CareerScraper from "@lib/scraper";

const scraper = new CareerScraper();
let cachedCareers: any[] = [];
let lastCacheTime = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000;

export const dynamic = 'force-dynamic';

async function refreshCareerCache() {
  try {
    await scraper.initialize();
    const careers = await scraper.scrapeCareersList();
    await scraper.close();
    cachedCareers = careers.map((career: any, index: number) => ({
      ...career,
      id: career.id || `career-${index + 1}`,
    }));
    lastCacheTime = Date.now();
    return cachedCareers;
  } catch (error) {
    console.error("Error refreshing career cache:", error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  try {
    if (Date.now() - lastCacheTime > CACHE_DURATION || cachedCareers.length === 0) {
      await refreshCareerCache();
    }
    const search = request.nextUrl.searchParams.get("search");
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "20");
    const offset = parseInt(request.nextUrl.searchParams.get("offset") || "0");

    let filteredCareers = cachedCareers;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredCareers = cachedCareers.filter(
        (career: any) =>
          career.title?.toLowerCase().includes(searchLower) ||
          career.description?.toLowerCase().includes(searchLower) ||
          career.skills?.some((skill: string) => skill.toLowerCase().includes(searchLower))
      );
    }

    const paginatedCareers = filteredCareers.slice(offset, offset + limit);
    return NextResponse.json({
      careers: paginatedCareers,
      total: filteredCareers.length,
      hasMore: offset + limit < filteredCareers.length,
    });
  } catch (error) {
    console.error("Error fetching careers:", error);
    return NextResponse.json({ error: "Failed to fetch career data" }, { status: 500 });
  }
}
