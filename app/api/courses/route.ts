import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { load } from "cheerio";

const scrapeSearchResults = async (query: string, category: 'universities' | 'scholarships' | 'courses' | 'training') => {
  try {
    let searchQuery = '';
    if (query && query.trim()) {
      const lowerQuery = query.toLowerCase();
      if (lowerQuery.includes('sri lanka') || lowerQuery.includes('srilanka')) {
        searchQuery = `${query} ${category}`;
      } else {
        searchQuery = `Sri Lanka ${query} ${category}`;
      }
    } else {
      switch (category) {
        case 'courses':
          searchQuery = 'Sri Lanka online courses OUSL SLIATE certifications learning';
          break;
        default:
          searchQuery = `Sri Lanka ${category}`;
      }
    }

    const ddgUrl = `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(searchQuery)}`;
    const ddgResponse = await axios.get(ddgUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      timeout: 15000,
    });

    const $ = load(ddgResponse.data);
    const results: any[] = [];
    const seenUrls = new Set<string>();

    const rows = $('table tr');
    rows.each((_, row) => {
      const $row = $(row);
      const links = $row.find('a');
      links.each((_, link) => {
        const $link = $(link);
        let href = $link.attr('href');
        const title = $link.text().trim();
        if (!href || !title || title.length < 10) return;
        if (href.startsWith('//duckduckgo.com/l/')) {
          try {
            const url = new URL('https:' + href);
            const actualUrl = url.searchParams.get('uddg');
            if (actualUrl) href = decodeURIComponent(actualUrl);
          } catch {
            return;
          }
        }
        if (!href.startsWith('http')) return;
        if (seenUrls.has(href)) return;
        seenUrls.add(href);
        const isSriLankanDomain = href.includes('.lk/') || href.includes('.lk?') || href.endsWith('.lk');
        const titleLower = title.toLowerCase();
        const mentionsSriLanka = titleLower.includes('sri lanka') || titleLower.includes('srilanka');
        const isFalsePositive = href.includes('sri.com') || href.includes('yahoo.co.jp') || href.includes('zhihu.com');
        if (!isSriLankanDomain && !mentionsSriLanka) return;
        if (isFalsePositive) return;
        const snippet = $row.find('td').eq(1).text().trim() || $row.text().replace(title, '').trim().substring(0, 200);
        const fullText = `${title} ${snippet}`;
        results.push({
          title,
          url: href,
          snippet,
          description: snippet,
          details: {
            duration: fullText.match(/duration:?\s*([^\n.;]+)/i)?.[1]?.trim(),
            fee: fullText.match(/fee:?\s*([^\n.;]+)/i)?.[1]?.trim() || fullText.match(/cost:?\s*([^\n.;]+)/i)?.[1]?.trim(),
            location: fullText.match(/location:?\s*([^\n.;]+)/i)?.[1]?.trim() || fullText.match(/(?:in|at)\s+(Sri Lanka|Colombo|Kandy|[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/)?.[1]?.trim(),
            requirements: fullText.match(/requirements?:?\s*([^\n.;]+)/i)?.[1]?.trim() || fullText.match(/(?:requires?|need)\s+([^\n.;]+A[\/-]L[^\n.;]*)/i)?.[1]?.trim(),
          },
        });
      });
    });
    return results.slice(0, 20);
  } catch (error: any) {
    console.error('[Search] Scraping error:', error.message);
    return [];
  }
};

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("q") || '';
    const results = await scrapeSearchResults(query, 'courses');
    
    if (!Array.isArray(results) || results.length === 0) {
      return NextResponse.json([
        {
          title: "Open University of Sri Lanka (OUSL)",
          url: "https://www.ou.ac.lk",
          snippet: "Distance learning programs and flexible education options for working professionals.",
          description: "Distance learning programs and flexible education options for working professionals.",
          details: {
            location: "Sri Lanka",
            requirements: "A/L qualifications or equivalent",
          }
        },
        {
          title: "Coursera - Online Courses",
          url: "https://www.coursera.org",
          snippet: "Online platform offering courses from universities and companies worldwide.",
          description: "Online platform offering courses from universities and companies worldwide.",
          details: {
            location: "Online",
            requirements: "Varies by course",
          }
        },
        {
          title: "edX - Online Learning",
          url: "https://www.edx.org",
          snippet: "Online learning platform with courses from top global institutions.",
          description: "Online learning platform with courses from top global institutions.",
          details: {
            location: "Online",
            requirements: "Varies by course",
          }
        }
      ]);
    }
    
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}
