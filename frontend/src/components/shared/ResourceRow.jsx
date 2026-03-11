import { SERVER_URL } from "../../lib/axios";
import { RESOURCE_CONFIG } from "../../constants/filieres";
import clsx from "clsx";

export default function ResourceRow({ resource, indented = false }) {
  const cfg = RESOURCE_CONFIG[resource.type] || {};
  const isVideo =
    resource.type === "video" || resource.fileUrl?.endsWith(".mp4");
  const href = `${SERVER_URL}${resource.fileUrl}`;

  return (
    <div
      className={clsx(
        "flex items-center gap-4 border border-white/5 hover:border-white/10 rounded-xl px-4 py-3.5 transition-all group",
        indented ? "bg-green-500/3 ml-4" : "bg-surface/50 hover:bg-surface",
      )}
    >
      <div
        className={clsx(
          "w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0",
          cfg.bg,
          cfg.color,
        )}
      >
        {cfg.icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold truncate">
          {resource.title}
        </p>
        {resource.linkedResource && (
          <p className="text-slate-600 text-xs mt-0.5 truncate">
            ↳ Correction de : {resource.linkedResource.title}
          </p>
        )}
        <span
          className={clsx(
            "inline-block text-xs font-display mt-0.5",
            cfg.color,
          )}
        >
          {cfg.label}
        </span>
      </div>

      {resource.isFree ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className={clsx(
            "shrink-0 flex items-center gap-1.5 text-xs font-display font-bold px-4 py-2 rounded-lg border transition-all group-hover:scale-105",
            cfg.bg,
            cfg.color,
            cfg.border,
          )}
        >
          {isVideo ? "▶ Regarder" : "↓ Télécharger"}
        </a>
      ) : (
        <span className="shrink-0 inline-flex items-center gap-1.5 text-xs font-display px-4 py-2 rounded-lg bg-white/4 text-slate-500 border border-white/5">
          🔒 Premium
        </span>
      )}
    </div>
  );
}
