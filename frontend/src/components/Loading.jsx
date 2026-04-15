const Loading = ({ message = 'Loading…' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-5">
      {/* Dual ring spinner */}
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full"
          style={{ border: '3px solid var(--surface-container)' }} />
        <div className="absolute inset-0 rounded-full"
          style={{
            border: '3px solid transparent',
            borderTopColor: 'var(--primary-container)',
            animation: 'spin 0.75s linear infinite',
          }} />
        <div className="absolute inset-[6px] rounded-full"
          style={{
            border: '3px solid transparent',
            borderTopColor: 'var(--secondary)',
            animation: 'spin 1s linear infinite reverse',
          }} />
      </div>
      <p className="text-sm font-semibold animate-pulse" style={{ color: 'var(--outline)' }}>
        {message}
      </p>
    </div>
  );
};

export default Loading;
