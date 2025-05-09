const HowItWorks = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-icons text-primary-600">edit_note</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Enter Your Details</h3>
            <p className="text-gray-600">
              Input your A/L subjects, grades, and personal interests to help us understand your profile.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-icons text-primary-600">psychology</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">ML Analysis</h3>
            <p className="text-gray-600">
              Our machine learning model analyzes your information to identify suitable career paths.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-icons text-primary-600">insights</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Get Recommendations</h3>
            <p className="text-gray-600">
              Review personalized career recommendations with details on each path and educational resources.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
