import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { courseService } from '../services/courseService';
import CourseCard from '../components/CourseCard';
import Loading from '../components/Loading';

const CATEGORIES = ['All', 'Web Development', 'Mobile Development', 'Data Science', 'AI/ML', 'Design', 'Business', 'Marketing'];
const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const Courses = () => {
  const [searchParams] = useSearchParams();
  const [courses, setCourses]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [filters, setFilters]   = useState({
    category:   searchParams.get('category') || '',
    difficulty: '',
    search:     '',
  });

  useEffect(() => { fetchCourses(); }, [filters]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const params = {
        ...(filters.category   && filters.category   !== 'All' && { category:   filters.category }),
        ...(filters.difficulty && filters.difficulty !== 'All' && { difficulty: filters.difficulty }),
        ...(filters.search && { search: filters.search }),
      };
      const data = await courseService.getCourses(params);
      setCourses(data);
      setError('');
    } catch {
      setError('Failed to load courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const set = (key, val) => setFilters(f => ({ ...f, [key]: val }));

  return (
    <div className="min-h-screen" style={{ background: 'var(--surface)' }}>

      {/* Hero strip */}
      <div className="py-14 px-4" style={{ background: 'var(--surface-container-low)' }}>
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-2">Catalog</p>
          <h1 className="text-4xl lg:text-5xl font-bold mb-3 animate-slide-up"
            style={{ fontFamily: 'Manrope, sans-serif', color: 'var(--on-surface)' }}>
            Explore Our <span className="gradient-text">Courses</span>
          </h1>
          <p className="text-lg max-w-xl animate-slide-up delay-100"
            style={{ color: 'var(--on-surface-variant)' }}>
            Discover expert-led courses designed for today's learners and tomorrow's careers.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Filters bar */}
        <div className="rounded-2xl p-5 mb-8 animate-fade-in"
          style={{ background: 'var(--surface-container-lowest)', boxShadow: 'var(--shadow-card)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-1">
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--outline)' }}>
                Search
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--outline)' }}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  id="courses-search"
                  type="text"
                  placeholder="e.g. React, Python…"
                  value={filters.search}
                  onChange={(e) => set('search', e.target.value)}
                  className="input-field pl-9"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--outline)' }}>
                Category
              </label>
              <select
                id="courses-category"
                value={filters.category}
                onChange={(e) => set('category', e.target.value)}
                className="input-field"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c === 'All' ? '' : c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--outline)' }}>
                Difficulty
              </label>
              <select
                id="courses-difficulty"
                value={filters.difficulty}
                onChange={(e) => set('difficulty', e.target.value)}
                className="input-field"
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d === 'All' ? '' : d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4" style={{ borderTop: '1px solid rgba(197,197,212,0.25)' }}>
            {CATEGORIES.map((cat) => {
              const active = (filters.category === '' && cat === 'All') || filters.category === cat;
              return (
                <button
                  key={cat}
                  id={`cat-chip-${cat.toLowerCase().replace(/\s+/g,'-')}`}
                  onClick={() => set('category', cat === 'All' ? '' : cat)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                  style={{
                    background: active ? 'var(--primary-container)' : 'var(--surface-container-low)',
                    color: active ? 'white' : 'var(--on-surface-variant)',
                    transform: active ? 'scale(1.04)' : 'scale(1)',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 px-4 py-3 rounded-xl text-sm font-medium animate-fade-in"
            style={{ background: 'rgba(186,26,26,0.08)', color: '#ba1a1a', border: '1px solid rgba(186,26,26,0.15)' }}>
            {error}
          </div>
        )}

        {/* Results count */}
        {!loading && (
          <p className="text-sm font-semibold mb-6 animate-fade-in" style={{ color: 'var(--outline)' }}>
            {courses.length} {courses.length === 1 ? 'course' : 'courses'} found
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <Loading message="Loading courses…" />
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <div key={course._id} className="animate-fade-in" style={{ animationDelay: `${i * 0.06}s` }}>
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
              style={{ background: 'var(--surface-container-low)' }}>
              <svg className="w-10 h-10" style={{ color: 'var(--outline)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Manrope, sans-serif', color: 'var(--on-surface)' }}>
              No courses found
            </h3>
            <p className="text-sm text-center max-w-xs" style={{ color: 'var(--outline)' }}>
              Try adjusting your search or filters to discover more courses.
            </p>
            <button
              onClick={() => setFilters({ category: '', difficulty: '', search: '' })}
              className="btn-secondary mt-6 text-sm"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
