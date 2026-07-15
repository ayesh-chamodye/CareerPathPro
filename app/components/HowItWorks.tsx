"use client"

import { useTranslation } from "react-i18next";

const HowItWorks = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">{t('home.howItWorks.title')}</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center">
            <div className="w-14 h-14 bg-primary-100 dark:bg-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-icons text-primary-600 dark:text-primary-300">edit_note</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">{t('home.howItWorks.step1.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('home.howItWorks.step1.description')}
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center">
            <div className="w-14 h-14 bg-primary-100 dark:bg-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-icons text-primary-600 dark:text-primary-300">psychology</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">{t('home.howItWorks.step2.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('home.howItWorks.step2.description')}
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center">
            <div className="w-14 h-14 bg-primary-100 dark:bg-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-icons text-primary-600 dark:text-primary-300">insights</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">{t('home.howItWorks.step3.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('home.howItWorks.step3.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
