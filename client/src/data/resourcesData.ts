// Educational resources data for Sri Lankan A/L students
// This includes universities, scholarships, vocational training, and online courses

import { InsertEducationalResource } from "@shared/schema";

// Educational resources with their details
export const educationalResourcesData: InsertEducationalResource[] = [
  // Universities
  {
    name: "University of Moratuwa",
    type: "universities",
    description: "Leading technological university in Sri Lanka offering engineering, IT, architecture, and business degrees.",
    rating: "4.5/5",
    tags: ["Engineering", "IT", "Architecture"],
    websiteUrl: "https://www.mrt.ac.lk/"
  },
  {
    name: "University of Colombo",
    type: "universities",
    description: "Sri Lanka's oldest university with programs in science, medicine, arts, management, and law.",
    rating: "4.0/5",
    tags: ["Science", "Medicine", "Law"],
    websiteUrl: "https://cmb.ac.lk/"
  },
  {
    name: "University of Peradeniya",
    type: "universities",
    description: "Comprehensive university offering programs in engineering, medicine, agriculture, arts, and sciences.",
    rating: "4.2/5",
    tags: ["Medicine", "Engineering", "Agriculture"],
    websiteUrl: "https://www.pdn.ac.lk/"
  },
  {
    name: "University of Kelaniya",
    type: "universities",
    description: "Known for humanities, social sciences, commerce, and computing programs with industry connections.",
    rating: "3.9/5",
    tags: ["Humanities", "Commerce", "Computing"],
    websiteUrl: "https://www.kln.ac.lk/"
  },
  {
    name: "University of Sri Jayewardenepura",
    type: "universities",
    description: "Offers degrees in management, science, applied sciences, and medical sciences.",
    rating: "3.8/5",
    tags: ["Management", "Science", "Medicine"],
    websiteUrl: "https://www.sjp.ac.lk/"
  },
  {
    name: "SLIIT - Sri Lanka Institute of Information Technology",
    type: "universities",
    description: "Private higher education institution focusing on IT, engineering, business, and humanities.",
    rating: "4.1/5",
    tags: ["IT", "Engineering", "Business"],
    websiteUrl: "https://www.sliit.lk/"
  },

  // Scholarships
  {
    name: "Mahapola Higher Education Scholarship",
    type: "scholarships",
    description: "Government scholarship for university students based on A/L results and family income.",
    rating: "4.0/5",
    tags: ["Government", "Need-based", "Merit"],
    websiteUrl: "https://www.mohe.gov.lk/"
  },
  {
    name: "Presidential Scholarship",
    type: "scholarships",
    description: "Merit-based scholarship for top performers in A/L examinations to study abroad.",
    rating: "4.8/5",
    tags: ["Merit", "International", "Competitive"],
    websiteUrl: "https://www.mohe.gov.lk/"
  },
  {
    name: "University Bursary",
    type: "scholarships",
    description: "Financial assistance for university students from low-income families.",
    rating: "3.7/5",
    tags: ["Need-based", "University", "Monthly Allowance"],
    websiteUrl: "https://www.ugc.ac.lk/"
  },
  {
    name: "Fulbright Student Program",
    type: "scholarships",
    description: "Scholarship for Sri Lankan graduates to pursue master's or PhD studies in the United States.",
    rating: "4.7/5",
    tags: ["International", "Postgraduate", "Competitive"],
    websiteUrl: "https://lk.usembassy.gov/education-culture/fulbright-program/"
  },
  {
    name: "Commonwealth Scholarship",
    type: "scholarships",
    description: "Scholarships for Sri Lankan students to study in the UK and other Commonwealth countries.",
    rating: "4.5/5",
    tags: ["International", "Postgraduate", "Commonwealth"],
    websiteUrl: "https://cscuk.fcdo.gov.uk/scholarships/"
  },
  {
    name: "Bank of Ceylon Higher Education Scholarships",
    type: "scholarships",
    description: "Scholarships for university students with outstanding academic performance.",
    rating: "3.9/5",
    tags: ["Private Sector", "Merit", "Local"],
    websiteUrl: "https://www.boc.lk/"
  },

  // Vocational Training
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
    name: "DTET - Department of Technical Education and Training",
    type: "vocational",
    description: "Offers technical diploma programs in engineering and other technical fields.",
    rating: "3.7/5",
    tags: ["Technical", "Diploma", "Engineering"],
    websiteUrl: "https://www.dtet.gov.lk/"
  },
  {
    name: "NIBM - National Institute of Business Management",
    type: "vocational",
    description: "Offers IT, business, and design courses with industry-recognized certifications.",
    rating: "4.0/5",
    tags: ["IT", "Business", "Design"],
    websiteUrl: "https://www.nibm.lk/"
  },
  {
    name: "Ceylon-German Technical Training Institute",
    type: "vocational",
    description: "Provides German-standard technical training in automotive, electrical, and manufacturing fields.",
    rating: "4.2/5",
    tags: ["Technical", "German-standard", "Manufacturing"],
    websiteUrl: "https://cgtti.lk/"
  },
  {
    name: "SLITA - Sri Lanka Institute of Tourism & Hotel Management",
    type: "vocational",
    description: "Training in hospitality, culinary arts, and tourism with international recognition.",
    rating: "4.1/5",
    tags: ["Hospitality", "Tourism", "Culinary"],
    websiteUrl: "https://slithm.edu.lk/"
  },

  // Online Courses
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
  },
  {
    name: "FutureLearn",
    type: "online",
    description: "UK-based platform offering online courses from universities and cultural institutions.",
    rating: "4.2/5",
    tags: ["International", "University-partnered", "Short Courses"],
    websiteUrl: "https://www.futurelearn.com/"
  },
  {
    name: "Udemy",
    type: "online",
    description: "Marketplace for online learning with a wide range of courses taught by experts.",
    rating: "4.0/5",
    tags: ["Skill-based", "Wide Range", "Affordable"],
    websiteUrl: "https://www.udemy.com/"
  },
  {
    name: "LinkedIn Learning",
    type: "online",
    description: "Professional skills development platform with courses for business, creative, and technology fields.",
    rating: "4.3/5",
    tags: ["Professional", "Business", "Technology"],
    websiteUrl: "https://www.linkedin.com/learning/"
  },
  {
    name: "Open University of Sri Lanka",
    type: "online",
    description: "Distance learning programs from certificate to postgraduate level in various disciplines.",
    rating: "3.8/5",
    tags: ["Local", "Distance Learning", "Accredited"],
    websiteUrl: "https://www.ou.ac.lk/"
  }
];

// Get resources by type
export const getResourcesByType = (type: string) => {
  return educationalResourcesData.filter(resource => 
    resource.type === type
  );
};

// Get resources by tag
export const getResourcesByTag = (tag: string) => {
  return educationalResourcesData.filter(resource => 
    resource.tags && resource.tags.includes(tag)
  );
};

// Get resources for a specific career path
export const getResourcesForCareer = (careerName: string) => {
  // Map careers to relevant resource tags
  const careerResourceMap: Record<string, string[]> = {
    "Software Engineering": ["IT", "Engineering", "Technology"],
    "Data Science": ["IT", "Computing", "Technology"],
    "Medical Doctor": ["Medicine", "Healthcare", "Science"],
    "Civil Engineering": ["Engineering", "Architecture", "Construction"],
    "Biomedical Engineering": ["Engineering", "Medicine", "Science"],
    "Financial Analyst": ["Business", "Management", "Finance"],
    "Chartered Accountant": ["Business", "Management", "Accounting"],
    "Digital Marketing Specialist": ["Business", "Media", "Digital"],
    "Lawyer / Legal Professional": ["Law", "Humanities", "Social Sciences"],
    "Clinical Psychologist": ["Psychology", "Healthcare", "Social Sciences"],
    "Teacher / Educator": ["Education", "Teaching", "Training"],
    "Electrical Engineer": ["Engineering", "Electrical", "Technical"],
    "Graphic Designer": ["Design", "Creative", "Media"],
    "Environmental Scientist": ["Science", "Environmental", "Research"],
    "Pharmacist": ["Pharmacy", "Healthcare", "Medicine"],
    "Tourism & Hospitality Manager": ["Hospitality", "Tourism", "Management"]
  };
  
  const relevantTags = careerResourceMap[careerName] || [];
  
  return educationalResourcesData.filter(resource => 
    resource.tags && resource.tags.some(tag => 
      relevantTags.includes(tag)
    )
  );
};

// Resource type labels for the UI
export const resourceTypeLabels = {
  universities: "Universities",
  scholarships: "Scholarships",
  vocational: "Vocational Training",
  online: "Online Courses"
};
