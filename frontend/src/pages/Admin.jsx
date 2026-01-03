import { useState, useEffect } from 'react';
import { courseService } from '../services/courseService';
import { userService } from '../services/userService';
import { enrollmentService } from '../services/enrollmentService';
import Loading from '../components/Loading';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseFormData, setCourseFormData] = useState({
    title: '',
    description: '',
    category: 'Web Development',
    difficulty: 'Beginner',
    price: 0,
    duration: '',
    instructor: {
      name: '',
      bio: '',
      avatar: '',
    },
    thumbnail: '',
    lessons: [],
  });

  useEffect(() => {
    if (activeTab === 'courses') {
      fetchCourses();
    } else if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'enrollments') {
      fetchEnrollments();
    }
  }, [activeTab]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await courseService.getCourses();
      setCourses(data);
      setError('');
    } catch (err) {
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
      setError('');
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const data = await enrollmentService.getAllEnrollments();
      setEnrollments(data);
      setError('');
    } catch (err) {
      setError('Failed to load enrollments');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    
    try {
      await courseService.deleteCourse(id);
      fetchCourses();
    } catch (err) {
      setError('Failed to delete course');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await userService.deleteUser(id);
      fetchUsers();
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  const handleCourseFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingCourse) {
        await courseService.updateCourse(editingCourse._id, courseFormData);
      } else {
        await courseService.createCourse(courseFormData);
      }
      setShowCourseForm(false);
      setEditingCourse(null);
      resetCourseForm();
      fetchCourses();
    } catch (err) {
      setError('Failed to save course');
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setCourseFormData(course);
    setShowCourseForm(true);
  };

  const resetCourseForm = () => {
    setCourseFormData({
      title: '',
      description: '',
      category: 'Web Development',
      difficulty: 'Beginner',
      price: 0,
      duration: '',
      instructor: {
        name: '',
        bio: '',
        avatar: '',
      },
      thumbnail: '',
      lessons: [],
    });
  };

  const addLesson = () => {
    setCourseFormData({
      ...courseFormData,
      lessons: [
        ...courseFormData.lessons,
        { title: '', content: '', duration: '', order: courseFormData.lessons.length + 1 },
      ],
    });
  };

  const removeLesson = (index) => {
    const newLessons = courseFormData.lessons.filter((_, i) => i !== index);
    setCourseFormData({ ...courseFormData, lessons: newLessons });
  };

  const updateLesson = (index, field, value) => {
    const newLessons = [...courseFormData.lessons];
    newLessons[index] = { ...newLessons[index], [field]: value };
    setCourseFormData({ ...courseFormData, lessons: newLessons });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl lg:text-5xl font-display font-bold gradient-text mb-2">
            Admin Dashboard
          </h1>
          <p className="text-xl text-slate-600">Manage courses, users, and enrollments</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'courses'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            Courses
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'users'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('enrollments')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'enrollments'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            Enrollments
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {loading ? (
          <Loading />
        ) : (
          <>
            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">All Courses ({courses.length})</h2>
                  <button
                    onClick={() => {
                      resetCourseForm();
                      setEditingCourse(null);
                      setShowCourseForm(true);
                    }}
                    className="btn-primary"
                  >
                    + Add New Course
                  </button>
                </div>

                {/* Course Form Modal */}
                {showCourseForm && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl p-8 max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold">
                          {editingCourse ? 'Edit Course' : 'Create New Course'}
                        </h3>
                        <button
                          onClick={() => {
                            setShowCourseForm(false);
                            setEditingCourse(null);
                          }}
                          className="text-slate-600 hover:text-slate-900"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <form onSubmit={handleCourseFormSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Course Title *
                            </label>
                            <input
                              type="text"
                              required
                              value={courseFormData.title}
                              onChange={(e) =>
                                setCourseFormData({ ...courseFormData, title: e.target.value })
                              }
                              className="input-field"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Category *
                            </label>
                            <select
                              value={courseFormData.category}
                              onChange={(e) =>
                                setCourseFormData({ ...courseFormData, category: e.target.value })
                              }
                              className="input-field"
                            >
                              <option>Web Development</option>
                              <option>Mobile Development</option>
                              <option>Data Science</option>
                              <option>AI/ML</option>
                              <option>Design</option>
                              <option>Business</option>
                              <option>Marketing</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Difficulty *
                            </label>
                            <select
                              value={courseFormData.difficulty}
                              onChange={(e) =>
                                setCourseFormData({ ...courseFormData, difficulty: e.target.value })
                              }
                              className="input-field"
                            >
                              <option>Beginner</option>
                              <option>Intermediate</option>
                              <option>Advanced</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Price (₹) *
                            </label>
                            <input
                              type="number"
                              required
                              min="0"
                              step="0.01"
                              value={courseFormData.price}
                              onChange={(e) =>
                                setCourseFormData({
                                  ...courseFormData,
                                  price: parseFloat(e.target.value),
                                })
                              }
                              className="input-field"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Duration *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g., 20 hours"
                              value={courseFormData.duration}
                              onChange={(e) =>
                                setCourseFormData({ ...courseFormData, duration: e.target.value })
                              }
                              className="input-field"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Thumbnail URL
                            </label>
                            <input
                              type="text"
                              placeholder="https://..."
                              value={courseFormData.thumbnail}
                              onChange={(e) =>
                                setCourseFormData({ ...courseFormData, thumbnail: e.target.value })
                              }
                              className="input-field"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Description *
                          </label>
                          <textarea
                            required
                            rows="4"
                            value={courseFormData.description}
                            onChange={(e) =>
                              setCourseFormData({ ...courseFormData, description: e.target.value })
                            }
                            className="input-field"
                          />
                        </div>

                        <div>
                          <h4 className="font-bold mb-4">Instructor Information</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Name *
                              </label>
                              <input
                                type="text"
                                required
                                value={courseFormData.instructor.name}
                                onChange={(e) =>
                                  setCourseFormData({
                                    ...courseFormData,
                                    instructor: { ...courseFormData.instructor, name: e.target.value },
                                  })
                                }
                                className="input-field"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Avatar URL
                              </label>
                              <input
                                type="text"
                                value={courseFormData.instructor.avatar}
                                onChange={(e) =>
                                  setCourseFormData({
                                    ...courseFormData,
                                    instructor: { ...courseFormData.instructor, avatar: e.target.value },
                                  })
                                }
                                className="input-field"
                              />
                            </div>
                          </div>
                          <div className="mt-4">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Bio *
                            </label>
                            <textarea
                              required
                              rows="2"
                              value={courseFormData.instructor.bio}
                              onChange={(e) =>
                                setCourseFormData({
                                  ...courseFormData,
                                  instructor: { ...courseFormData.instructor, bio: e.target.value },
                                })
                              }
                              className="input-field"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold">Lessons</h4>
                            <button
                              type="button"
                              onClick={addLesson}
                              className="text-blue-600 font-semibold hover:text-blue-700"
                            >
                              + Add Lesson
                            </button>
                          </div>
                          <div className="space-y-4">
                            {courseFormData.lessons.map((lesson, index) => (
                              <div key={index} className="border-2 border-slate-200 rounded-xl p-4">
                                <div className="flex justify-between items-start mb-4">
                                  <span className="font-semibold">Lesson {index + 1}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeLesson(index)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    Remove
                                  </button>
                                </div>
                                <div className="grid gap-4">
                                  <input
                                    type="text"
                                    placeholder="Lesson title"
                                    value={lesson.title}
                                    onChange={(e) => updateLesson(index, 'title', e.target.value)}
                                    className="input-field"
                                  />
                                  <textarea
                                    placeholder="Lesson content"
                                    rows="2"
                                    value={lesson.content}
                                    onChange={(e) => updateLesson(index, 'content', e.target.value)}
                                    className="input-field"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Duration (e.g., 1 hour)"
                                    value={lesson.duration}
                                    onChange={(e) => updateLesson(index, 'duration', e.target.value)}
                                    className="input-field"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-4">
                          <button type="submit" className="btn-primary flex-1">
                            {editingCourse ? 'Update Course' : 'Create Course'}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowCourseForm(false);
                              setEditingCourse(null);
                            }}
                            className="btn-secondary flex-1"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* Courses Table */}
                <div className="card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Course
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Category
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Price
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Students
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {courses.map((course) => (
                          <tr key={course._id} className="hover:bg-slate-50">
                            <td className="px-6 py-4">
                              <div className="font-semibold">{course.title}</div>
                              <div className="text-sm text-slate-600">{course.difficulty}</div>
                            </td>
                            <td className="px-6 py-4 text-sm">{course.category}</td>
                            <td className="px-6 py-4 text-sm font-semibold">₹599</td>
                            <td className="px-6 py-4 text-sm">{course.enrolledStudents}</td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleEditCourse(course)}
                                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteCourse(course._id)}
                                  className="text-red-600 hover:text-red-700 font-semibold text-sm"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">All Users ({users.length})</h2>
                <div className="card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Name
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Email
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Role
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Enrolled Courses
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {users.map((user) => (
                          <tr key={user._id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-semibold">{user.name}</td>
                            <td className="px-6 py-4 text-sm">{user.email}</td>
                            <td className="px-6 py-4">
                              <span
                                className={`badge ${
                                  user.role === 'admin'
                                    ? 'bg-purple-100 text-purple-700'
                                    : 'bg-blue-100 text-blue-700'
                                }`}
                              >
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm">{user.enrolledCourses.length}</td>
                            <td className="px-6 py-4">
                              {user.role !== 'admin' && (
                                <button
                                  onClick={() => handleDeleteUser(user._id)}
                                  className="text-red-600 hover:text-red-700 font-semibold text-sm"
                                >
                                  Delete
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Enrollments Tab */}
            {activeTab === 'enrollments' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">All Enrollments ({enrollments.length})</h2>
                <div className="card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Student
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Course
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Progress
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Enrolled Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {enrollments.map((enrollment) => (
                          <tr key={enrollment._id} className="hover:bg-slate-50">
                            <td className="px-6 py-4">
                              <div className="font-semibold">{enrollment.user?.name}</div>
                              <div className="text-sm text-slate-600">{enrollment.user?.email}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-semibold">{enrollment.course?.title}</div>
                              <div className="text-sm text-slate-600">
                                {enrollment.course?.category}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-24 bg-slate-200 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full"
                                    style={{ width: `${enrollment.progress.percentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-semibold">
                                  {enrollment.progress.percentage}%
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              {new Date(enrollment.enrolledAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
