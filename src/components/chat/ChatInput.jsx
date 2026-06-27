import { Paperclip, Send } from 'lucide-react';

function ChatInput({ value, onChange, onSend, disabled, placeholder }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-slate-200/70 bg-white/80 p-2 shadow-inner dark:border-white/10 dark:bg-slate-800/70">
      <button type="button" className="rounded-full p-2 text-slate-500 transition hover:bg-orange-50 hover:text-primary dark:text-slate-400 dark:hover:bg-orange-900/20" aria-label="Attach file">
        <Paperclip className="h-4 w-4" />
      </button>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            onSend();
          }
        }}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 border-0 bg-transparent px-2 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-100"
      />
      <button
        type="button"
        onClick={onSend}
        disabled={disabled || !value.trim()}
        className="rounded-full bg-primary p-2.5 text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Send message"
      >
        <Send className="h-4 w-4" />
      </button>
    </div>
  );
}

export default ChatInput;
