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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (Date.now() - lastCacheTime > CACHE_DURATION || cachedCareers.length === 0) {
      await refreshCareerCache();
    }
    const career = cachedCareers.find((c: any) => c.id === id);
    if (!career) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }
    return NextResponse.json(career);
  } catch (error) {
    console.error("Error fetching career details:", error);
    return NextResponse.json({ error: "Failed to fetch career details" }, { status: 500 });
  }
}
