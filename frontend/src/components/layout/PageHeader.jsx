import { Link } from "react-router-dom";

export default function PageHeader({
  title,
  subtitle,
  backTo,
  backLabel,
  children,
}) {
  return (
    <div className="bg-surface/40 border-b border-white/5 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {backTo && (
          <Link
            to={backTo}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-sm mb-5 transition-colors font-display"
          >
            ← {backLabel || "Retour"}
          </Link>
        )}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-slate-500 text-base max-w-2xl">{subtitle}</p>
            )}
          </div>
          {children && <div className="flex gap-3 flex-wrap">{children}</div>}
        </div>
      </div>
    </div>
  );
}
