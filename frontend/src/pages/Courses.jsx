import { useState, useEffect } from 'react';
import { courseService } from '../services/courseService';
import CourseCard from '../components/CourseCard';
import Loading from '../components/Loading';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    search: '',
  });

  const categories = [
    'All',
    'Web Development',
    'Mobile Development',
    'Data Science',
    'AI/ML',
    'Design',
    'Business',
    'Marketing',
  ];

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    fetchCourses();
  }, [filters]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const filterParams = {
        ...(filters.category && filters.category !== 'All' && { category: filters.category }),
        ...(filters.difficulty && filters.difficulty !== 'All' && { difficulty: filters.difficulty }),
        ...(filters.search && { search: filters.search }),
      };
      const data = await courseService.getCourses(filterParams);
      setCourses(data);
      setError('');
    } catch (err) {
      setError('Failed to load courses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value,
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">
            Explore Our <span className="gradient-text">Courses</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover courses that match your interests and career goals
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Search Courses
              </label>
              <input
                type="text"
                placeholder="Search by title or description..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="input-field"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="input-field"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat === 'All' ? '' : cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Difficulty
              </label>
              <select
                value={filters.difficulty}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                className="input-field"
              >
                {difficulties.map((diff) => (
                  <option key={diff} value={diff === 'All' ? '' : diff}>
                    {diff}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <Loading message="Loading courses..." />
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-slate-600 font-semibold">
                Found {courses.length} {courses.length === 1 ? 'course' : 'courses'}
              </p>
            </div>

            {/* Courses Grid */}
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">No Courses Found</h3>
                <p className="text-slate-600">
                  Try adjusting your filters to find more courses
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Courses;
