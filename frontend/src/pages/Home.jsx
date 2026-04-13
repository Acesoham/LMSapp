import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      {/* Modern Hero Section with animated gradient background */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
          {/* Abstract glow effects */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-green-400"></span>
              <span className="text-sm font-medium text-blue-100">Over 50+ new courses added this month</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight text-white tracking-tight">
              Master the Skills that <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Shape the Future.</span>
            </h1>
            
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Join millions of learners worldwide. High-quality, expert-led courses designed to help you land your dream job and accelerate your career.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {isAuthenticated ? (
                <Link to="/courses" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_40px_rgba(79,70,229,0.3)] transition-all hover:scale-105">
                  Resume Learning
                </Link>
              ) : (
                <>
                  <Link to="/register" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_40px_rgba(79,70,229,0.3)] transition-all hover:scale-105">
                    Start Learning for Free
                  </Link>
                  <Link to="/courses" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg backdrop-blur-md transition-all">
                    Explore Catalog
                  </Link>
                </>
              )}
            </div>

            {/* Trust Badges */}
            <div className="pt-16 border-t border-white/10 mt-16">
              <p className="text-sm text-slate-400 mb-6 uppercase tracking-widest font-semibold">Trusted by forward-thinking companies</p>
              <div className="flex flex-wrap justify-center gap-8 lg:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Mock Company Logos */}
                {['Microsoft', 'Google', 'Amazon', 'Netflix', 'Spotify'].map((company) => (
                  <div key={company} className="text-xl md:text-2xl font-bold text-white font-display">
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section overlapping hero */}
      <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
          <div className="text-center px-4">
            <div className="text-4xl font-bold text-slate-900 mb-2">1M+</div>
            <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Active Learners</div>
          </div>
          <div className="text-center px-4">
            <div className="text-4xl font-bold text-slate-900 mb-2">500+</div>
            <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Expert Courses</div>
          </div>
          <div className="text-center px-4">
            <div className="text-4xl font-bold text-slate-900 mb-2">4.9/5</div>
            <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Average Rating</div>
          </div>
          <div className="text-center px-4">
            <div className="text-4xl font-bold text-slate-900 mb-2">100%</div>
            <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Job Rate</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Why EduFlow?</h2>
            <h3 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6">
              A smarter way to build your skills
            </h3>
            <p className="text-xl text-slate-600">
              We provide an immersive, interactive learning experience that ensures you retain knowledge and build real-world capabilities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-3">Industry-Aligned Content</h4>
              <p className="text-slate-600 leading-relaxed">
                Our curriculum is designed alongside industry leaders to ensure you learn exactly what employers are looking for right now.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-900 rounded-3xl p-8 shadow-xl transform md:-translate-y-4 hover:-translate-y-6 transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-white mb-3">Interactive Video Lessons</h4>
              <p className="text-slate-400 leading-relaxed">
                Watch high-quality embedded video lectures from top instructors directly in your dashboard, with progress auto-saved.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-3">Professional Certification</h4>
              <p className="text-slate-600 leading-relaxed">
                Earn recognized certificates upon course completion to showcase your new skills on LinkedIn and your resume.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">Top Categories</h2>
              <p className="text-lg text-slate-600">Explore our most popular learning paths tailored for modern tech careers.</p>
            </div>
            <Link to="/courses" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2 mt-4 md:mt-0">
              Browse all categories
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {name: 'Web Development', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', color: 'blue'},
              {name: 'Mobile App Dev', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', color: 'indigo'},
              {name: 'Data Science', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', color: 'green'},
              {name: 'Machine Learning', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', color: 'purple'},
              {name: 'UI/UX Design', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01', color: 'pink'},
              {name: 'Cloud Computing', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z', color: 'cyan'},
              {name: 'Cybersecurity', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', color: 'red'},
              {name: 'Business Strategy', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'yellow'},
            ].map((cat) => (
              <Link
                key={cat.name}
                to={`/courses?category=${encodeURIComponent(cat.name)}`}
                className="group p-6 bg-slate-50 rounded-2xl hover:bg-slate-900 transition-colors duration-300 border border-slate-100 hover:border-transparent flex flex-col items-center text-center"
              >
                <div className={`w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-${cat.color}-500`}>
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-800 group-hover:text-white transition-colors">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to transform your career?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of successful students who have upgraded their skills and achieved their professional goals using EduFlow.
          </p>
          {!isAuthenticated ? (
            <Link to="/register" className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all">
              Sign Up for Free Today
            </Link>
          ) : (
            <Link to="/courses" className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all">
              Browse the Course Catalog
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
