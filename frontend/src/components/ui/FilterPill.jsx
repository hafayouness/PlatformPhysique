import clsx from "clsx";

export default function FilterPill({ active, onClick, children, className }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-display font-medium transition-all duration-150 border",
        active
          ? "bg-amber-500 text-slate-900 border-amber-500 font-bold shadow-md shadow-amber-500/20"
          : "bg-transparent text-slate-400 border-white/10 hover:border-white/20 hover:text-slate-200",
        className,
      )}
    >
      {children}
    </button>
  );
}
