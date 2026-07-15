export interface Career {
  id?: string;
  title: string;
  description: string;
  brief: string;
  url: string;
  skills: string[];
  education: string;
  salary: string;
  imageUrl?: string;
  imagePath?: string;
}

export interface CareersResponse {
  careers: Career[];
  total: number;
  hasMore: boolean;
}

export interface CareerScraper {
  initialize(): Promise<void>;
  close(): Promise<void>;
  downloadImage(url: string, title: string): Promise<string | null>;
  scrapeCareerDetails(url: string): Promise<Career | null>;
  scrapeCareersList(): Promise<Career[]>;
}
