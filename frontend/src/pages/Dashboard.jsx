import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { enrollmentService } from '../services/enrollmentService';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

const Dashboard = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedCourse, setExpandedCourse] = useState(null);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const data = await enrollmentService.getMyEnrollments();
      setEnrollments(data);
    } catch (err) {
      setError('Failed to load enrollments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLessonComplete = async (courseId, lessonId) => {
    try {
      await enrollmentService.updateProgress(courseId, lessonId);
      // Refresh enrollments
      fetchEnrollments();
    } catch (err) {
      console.error('Failed to update progress:', err);
    }
  };

  const toggleCourseExpansion = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  if (loading) {
    return <Loading message="Loading your dashboard..." />;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 animate-slide-up">
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-2">
            Welcome back, <span className="gradient-text">{user?.name}</span>
          </h1>
          <p className="text-xl text-slate-600">
            Continue your learning journey
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card p-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-semibold mb-1">Enrolled Courses</p>
                <p className="text-3xl font-bold gradient-text">{enrollments.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-semibold mb-1">Average Progress</p>
                <p className="text-3xl font-bold gradient-text">
                  {enrollments.length > 0
                    ? Math.round(
                        enrollments.reduce((acc, e) => acc + e.progress.percentage, 0) /
                          enrollments.length
                      )
                    : 0}%
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-semibold mb-1">Completed Courses</p>
                <p className="text-3xl font-bold gradient-text">
                  {enrollments.filter((e) => e.progress.percentage === 100).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Enrolled Courses */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">My Courses</h2>
          
          {enrollments.length > 0 ? (
            <div className="space-y-6">
              {enrollments.map((enrollment) => (
                <div key={enrollment._id} className="card overflow-hidden animate-fade-in">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Course Image */}
                      <img
                        src={enrollment.course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400'}
                        alt={enrollment.course.title}
                        className="w-full lg:w-48 h-32 object-cover rounded-xl"
                      />
                      
                      {/* Course Info */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                          <div>
                            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                              {enrollment.course.category}
                            </span>
                            <h3 className="text-xl font-bold mt-2">{enrollment.course.title}</h3>
                          </div>
                          <button
                            onClick={() => toggleCourseExpansion(enrollment.course._id)}
                            className="btn-secondary text-sm px-4 py-2"
                          >
                            {expandedCourse === enrollment.course._id ? 'Hide Lessons' : 'View Lessons'}
                          </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-slate-600">Progress</span>
                            <span className="text-sm font-bold text-blue-600">
                              {enrollment.progress.percentage}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                              style={{ width: `${enrollment.progress.percentage}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-slate-600">
                          <span>
                            {enrollment.progress.completedLessons.length} of {enrollment.course.lessons.length} lessons completed
                          </span>
                          <span>
                            Last accessed: {new Date(enrollment.lastAccessedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Lessons List (Expandable) */}
                    {expandedCourse === enrollment.course._id && (
                      <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
                        {enrollment.course.lessons.map((lesson) => {
                          const isCompleted = enrollment.progress.completedLessons.includes(lesson._id);
                          
                          return (
                            <div
                              key={lesson._id}
                              className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                            >
                              <div className="flex items-center space-x-3 flex-1">
                                <button
                                  onClick={() => handleLessonComplete(enrollment.course._id, lesson._id)}
                                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                                    isCompleted
                                      ? 'bg-green-500'
                                      : 'bg-slate-300 hover:bg-slate-400'
                                  }`}
                                >
                                  {isCompleted && (
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </button>
                                <div>
                                  <p className="font-semibold">{lesson.title}</p>
                                  <p className="text-sm text-slate-600">{lesson.duration}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No Courses Yet</h3>
              <p className="text-slate-600 mb-6">
                Start your learning journey by enrolling in a course
              </p>
              <Link to="/courses" className="btn-primary inline-block">
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
