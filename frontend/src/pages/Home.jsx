import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/* ──────────────────────────────────────────
   DATA
────────────────────────────────────────── */
const PARTNERS = ['NEVADA', 'NEXUS', 'VENTURE', 'ORBITAL', 'GENESIS'];

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: 'Expert-Led Curriculum',
    desc: 'Our courses are developed by world-class academics and industry leaders, ensuring high-demand skills for tomorrow\'s digital economy.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: 'Innovative Community',
    desc: 'Connect with a global network of ambitious professionals and entrepreneurs shaping the very next major industry.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: 'Advanced Analytics',
    desc: 'Access real-time progress tracking and personalized insights that help you optimize your learning path and outcomes.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: 'Professional Certification',
    desc: 'Earn recognized credentials upon course completion to showcase your new expertise in the global professional market.',
  },
];

const COURSES = [
  {
    id: 1,
    tag: 'WEB DEVLOPMENT',
    title: 'React Native',
    instructor: 'Sarah Johnson',
    price: '199',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
  },
  {
    id: 2,
    tag: 'TECHNOLOGY',
    title: 'Applied Machine Learning',
    instructor: 'Jason Thomas',
    price: '299',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
  },
  {
    id: 3,
    tag: 'FINANCE',
    title: 'Global Markets & Venture Capital',
    instructor: 'Todd Norman',
    price: '299',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
  },
];

const TESTIMONIALS = [
  {
    quote: 'The academic delivery of the courses felt like nothing else. It was challenging, high-level, but I am sure that it has made me a better choice for any company.',
    name: 'Leo Ronaldo',
    role: 'Product Lead, Interscope Ltd. • 12 yrs',
    avatar: 'https://i.pravatar.cc/80?img=11',
  },
  {
    quote: 'EduFlow elevated my professional integrity. You know to not call this platform as luck. The community, feedback tools and mentorship led me to incredible personal growth.',
    name: 'Maya Patel',
    role: 'Strategy Director • 8 yrs',
    avatar: 'https://i.pravatar.cc/80?img=47',
  },
  {
    quote: 'As an instructor this place is perfect to create curated content from scratch. EduFlow led me to scale my academy all beyond expectations.',
    name: 'Prof. James Murray',
    role: 'Senior Faculty, Economics',
    avatar: 'https://i.pravatar.cc/80?img=33',
  },
];

/* ──────────────────────────────────────────
   COMPONENT
────────────────────────────────────────── */
export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-white text-gray-900 overflow-hidden" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-20 lg:pt-20 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-5">
              THE FUTURE OF LEARNING
            </p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: 'Manrope, system-ui, sans-serif', letterSpacing: '-0.03em', color: '#0f0f1a' }}>
              Empowering<br />
              Future Leaders<br />
              through{' '}
              <em className="not-italic"
                style={{
                  background: 'linear-gradient(135deg, #3f51b5, #009688)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  fontStyle: 'italic',
                }}>
                Curated
              </em>{' '}
              Learning
            </h1>
            <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-md">
              Experience a prestigious digital campus designed for deep focus. Master high-demand skills with a personal-first approach to modern education.
            </p>
            <div className="flex flex-wrap gap-3">
              {isAuthenticated ? (
                <Link to="/courses" id="hero-resume"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all hover:opacity-90"
                  style={{ background: '#1a1a2e' }}>
                  Resume Learning
                </Link>
              ) : (
                <>
                  <Link to="/register" id="hero-start"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all hover:opacity-90"
                    style={{ background: '#1a1a2e' }}>
                    Start Learning for Free
                  </Link>
                  <Link to="/courses" id="hero-explore"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border transition-all hover:bg-gray-50"
                    style={{ borderColor: '#d1d5db', color: '#374151' }}>
                    Explore Courses
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right — Dark card */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] flex flex-col items-center justify-center relative"
              style={{ background: 'linear-gradient(145deg, #0f0f1a 0%, #1a1a3e 50%, #0d2137 100%)' }}>
              {/* Globe SVG illustration */}
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 400 300" className="w-full h-full" fill="none">
                  <ellipse cx="200" cy="150" rx="120" ry="120" stroke="#4fc3f7" strokeWidth="0.5" opacity="0.4"/>
                  <ellipse cx="200" cy="150" rx="120" ry="50" stroke="#4fc3f7" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="80" y1="150" x2="320" y2="150" stroke="#4fc3f7" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="200" y1="30" x2="200" y2="270" stroke="#4fc3f7" strokeWidth="0.5" opacity="0.3"/>
                  {[50,80,110,140,170].map((r, i) => (
                    <ellipse key={i} cx="200" cy="150" rx={r} ry={r*0.42} stroke="#64b5f6" strokeWidth="0.4" opacity="0.2"/>
                  ))}
                  {/* Connecting dots */}
                  {[[120,80],[280,100],[160,200],[240,180],[200,90],[200,210]].map(([x,y], i) => (
                    <circle key={i} cx={x} cy={y} r="3" fill="#4fc3f7" opacity="0.6"/>
                  ))}
                  <line x1="120" y1="80" x2="280" y2="100" stroke="#4fc3f7" strokeWidth="0.5" opacity="0.4"/>
                  <line x1="280" y1="100" x2="240" y2="180" stroke="#4fc3f7" strokeWidth="0.5" opacity="0.4"/>
                  <line x1="120" y1="80" x2="200" y2="90" stroke="#4fc3f7" strokeWidth="0.5" opacity="0.4"/>
                  <line x1="160" y1="200" x2="240" y2="180" stroke="#4fc3f7" strokeWidth="0.5" opacity="0.4"/>
                </svg>
              </div>
              {/* Text overlay */}
              <div className="relative z-10 text-center px-8">
                <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  EMPOWERING
                </p>
                <p className="text-3xl lg:text-4xl font-bold tracking-tight text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  EDUCATION
                </p>
                <div className="mt-6 flex justify-center gap-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="rounded-full" style={{
                      width: i === 2 ? '24px' : '8px',
                      height: '8px',
                      background: i === 2 ? '#4fc3f7' : 'rgba(255,255,255,0.25)',
                    }}/>
                  ))}
                </div>
              </div>
              {/* Bottom bar */}
              <div className="absolute bottom-0 left-0 right-0 px-6 py-4 flex items-center justify-between"
                style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)' }}>
                <div>
                  <p className="text-xs text-gray-400">Active learners</p>
                  <p className="text-white font-bold text-sm">1,200,000+</p>
                </div>
                <div className="flex -space-x-2">
                  {[11,12,5,20,47].map(n => (
                    <img key={n} src={`https://i.pravatar.cc/32?img=${n}`} className="w-7 h-7 rounded-full border-2 border-gray-800"/>
                  ))}
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 border border-gray-100">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#e8f5e9' }}>
                <svg className="w-5 h-5" style={{ color: '#009688' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400">Completion rate</p>
                <p className="text-sm font-bold text-gray-900">94.7%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PARTNER LOGOS ═════════════════════════════════ */}
      <section className="border-y border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-xs font-semibold tracking-widest uppercase text-gray-400 mb-6">
            PARTNERED WITH GLOBAL LEADING INSTITUTIONS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {PARTNERS.map((p) => (
              <div key={p}
                className="flex items-center gap-2 grayscale opacity-50 hover:opacity-80 hover:grayscale-0 transition-all duration-300">
                <div className="w-5 h-5 rounded bg-gray-200 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #1a1a2e, #3f51b5)' }}>
                </div>
                <span className="text-sm font-bold tracking-wide text-gray-600">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══════════════════════════════════════ */}
      <section id="features" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Manrope, sans-serif', color: '#0f0f1a', letterSpacing: '-0.025em' }}>
              Redefining the Academic Experience
            </h2>
            <p className="text-gray-500 text-base max-w-2xl">
              We're steering from a cluttered, fast-paced world to a truly enriched environment that focuses and fosters strategic digital education.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ background: '#f8f8fc', color: '#3f51b5' }}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-base mb-2 text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ COURSES ═══════════════════════════════════════ */}
      <section className="py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold"
                style={{ fontFamily: 'Manrope, sans-serif', color: '#0f0f1a', letterSpacing: '-0.025em' }}>
                Curated Masterclasses
              </h2>
            </div>
            <Link to="/courses" id="home-browse-all"
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
              Browse Gallery
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COURSES.map((course, i) => (
              <Link to="/courses" key={i} id={`featured-course-${i}`}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 group block">
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: '200px' }}>
                  <img src={course.img} alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }}/>
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest"
                    style={{ background: 'rgba(255,255,255,0.15)', color: 'white', backdropFilter: 'blur(8px)' }}>
                    {course.tag}
                  </span>
                </div>
                {/* Info */}
                <div className="p-5">
                  <h3 className="font-bold text-base mb-3 text-gray-900 leading-snug" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {course.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={`https://i.pravatar.cc/28?img=${10 + i}`} className="w-6 h-6 rounded-full"/>
                      <span className="text-xs text-gray-500 font-medium">{course.instructor}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{course.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 sm:hidden text-center">
            <Link to="/courses" className="text-sm font-semibold text-gray-600 hover:text-gray-900">
              View all courses →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3"
              style={{ fontFamily: 'Manrope, sans-serif', color: '#0f0f1a', letterSpacing: '-0.025em' }}>
              Voice of the Academy
            </h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              How thousands of students have elevated their careers through our curated content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i}
                className="p-7 rounded-2xl border border-gray-100 hover:shadow-sm transition-all duration-300 flex flex-col justify-between"
                style={{ background: i === 1 ? '#fafafa' : 'white' }}>
                {/* Quote icon */}
                <div>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-5"
                    style={{ background: '#f0f1ff' }}>
                    <svg className="w-4 h-4" style={{ color: '#3f51b5' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">{t.quote}</p>
                </div>
                {/* Author */}
                <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover"/>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════ */}
      <section id="pricing" className="py-20 lg:py-28 mx-6 lg:mx-8 rounded-3xl mb-20"
        style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a3e 60%, #0d2137 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>
            JOIN THE ACADEMY
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-5 leading-tight"
            style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.03em' }}>
            Ready to elevate your<br />expertise?
          </h2>
          <p className="text-base mb-10 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Join our global institution of lifelong learners and master the skills of tomorrow, today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {!isAuthenticated ? (
              <>
                <Link to="/register" id="cta-get-started"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                  style={{ background: '#4fc3f7', color: '#0f0f1a' }}>
                  Get Started
                </Link>
                <Link to="/courses" id="cta-schedule"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                  style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Schedule a Demo
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                  </svg>
                </Link>
              </>
            ) : (
              <Link to="/courses" id="cta-catalog"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: '#4fc3f7', color: '#0f0f1a' }}>
                Browse Course Catalog
              </Link>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
