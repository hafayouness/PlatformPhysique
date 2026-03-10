import clsx from "clsx";

export function Input({ label, error, className, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-xs font-display font-semibold text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        className={clsx(
          "w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm outline-none transition-all placeholder:text-slate-600",
          "focus:border-amber-500/60 focus:bg-white/8 focus:ring-2 focus:ring-amber-500/10",
          error ? "border-red-500/40" : "border-white/10 hover:border-white/20",
          className,
        )}
        {...props}
      />
      {error && <p className="text-red-400 text-xs font-display">{error}</p>}
    </div>
  );
}

export function Select({ label, options = [], className, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-xs font-display font-semibold text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <select
        className={clsx(
          "w-full bg-surface border border-white/10 hover:border-white/20 focus:border-amber-500/60",
          "rounded-xl px-4 py-3 text-white text-sm outline-none transition-all focus:ring-2 focus:ring-amber-500/10",
          className,
        )}
        {...props}
      >
        {options.map((o) => (
          <option
            key={o.value}
            value={o.value}
            style={{ background: "#0c1020" }}
          >
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function FileInput({ label, accept, onChange, file, className }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-xs font-display font-semibold text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        type="file"
        accept={accept}
        onChange={onChange}
        className={clsx(
          "w-full text-slate-400 text-sm",
          "file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0",
          "file:bg-white/8 file:text-white file:text-xs file:font-display file:cursor-pointer",
          "hover:file:bg-white/12 transition-all",
          className,
        )}
      />
      {file && (
        <p className="text-xs text-amber-400 font-display">✓ {file.name}</p>
      )}
    </div>
  );
}
