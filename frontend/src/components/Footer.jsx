import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50 text-slate-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-display font-bold text-slate-900">EduFlow</span>
            </div>
            <p className="text-slate-600 text-sm">
              Empowering learners worldwide with quality education and modern learning experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-slate-900">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-600 hover:text-blue-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-slate-900">Categories</h3>
            <ul className="space-y-2">
              <li className="text-slate-600">Web Development</li>
              <li className="text-slate-600">Data Science</li>
              <li className="text-slate-600">Design</li>
              <li className="text-slate-600">Business</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-slate-900">Stay Updated</h3>
            <p className="text-slate-600 text-sm mb-4">
              Subscribe to our newsletter for the latest courses and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-xl bg-white border-2 border-slate-200 focus:outline-none focus:border-blue-600"
              />
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 rounded-r-xl font-semibold hover:shadow-lg transition-shadow">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-12 pt-8 text-center text-slate-600 text-sm">
          <p>&copy; 2024 EduFlow. All rights reserved. Built with React & Node.js</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
