import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); setIsMenuOpen(false); };
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/courses', label: 'Courses' },
    { to: '/#features', label: 'Features' },
    { to: '/#enterprise', label: 'Enterprise' },
    { to: '/#pricing', label: 'Pricing' },
    ...(isAuthenticated ? [{ to: '/dashboard', label: 'Dashboard' }] : []),
    ...(isAuthenticated && isAdmin ? [{ to: '/admin', label: 'Admin' }] : []),
  ];

  return (
    <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-sm border-b border-gray-100' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" id="nav-logo" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1a1a2e, #3f51b5)' }}>
              <span className="text-white font-bold text-xs">E</span>
            </div>
            <span className="font-bold text-gray-900 text-base tracking-tight">EduFlow</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}
                id={`nav-${link.label.toLowerCase()}`}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.to) ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                }`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: '#3f51b5' }}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                </div>
                <button id="nav-logout" onClick={handleLogout}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Sign In
                </button>
              </>
            ) : (
              <>
                <Link id="nav-login" to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Sign In
                </Link>
                <Link id="nav-signup" to="/register"
                  className="text-sm font-semibold text-white px-4 py-2 rounded-lg transition-all hover:opacity-90"
                  style={{ background: '#1a1a2e' }}>
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile burger */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-50" aria-label="Toggle menu">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              {isMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 pt-2 space-y-1 border-t border-gray-100">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                {link.label}
              </Link>
            ))}
            <div className="pt-2 space-y-2 px-1">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2.5 text-sm font-medium text-gray-600">Sign In</Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}
                    className="block text-center text-sm font-semibold text-white px-4 py-2.5 rounded-lg"
                    style={{ background: '#1a1a2e' }}>Get Started</Link>
                </>
              ) : (
                <button onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-600">Logout</button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
