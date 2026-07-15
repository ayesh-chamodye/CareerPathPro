// Define types for match criteria
interface MatchCriteria {
  streams: string[];
  subjects: { [key: string]: number };
  interests: string[];
}

export interface InsertCareerPath {
  name: string;
  description: string;
  keySubjects: string;
  salarySriLanka: string;
  tags: string[];
  matchCriteria: MatchCriteria;
  iconName: string;
}

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
