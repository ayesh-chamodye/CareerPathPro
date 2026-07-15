"use client"

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'si', 'ta'],
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'career-pro-language',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
//   en: {
//     translation: {
//       // Navigation
//       home: 'Home',
//       careerPaths: 'Career Paths',
//       resources: 'Resources',
//       about: 'About',
      
//       // Resource Types
//       universities: 'Universities',
//       scholarships: 'Scholarships',
//       courses: 'Online Courses',
//       training: 'Vocational Training',

//       // Resource Details
//       duration: 'Duration',
//       fee: 'Fee',
//       location: 'Location',
//       requirements: 'Requirements',
//       visitWebsite: 'Visit Website',

//       // Footer
//       quickLinks: 'Quick Links',
//       contactUs: 'Contact Us',
//       email: 'Email',
//       phone: 'Phone',
//       address: 'Address',
//       allRightsReserved: 'All rights reserved',
//       privacyPolicy: 'Privacy Policy',
//       termsOfService: 'Terms of Service',
//       cookiePolicy: 'Cookie Policy',
//     }
//   },
//   si: {
//     translation: {
//       // Navigation
//       home: 'මුල් පිටුව',
//       careerPaths: 'වෘත්තීය මාර්ග',
//       resources: 'සම්පත්',
//       about: 'අප ගැන',
      
//       // Resource Types
//       universities: 'විශ්වවිද්‍යාල',
//       scholarships: 'ශිෂ්‍යත්ව',
//       courses: 'මාර්ගගත පාඨමාලා',
//       training: 'වෘත්තීය පුහුණුව',

//       // Resource Details
//       duration: 'කාලසීමාව',
//       fee: 'ගාස්තුව',
//       location: 'ස්ථානය',
//       requirements: 'අවශ්‍යතා',
//       visitWebsite: 'වෙබ් අඩවියට පිවිසෙන්න',

//       // Footer
//       quickLinks: 'ක්ෂණික සබැඳි',
//       contactUs: 'අප අමතන්න',
//       email: 'විද්‍යුත් තැපෑල',
//       phone: 'දුරකථන',
//       address: 'ලිපිනය',
//       allRightsReserved: 'සියලුම හිමිකම් ඇවිරිණි',
//       privacyPolicy: 'රහස්‍යතා ප්‍රතිපත්තිය',
//       termsOfService: 'සේවා කොන්දේසි',
//       cookiePolicy: 'කුකී ප්‍රතිපත්තිය',
//     }
//   },
//   ta: {
//     translation: {
//       // Navigation
//       home: 'முகப்பு',
//       careerPaths: 'வேலைவாய்ப்பு பாதைகள்',
//       resources: 'வளங்கள்',
//       about: 'எங்களை பற்றி',
      
//       // Resource Types
//       universities: 'பல்கலைக்கழகங்கள்',
//       scholarships: 'உதவித்தொகைகள்',
//       courses: 'ஆன்லைன் படிப்புகள்',
//       training: 'தொழில்முறை பயிற்சி',

//       // Resource Details
//       duration: 'காலம்',
//       fee: 'கட்டணம்',
//       location: 'இடம்',
//       requirements: 'தேவைகள்',
//       visitWebsite: 'இணையதளத்தைப் பார்க்க',

//       // Footer
//       quickLinks: 'விரைவு இணைப்புகள்',
//       contactUs: 'எங்களை தொடர்பு கொள்ள',
//       email: 'மின்னஞ்சல்',
//       phone: 'தொலைபேசி',
//       address: 'முகவரி',
//       allRightsReserved: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை',
//       privacyPolicy: 'தனியுரிமை கொள்கை',
//       termsOfService: 'சேவை விதிமுறைகள்',
//       cookiePolicy: 'குக்கீ கொள்கை',
//     }
//   }
// };

// i18n
//   .use(initReactI18next)
//   .init({
//     resources,
//     lng: 'en', // default language
//     interpolation: {
//       escapeValue: false
//     },
//     react: {
//       useSuspense: false
//     }
//   });

// export default i18n;