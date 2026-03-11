import { Link } from "react-router-dom";
import { courseDetail } from "../../constants/routes";

const FILIERE_THEMES = {
  pc: {
    from: "#fff7ed",
    to: "#ffedd5",
    border: "#fed7aa",
    accent: "#f97316",
    dark: "#ea580c",
    icon: "⚗️",
    label: "PC",
  },
  svt: {
    from: "#f0fdf4",
    to: "#dcfce7",
    border: "#bbf7d0",
    accent: "#16a34a",
    dark: "#15803d",
    icon: "🧬",
    label: "SVT",
  },
  math: {
    from: "#eff6ff",
    to: "#dbeafe",
    border: "#bfdbfe",
    accent: "#2563eb",
    dark: "#1d4ed8",
    icon: "📐",
    label: "Maths",
  },
  eco: {
    from: "#fefce8",
    to: "#fef9c3",
    border: "#fde68a",
    accent: "#ca8a04",
    dark: "#a16207",
    icon: "📊",
    label: "Éco",
  },
  default: {
    from: "#f8fafc",
    to: "#f1f5f9",
    border: "#e2e8f0",
    accent: "#64748b",
    dark: "#475569",
    icon: "📚",
    label: "Cours",
  },
};

const RESOURCE_TYPES = [
  { key: "pdf", icon: "📄", label: "Cours PDF" },
  { key: "video", icon: "🎬", label: "Vidéo" },
  { key: "exercise", icon: "✏️", label: "Exercice PDF" },
  { key: "solution", icon: "✅", label: "Correction" },
  { key: "resume", icon: "📝", label: "Résumé" },
];

export default function CourseCard({ course }) {
  const key = course.filiere?.toLowerCase() || "default";
  const t = FILIERE_THEMES[key] || FILIERE_THEMES.default;
  const counts = course.resourceCount || {};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');

        .rcc {
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid #eef2f7;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          font-family: 'DM Sans', sans-serif;
          transition: box-shadow 0.2s, transform 0.2s;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }

        .rcc:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.1);
          transform: translateY(-3px);
        }

        /* ── HEADER ── */
        .rcc-header {
          padding: 18px 20px 16px;
          background: linear-gradient(135deg, var(--rcc-from), var(--rcc-to));
          border-bottom: 1px solid var(--rcc-border);
        }

        .rcc-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .rcc-icon-wrap {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: #fff;
          border: 1px solid var(--rcc-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .rcc-level {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--rcc-accent);
          background: #fff;
          border: 1px solid var(--rcc-border);
          padding: 3px 10px;
          border-radius: 100px;
        }

        .rcc-chapter {
          font-size: 10px;
          color: var(--rcc-accent);
          font-weight: 500;
          opacity: 0.7;
          margin-bottom: 4px;
          letter-spacing: 0.5px;
        }

        .rcc-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 14px;
          color: #0f172a;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ── RESOURCES ── */
        .rcc-resources {
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 7px;
          flex: 1;
        }

        .rcc-res-title {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: #cbd5e1;
          margin-bottom: 2px;
        }

        .rcc-res-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 12px;
          border-radius: 10px;
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          transition: background 0.15s, border-color 0.15s;
          text-decoration: none;
        }

        .rcc-res-row:hover {
          background: var(--rcc-from);
          border-color: var(--rcc-border);
        }

        .rcc-res-left {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .rcc-res-icon {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: #fff;
          border: 1px solid #eef2f7;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
          flex-shrink: 0;
        }

        .rcc-res-row:hover .rcc-res-icon {
          border-color: var(--rcc-border);
        }

        .rcc-res-name {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 12px;
          color: #1e293b;
        }

        .rcc-res-sub {
          font-size: 10px;
          color: #94a3b8;
          font-weight: 400;
          margin-top: 1px;
        }

        .rcc-res-right {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .rcc-res-count {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 13px;
          color: var(--rcc-accent);
        }

        .rcc-res-count-zero {
          font-size: 11px;
          color: #e2e8f0;
          font-weight: 400;
        }

        .rcc-res-arrow {
          font-size: 12px;
          color: var(--rcc-accent);
          opacity: 0;
          transition: opacity 0.15s, transform 0.15s;
        }

        .rcc-res-row:hover .rcc-res-arrow {
          opacity: 1;
          transform: translateX(2px);
        }

        
        .rcc-footer {
  margin: 0 16px 14px;
  padding: 10px 14px;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 12px;
  color: #f97316;
  transition: background 0.2s, color 0.2s;
  letter-spacing: 0.2px;
}

.rcc:hover .rcc-footer {
  background: #f97316;
  color: #fff;
  border-color: #f97316;
}
      `}</style>

      <div
        className="rcc"
        style={{
          "--rcc-from": t.from,
          "--rcc-to": t.to,
          "--rcc-border": t.border,
          "--rcc-accent": t.accent,
          "--rcc-dark": t.dark,
        }}
      >
        {/* header */}
        <div className="rcc-header">
          <div className="rcc-header-row">
            <div className="rcc-icon-wrap">{t.icon}</div>
            <span className="rcc-level">{course.level}</span>
          </div>
          <p className="rcc-chapter">
            {course.chapter} · {t.label}
          </p>
          <h3 className="rcc-title">{course.title}</h3>
        </div>

        <div className="rcc-resources">
          <p className="rcc-res-title">Ressources disponibles</p>

          {RESOURCE_TYPES.map(({ key: rkey, icon, label }) => {
            const count = counts[rkey] || 0;
            const hasRes = count > 0;

            return (
              <Link
                key={rkey}
                to={hasRes ? `${courseDetail(course.id)}?type=${rkey}` : "#"}
                onClick={(e) => !hasRes && e.preventDefault()}
                className="rcc-res-row"
                style={{
                  opacity: hasRes ? 1 : 0.45,
                  pointerEvents: hasRes ? "auto" : "none",
                }}
              >
                <div className="rcc-res-left">
                  <div className="rcc-res-icon">{icon}</div>
                  <div>
                    <div className="rcc-res-name">{label}</div>
                    <div className="rcc-res-sub">
                      {hasRes
                        ? `${count} fichier${count > 1 ? "s" : ""}`
                        : "Non disponible"}
                    </div>
                  </div>
                </div>
                <div className="rcc-res-right">
                  {hasRes ? (
                    <span className="rcc-res-count">{count}</span>
                  ) : (
                    <span className="rcc-res-count-zero">—</span>
                  )}
                  <span className="rcc-res-arrow">→</span>
                </div>
              </Link>
            );
          })}
        </div>

        <Link to={courseDetail(course.id)} className="rcc-footer">
          Voir tout le cours →
        </Link>
      </div>
    </>
  );
}
