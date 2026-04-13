import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseService } from '../services/courseService';
import { enrollmentService } from '../services/enrollmentService';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import PaymentModal from '../components/PaymentModal';
import AIChatBot from '../components/AIChatBot';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    fetchCourse();
    checkEnrollment();
  }, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const data = await courseService.getCourse(id);
      setCourse(data);
    } catch (err) {
      setError('Failed to load course details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    if (!isAuthenticated) return;
    
    try {
      await enrollmentService.getEnrollment(id);
      setIsEnrolled(true);
    } catch (err) {
      setIsEnrolled(false);
    }
  };

  const openPaymentModal = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setIsPaymentModalOpen(true);
  };

  const handleEnroll = async () => {
    setIsPaymentModalOpen(false);
    setEnrolling(true);
    setError('');
    setSuccess('');

    try {
      await enrollmentService.enrollCourse(id);
      setSuccess('Successfully enrolled in course!');
      setIsEnrolled(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to enroll in course');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return <Loading message="Loading course..." />;
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Course not found</h2>
          <button onClick={() => navigate('/courses')} className="btn-primary">
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-700';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'Advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl animate-fade-in">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-xl animate-fade-in">
            <p className="text-green-700">{success}</p>
          </div>
        )}

        {/* Course Header */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Image */}
            <div className="card overflow-hidden animate-slide-up">
              <img
                src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'}
                alt={course.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            {/* Course Info */}
            <div className="card p-8 animate-fade-in">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="badge bg-blue-100 text-blue-700 text-sm">
                  {course.category}
                </span>
                <span className={`badge ${getDifficultyColor(course.difficulty)} text-sm`}>
                  {course.difficulty}
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-display font-bold mb-4">
                {course.title}
              </h1>

              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                {course.description}
              </p>

              {/* Free Intro Video Preview */}
              {course.lessons && course.lessons.length > 0 && course.lessons[0].videoUrl && (
                <div className="mb-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-900">
                  <div className="bg-slate-800 text-white px-4 py-3 text-sm font-semibold flex items-center gap-2 border-b border-slate-700">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Demo Available: {course.lessons[0].title}
                  </div>
                  <div className="relative pb-[56.25%] h-0">
                    <iframe
                      src={course.lessons[0].videoUrl}
                      title="Free Intro Course Preview"
                      className="absolute top-0 left-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-6 text-slate-600">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>{course.enrolledStudents} students enrolled</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{course.rating} rating</span>
                </div>
              </div>
            </div>

            {/* Instructor */}
            <div className="card p-8 animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">About the Instructor</h2>
              <div className="flex items-start space-x-4">
                <img
                  src={course.instructor.avatar || 'https://i.pravatar.cc/150?img=1'}
                  alt={course.instructor.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold mb-2">{course.instructor.name}</h3>
                  <p className="text-slate-600">{course.instructor.bio}</p>
                </div>
              </div>
            </div>

            {/* Course Syllabus */}
            <div className="card p-8 animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">Course Syllabus</h2>
              <div className="space-y-4">
                {course.lessons && course.lessons.length > 0 ? (
                  course.lessons.map((lesson, index) => (
                    <div
                      key={lesson._id}
                      className="border-2 border-slate-200 rounded-xl p-4 hover:border-blue-500 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                              {index + 1}
                            </span>
                            <h3 className="font-bold text-lg">{lesson.title}</h3>
                          </div>
                          <p className="text-slate-600 text-sm ml-11">{lesson.content}</p>
                        </div>
                        <span className="text-sm text-slate-600 whitespace-nowrap ml-4">
                          {lesson.duration}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-600">No lessons available yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-8 sticky top-24 animate-scale-in">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold gradient-text mb-2">
                  ₹599
                </div>
                <p className="text-slate-600">One-time payment</p>
              </div>

              {isEnrolled ? ( 
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full btn-primary mb-4"
                >
                  Go to Dashboard
                </button>
              ) : (
                <button
                  onClick={openPaymentModal}
                  disabled={enrolling}
                  className="w-full btn-primary mb-4 disabled:opacity-50"
                >
                  {enrolling ? 'Enrolling...' : 'Enroll Now'}
                </button>
              )}

              <div className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Difficulty:</span>
                  <span className="font-semibold">{course.difficulty}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Duration:</span>
                  <span className="font-semibold">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Lessons:</span>
                  <span className="font-semibold">{course.lessons?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Enrolled:</span>
                  <span className="font-semibold">{course.enrolledStudents}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={handleEnroll}
        courseTitle={course?.title}
        amount={course?.price || 599}
      />
      <AIChatBot courseContext={course?.title || 'EduFlow Course'} />
    </div>
  );
};

export default CourseDetail;
