import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseService } from '../services/courseService';
import { enrollmentService } from '../services/enrollmentService';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import PaymentModal from '../components/PaymentModal';
import AIChatBot from '../components/AIChatBot';

const RESEARCH = [
  {
    type: 'whitepaper',
    title: 'Typography & Readability',
    desc: 'A quantitative study on serif vs sans-serif in digital academic journals.',
    action: 'Read Whitepaper →',
    bg: 'white',
    dark: false,
  },
  {
    type: 'featured',
    title: 'The Evolution of Digital Archiving',
    desc: 'Explore how The Emerald Archive curates and preserves high-fidelity educational content for the next decade of digital learning.',
    action: 'Access Archives',
    img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=700&q=80',
    dark: true,
  },
];

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [course, setCourse]               = useState(null);
  const [loading, setLoading]             = useState(true);
  const [enrolling, setEnrolling]         = useState(false);
  const [error, setError]                 = useState('');
  const [success, setSuccess]             = useState('');
  const [isEnrolled, setIsEnrolled]       = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [activeLesson, setActiveLesson]   = useState(null);
  const [expandedModule, setExpandedModule] = useState(0);

  useEffect(() => { fetchCourse(); checkEnrollment(); }, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const data = await courseService.getCourse(id);
      setCourse(data);
      if (data.lessons?.length > 0) setActiveLesson(data.lessons[0]);
    } catch { setError('Failed to load course details.'); }
    finally { setLoading(false); }
  };

  const checkEnrollment = async () => {
    if (!isAuthenticated) return;
    try { await enrollmentService.getEnrollment(id); setIsEnrolled(true); }
    catch { setIsEnrolled(false); }
  };

  const handleEnroll = async () => {
    setIsPaymentModalOpen(false);
    setEnrolling(true);
    setError(''); setSuccess('');
    try {
      await enrollmentService.enrollCourse(id);
      setSuccess('Enrolled successfully! Redirecting to dashboard…');
      setIsEnrolled(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) { setError(err.response?.data?.message || 'Failed to enroll.'); }
    finally { setEnrolling(false); }
  };

  if (loading) return <Loading message="Loading course…"/>;

  if (!course) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Course not found</h2>
        <button onClick={() => navigate('/courses')} className="px-6 py-3 rounded-xl text-white font-semibold" style={{ background: '#3f51b5' }}>
          Back to Courses
        </button>
      </div>
    </div>
  );

  const currentLessonIdx = course.lessons?.findIndex(l => l._id === activeLesson?._id) ?? 0;
  const nextLesson = course.lessons?.[currentLessonIdx + 1];
  const completedCount = 0; // real progress would come from enrollment
  const totalLessons   = course.lessons?.length || 0;
  const progressPct    = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Group lessons into modules (first 3 per module for demo)
  const modules = [
    { title: '01. ACADEMIC EDITORIAL FOUNDATIONS', unlocked: true,  lessons: course.lessons?.slice(0, Math.ceil(totalLessons / 2)) || [] },
    { title: '02. DESIGN SYSTEMS FOR ACADEMIA',    unlocked: false, lessons: course.lessons?.slice(Math.ceil(totalLessons / 2)) || [] },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#f8f8fc', fontFamily: 'Inter, sans-serif' }}>

      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900 text-sm cursor-pointer" onClick={() => navigate('/')} style={{ fontFamily: 'Manrope, sans-serif' }}>
            EduFlow Emerald
          </span>
          <span className="text-gray-200 mx-1">·</span>
          {['Curriculum','Scholarship','Library'].map((n) => (
            <button key={n} className="text-xs text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">{n}</button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-gray-50">
            <svg className="w-4.5 h-4.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
            </svg>
          </button>
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">A</div>
        </div>
      </div>

      {/* Messages */}
      {(error || success) && (
        <div className={`mx-6 mt-4 px-4 py-3 rounded-xl text-sm font-medium ${error ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {error || success}
        </div>
      )}

      <div className="flex">
        {/* ── Main area ── */}
        <div className="flex-1 min-w-0">
          {/* Video player */}
          <div className="bg-black" style={{ aspectRatio: '16/9', maxHeight: '60vh' }}>
            {activeLesson?.videoUrl ? (
              <iframe src={activeLesson.videoUrl} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={activeLesson.title}/>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center" style={{ background: '#0f0f1a' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <svg className="w-8 h-8 text-white opacity-60" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-sm font-medium text-white/40">
                  {isEnrolled ? 'No video for this lesson' : 'Enroll to access video lessons'}
                </p>
                {/* Fake progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                  <div className="h-full bg-indigo-500" style={{ width: '45%' }}/>
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white/50 text-xs">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                    <span>12:45 / 28:00</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Lesson info */}
          <div className="p-8 max-w-3xl">
            <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: '#009688' }}>
              Module 01: Foundations
            </p>
            <div className="flex items-start justify-between gap-6 mb-6">
              <h1 className="text-2xl font-bold leading-tight" style={{ fontFamily: 'Manrope, sans-serif', color: '#3f51b5' }}>
                {activeLesson?.title || course.title}
              </h1>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                  </svg>
                  Resources
                </button>
                {nextLesson ? (
                  <button id="next-lesson" onClick={() => setActiveLesson(nextLesson)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: '#3f51b5' }}>
                    Next Lesson
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                    </svg>
                  </button>
                ) : isEnrolled ? (
                  <button className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: '#009688' }}>
                    ✓ Complete
                  </button>
                ) : (
                  <button id="course-enroll-btn" onClick={() => { if (!isAuthenticated) { navigate('/login'); } else { setIsPaymentModalOpen(true); } }}
                    disabled={enrolling}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: '#3f51b5' }}>
                    {enrolling ? 'Enrolling…' : `Enroll — ₹${course.price || 599}`}
                  </button>
                )}
              </div>
            </div>

            {/* Description + Key Takeaways */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {activeLesson?.content || course.description}
                </p>
                {course.description && activeLesson?.content && (
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {course.description}
                  </p>
                )}
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-3">Key Takeaways</p>
                <ul className="space-y-2.5">
                  {['Editorial Asymmetry', 'Tonal Depth Mapping', 'Scholarly Precision'].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#3f51b5' }}>
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Supplementary Research */}
            <div className="mt-14">
              <h2 className="text-lg font-bold mb-5" style={{ fontFamily: 'Manrope, sans-serif', color: '#3f51b5' }}>
                Supplementary Research
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Whitepaper card */}
                <div className="border border-gray-200 rounded-2xl p-6 hover:shadow-sm transition-all">
                  <svg className="w-7 h-7 mb-4" style={{ color: '#3f51b5' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
                  </svg>
                  <h3 className="font-bold text-base mb-1.5" style={{ fontFamily: 'Manrope, sans-serif', color: '#3f51b5' }}>
                    Typography & Readability
                  </h3>
                  <p className="text-xs text-gray-500 mb-5 leading-relaxed">
                    A quantitative study on serif vs sans-serif in digital academic journals.
                  </p>
                  <button className="text-xs font-bold flex items-center gap-1.5" style={{ color: '#3f51b5' }}>
                    READ WHITEPAPER →
                  </button>
                </div>

                {/* Featured research card */}
                <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: '200px' }}>
                  <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=700&q=80"
                    alt="Digital Archiving" className="absolute inset-0 w-full h-full object-cover"/>
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }}/>
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <span className="self-start px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-white/20 text-white backdrop-blur-sm">
                      FEATURED RESEARCH
                    </span>
                    <div>
                      <h3 className="font-bold text-lg text-white mb-2 leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        The Evolution of Digital Archiving
                      </h3>
                      <p className="text-xs text-white/70 mb-4 leading-relaxed">
                        Explore how The Emerald Archive curates and preserves high-fidelity educational content.
                      </p>
                      <button className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-gray-900 hover:bg-gray-100 transition-colors">
                        Access Archives
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Syllabus Sidebar ── */}
        <aside className="w-80 flex-shrink-0 bg-white border-l border-gray-100 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-5">
            <h2 className="text-base font-bold text-gray-900 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Course Syllabus
            </h2>

            {/* Progress */}
            <div className="mb-2">
              <div className="h-2.5 rounded-full overflow-hidden mb-2" style={{ background: '#e8e8f0' }}>
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%`, background: 'linear-gradient(90deg, #3f51b5, #5c6bc0)' }}/>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-gray-400">{completedCount} of {totalLessons} lessons completed</p>
                <p className="text-[10px] font-bold" style={{ color: '#3f51b5' }}>{progressPct}%</p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {modules.map((mod, mi) => (
                <div key={mi}>
                  {/* Module header */}
                  <button onClick={() => setExpandedModule(expandedModule === mi ? -1 : mi)}
                    className="w-full flex items-center justify-between py-2.5 text-left"
                    style={{ borderBottom: '1px solid #f0f0f8' }}>
                    <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: mod.unlocked ? '#374151' : '#9ca3af' }}>
                      {mod.title}
                    </span>
                    {mod.unlocked ? (
                      <svg className="w-4 h-4 text-gray-400 transition-transform" style={{ transform: expandedModule === mi ? 'rotate(180deg)' : '' }}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                    )}
                  </button>

                  {/* Lessons list */}
                  {expandedModule === mi && mod.unlocked && (
                    <div className="mt-1 space-y-0.5">
                      {mod.lessons.map((lesson, li) => {
                        const isActive = activeLesson?._id === lesson._id;
                        const isPlaying = isActive;
                        return (
                          <button key={lesson._id} id={`syllabus-${lesson._id}`}
                            onClick={() => { if (isEnrolled || li === 0) setActiveLesson(lesson); }}
                            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all"
                            style={{ background: isActive ? '#f0f1ff' : 'transparent' }}>
                            {/* Icon */}
                            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: isPlaying ? '#3f51b5' : '#e8e8f0' }}>
                              {isPlaying ? (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                              ) : li === 0 ? (
                                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                              ) : (isEnrolled ? null : (
                                <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                              ))}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs font-semibold leading-snug truncate ${isActive ? 'text-indigo-600' : 'text-gray-700'}`}>
                                {isPlaying ? <span style={{ color: '#3f51b5' }}>{lesson.title}</span> : lesson.title}
                              </p>
                              {isPlaying && <p className="text-[10px] text-indigo-400 mt-0.5">Currently Playing</p>}
                              {!isPlaying && <p className="text-[10px] text-gray-400 mt-0.5">{lesson.duration || '15:00'}</p>}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Locked module notice */}
                  {!mod.unlocked && (
                    <p className="text-[10px] text-gray-400 italic px-3 py-2">
                      Complete previous module to unlock these lessons.
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Download PDF */}
            <button className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
              </svg>
              Download Course Guide (PDF)
            </button>
          </div>
        </aside>
      </div>

      {/* ── Footer ── */}
      <footer className="mt-16 border-t border-gray-100 bg-white px-8 py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>The Emerald Archive</h3>
            <p className="text-xs text-gray-400">Advanced Academic Editorial & Curator Workspace</p>
          </div>
          <div className="flex gap-16">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-gray-300 mb-3">Support</p>
              {['Help Center', 'Faculty Access'].map(l => (
                <p key={l} className="mb-2"><a href="#" className="text-xs font-semibold" style={{ color: '#3f51b5' }}>{l}</a></p>
              ))}
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-gray-300 mb-3">Legal</p>
              {['Academic Privacy', 'Terms of Scholarship'].map(l => (
                <p key={l} className="mb-2"><a href="#" className="text-xs font-semibold" style={{ color: '#3f51b5' }}>{l}</a></p>
              ))}
            </div>
          </div>
        </div>
        <p className="text-center text-[10px] text-gray-300 mt-8">© 2024 EduFlow Emerald Editorial. All Research Rights Reserved.</p>
      </footer>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={handleEnroll}
        courseTitle={course?.title}
        amount={course?.price || 599}
      />
      <AIChatBot courseContext={course?.title}/>
    </div>
  );
}
