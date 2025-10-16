// Curated educational resources for Sri Lanka
// This data is more reliable than web scraping and provides consistent, accurate information

export interface EducationalResource {
  title: string;
  url: string;
  snippet: string;
  description: string;
  details: {
    duration?: string;
    fee?: string;
    location?: string;
    requirements?: string;
  };
}

export const universities: EducationalResource[] = [
  {
    title: "University of Colombo",
    url: "https://cmb.ac.lk/",
    snippet: "The University of Colombo is a public research university located primarily in Colombo, Sri Lanka. It is the oldest institution of modern higher education in Sri Lanka.",
    description: "Offers undergraduate and postgraduate programs in Arts, Science, Management, Medicine, Law, and Education. Known for excellence in research and academic programs.",
    details: {
      location: "Colombo, Sri Lanka",
      requirements: "GCE A/L or equivalent qualifications"
    }
  },
  {
    title: "University of Peradeniya",
    url: "https://www.pdn.ac.lk/",
    snippet: "University of Peradeniya is a state university in Sri Lanka, funded by the University Grants Commission. It is the largest university in Sri Lanka.",
    description: "Offers programs in Engineering, Medicine, Agriculture, Science, Arts, Dental Sciences, Veterinary Medicine, and Allied Health Sciences.",
    details: {
      location: "Peradeniya, Kandy",
      requirements: "GCE A/L with required subjects and minimum Z-score"
    }
  },
  {
    title: "University of Moratuwa",
    url: "https://uom.lk/",
    snippet: "University of Moratuwa is a leading technological university in Sri Lanka, specializing in Engineering, Architecture, and IT.",
    description: "Premier engineering university offering undergraduate and postgraduate programs in various engineering disciplines, architecture, and information technology.",
    details: {
      location: "Moratuwa, Sri Lanka",
      requirements: "GCE A/L in physical science stream with high Z-scores"
    }
  },
  {
    title: "University of Sri Jayewardenepura",
    url: "https://www.sjp.ac.lk/",
    snippet: "The University of Sri Jayewardenepura is a public university in Sri Lanka, located in Gangodawila, Nugegoda.",
    description: "Offers comprehensive programs in Applied Sciences, Management Studies, Humanities, Medical Sciences, and Graduate Studies.",
    details: {
      location: "Nugegoda, Sri Lanka",
      requirements: "GCE A/L qualifications"
    }
  },
  {
    title: "University of Kelaniya",
    url: "https://www.kln.ac.lk/",
    snippet: "University of Kelaniya is a public university in Sri Lanka, located in Kelaniya, near Colombo.",
    description: "Provides education in Commerce, Humanities, Science, Social Sciences, Computing, and Medicine.",
    details: {
      location: "Kelaniya, Sri Lanka",
      requirements: "GCE A/L with required subjects"
    }
  },
  {
    title: "University of Ruhuna",
    url: "https://www.ruh.ac.lk/",
    snippet: "The University of Ruhuna is a public university located in Matara, Southern Province, Sri Lanka.",
    description: "Offers programs in Humanities, Engineering, Medicine, Science, Agriculture, Fisheries, Management, and Technology.",
    details: {
      location: "Matara, Sri Lanka",
      requirements: "GCE A/L qualifications"
    }
  },
  {
    title: "SLIIT - Sri Lanka Institute of Information Technology",
    url: "https://www.sliit.lk/",
    snippet: "SLIIT is the largest and most awarded private higher education institute in Sri Lanka, specializing in IT, Business, and Engineering.",
    description: "Leading private university offering degrees in IT, Computing, Business, Engineering, Architecture, and Law with international collaborations.",
    details: {
      location: "Malabe, Colombo, Kandy, Matara, Kurunegala, Jaffna",
      fee: "Fees vary by program",
      requirements: "GCE A/L or equivalent, foundation programs available"
    }
  },
  {
    title: "NSBM Green University",
    url: "https://www.nsbm.ac.lk/",
    snippet: "NSBM Green University is Sri Lanka's premier degree-awarding institute, ranked 1st in South Asia by Google.",
    description: "Offers internationally recognized degree programs in Business, Computing, Engineering, and Science with Plymouth University UK collaboration.",
    details: {
      location: "Homagama, Sri Lanka",
      fee: "Competitive fee structure with scholarships available",
      requirements: "GCE A/L or equivalent qualifications"
    }
  },
  {
    title: "IIT - Informatics Institute of Technology",
    url: "https://www.iit.ac.lk/",
    snippet: "IIT is a leading private higher education institute offering UK degrees in Sri Lanka through partnerships with universities.",
    description: "Provides undergraduate and postgraduate programs in IT, Business, Engineering, Law, and Design in partnership with UK universities.",
    details: {
      location: "Colombo, Sri Lanka",
      fee: "Affordable UK degrees",
      requirements: "GCE A/L or equivalent"
    }
  },
  {
    title: "NIBM - National Institute of Business Management",
    url: "https://www.nibm.lk/",
    snippet: "NIBM is a premier business education institution in Sri Lanka, offering diverse programs in management and business studies.",
    description: "Offers Degrees, Diplomas, and Professional Qualifications in Business Management, Marketing, HRM, Accounting, and IT.",
    details: {
      location: "Colombo and regional centers",
      fee: "Affordable programs with installment plans",
      requirements: "GCE O/L or A/L depending on program"
    }
  }
];

export const scholarships: EducationalResource[] = [
  {
    title: "Mahapola Scholarship Scheme",
    url: "https://www.ugc.ac.lk/en/students/scholarships/mahapola-scholarship.html",
    snippet: "The Mahapola Scholarship is the largest scholarship program in Sri Lanka for university students.",
    description: "Monthly financial assistance for university undergraduates based on merit and need. Covers living expenses for students from low-income families.",
    details: {
      fee: "LKR 5,000-6,000 per month",
      requirements: "GCE A/L passed, family income below threshold, maintaining satisfactory academic performance"
    }
  },
  {
    title: "Bursary Scheme - University Grants Commission",
    url: "https://www.ugc.ac.lk/en/students/scholarships/bursary-scheme.html",
    snippet: "Government bursary for financially disadvantaged students in state universities.",
    description: "Financial assistance to help students from economically disadvantaged backgrounds cover university expenses.",
    details: {
      fee: "Annual grant based on need",
      requirements: "Enrolled in state university, family income criteria, documentation proof"
    }
  },
  {
    title: "Commonwealth Scholarships for Postgraduate Studies",
    url: "https://www.ugc.ac.lk/en/students/scholarships/commonwealth-scholarships.html",
    snippet: "Scholarships for Sri Lankan students to pursue Master's and PhD programs in Commonwealth countries.",
    description: "Fully-funded scholarships for postgraduate studies in UK, Canada, Australia, and other Commonwealth nations.",
    details: {
      duration: "1-3 years depending on program",
      fee: "Fully funded (tuition, living expenses, travel)",
      requirements: "Bachelor's degree with first or upper second class, relevant work experience"
    }
  },
  {
    title: "SLIIT Merit Scholarships",
    url: "https://www.sliit.lk/admissions/scholarships/",
    snippet: "Merit-based scholarships for high-performing students at SLIIT.",
    description: "Scholarships covering 25% to 100% of tuition fees based on A/L results and academic performance.",
    details: {
      fee: "25%, 50%, 75%, or 100% tuition waiver",
      requirements: "Outstanding GCE A/L results (3 A's or high Z-scores)"
    }
  },
  {
    title: "NSBM Scholarships",
    url: "https://www.nsbm.ac.lk/admissions/scholarships/",
    snippet: "Various scholarship schemes at NSBM Green University for deserving students.",
    description: "Merit-based, need-based, and special category scholarships including sports and arts scholarships.",
    details: {
      fee: "Up to 100% tuition waiver",
      requirements: "Varies by scholarship type - academic merit, financial need, sports/arts excellence"
    }
  },
  {
    title: "Japan-Sri Lanka Scholarship Program (MEXT)",
    url: "https://www.lk.emb-japan.go.jp/itprtop_en/index.html",
    snippet: "Japanese Government (MEXT) Scholarship for undergraduate and postgraduate studies in Japan.",
    description: "Fully-funded scholarship for Sri Lankan students to study at Japanese universities, including Japanese language training.",
    details: {
      duration: "4-7 years including language training",
      fee: "Full scholarship including monthly allowance of ~140,000 JPY",
      requirements: "Age limits apply, good academic record, pass entrance examinations"
    }
  },
  {
    title: "ADB-Japan Scholarship Program",
    url: "https://www.adb.org/work-with-us/careers/japan-scholarship-program",
    snippet: "Asian Development Bank scholarship for postgraduate studies in economics, management, and related fields.",
    description: "Scholarships for students from developing ADB member countries to pursue postgraduate studies at designated institutions.",
    details: {
      duration: "1-2 years",
      fee: "Fully funded",
      requirements: "Bachelor's degree, work experience, admission to designated institution"
    }
  },
  {
    title: "Chevening Scholarships (UK Government)",
    url: "https://www.chevening.org/",
    snippet: "UK government's global scholarship program for future leaders to study in the UK.",
    description: "One-year Master's degree scholarships at any UK university for outstanding emerging leaders.",
    details: {
      duration: "1 year (Master's)",
      fee: "Fully funded including living expenses",
      requirements: "Bachelor's degree, 2+ years work experience, leadership potential, UK university offer"
    }
  },
  {
    title: "Erasmus+ Scholarships",
    url: "https://erasmus-plus.ec.europa.eu/",
    snippet: "EU program offering scholarships for higher education in European universities.",
    description: "Scholarships for Bachelor's, Master's, and PhD programs in European universities with mobility support.",
    details: {
      duration: "Varies by program level",
      fee: "Tuition waiver plus monthly allowance",
      requirements: "Varies by university and program"
    }
  },
  {
    title: "Australia Awards Scholarships",
    url: "https://www.dfat.gov.au/people-to-people/australia-awards",
    snippet: "Australian Government scholarships for students from developing countries including Sri Lanka.",
    description: "Long-term awards for undergraduate and postgraduate study at participating Australian universities.",
    details: {
      duration: "2-4 years",
      fee: "Fully funded including return airfare and establishment allowance",
      requirements: "Strong academic record, work experience, commitment to return to Sri Lanka"
    }
  }
];

export const courses: EducationalResource[] = [
  {
    title: "Coursera - Free Online Courses",
    url: "https://www.coursera.org/",
    snippet: "World-class learning from leading universities and companies.",
    description: "Thousands of online courses in technology, business, data science, and more. Many courses offer financial aid and certificates.",
    details: {
      duration: "4-12 weeks per course",
      fee: "Free to audit, certificates from $49",
      requirements: "Internet connection, varies by course"
    }
  },
  {
    title: "edX - Online Learning Platform",
    url: "https://www.edx.org/",
    snippet: "High-quality courses from Harvard, MIT, and other top institutions.",
    description: "Professional certificates, MicroBachelors, and MicroMasters programs in various fields including computer science, business, engineering.",
    details: {
      duration: "Varies (4 weeks to 2 years)",
      fee: "Free to audit, verified certificates from $50-$300",
      requirements: "Varies by course and program"
    }
  },
  {
    title: "SLIATE - Sri Lanka Institute of Advanced Technological Education",
    url: "https://www.sliate.ac.lk/",
    snippet: "Leading government institution for technical and vocational education in Sri Lanka.",
    description: "Offers Higher National Diplomas (HND) and courses in Engineering, ICT, Accountancy, Business, and Agriculture Technology.",
    details: {
      duration: "2-3 years for HND programs",
      location: "Multiple centers across Sri Lanka",
      fee: "Government-subsidized fees",
      requirements: "GCE O/L or A/L depending on program"
    }
  },
  {
    title: "BCAS - BCS School of Business",
    url: "https://www.bcas.lk/",
    snippet: "Leading institution for business and IT education in Sri Lanka with UK degree programs.",
    description: "Offers UK degrees from Coventry University in Business, IT, Law, and Media in collaboration with international universities.",
    details: {
      duration: "3-4 years for degree programs",
      location: "Colombo, Kandy",
      fee: "Affordable UK degrees",
      requirements: "GCE A/L or equivalent"
    }
  },
  {
    title: "Udemy - Online Course Marketplace",
    url: "https://www.udemy.com/",
    snippet: "Learn anything from business to technology with 200,000+ courses.",
    description: "Affordable online courses in programming, business, design, marketing, and personal development.",
    details: {
      duration: "Self-paced",
      fee: "Courses from $10-$200, frequent sales",
      requirements: "Internet access"
    }
  },
  {
    title: "NAITA - National Apprentice and Industrial Training Authority",
    url: "https://www.naita.gov.lk/",
    snippet: "Premier institution for industrial training and skill development in Sri Lanka.",
    description: "Provides National Vocational Qualification (NVQ) programs and apprenticeship training in various trades.",
    details: {
      duration: "6 months to 3 years depending on program",
      location: "Multiple training centers nationwide",
      fee: "Government-subsidized",
      requirements: "GCE O/L"
    }
  },
  {
    title: "Google Digital Skills Training",
    url: "https://learndigital.withgoogle.com/digitalgarage",
    snippet: "Free online courses from Google to help you grow your digital skills.",
    description: "Free certification in digital marketing, data analytics, project management, and more from Google.",
    details: {
      duration: "Self-paced, 40-120 hours per certification",
      fee: "Completely free with certification",
      requirements: "Internet connection"
    }
  },
  {
    title: "LinkedIn Learning",
    url: "https://www.linkedin.com/learning/",
    snippet: "Online courses to help you learn business, software, technology and creative skills.",
    description: "Thousands of expert-led courses in business, technology, and creative skills with certificates to add to LinkedIn profile.",
    details: {
      duration: "Self-paced",
      fee: "Free 1-month trial, then $29.99/month",
      requirements: "LinkedIn account"
    }
  },
  {
    title: "ICBT Campus - International College of Business and Technology",
    url: "https://www.icbtcampus.edu.lk/",
    snippet: "Leading private higher education provider with international degree programs.",
    description: "UK and Australian degrees in IT, Business, Engineering, and Hospitality Management.",
    details: {
      duration: "3-4 years",
      location: "Colombo and regional campuses",
      fee: "Competitive fees with payment plans",
      requirements: "GCE A/L or equivalent"
    }
  },
  {
    title: "Khan Academy - Free Learning Platform",
    url: "https://www.khanacademy.org/",
    snippet: "Free online courses, lessons and practice in mathematics, science, and humanities.",
    description: "Completely free educational platform covering math, science, economics, history, and test prep.",
    details: {
      duration: "Self-paced",
      fee: "Completely free",
      requirements: "Internet access"
    }
  }
];

export const training: EducationalResource[] = [
  {
    title: "TVEC - Tertiary and Vocational Education Commission",
    url: "https://www.tvec.gov.lk/",
    snippet: "National regulatory body for Technical and Vocational Education and Training in Sri Lanka.",
    description: "Oversees National Vocational Qualification (NVQ) framework and accredits TVET providers across Sri Lanka.",
    details: {
      location: "Network of approved training centers nationwide",
      requirements: "Varies by NVQ level (1-7)"
    }
  },
  {
    title: "VTA - Vocational Training Authority",
    url: "https://www.vta.lk/",
    snippet: "Leading government organization providing vocational and technical training in Sri Lanka.",
    description: "Offers training in construction, automotive, electrical, hospitality, beauty culture, and ICT with NVQ certification.",
    details: {
      duration: "3 months to 2 years",
      location: "Multiple centers across all provinces",
      fee: "Government-subsidized, very affordable",
      requirements: "GCE O/L for most programs"
    }
  },
  {
    title: "AHEAD - Accelerating Higher Education and Development",
    url: "https://www.ahead.lk/",
    snippet: "World Bank-funded project to enhance higher education and skills development in Sri Lanka.",
    description: "Provides grants and support for skills development, innovation, and employability enhancement programs.",
    details: {
      fee: "Funded programs available",
      requirements: "Varies by specific program"
    }
  },
  {
    title: "CIMA Sri Lanka - Professional Accountancy Training",
    url: "https://www.cimasrilanka.com/",
    snippet: "Chartered Institute of Management Accountants offering professional accounting qualification.",
    description: "Globally recognized professional accountancy qualification with excellent career prospects in finance and business.",
    details: {
      duration: "3-4 years typically",
      fee: "Registration and exam fees apply",
      requirements: "GCE A/L, exemptions available for graduates"
    }
  },
  {
    title: "ACCA Sri Lanka - Accountancy Qualification",
    url: "https://www.accaglobal.com/lk/en.html",
    snippet: "Association of Chartered Certified Accountants - world's most forward-thinking professional accountancy body.",
    description: "Globally recognized professional qualification in accounting and finance with excellent job prospects.",
    details: {
      duration: "2-4 years",
      fee: "Registration and per-exam fees",
      requirements: "GCE A/L or equivalent, exemptions for degree holders"
    }
  },
  {
    title: "CIM Sri Lanka - Chartered Institute of Marketing",
    url: "https://www.cim.lk/",
    snippet: "Professional marketing qualification recognized worldwide.",
    description: "Professional marketing qualifications at Certificate, Diploma, and Postgraduate Diploma levels.",
    details: {
      duration: "1-3 years",
      fee: "Competitive fees with installments",
      requirements: "GCE O/L for foundation, A/L for diploma levels"
    }
  },
  {
    title: "NIBM Professional Qualifications",
    url: "https://www.nibm.lk/professional-qualifications/",
    snippet: "Professional qualifications in management, marketing, HRM, and accounting.",
    description: "Industry-recognized professional qualifications in partnership with international bodies.",
    details: {
      duration: "1-3 years",
      location: "Colombo and regional centers",
      fee: "Affordable with payment plans",
      requirements: "GCE O/L or A/L depending on level"
    }
  },
  {
    title: "IDM - Institute of Digital Marketing Sri Lanka",
    url: "https://instituteofdigitalmarketing.com/lk/",
    snippet: "Professional digital marketing training and certification.",
    description: "Internationally recognized digital marketing courses covering SEO, social media, content marketing, and analytics.",
    details: {
      duration: "3-12 months",
      fee: "Course fees vary",
      requirements: "Basic computer literacy"
    }
  },
  {
    title: "APIIT - Asia Pacific Institute of Information Technology",
    url: "https://www.apiit.lk/",
    snippet: "Premier IT education provider with British degree programs.",
    description: "UK degrees from Staffordshire University in Computing, Business, Law, and Engineering with industry placements.",
    details: {
      duration: "3-4 years for degrees",
      location: "Colombo",
      fee: "International standard programs",
      requirements: "GCE A/L or equivalent"
    }
  },
  {
    title: "SLIDA - Sri Lanka Institute of Development Administration",
    url: "https://www.slida.lk/",
    snippet: "Premier institution for public administration and management training.",
    description: "Offers training, consultancy, and research in public administration, management, and leadership development.",
    details: {
      duration: "Short courses to diploma programs",
      location: "Colombo and outreach programs",
      fee: "Government-subsidized for public sector",
      requirements: "Varies by program"
    }
  }
];

// Helper function to search within a category
export function searchResources(
  resources: EducationalResource[],
  query: string
): EducationalResource[] {
  if (!query || query.trim() === '') {
    return resources;
  }

  const searchLower = query.toLowerCase();
  return resources.filter(
    resource =>
      resource.title.toLowerCase().includes(searchLower) ||
      resource.description.toLowerCase().includes(searchLower) ||
      resource.snippet.toLowerCase().includes(searchLower) ||
      resource.details.location?.toLowerCase().includes(searchLower)
  );
}
