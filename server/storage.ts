import { 
  users, 
  careerPaths, 
  educationalResources, 
  type User, 
  type InsertUser,
  type CareerPath,
  type InsertCareerPath,
  type EducationalResource,
  type InsertEducationalResource,
  type CareerInput,
  type CareerRecommendation
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Career paths
  getCareerPaths(): Promise<CareerPath[]>;
  getCareerPathById(id: number): Promise<CareerPath | undefined>;
  createCareerPath(careerPath: InsertCareerPath): Promise<CareerPath>;
  
  // Educational resources
  getEducationalResources(type?: string): Promise<EducationalResource[]>;
  getEducationalResourceById(id: number): Promise<EducationalResource | undefined>;
  createEducationalResource(resource: InsertEducationalResource): Promise<EducationalResource>;
  
  // Career recommendations
  getCareerRecommendations(input: CareerInput): Promise<CareerRecommendation[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private careerPaths: Map<number, CareerPath>;
  private educationalResources: Map<number, EducationalResource>;
  currentId: number;
  currentCareerPathId: number;
  currentResourceId: number;

  constructor() {
    this.users = new Map();
    this.careerPaths = new Map();
    this.educationalResources = new Map();
    this.currentId = 1;
    this.currentCareerPathId = 1;
    this.currentResourceId = 1;
    
    // Initialize with default career paths
    this.initializeCareerPaths();
    this.initializeEducationalResources();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = {
      ...insertUser,
      id,
      fullName: insertUser.fullName ?? null,
      email: insertUser.email ?? null,
      district: insertUser.district ?? null,
      gender: insertUser.gender ?? null,
    };
    this.users.set(id, user);
    return user;
  }
  
  // Career path methods
  async getCareerPaths(): Promise<CareerPath[]> {
    return Array.from(this.careerPaths.values());
  }
  
  async getCareerPathById(id: number): Promise<CareerPath | undefined> {
    return this.careerPaths.get(id);
  }
  
  async createCareerPath(insertCareerPath: InsertCareerPath): Promise<CareerPath> {
    const id = this.currentCareerPathId++;
    const careerPath: CareerPath = { ...insertCareerPath, id };
    this.careerPaths.set(id, careerPath);
    return careerPath;
  }
  
  // Educational resource methods
  async getEducationalResources(type?: string): Promise<EducationalResource[]> {
    const resources = Array.from(this.educationalResources.values());
    if (type) {
      return resources.filter(resource => resource.type === type);
    }
    return resources;
  }
  
  async getEducationalResourceById(id: number): Promise<EducationalResource | undefined> {
    return this.educationalResources.get(id);
  }
  
  async createEducationalResource(insertResource: InsertEducationalResource): Promise<EducationalResource> {
    const id = this.currentResourceId++;
    const resource: EducationalResource = {
      ...insertResource,
      id,
      tags: insertResource.tags ?? null,
      rating: insertResource.rating ?? null,
      websiteUrl: insertResource.websiteUrl ?? null,
      imageUrl: insertResource.imageUrl ?? null,
    };
    this.educationalResources.set(id, resource);
    return resource;
  }
  
  // Get career recommendations based on input
  async getCareerRecommendations(input: CareerInput): Promise<CareerRecommendation[]> {
    const allCareers = await this.getCareerPaths();
    
    // Simple ML algorithm to match careers based on stream, subjects, and interests
    const recommendations: CareerRecommendation[] = allCareers.map(career => {
      const matchCriteria = career.matchCriteria as any;
      
      // Calculate match percentage based on various factors
      let matchScore = 0;
      let maxScore = 0;
      
      // Match stream
      if (matchCriteria.streams && matchCriteria.streams.includes(input.stream)) {
        matchScore += 30;
      }
      maxScore += 30;
      
      // Match subjects
      const subjectScore = this.calculateSubjectMatch(input.subjects, matchCriteria.subjects || {});
      matchScore += subjectScore.score;
      maxScore += subjectScore.maxScore;
      
      // Match interests
      const interestMatchCount = input.interests.filter(interest => 
        matchCriteria.interests && matchCriteria.interests.includes(interest)
      ).length;
      
      const interestMatchScore = Math.min(interestMatchCount * 10, 30);
      matchScore += interestMatchScore;
      maxScore += 30;
      
      // Calculate final percentage
      const matchPercentage = Math.round((matchScore / maxScore) * 100);
      
      return {
        ...career,
        matchPercentage
      };
    });
    
    // Sort by match percentage
    return recommendations.sort((a, b) => b.matchPercentage - a.matchPercentage);
  }
  
  // Helper to calculate subject match score
  private calculateSubjectMatch(
    subjects: Array<{ name: string; grade: string }>,
    requiredSubjects: Record<string, number>
  ) {
    let score = 0;
    let maxScore = 0;
    
    // Convert grades to numeric values
    const gradeValues: Record<string, number> = {
      'A': 4,
      'B': 3,
      'C': 2,
      'S': 1,
      'F': 0
    };
    
    // Calculate score for each required subject
    for (const [subjectName, weight] of Object.entries(requiredSubjects)) {
      maxScore += weight;
      
      // Find if student has this subject
      const studentSubject = subjects.find(s => s.name.toLowerCase() === subjectName.toLowerCase());
      
      if (studentSubject) {
        const gradeValue = gradeValues[studentSubject.grade] || 0;
        score += (gradeValue / 4) * weight; // Scale grade value to weight
      }
    }
    
    return { score, maxScore: maxScore || 1 }; // Avoid division by zero
  }
  
  // Initialize default career paths
  private initializeCareerPaths() {
    const defaultCareers: InsertCareerPath[] = [
      {
        name: "Software Engineering",
        description: "Develop software applications, websites, and systems using programming languages and computer science principles.",
        keySubjects: "Combined Maths, Physics, Computer Science",
        salarySriLanka: "Rs. 60,000 - 100,000",
        tags: ["Technical", "High Demand", "Growth Field"],
        matchCriteria: {
          streams: ["science", "technology"],
          subjects: {
            "combined mathematics": 20,
            "physics": 15,
            "information technology": 15
          },
          interests: ["technology", "engineering", "science"]
        },
        iconName: "computer"
      },
      {
        name: "Data Science",
        description: "Analyze complex data sets to find patterns and insights using statistics, programming, and machine learning.",
        keySubjects: "Combined Maths, Statistics, Computer Science",
        salarySriLanka: "Rs. 75,000 - 120,000",
        tags: ["Technical", "High Demand", "Growth Field"],
        matchCriteria: {
          streams: ["science", "technology"],
          subjects: {
            "combined mathematics": 20,
            "statistics": 15,
            "information technology": 10
          },
          interests: ["technology", "science", "business"]
        },
        iconName: "analytics"
      },
      {
        name: "Biomedical Engineering",
        description: "Combine engineering and medicine to design medical equipment, devices, and software to improve healthcare.",
        keySubjects: "Biology, Physics, Chemistry",
        salarySriLanka: "Rs. 65,000 - 90,000",
        tags: ["Technical", "Specialized", "Growth Field"],
        matchCriteria: {
          streams: ["science"],
          subjects: {
            "biology": 20,
            "physics": 15,
            "chemistry": 15
          },
          interests: ["healthcare", "engineering", "science"]
        },
        iconName: "biotech"
      },
      {
        name: "Financial Analyst",
        description: "Analyze financial data, prepare reports, and recommend investment strategies for businesses and individuals.",
        keySubjects: "Business Studies, Economics, Accounting",
        salarySriLanka: "Rs. 55,000 - 85,000",
        tags: ["High Demand", "Business", "International"],
        matchCriteria: {
          streams: ["commerce"],
          subjects: {
            "business studies": 20,
            "economics": 15,
            "accounting": 15
          },
          interests: ["business", "finance", "economics"]
        },
        iconName: "trending_up"
      },
      {
        name: "Civil Engineering",
        description: "Design, construct, and maintain the physical and naturally built environment, including roads, bridges, and buildings.",
        keySubjects: "Combined Maths, Physics, Chemistry",
        salarySriLanka: "Rs. 60,000 - 95,000",
        tags: ["Technical", "High Demand", "Traditional"],
        matchCriteria: {
          streams: ["science", "technology"],
          subjects: {
            "combined mathematics": 20,
            "physics": 15,
            "chemistry": 10
          },
          interests: ["engineering", "environment", "science"]
        },
        iconName: "construction"
      },
      {
        name: "Medical Doctor",
        description: "Diagnose and treat illnesses, injuries, and provide preventive healthcare services to patients.",
        keySubjects: "Biology, Chemistry, Physics",
        salarySriLanka: "Rs. 70,000 - 150,000",
        tags: ["Healthcare", "High Demand", "Prestigious"],
        matchCriteria: {
          streams: ["science"],
          subjects: {
            "biology": 20,
            "chemistry": 15,
            "physics": 10
          },
          interests: ["healthcare", "science", "medicine"]
        },
        iconName: "medical_services"
      },
      {
        name: "Digital Marketing Specialist",
        description: "Plan and execute marketing campaigns across digital platforms to promote products, services, and brands.",
        keySubjects: "Business Studies, English, ICT",
        salarySriLanka: "Rs. 50,000 - 85,000",
        tags: ["Creative", "Growth Field", "Business"],
        matchCriteria: {
          streams: ["commerce", "arts"],
          subjects: {
            "business studies": 15,
            "english": 10,
            "information technology": 10
          },
          interests: ["business", "creative", "technology"]
        },
        iconName: "campaign"
      },
      {
        name: "Psychology",
        description: "Study human behavior and mental processes to help individuals overcome mental health issues and improve wellbeing.",
        keySubjects: "Psychology, Sociology, Biology",
        salarySriLanka: "Rs. 45,000 - 75,000",
        tags: ["Healthcare", "Social Science", "Emerging"],
        matchCriteria: {
          streams: ["arts", "science"],
          subjects: {
            "psychology": 20,
            "sociology": 10,
            "biology": 10
          },
          interests: ["healthcare", "education", "social_services"]
        },
        iconName: "psychology"
      }
    ];
    
    defaultCareers.forEach(career => {
      this.createCareerPath(career);
    });
  }
  
  // Initialize default educational resources
  private initializeEducationalResources() {
    const defaultResources: InsertEducationalResource[] = [
      {
        name: "University of Moratuwa",
        type: "university",
        description: "Leading technological university in Sri Lanka offering engineering, IT, architecture, and business degrees.",
        rating: "4.5/5",
        tags: ["Engineering", "IT", "Architecture"],
        websiteUrl: "https://www.mrt.ac.lk/"
      },
      {
        name: "University of Colombo",
        type: "university",
        description: "Sri Lanka's oldest university with programs in science, medicine, arts, management, and law.",
        rating: "4.0/5",
        tags: ["Science", "Medicine", "Law"],
        websiteUrl: "https://cmb.ac.lk/"
      },
      {
        name: "University of Peradeniya",
        type: "university",
        description: "Comprehensive university offering programs in engineering, medicine, agriculture, arts, and sciences.",
        rating: "4.2/5",
        tags: ["Medicine", "Engineering", "Agriculture"],
        websiteUrl: "https://www.pdn.ac.lk/"
      },
      {
        name: "Mahapola Higher Education Scholarship",
        type: "scholarship",
        description: "Government scholarship for university students based on A/L results and family income.",
        rating: "4.0/5",
        tags: ["Government", "Need-based", "Merit"],
        websiteUrl: "https://www.mohe.gov.lk/"
      },
      {
        name: "Presidential Scholarship",
        type: "scholarship",
        description: "Merit-based scholarship for top performers in A/L examinations to study abroad.",
        rating: "4.8/5",
        tags: ["Merit", "International", "Competitive"],
        websiteUrl: "https://www.mohe.gov.lk/"
      },
      {
        name: "NAITA - National Apprentice and Industrial Training Authority",
        type: "vocational",
        description: "Provides vocational training in various technical fields with industry placements.",
        rating: "3.8/5",
        tags: ["Technical", "Apprenticeship", "Industry-focused"],
        websiteUrl: "https://www.naita.gov.lk/"
      },
      {
        name: "VTA - Vocational Training Authority",
        type: "vocational",
        description: "Government body offering short and long-term vocational training courses.",
        rating: "3.5/5",
        tags: ["Government", "Skills-focused", "Certificate"],
        websiteUrl: "https://www.vtasl.gov.lk/"
      },
      {
        name: "Coursera",
        type: "online",
        description: "Online platform offering courses from universities and companies worldwide.",
        rating: "4.5/5",
        tags: ["International", "University-partnered", "Certificate"],
        websiteUrl: "https://www.coursera.org/"
      },
      {
        name: "edX",
        type: "online",
        description: "Online learning platform with courses from top global institutions.",
        rating: "4.4/5",
        tags: ["International", "University-partnered", "Certificate"],
        websiteUrl: "https://www.edx.org/"
      }
    ];
    
    defaultResources.forEach(resource => {
      this.createEducationalResource(resource);
    });
  }
}

export const storage = new MemStorage();
