import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '',
  });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const { register }          = useAuth();
  const navigate              = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    setError('');
    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const perks = [
    'Access to 500+ expert-led courses',
    'Progress tracking & certificates',
    'AI-powered learning assistant',
    'Community & peer support',
  ];

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--surface)' }}>

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12"
        style={{ background: 'linear-gradient(135deg, #0d1b6b 0%, #24389c 50%, #004a55 100%)' }}>
        <div className="absolute top-1/3 left-1/3 w-72 h-72 rounded-full opacity-25 animate-float"
          style={{ background: 'radial-gradient(circle, #5c6bc0 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full opacity-20 animate-float" style={{ animationDelay: '3s',
          background: 'radial-gradient(circle, #00897b 0%, transparent 70%)', filter: 'blur(50px)' }} />

        <div className="relative z-10 text-white max-w-sm">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}>
              <span className="text-white font-bold text-2xl" style={{ fontFamily: 'Manrope, sans-serif' }}>E</span>
            </div>
            <span className="text-2xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>EduFlow</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Start Your Journey
          </h1>
          <p className="text-blue-200 text-lg leading-relaxed mb-10">
            Join over 1 million learners accelerating their careers.
          </p>

          <ul className="space-y-4 mb-10">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-sm">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,150,136,0.3)' }}>
                  <svg className="w-3.5 h-3.5 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-blue-100">{perk}</span>
              </li>
            ))}
          </ul>

          {/* Floating stat chips */}
          <div className="flex gap-3 flex-wrap">
            {[['1M+', 'Learners'], ['500+', 'Courses'], ['4.9★', 'Rating']].map(([val, lbl]) => (
              <div key={lbl} className="rounded-xl px-4 py-2.5 flex items-center gap-2"
                style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}>
                <span className="text-sm font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>{val}</span>
                <span className="text-xs text-blue-200">{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #24389c, #3f51b5)' }}>
              <span className="text-white font-bold">E</span>
            </div>
            <span className="text-xl font-bold gradient-text" style={{ fontFamily: 'Manrope, sans-serif' }}>EduFlow</span>
          </Link>

          <h2 className="text-3xl font-bold mb-1.5" style={{ fontFamily: 'Manrope, sans-serif', color: 'var(--on-surface)' }}>
            Create account
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--outline)' }}>
            Already have an account?{' '}
            <Link to="/login" className="font-semibold" style={{ color: 'var(--primary-container)' }}>Sign in</Link>
          </p>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl text-sm font-medium animate-fade-in"
              style={{ background: 'rgba(186,26,26,0.08)', color: '#ba1a1a', border: '1px solid rgba(186,26,26,0.15)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" id="register-form">
            {[
              { id: 'register-name',     name: 'name',            type: 'text',     label: 'Full Name',       placeholder: 'John Doe' },
              { id: 'register-email',    name: 'email',           type: 'email',    label: 'Email address',   placeholder: 'you@example.com' },
              { id: 'register-password', name: 'password',        type: 'password', label: 'Password',        placeholder: '8+ characters' },
              { id: 'register-confirm',  name: 'confirmPassword', type: 'password', label: 'Confirm Password', placeholder: '••••••••' },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--on-surface-variant)' }}>
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  placeholder={field.placeholder}
                  className="input-field"
                />
              </div>
            ))}

            <p className="text-xs pt-1" style={{ color: 'var(--outline)' }}>
              By creating an account you agree to our{' '}
              <a href="#" className="font-semibold" style={{ color: 'var(--primary-container)' }}>Terms</a>{' '}
              and{' '}
              <a href="#" className="font-semibold" style={{ color: 'var(--primary-container)' }}>Privacy Policy</a>.
            </p>

            <div className="pt-2">
              <button
                id="register-submit"
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3.5 text-base"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      style={{ animation: 'spin 0.7s linear infinite' }} />
                    Creating account…
                  </span>
                ) : 'Create Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
