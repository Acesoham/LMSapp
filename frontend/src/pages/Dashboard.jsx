import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { enrollmentService } from '../services/enrollmentService';
import { uploadService } from '../services/uploadService';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import AIChatBot from '../components/AIChatBot';

/* ── Sidebar nav items ── */
const NAV = [
  { label: 'Curriculum',  id: 'curriculum',  icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' },
  { label: 'Scholarship', id: 'scholarship', icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5' },
  { label: 'Library',     id: 'library',     icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' },
  { label: 'Research',    id: 'research',    icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5' },
  { label: 'Faculty',     id: 'faculty',     icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' },
];

const DEADLINES = [
  { urgency: 'IN 2 DAYS', title: 'Synthesis Paper: Digital Hermeneutics', course: 'Foundations of Modern Media Course', actions: ['View Rubric', 'Submit Draft'], accent: '#ef4444' },
  { urgency: 'IN 3 DAYS', title: 'Peer Review: Ethical Bio-Engineering', course: 'Research Ethics Lab', actions: ['Assign Peers'], accent: '#f59e0b' },
  { urgency: 'NEXT WEEK', title: 'Final Portfolio Submission', course: 'Master of Scholarly Curation', actions: ['Manage Deliverables'], accent: '#3f51b5' },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [activeNav, setActiveNav]     = useState('curriculum');
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [activeTab, setActiveTab]     = useState('lessons');
  const [activeVideo, setActiveVideo] = useState(null);
  const [submittingAssignment, setSubmittingAssignment] = useState(null);
  const [assignmentLink, setAssignmentLink] = useState('');
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [isUploading, setIsUploading]       = useState(false);

  useEffect(() => { fetchEnrollments(); }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const data = await enrollmentService.getMyEnrollments();
      setEnrollments(data);
    } catch (e) { console.error(e); }
    finally  { setLoading(false); }
  };

  const handleLessonComplete = async (courseId, lessonId) => {
    try { await enrollmentService.updateProgress(courseId, lessonId); fetchEnrollments(); }
    catch (e) { console.error(e); }
  };

  const confirmAssignment = async (courseId, assignmentId) => {
    try {
      setIsUploading(true);
      let fileUrl = '';
      if (assignmentFile) {
        const up = await uploadService.uploadFile(assignmentFile);
        fileUrl = up.url;
      }
      await enrollmentService.completeAssignment(courseId, assignmentId, { linkUrl: assignmentLink, fileUrl });
      setSubmittingAssignment(null); setAssignmentLink(''); setAssignmentFile(null);
      fetchEnrollments();
    } catch (e) { console.error(e); }
    finally { setIsUploading(false); }
  };

  const avgProgress = enrollments.length
    ? Math.round(enrollments.reduce((a, e) => a + e.progress.percentage, 0) / enrollments.length)
    : 0;

  const totalLessons = enrollments.reduce((a, e) => a + e.progress.completedLessons.length, 0);
  const focusHours   = Number((totalLessons * 0.75).toFixed(1));

  return (
    <div className="flex min-h-screen" style={{ background: '#f8f8fc', fontFamily: 'Inter, sans-serif' }}>

      {/* ══ LEFT SIDEBAR ══════════════════════════════════ */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col min-h-screen sticky top-0 h-screen overflow-y-auto">
        {/* Brand */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #3f51b5, #009688)' }}>
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>The Emerald Archive</p>
              <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">Academic Editorial</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV.map((item) => {
            const active = activeNav === item.id;
            return (
              <button key={item.id} id={`nav-${item.id}`}
                onClick={() => setActiveNav(item.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left"
                style={{
                  background: active ? 'rgba(63,81,181,0.08)' : 'transparent',
                  color: active ? '#3f51b5' : '#6b7280',
                }}>
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon}/>
                </svg>
                {item.label}
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500"/>}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 space-y-1 border-t border-gray-100">
          {[
            { label: 'Settings', icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
            { label: 'Support',  icon: 'M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z' },
          ].map((item) => (
            <button key={item.label}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all text-left">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon}/>
              </svg>
              {item.label}
            </button>
          ))}
        </div>
      </aside>

      {/* ══ MAIN CONTENT ══════════════════════════════════ */}
      <main className="flex-1 overflow-y-auto">

        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>EduFlow Emerald</span>
            <span className="text-gray-300 mx-1">·</span>
            {['Curriculum','Scholarship','Library'].map((n) => (
              <button key={n} className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">{n}</button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
              </svg>
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"/>
              </svg>
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #3f51b5, #009688)' }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-8"><Loading message="Loading your archive…"/></div>
        ) : (
          <div className="p-8 max-w-5xl">

            {/* Welcome */}
            <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">Welcome back, Curator</p>
            <h1 className="text-4xl font-bold mb-2 leading-tight"
              style={{ fontFamily: 'Manrope, sans-serif', color: '#3f51b5', letterSpacing: '-0.02em' }}>
              Curate Your Learning Journey
            </h1>
            <p className="text-gray-500 text-sm mb-10 max-w-lg">
              Review your academic progress, synthesize your latest findings, and chart the course for your next scholarly endeavor.
            </p>

            {/* Academic Velocity + stats */}
            <div className="grid lg:grid-cols-3 gap-5 mb-10">
              {/* Progress card */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-7 border border-gray-100">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>Academic Velocity</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Quarterly Synthesis Goal</p>
                  </div>
                  <span className="text-3xl font-bold" style={{ color: '#3f51b5', fontFamily: 'Manrope, sans-serif' }}>{avgProgress}%</span>
                </div>
                {/* Progress bar */}
                <div className="relative mb-3">
                  <div className="h-3 rounded-full overflow-hidden" style={{ background: '#e8e8f0' }}>
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${avgProgress}%`, background: 'linear-gradient(90deg, #009688, #3f51b5)' }}/>
                  </div>
                </div>
                <div className="flex justify-between text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  <span>Foundation Phase</span>
                  <span>Synthesis Phase</span>
                  <span>Mastery</span>
                </div>
              </div>

              {/* Stat cards */}
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl p-5 flex-1 flex flex-col justify-between"
                  style={{ background: 'linear-gradient(135deg, #3f51b5, #5c6bc0)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
                    </svg>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-200">Insights Generated</span>
                  </div>
                  <p className="text-4xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>{totalLessons}</p>
                </div>
                <div className="rounded-2xl p-5 flex-1 bg-white border border-gray-100 flex flex-col justify-between">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Focus Hours</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>{focusHours}h</p>
                </div>
              </div>
            </div>

            {/* Currently Curating */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>Currently Curating</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Active modules and research tracks</p>
                </div>
                <Link to="/courses" className="text-sm font-semibold flex items-center gap-1.5" style={{ color: '#3f51b5' }}>
                  View Entire Library
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                  </svg>
                </Link>
              </div>

              {enrollments.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-5">
                  {enrollments.map((enrollment) => {
                    const course = enrollment.course;
                    const isExpanded = expandedCourse === course._id;
                    return (
                      <div key={enrollment._id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
                        {/* Course image */}
                        <div className="relative" style={{ height: '160px' }}>
                          <img src={course.thumbnail || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600'} alt={course.title}
                            className="w-full h-full object-cover"/>
                          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent 60%)' }}/>
                          <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest text-white"
                            style={{ background: 'rgba(63,81,181,0.8)', backdropFilter: 'blur(4px)' }}>
                            {course.category?.toUpperCase() || 'RESEARCH TRACK'}
                          </span>
                          <span className="absolute top-3 right-3 text-[10px] font-bold text-white/70">
                            {enrollment.progress.completedLessons.length}/{course.lessons?.length || 0} Units
                          </span>
                        </div>

                        <div className="p-5">
                          <h3 className="font-bold text-base mb-1.5 leading-snug" style={{ fontFamily: 'Manrope, sans-serif', color: '#3f51b5' }}>
                            {course.title}
                          </h3>
                          <p className="text-xs text-gray-500 mb-4 line-clamp-2">{course.description}</p>

                          {/* Avatars + Continue */}
                          <div className="flex items-center justify-between">
                            <div className="flex -space-x-2">
                              {[11,12,5].map(n => (
                                <img key={n} src={`https://i.pravatar.cc/28?img=${n}`} className="w-7 h-7 rounded-full border-2 border-white"/>
                              ))}
                              <div className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold bg-gray-100 text-gray-500">+5</div>
                            </div>
                            <button id={`continue-${course._id}`}
                              onClick={() => setExpandedCourse(isExpanded ? null : course._id)}
                              className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                              style={{ background: '#3f51b5' }}>
                              Continue
                            </button>
                          </div>

                          {/* Expanded lessons */}
                          {isExpanded && (
                            <div className="mt-5 pt-5 border-t border-gray-100 space-y-2 animate-fade-in">
                              <div className="flex gap-4 mb-4">
                                {['lessons','assignments'].map(t => (
                                  <button key={t} onClick={() => setActiveTab(t)}
                                    className={`text-xs font-bold pb-1.5 capitalize transition-colors ${activeTab === t ? 'text-indigo-600 border-b-2 border-indigo-500' : 'text-gray-400'}`}>
                                    {t}
                                  </button>
                                ))}
                              </div>

                              {activeTab === 'lessons' && course.lessons?.map((lesson, idx) => {
                                const done = enrollment.progress.completedLessons.includes(lesson._id);
                                const videoOpen = activeVideo === lesson._id;
                                return (
                                  <div key={lesson._id}>
                                    <div className="flex items-center gap-3 py-2.5 px-3 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
                                      onClick={() => setActiveVideo(videoOpen ? null : lesson._id)}>
                                      <button id={`mark-${lesson._id}`}
                                        onClick={e => { e.stopPropagation(); handleLessonComplete(course._id, lesson._id); }}
                                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                                        style={{ background: done ? '#009688' : '#e8e8f0' }}>
                                        {done && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>}
                                      </button>
                                      <span className="flex-1 text-xs font-medium" style={{ color: done ? '#9ca3af' : '#374151', textDecoration: done ? 'line-through' : 'none' }}>
                                        {String(idx + 1).padStart(2,'0')}. {lesson.title}
                                      </span>
                                      <span className="text-[10px] text-gray-400 font-mono">{lesson.duration}</span>
                                    </div>
                                    {videoOpen && (
                                      <div className="mx-3 mb-2 rounded-xl overflow-hidden bg-gray-900">
                                        <div className="relative" style={{ paddingBottom: '56.25%' }}>
                                          <iframe src={lesson.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
                                            className="absolute inset-0 w-full h-full" allowFullScreen title={lesson.title}/>
                                        </div>
                                        {!done && (
                                          <div className="flex justify-end p-3">
                                            <button onClick={() => handleLessonComplete(course._id, lesson._id)}
                                              className="text-xs font-bold px-4 py-2 rounded-lg text-white" style={{ background: '#009688' }}>
                                              ✓ Mark Complete
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}

                              {activeTab === 'assignments' && (course.assignments?.length > 0 ? course.assignments.map((a) => {
                                const completed = enrollment.progress.completedAssignments?.some(ca =>
                                  (ca.assignment || ca) === a._id || ca.assignment?.toString() === a._id
                                );
                                const submitting = submittingAssignment === a._id;
                                return (
                                  <div key={a._id} className="p-3 rounded-xl border border-gray-100">
                                    <div className="flex items-start justify-between gap-3">
                                      <div>
                                        <p className="text-xs font-bold text-gray-800">{a.title}</p>
                                        <p className="text-[10px] text-gray-400 mt-0.5">{a.points} pts</p>
                                      </div>
                                      {!completed ? (
                                        <button onClick={() => setSubmittingAssignment(submitting ? null : a._id)}
                                          className="text-xs font-bold px-3 py-1.5 rounded-lg text-white flex-shrink-0" style={{ background: '#3f51b5' }}>
                                          {submitting ? 'Cancel' : 'Submit'}
                                        </button>
                                      ) : (
                                        <span className="text-xs font-bold text-green-600 px-3 py-1.5 rounded-lg bg-green-50">Done</span>
                                      )}
                                    </div>
                                    {submitting && (
                                      <div className="mt-3 space-y-2">
                                        <input type="url" placeholder="https://your-link.com" className="w-full text-xs p-2 rounded-lg border border-gray-200 outline-none"
                                          value={assignmentLink} onChange={e => setAssignmentLink(e.target.value)}/>
                                        <input type="file" className="text-xs w-full" onChange={e => setAssignmentFile(e.target.files[0])}/>
                                        <button onClick={() => confirmAssignment(course._id, a._id)} disabled={isUploading || (!assignmentFile && !assignmentLink)}
                                          className="w-full text-xs font-bold py-2 rounded-lg text-white disabled:opacity-50" style={{ background: '#009688' }}>
                                          {isUploading ? 'Uploading…' : 'Confirm Submission'}
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                );
                              }) : <p className="text-xs text-gray-400 py-2">No assignments for this course.</p>)}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#f0f1ff' }}>
                    <svg className="w-8 h-8" style={{ color: '#3f51b5' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>No Active Modules</h3>
                  <p className="text-sm text-gray-400 mb-6">Enroll in a course to begin your scholarly journey.</p>
                  <Link to="/courses" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: '#3f51b5' }}>
                    Browse Library
                  </Link>
                </div>
              )}
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-2xl p-7 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Manrope, sans-serif' }}>Upcoming Deadlines</h2>
              <div className="space-y-0">
                {DEADLINES.map((d, i) => (
                  <div key={i} className={`flex items-start gap-5 py-5 ${i < DEADLINES.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <div className="flex flex-col items-center gap-1 flex-shrink-0 w-16">
                      <div className="w-2.5 h-2.5 rounded-full mt-1.5" style={{ background: d.accent }}/>
                      <div className="w-px flex-1 bg-gray-100" style={{ minHeight: '40px' }}/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: d.accent }}>{d.urgency}</p>
                      <p className="font-bold text-sm text-gray-900 mb-0.5" style={{ fontFamily: 'Manrope, sans-serif', color: '#3f51b5' }}>{d.title}</p>
                      <p className="text-xs text-gray-400">{d.course}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {d.actions.map((action) => (
                        <button key={action}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
                          style={{
                            background: action === d.actions[d.actions.length - 1] ? '#3f51b5' : 'white',
                            color: action === d.actions[d.actions.length - 1] ? 'white' : '#374151',
                            border: action === d.actions[d.actions.length - 1] ? 'none' : '1.5px solid #e5e7eb',
                          }}>
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <AIChatBot courseContext="My Learning Dashboard"/>
    </div>
  );
}
