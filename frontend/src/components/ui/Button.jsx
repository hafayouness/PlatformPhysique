import clsx from "clsx";

const VARIANTS = {
  primary:
    "bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold shadow-lg shadow-amber-500/20",
  secondary:
    "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10",
  danger:
    "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20",
  ghost: "hover:bg-white/5 text-slate-400 hover:text-white",
  outline: "border border-amber-500/40 text-amber-400 hover:bg-amber-500/10",
};
const SIZES = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
  xl: "px-10 py-4 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  ...props
}) {
  return (
    <button
      disabled={loading || props.disabled}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl font-display transition-all duration-150",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {loading && (
        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
