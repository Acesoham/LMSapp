import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const difficultyConfig = {
    Beginner:     { bg: 'rgba(0,150,136,0.12)', color: '#006a60', label: 'Beginner' },
    Intermediate: { bg: 'rgba(245,158,11,0.12)', color: '#b45309', label: 'Intermediate' },
    Advanced:     { bg: 'rgba(239,68,68,0.12)',  color: '#b91c1c', label: 'Advanced' },
  };
  const diff = difficultyConfig[course.difficulty] || difficultyConfig.Beginner;

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(course.rating || 4));

  return (
    <div className="card ghost-border group flex flex-col h-full animate-fade-in">
      {/* Thumbnail */}
      <div className="relative overflow-hidden" style={{ height: '185px' }}>
        <img
          src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80'}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category badge overlay */}
        <span className="absolute top-3 left-3 badge text-white text-[10px]"
          style={{ background: 'rgba(26,27,34,0.65)', backdropFilter: 'blur(8px)' }}>
          {course.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Difficulty + Rating row */}
        <div className="flex items-center justify-between mb-3">
          <span className="badge text-[11px] font-bold"
            style={{ background: diff.bg, color: diff.color }}>
            {diff.label}
          </span>
          <div className="flex items-center gap-1">
            {stars.map((filled, i) => (
              <svg key={i} className="w-3.5 h-3.5"
                fill={filled ? '#f59e0b' : 'none'}
                stroke={filled ? '#f59e0b' : '#d1d5db'}
                viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs font-semibold ml-0.5" style={{ color: 'var(--outline)' }}>
              {course.rating || '4.9'}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base leading-snug mb-1 line-clamp-2 flex-1"
          style={{ fontFamily: 'Manrope, sans-serif', color: 'var(--on-surface)' }}>
          {course.title}
        </h3>

        {/* Instructor + Students */}
        <p className="text-xs mb-4 mt-1" style={{ color: 'var(--outline)' }}>
          {course.instructor?.name || 'Expert Instructor'} · {course.enrolledStudents || 0} students
        </p>

        {/* Progress (if enrolled) */}
        {course.progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--outline)' }}>
              <span>Progress</span>
              <span className="font-semibold" style={{ color: 'var(--secondary)' }}>{course.progress}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${course.progress}%` }} />
            </div>
          </div>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between pt-3 mt-auto"
          style={{ borderTop: '1px solid var(--outline-variant)', borderTopColor: 'rgba(197,197,212,0.3)' }}>
          <span className="text-lg font-bold gradient-text" style={{ fontFamily: 'Manrope, sans-serif' }}>
            ₹{course.price || 599}
          </span>
          <Link
            to={`/courses/${course._id}`}
            id={`course-card-${course._id}`}
            className="btn-primary text-xs px-4 py-2"
          >
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
