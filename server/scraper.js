import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

class CareerScraper {
  constructor() {
    this.browser = null;
    this.page = null;
    this.baseUrl = 'https://www.onetonline.org'; // O*NET is a reliable source for career data
    this.imageFolder = path.join(__dirname, '../client/public/career-images');
  }

  async initialize() {
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1920, height: 1080 });
    
    // Create image directory if it doesn't exist
    try {
      await fs.access(this.imageFolder);
    } catch {
      await fs.mkdir(this.imageFolder, { recursive: true });
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async downloadImage(url, title) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const buffer = await response.arrayBuffer();
      const hash = crypto.createHash('md5').update(buffer).digest('hex');
      const ext = url.split('.').pop().split('?')[0] || 'jpg';
      const filename = `${hash}.${ext}`;
      const filepath = path.join(this.imageFolder, filename);
      
      await fs.writeFile(filepath, Buffer.from(buffer));
      return `/career-images/${filename}`;
    } catch (error) {
      console.error(`Error downloading image for ${title}:`, error);
      return null;
    }
  }

  async scrapeCareerDetails(url) {
    try {
      await this.page.goto(url, { waitUntil: 'networkidle0' });

      const career = await this.page.evaluate(() => {
        const title = document.querySelector('h1')?.textContent?.trim() || '';
        const description = document.querySelector('.report-detail')?.textContent?.trim() || '';
        
        // Get skills
        const skills = Array.from(document.querySelectorAll('.report-text ul li'))
          .map(skill => skill.textContent.trim())
          .filter(Boolean);

        // Get education requirements
        const education = document.querySelector('.education-requirements')?.textContent?.trim() || '';

        // Get salary information
        const salary = document.querySelector('.salary-info')?.textContent?.trim() || '';

        // Get related image URL
        const imageUrl = document.querySelector('.career-image img')?.src || '';

        return {
          title,
          description,
          skills,
          education,
          salary,
          imageUrl
        };
      });

      if (career.imageUrl) {
        career.imagePath = await this.downloadImage(career.imageUrl, career.title);
      }

      return career;
    } catch (error) {
      console.error('Error scraping career details:', error);
      return null;
    }
  }

  async scrapeCareersList() {
    try {
      await this.page.goto(`${this.baseUrl}/find/career`, { waitUntil: 'networkidle0' });

      const careers = await this.page.evaluate(() => {
        return Array.from(document.querySelectorAll('.career-list-item')).map(item => ({
          title: item.querySelector('.title')?.textContent?.trim() || '',
          url: item.querySelector('a')?.href || '',
          brief: item.querySelector('.brief')?.textContent?.trim() || ''
        }));
      });

      const detailedCareers = [];
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default CareerScraper;