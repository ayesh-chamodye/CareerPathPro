import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import type { Career } from '../server/types';

let puppeteer: any = null;
let Browser: any = null;
let Page: any = null;

async function loadPuppeteer() {
  if (puppeteer) return puppeteer;
  try {
    puppeteer = await import('puppeteer');
    Browser = puppeteer.Browser;
    Page = puppeteer.Page;
    return puppeteer;
  } catch (e) {
    console.warn('Puppeteer is not available in this environment');
    return null;
  }
}

class CareerScraper {
  private browser: any;
  private page: any;
  private readonly baseUrl: string;
  private readonly imageFolder: string;

  constructor() {
    this.browser = null;
    this.page = null;
    this.baseUrl = 'https://www.onetonline.org';
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    this.imageFolder = path.join(__dirname, '../public/career-images');
  }

  async initialize(): Promise<void> {
    const pp = await loadPuppeteer();
    if (!pp) {
      console.warn('CareerScraper: skipping initialization because puppeteer is not available');
      return;
    }
    this.browser = await pp.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1920, height: 1080 });
    
    try {
      await fs.access(this.imageFolder);
    } catch {
      await fs.mkdir(this.imageFolder, { recursive: true });
    }
  }

  async close(): Promise<void> {
    if (this.browser) {
      try {
        await this.browser.close();
      } catch (e) {
        // ignore close errors
      }
      this.browser = null;
      this.page = null;
    }
  }

  private async downloadImage(url: string, title: string): Promise<string | null> {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const buffer = await response.arrayBuffer();
      const hash = crypto.createHash('md5').update(Buffer.from(buffer)).digest('hex');
      const ext = url.split('.').pop()?.split('?')[0] || 'jpg';
      const filename = `${hash}.${ext}`;
      const filepath = path.join(this.imageFolder, filename);
      
      await fs.writeFile(filepath, Buffer.from(buffer));
      return `/career-images/${filename}`;
    } catch (error) {
      console.error(`Error downloading image for ${title}:`, error);
      return null;
    }
  }

  async scrapeCareerDetails(url: string): Promise<Career | null> {
    if (!this.page) throw new Error('Browser page not initialized');

    try {
      await this.page.goto(url, { waitUntil: 'networkidle0' });

      const career = await this.page.evaluate(() => {
        const title = document.querySelector('h1')?.textContent?.trim() || '';
        const description = document.querySelector('.report-detail')?.textContent?.trim() || '';
        
        const skills = Array.from(document.querySelectorAll('.report-text ul li'))
          .map(skill => skill.textContent?.trim() || '')
          .filter(Boolean);

        const education = document.querySelector('.education-requirements')?.textContent?.trim() || '';
        const salary = document.querySelector('.salary-info')?.textContent?.trim() || '';
        const imageUrl = document.querySelector('.career-image img')?.getAttribute('src') || '';

        return {
          title,
          description,
          skills,
          education,
          salary,
          imageUrl
        };
      });

      let imagePath = null;
      if (career.imageUrl) {
        imagePath = await this.downloadImage(career.imageUrl, career.title);
      }

      return {
        ...career,
        brief: career.description.slice(0, 150) + '...',
        url,
        imagePath: imagePath || undefined
      };
    } catch (error) {
      console.error('Error scraping career details:', error);
      return null;
    }
  }

  async scrapeCareersList(): Promise<Career[]> {
    if (!this.page) throw new Error('Browser page not initialized');

    try {
      await this.page.goto(`${this.baseUrl}/find/career`, { waitUntil: 'networkidle0' });

      const careers = await this.page.evaluate(() => {
        return Array.from(document.querySelectorAll('.career-list-item')).map(item => ({
          title: item.querySelector('.title')?.textContent?.trim() || '',
          url: item.querySelector('a')?.getAttribute('href') || '',
          brief: item.querySelector('.brief')?.textContent?.trim() || ''
        }));
      });

      const detailedCareers: Career[] = [];
      for (const career of careers) {
        const details = await this.scrapeCareerDetails(career.url);
        if (details) {
          detailedCareers.push({
            ...career,
            ...details
          });
        }
      }

      return detailedCareers;
    } catch (error) {
      console.error('Error scraping careers list:', error);
      return [];
    }
  }
}

export default CareerScraper;