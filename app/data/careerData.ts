"use client"

// Career path data for the Sri Lankan A/L students
// This data represents common career paths available based on different A/L streams

import { InsertCareerPath } from "@/types/career.types";

// Career paths with their details, matching criteria, and metadata
export const careerPathsData: InsertCareerPath[] = [
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
    name: "Chartered Accountant",
    description: "Prepare and examine financial records to ensure accuracy and compliance with regulations for organizations.",
    keySubjects: "Business Studies, Accounting, Economics",
    salarySriLanka: "Rs. 60,000 - 100,000",
    tags: ["Business", "High Demand", "Professional"],
    matchCriteria: {
      streams: ["commerce"],
      subjects: {
        "accounting": 20,
        "business studies": 15,
        "economics": 10
      },
      interests: ["business", "economics", "finance"]
    },
    iconName: "account_balance"
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
    name: "Lawyer / Legal Professional",
    description: "Provide legal advice and representation to individuals, businesses, and government organizations.",
    keySubjects: "Political Science, Logic, Languages",
    salarySriLanka: "Rs. 50,000 - 120,000",
    tags: ["Professional", "Traditional", "High Demand"],
    matchCriteria: {
      streams: ["arts"],
      subjects: {
        "political science": 15,
        "logic": 15,
        "languages": 10
      },
      interests: ["law", "social_services", "politics"]
    },
    iconName: "gavel"
  },
  {
    name: "Clinical Psychologist",
    description: "Assess, diagnose and treat mental, emotional and behavioral disorders using therapeutic approaches.",
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
  },
  {
    name: "Teacher / Educator",
    description: "Educate students of various ages and provide guidance for their academic and personal development.",
    keySubjects: "Any Subject Specialization",
    salarySriLanka: "Rs. 35,000 - 70,000",
    tags: ["Traditional", "Stable", "Public Service"],
    matchCriteria: {
      streams: ["science", "commerce", "arts", "technology"],
      subjects: {},
      interests: ["education", "social_services"]
    },
    iconName: "school"
  },
  {
    name: "Electrical Engineer",
    description: "Design, develop, test, and supervise the manufacturing of electrical equipment and systems.",
    keySubjects: "Combined Maths, Physics, Chemistry",
    salarySriLanka: "Rs. 55,000 - 90,000",
    tags: ["Technical", "Engineering", "Industrial"],
    matchCriteria: {
      streams: ["science", "technology"],
      subjects: {
        "combined mathematics": 20,
        "physics": 20,
        "chemistry": 5
      },
      interests: ["engineering", "technology", "science"]
    },
    iconName: "electrical_services"
  },
  {
    name: "Graphic Designer",
    description: "Create visual concepts, using computer software or by hand, to communicate ideas that inspire, inform, and captivate consumers.",
    keySubjects: "Art, Media Studies, ICT",
    salarySriLanka: "Rs. 40,000 - 80,000",
    tags: ["Creative", "Growth Field", "Freelance"],
    matchCriteria: {
      streams: ["arts", "technology"],
      subjects: {
        "art": 15,
        "media studies": 10,
        "information technology": 10
      },
      interests: ["creative", "technology", "media"]
    },
    iconName: "palette"
  },
  {
    name: "Environmental Scientist",
    description: "Study environmental problems and develop solutions to protect human health and nature.",
    keySubjects: "Biology, Chemistry, Geography",
    salarySriLanka: "Rs. 45,000 - 75,000",
    tags: ["Science", "Environmental", "Growing Field"],
    matchCriteria: {
      streams: ["science"],
      subjects: {
        "biology": 15,
        "chemistry": 15,
        "geography": 10
      },
      interests: ["environment", "science", "social_services"]
    },
    iconName: "eco"
  },
  {
    name: "Pharmacist",
    description: "Prepare and dispense medications, advise patients on drug use, and monitor drug therapies.",
    keySubjects: "Chemistry, Biology, Physics",
    salarySriLanka: "Rs. 50,000 - 80,000",
    tags: ["Healthcare", "Science", "Patient Care"],
    matchCriteria: {
      streams: ["science"],
      subjects: {
        "chemistry": 20,
        "biology": 15,
        "physics": 5
      },
      interests: ["healthcare", "science", "medicine"]
    },
    iconName: "medication"
  },
  {
    name: "Tourism & Hospitality Manager",
    description: "Manage operations in hotels, resorts, and other tourism establishments to ensure high-quality customer service.",
    keySubjects: "Business Studies, Languages, Geography",
    salarySriLanka: "Rs. 40,000 - 80,000",
    tags: ["Service Industry", "International", "People-Oriented"],
    matchCriteria: {
      streams: ["commerce", "arts"],
      subjects: {
        "business studies": 15,
        "languages": 10,
        "geography": 5
      },
      interests: ["travel", "business", "social_services"]
    },
    iconName: "hotel"
  }
];

// Career tags with their categorization
export const careerTags = {
  fields: ["Technical", "Healthcare", "Business", "Creative", "Science", "Environmental", "Education", "Legal"],
  demand: ["High Demand", "Growth Field", "Emerging", "Traditional", "Stable"],
  nature: ["Professional", "Service Industry", "People-Oriented", "Research-Oriented", "Industrial", "Freelance"]
};

// Get career paths by stream
export const getCareersByStream = (stream: string) => {
  return careerPathsData.filter(career => 
    career.matchCriteria?.streams.includes(stream)
  );
};

// Get career paths by interest
export const getCareersByInterest = (interest: string) => {
  return careerPathsData.filter(career => 
    career.matchCriteria?.interests.includes(interest)
  );
};

// Get career paths by tag
export const getCareersByTag = (tag: string) => {
  return careerPathsData.filter(career => 
    career.tags.includes(tag)
  );
};
