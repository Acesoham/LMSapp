import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const { login }               = useAuth();
  const navigate                = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--surface)' }}>

      {/* Left panel — editorial illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12"
        style={{ background: 'linear-gradient(135deg, #0d1b6b 0%, #24389c 50%, #3f51b5 100%)' }}>
        {/* Abstract glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full opacity-30 animate-float"
          style={{ background: 'radial-gradient(circle, #5c6bc0 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s',
          background: 'radial-gradient(circle, #00bcd4 0%, transparent 70%)', filter: 'blur(60px)' }} />

        <div className="relative z-10 text-white max-w-sm text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}>
              <span className="text-white font-bold text-2xl" style={{ fontFamily: 'Manrope, sans-serif' }}>E</span>
            </div>
            <span className="text-2xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>EduFlow</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Welcome Back
          </h1>
          <p className="text-blue-200 text-lg leading-relaxed mb-10">
            Continue your learning journey where you left off.
          </p>

          {/* Mini stats */}
          <div className="grid grid-cols-3 gap-4">
            {[['1M+', 'Learners'], ['500+', 'Courses'], ['4.9★', 'Rating']].map(([val, lbl]) => (
              <div key={lbl} className="rounded-2xl p-4"
                style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}>
                <div className="text-xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>{val}</div>
                <div className="text-xs text-blue-200 mt-1">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2.5 mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #24389c, #3f51b5)' }}>
              <span className="text-white font-bold">E</span>
            </div>
            <span className="text-xl font-bold gradient-text" style={{ fontFamily: 'Manrope, sans-serif' }}>EduFlow</span>
          </Link>

          <h2 className="text-3xl font-bold mb-1.5" style={{ fontFamily: 'Manrope, sans-serif', color: 'var(--on-surface)' }}>
            Sign in
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--outline)' }}>
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold" style={{ color: 'var(--primary-container)' }}>Sign up free</Link>
          </p>

          {/* Error */}
          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl text-sm font-medium animate-fade-in"
              style={{ background: 'rgba(186,26,26,0.08)', color: '#ba1a1a', border: '1px solid rgba(186,26,26,0.15)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" id="login-form">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--on-surface-variant)' }}>
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="input-field"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold" style={{ color: 'var(--on-surface-variant)' }}>
                  Password
                </label>
                <a href="#" className="text-xs font-semibold" style={{ color: 'var(--secondary)' }}>
                  Forgot password?
                </a>
              </div>
              <input
                id="login-password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="input-field"
              />
            </div>

            <div className="pt-2">
              <button
                id="login-submit"
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3.5 text-base"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      style={{ animation: 'spin 0.7s linear infinite' }} />
                    Signing in…
                  </span>
                ) : 'Sign In'}
              </button>
            </div>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-8 p-4 rounded-xl"
            style={{ background: 'var(--surface-container-low)', border: '1px solid rgba(197,197,212,0.3)' }}>
            <p className="text-xs font-semibold mb-1" style={{ color: 'var(--outline)' }}>Demo credentials</p>
            <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
              Admin: <span className="font-mono font-semibold">admin@eduflow.com</span> / <span className="font-mono font-semibold">admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
