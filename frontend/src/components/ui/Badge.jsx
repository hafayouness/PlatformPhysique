import clsx from "clsx";
import { FILIERE_MAP } from "../../constants/filieres";

export function FiliereBadge({ filiere, className }) {
  const f = FILIERE_MAP[filiere];
  if (!f)
    return (
      <span
        className={clsx(
          "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-display font-semibold bg-white/5 text-slate-400 border border-white/10",
          className,
        )}
      >
        {filiere}
      </span>
    );
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-display font-semibold border",
        f.bg,
        f.accent,
        f.border,
        className,
      )}
    >
      {f.short || filiere}
    </span>
  );
}

export function LevelBadge({ level, className }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-display font-semibold uppercase tracking-wider bg-white/5 text-slate-300 border border-white/10",
        className,
      )}
    >
      {level}
    </span>
  );
}

export function SessionBadge({ session }) {
  const isRattrapage = session === "rattrapage";
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-display font-medium border",
        isRattrapage
          ? "bg-red-500/10 text-red-400 border-red-500/20"
          : "bg-white/5 text-slate-400 border-white/10",
      )}
    >
      {isRattrapage ? "↩ Rattrapage" : "📅 Session normale"}
    </span>
  );
}
