import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-70"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-slide-up">
              <div className="inline-block">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                  🚀 Launch Your Learning Journey
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight">
                Learn Without
                <span className="block gradient-text">Limits</span>
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed">
                Master new skills with expert-led courses. From web development to AI, unlock your potential with our comprehensive learning platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Link to="/courses" className="btn-primary text-center">
                    Browse Courses
                  </Link>
                ) : (
                  <>
                    <Link to="/register" className="btn-primary text-center">
                      Get Started Free
                    </Link>
                    <Link to="/courses" className="btn-secondary text-center">
                      Explore Courses
                    </Link>
                  </>
                )}
              </div>
              
              <div className="flex items-center space-x-8 pt-8">
                <div>
                  <div className="text-3xl font-bold gradient-text">10K+</div>
                  <div className="text-sm text-slate-600">Active Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text">50+</div>
                  <div className="text-sm text-slate-600">Expert Courses</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text">4.9★</div>
                  <div className="text-sm text-slate-600">Average Rating</div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Image */}
            <div className="relative animate-fade-in">
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
                  alt="Students learning"
                  className="rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-4">
              Why Choose <span className="gradient-text">EduFlow</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Experience a modern learning platform designed for success
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Expert-Led Courses</h3>
              <p className="text-slate-600">
                Learn from industry professionals with years of real-world experience
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Learn at Your Pace</h3>
              <p className="text-slate-600">
                Flexible learning schedules that fit your lifestyle and goals
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Certificates</h3>
              <p className="text-slate-600">
                Earn recognized certificates upon course completion
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-4">
              Explore <span className="gradient-text">Categories</span>
            </h2>
            <p className="text-xl text-slate-600">
              Find the perfect course for your career goals
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Web Development', 'Mobile Development', 'Data Science', 'AI/ML', 'Design', 'Business', 'Marketing', 'More...'].map((category, index) => (
              <Link
                key={index}
                to={`/courses?category=${encodeURIComponent(category)}`}
                className="card p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl mb-3">
                  {index === 0 && '💻'}
                  {index === 1 && '📱'}
                  {index === 2 && '📊'}
                  {index === 3 && '🤖'}
                  {index === 4 && '🎨'}
                  {index === 5 && '💼'}
                  {index === 6 && '📈'}
                  {index === 7 && '🌟'}
                </div>
                <h3 className="font-bold text-slate-800">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students already learning on EduFlow
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Sign Up Now - It's Free
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
