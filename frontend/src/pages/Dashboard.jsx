import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { enrollmentService } from '../services/enrollmentService';
import { uploadService } from '../services/uploadService';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import AIChatBot from '../components/AIChatBot';

const Dashboard = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('lessons');
  const [activeVideo, setActiveVideo] = useState(null);
  
  // Assignment Submission States
  const [submittingAssignment, setSubmittingAssignment] = useState(null);
  const [assignmentLink, setAssignmentLink] = useState('');
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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
    setActiveTab('lessons');
    setSubmittingAssignment(null);
  };

  const handleAssignmentSubmitClick = (assignmentId) => {
    setSubmittingAssignment(submittingAssignment === assignmentId ? null : assignmentId);
    setAssignmentLink('');
    setAssignmentFile(null);
  };

  const confirmAssignmentComplete = async (courseId, assignmentId) => {
    try {
      setIsUploading(true);
      let fileUrl = '';
      
      if (assignmentFile) {
        const uploadData = await uploadService.uploadFile(assignmentFile);
        fileUrl = uploadData.url;
      }
      
      await enrollmentService.completeAssignment(courseId, assignmentId, {
        linkUrl: assignmentLink,
        fileUrl: fileUrl
      });
      
      setSubmittingAssignment(null);
      setAssignmentLink('');
      setAssignmentFile(null);
      fetchEnrollments();
    } catch (err) {
      console.error('Failed to complete assignment:', err);
    } finally {
      setIsUploading(false);
    }
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

                    {/* Tabs / Lessons List (Expandable) */}
                    {expandedCourse === enrollment.course._id && (
                      <div className="mt-6 pt-6 border-t border-slate-200">
                        {/* Tab Headers */}
                        <div className="flex space-x-6 border-b border-slate-200 mb-6 px-2">
                          <button
                            onClick={() => setActiveTab('lessons')}
                            className={`pb-3 font-semibold text-sm transition-colors relative ${activeTab === 'lessons' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                          >
                            Lessons ({enrollment.course.lessons?.length || 0})
                            {activeTab === 'lessons' && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-blue-600 rounded-t-full"></div>}
                          </button>
                          
                          {enrollment.course.assignments && enrollment.course.assignments.length > 0 && (
                            <button
                              onClick={() => setActiveTab('assignments')}
                              className={`pb-3 font-semibold text-sm transition-colors relative ${activeTab === 'assignments' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                            >
                              Assignments ({enrollment.course.assignments.length})
                              {activeTab === 'assignments' && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-blue-600 rounded-t-full"></div>}
                            </button>
                          )}
                        </div>

                        {/* Tab Content: Lessons */}
                        {activeTab === 'lessons' && (
                          <div className="space-y-3">
                            {enrollment.course.lessons.map((lesson) => {
                              const isCompleted = enrollment.progress.completedLessons.includes(lesson._id);
                              
                              return (
                                <div key={lesson._id} className="flex flex-col space-y-2">
                                  <div
                                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                                    onClick={() => setActiveVideo(activeVideo === lesson._id ? null : lesson._id)}
                                  >
                                    <div className="flex items-center space-x-3 flex-1">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleLessonComplete(enrollment.course._id, lesson._id);
                                        }}
                                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                                          isCompleted
                                            ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)] text-white'
                                            : 'bg-slate-200 hover:bg-slate-300 text-slate-400 hover:text-slate-600 border-2 border-white'
                                        }`}
                                      >
                                        {isCompleted ? (
                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                          </svg>
                                        ) : (
                                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                          </svg>
                                        )}
                                      </button>
                                      <div>
                                        <p className={`font-semibold ${isCompleted ? 'text-slate-500' : 'text-slate-800'}`}>{lesson.title}</p>
                                        <p className="text-sm text-slate-500">{lesson.duration}</p>
                                      </div>
                                    </div>
                                    <div className="text-blue-600 font-medium text-sm flex items-center gap-1">
                                      {activeVideo === lesson._id ? 'Close Video' : 'Watch Video'}
                                    </div>
                                  </div>
                                  
                                  {/* Video Player */}
                                  {activeVideo === lesson._id && (
                                    <div className="p-4 bg-slate-900 rounded-xl overflow-hidden mt-2 animate-slide-up shadow-xl border border-slate-800">
                                      <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden border border-slate-700">
                                        <iframe
                                          src={lesson.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
                                          title={lesson.title}
                                          className="absolute top-0 left-0 w-full h-full"
                                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                          allowFullScreen
                                        ></iframe>
                                      </div>
                                      <div className="mt-4 flex justify-between items-center text-white">
                                        <h4 className="font-semibold px-2">{lesson.title}</h4>
                                        {!isCompleted && (
                                          <button 
                                            onClick={() => handleLessonComplete(enrollment.course._id, lesson._id)}
                                            className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-lg"
                                          >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Mark Complete
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Tab Content: Assignments */}
                        {activeTab === 'assignments' && enrollment.course.assignments && (
                          <div className="space-y-4 animate-fade-in">
                             {enrollment.course.assignments.map((assignment) => {
                               // Check if it's completed by looking for matching ID in completedAssignments array (which now contains objects)
                               const completedObj = enrollment.progress.completedAssignments?.find(
                                 (a) => a.assignment === assignment._id || (a.assignment && a.assignment._id === assignment._id)
                               ) || enrollment.progress.completedAssignments?.find((a) => typeof a === 'string' && a === assignment._id);
                               
                               const isCompleted = !!completedObj;
                               const isSubmitting = submittingAssignment === assignment._id;
                               
                               return (
                                  <div key={assignment._id} className={`p-6 rounded-xl border-2 transition-all ${isCompleted ? 'bg-green-50/50 border-green-200' : 'bg-white border-blue-100 hover:border-blue-300 hover:shadow-md'}`}>
                                     <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                        <div className="space-y-2 flex-1">
                                          <div className="flex items-center gap-2">
                                            {isCompleted ? (
                                              <span className="badge bg-green-100 text-green-700 font-bold px-2 py-1 flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                                                Completed
                                              </span>
                                            ) : (
                                              <span className="badge bg-blue-100 text-blue-700 font-bold px-2 py-1">Pending</span>
                                            )}
                                            <span className="text-sm font-bold text-slate-500">{assignment.points} Points</span>
                                          </div>
                                          <h4 className={`text-xl font-bold ${isCompleted ? 'text-slate-700' : 'text-slate-900'}`}>{assignment.title}</h4>
                                          <p className="text-slate-600 mb-4">{assignment.description}</p>
                                          
                                          {isCompleted && completedObj && (completedObj.linkUrl || completedObj.fileUrl) && (
                                            <div className="mt-4 p-4 bg-white/60 rounded-lg border border-green-100">
                                              <p className="text-sm font-semibold text-slate-700 mb-2">Your Submission:</p>
                                              {completedObj.fileUrl && (
                                                <a href={`http://localhost:5000${completedObj.fileUrl}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 mb-1">
                                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                                                  View Submitted File
                                                </a>
                                              )}
                                              {completedObj.linkUrl && (
                                                <a href={completedObj.linkUrl.startsWith('http') ? completedObj.linkUrl : `https://${completedObj.linkUrl}`} target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1">
                                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                                                  {completedObj.linkUrl}
                                                </a>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                        
                                        <div className="flex-shrink-0">
                                          {!isCompleted ? (
                                            <button 
                                              onClick={() => handleAssignmentSubmitClick(assignment._id)}
                                              className={`w-full md:w-auto px-6 py-3 rounded-xl font-bold transition-transform ${isSubmitting ? 'bg-slate-200 text-slate-800' : 'btn-primary bg-blue-600 hover:bg-blue-700 hover:scale-[1.02]'}`}
                                            >
                                              {isSubmitting ? 'Cancel' : 'Submit Assignment'}
                                            </button>
                                          ) : (
                                            <div className="w-full md:w-auto px-6 py-3 rounded-lg bg-green-100 text-green-800 font-bold border border-green-200 text-center flex justify-center items-center gap-2">
                                              Score: {assignment.points}/{assignment.points}
                                            </div>
                                          )}
                                        </div>
                                     </div>
                                     
                                     {/* Submission Form Dropdown */}
                                     {isSubmitting && (
                                        <div className="mt-6 pt-6 border-t border-slate-200 animate-slide-up">
                                          <h5 className="font-bold text-slate-800 mb-4">Submit your work</h5>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                              <label className="block text-sm font-semibold text-slate-700 mb-2">Upload File (PDF, ZIP, Image)</label>
                                              <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 hover:border-blue-500 transition-colors bg-slate-50 cursor-pointer relative">
                                                <input 
                                                  type="file" 
                                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                  onChange={(e) => setAssignmentFile(e.target.files[0])}
                                                />
                                                <div className="text-center">
                                                  <svg className="w-8 h-8 text-slate-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                                                  <span className="text-sm text-slate-600 font-medium">
                                                    {assignmentFile ? assignmentFile.name : 'Click or drop file here'}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                            <div>
                                              <label className="block text-sm font-semibold text-slate-700 mb-2">External Link (GitHub, Drive, etc) </label>
                                              <input 
                                                type="url" 
                                                placeholder="https://..."
                                                className="input-field mb-2 bg-slate-50"
                                                value={assignmentLink}
                                                onChange={(e) => setAssignmentLink(e.target.value)}
                                              />
                                              <p className="text-xs text-slate-500">Provide a link to your hosted project or repository if applicable.</p>
                                            </div>
                                          </div>
                                          
                                          <div className="mt-6 flex justify-end">
                                            <button 
                                              onClick={() => confirmAssignmentComplete(enrollment.course._id, assignment._id)}
                                              disabled={isUploading || (!assignmentFile && !assignmentLink)}
                                              className="btn-primary flex items-center gap-2 disabled:opacity-50"
                                            >
                                              {isUploading ? (
                                                <>
                                                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                  Uploading...
                                                </>
                                              ) : (
                                                <>
                                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                                  Confirm Submission
                                                </>
                                              )}
                                            </button>
                                          </div>
                                        </div>
                                     )}
                                  </div>
                               );
                             })}
                          </div>
                        )}
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
      <AIChatBot courseContext={expandedCourse ? enrollments.find(e => e.course._id === expandedCourse)?.course.title : 'My Student Dashboard'} />
    </div>
  );
};

export default Dashboard;
