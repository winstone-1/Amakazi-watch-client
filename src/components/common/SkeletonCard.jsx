import React from "react";
function SkeletonCard({ className = '', lines = 3 }) {
  return (
    <div className={`animate-pulse rounded-[24px] border border-white/70 bg-white/60 p-5 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.16)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-800/60 ${className}`}>
      <div className="h-3 w-24 rounded-full bg-slate-200/80 dark:bg-slate-700/80" />
      <div className="mt-4 space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <div key={index} className="h-3 rounded-full bg-slate-200/70 dark:bg-slate-700/70" style={{ width: `${80 - index * 8}%` }} />
        ))}
      </div>
    </div>
  );
}

export default SkeletonCard;
