function QuickReplies({ replies, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 px-3 pb-2">
      {replies.map((reply) => (
        <button
          key={reply.label}
          type="button"
          onClick={() => onSelect(reply.value)}
          className="rounded-full border border-slate-200/70 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-orange-50 dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-orange-900/20"
        >
          {reply.label}
        </button>
      ))}
    </div>
  );
}

export default QuickReplies;
