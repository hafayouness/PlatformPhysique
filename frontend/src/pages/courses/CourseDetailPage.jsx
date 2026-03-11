import { useParams } from "react-router-dom";
import { useState } from "react";
import { useCourse } from "../../hooks/useCourse";
import { useCoursesFilterStore } from "../../stores/Coursesfilterstore";
import { Skeleton, ResourceRowSkeleton } from "../../components/ui/Skeleton";
import { ROUTES } from "../../constants/routes";

const TABS = [
  { key: "all", label: "Tout", icon: "◈" },
  { key: "pdf", label: "Cours", icon: "📄" },
  { key: "resume", label: "Résumés", icon: "📌" },
  { key: "video", label: "Vidéos", icon: "▶" },
  { key: "exercise", label: "Exercices", icon: "✏️" },
  { key: "solution", label: "Solutions", icon: "✅" },
];

const TYPE_ORDER = { pdf: 1, video: 2, exercise: 3, solution: 4, resume: 5 };

const FILIERE_THEMES = {
  pc: {
    from: "#fff7ed",
    border: "#fed7aa",
    accent: "#f97316",
    icon: "⚗️",
    label: "PC",
  },
  svt: {
    from: "#f0fdf4",
    border: "#bbf7d0",
    accent: "#16a34a",
    icon: "🧬",
    label: "SVT",
  },
  math: {
    from: "#eff6ff",
    border: "#bfdbfe",
    accent: "#2563eb",
    icon: "📐",
    label: "Maths",
  },
  eco: {
    from: "#fefce8",
    border: "#fde68a",
    accent: "#ca8a04",
    icon: "📊",
    label: "Éco",
  },
  default: {
    from: "#f8fafc",
    border: "#e2e8f0",
    accent: "#64748b",
    icon: "📚",
    label: "Cours",
  },
};

const TYPE_CONFIG = {
  pdf: {
    icon: "📄",
    label: "Cours PDF",
    color: "#f97316",
    bg: "#fff7ed",
    border: "#fed7aa",
  },
  video: {
    icon: "🎬",
    label: "Vidéo",
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
  },
  exercise: {
    icon: "✏️",
    label: "Exercice",
    color: "#ca8a04",
    bg: "#fefce8",
    border: "#fde68a",
  },
  solution: {
    icon: "✅",
    label: "Correction",
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#bbf7d0",
  },
  resume: {
    icon: "📝",
    label: "Résumé",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    border: "#ddd6fe",
  },
};

function PdfModal({ url, title, onClose }) {
  return (
    <>
      <style>{`
        .pdf-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        .pdf-modal {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          width: 100%; max-width: 900px;
          height: 85vh;
          display: flex; flex-direction: column;
          box-shadow: 0 32px 80px rgba(0,0,0,0.25);
          animation: slideUp 0.25s ease;
        }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .pdf-modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid #f1f5f9;
        }
        .pdf-modal-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 14px; color: #0f172a;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 600px;
        }
        .pdf-modal-actions { display: flex; gap: 8px; flex-shrink: 0; }
        .pdf-modal-btn {
          font-family: 'Syne', sans-serif;
          font-weight: 700; font-size: 12px;
          padding: 7px 14px; border-radius: 8px; border: none;
          cursor: pointer; transition: all 0.15s;
          display: flex; align-items: center; gap: 5px;
          text-decoration: none;
        }
        .pdf-modal-btn.download { background: #f97316; color: #fff; box-shadow: 0 4px 12px rgba(249,115,22,0.3); }
        .pdf-modal-btn.download:hover { background: #ea580c; }
        .pdf-modal-btn.close { background: #f1f5f9; color: #64748b; }
        .pdf-modal-btn.close:hover { background: #e2e8f0; }
        .pdf-modal-body { flex: 1; overflow: hidden; }
        .pdf-modal-body iframe { width: 100%; height: 100%; border: none; }
      `}</style>

      <div className="pdf-overlay" onClick={onClose}>
        <div className="pdf-modal" onClick={(e) => e.stopPropagation()}>
          <div className="pdf-modal-header">
            <span className="pdf-modal-title">📄 {title}</span>
            <div className="pdf-modal-actions">
              <a href={url} download className="pdf-modal-btn download">
                ⬇ Télécharger
              </a>
              <button className="pdf-modal-btn close" onClick={onClose}>
                ✕ Fermer
              </button>
            </div>
          </div>
          <div className="pdf-modal-body">
            <iframe src={url} title={title} />
          </div>
        </div>
      </div>
    </>
  );
}

function ResourceItem({ resource, indented = false }) {
  const [pdfOpen, setPdfOpen] = useState(false);
  const isPdf = ["pdf", "exercise", "solution", "resume"].includes(
    resource.type,
  );
  const isVideo = resource.type === "video";
  const cfg = TYPE_CONFIG[resource.type] || TYPE_CONFIG.pdf;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        .ri-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 16px;
          background: #fff;
          border: 1px solid #f1f5f9;
          border-radius: 12px;
          transition: box-shadow 0.15s, border-color 0.15s;
          font-family: 'DM Sans', sans-serif;
          gap: 12px;
        }
        .ri-row:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.07); border-color: #e2e8f0; }
        .ri-row.indented { margin-left: 24px; background: #fafafa; }
        .ri-left { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }
        .ri-icon {
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 17px; flex-shrink: 0; border: 1px solid;
        }
        .ri-info { min-width: 0; }
        .ri-name {
          font-family: 'Syne', sans-serif;
          font-weight: 700; font-size: 13px; color: #0f172a;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .ri-meta { font-size: 11px; color: #94a3b8; margin-top: 2px; display: flex; align-items: center; gap: 6px; }
        .ri-type-badge { font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 100px; border: 1px solid; }
        .ri-actions { display: flex; gap: 7px; flex-shrink: 0; }
        .ri-btn {
          font-family: 'Syne', sans-serif;
          font-weight: 700; font-size: 11px;
          padding: 6px 12px; border-radius: 8px;
          border: 1.5px solid; cursor: pointer;
          transition: all 0.15s;
          display: flex; align-items: center; gap: 4px;
          text-decoration: none; white-space: nowrap;
        }
        .ri-btn.view { background: #fff; color: #f97316; border-color: #fed7aa; }
        .ri-btn.view:hover { background: #fff7ed; border-color: #f97316; }
        .ri-btn.download { background: #f97316; color: #fff; border-color: #f97316; box-shadow: 0 3px 10px rgba(249,115,22,0.25); }
        .ri-btn.download:hover { background: #ea580c; border-color: #ea580c; }
        .ri-btn.watch { background: #2563eb; color: #fff; border-color: #2563eb; box-shadow: 0 3px 10px rgba(37,99,235,0.25); }
        .ri-btn.watch:hover { background: #1d4ed8; }
      `}</style>

      <div className={`ri-row ${indented ? "indented" : ""}`}>
        <div className="ri-left">
          <div
            className="ri-icon"
            style={{ background: cfg.bg, borderColor: cfg.border }}
          >
            {cfg.icon}
          </div>
          <div className="ri-info">
            <div className="ri-name">{resource.title}</div>
            <div className="ri-meta">
              <span
                className="ri-type-badge"
                style={{
                  color: cfg.color,
                  background: cfg.bg,
                  borderColor: cfg.border,
                }}
              >
                {cfg.label}
              </span>
              {resource.order && <span>#{resource.order}</span>}
            </div>
          </div>
        </div>

        <div className="ri-actions">
          {isPdf && resource.fileUrl && (
            <>
              <button className="ri-btn view" onClick={() => setPdfOpen(true)}>
                👁 Voir
              </button>
              <a href={resource.fileUrl} download className="ri-btn download">
                ⬇ Télécharger
              </a>
            </>
          )}
          {isVideo && resource.fileUrl && (
            <a
              href={resource.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="ri-btn watch"
            >
              ▶ Regarder
            </a>
          )}
        </div>
      </div>

      {pdfOpen && (
        <PdfModal
          url={resource.fileUrl}
          title={resource.title}
          onClose={() => setPdfOpen(false)}
        />
      )}
    </>
  );
}

export default function CourseDetailPage() {
  const { id } = useParams();
  const { activeTab, setActiveTab } = useCoursesFilterStore();
  const { data: course, isLoading } = useCourse(id);

  if (isLoading)
    return (
      <div className="min-h-screen" style={{ background: "#f5f5f7" }}>
        <div
          style={{
            background: "#fff",
            borderBottom: "1px solid #f1f5f9",
            padding: "40px 24px",
          }}
        >
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <Skeleton className="h-4 w-24 mb-4" />
            <Skeleton className="h-9 w-2/3 mb-3" />
            <Skeleton className="h-5 w-full max-w-lg" />
          </div>
        </div>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px" }}>
          {[...Array(5)].map((_, i) => (
            <ResourceRowSkeleton key={i} />
          ))}
        </div>
      </div>
    );

  if (!course)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "#94a3b8", fontFamily: "'DM Sans', sans-serif" }}>
          Cours introuvable.
        </p>
      </div>
    );

  const t =
    FILIERE_THEMES[course.filiere?.toLowerCase()] || FILIERE_THEMES.default;
  const resources = course.resources || [];
  const exercises = resources.filter((r) => r.type === "exercise");
  const solutions = resources.filter((r) => r.type === "solution");

  const filtered = (
    activeTab === "all"
      ? resources
      : resources.filter((r) => r.type === activeTab)
  )
    .slice()
    .sort((a, b) => (TYPE_ORDER[a.type] || 99) - (TYPE_ORDER[b.type] || 99));

  const tabCount = (key) =>
    key === "all"
      ? resources.length
      : resources.filter((r) => r.type === key).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        .cdp-root { min-height: 100vh; background: #f5f5f7; font-family: 'DM Sans', sans-serif; }
        .cdp-hero { background: #fff; border-bottom: 1px solid #f1f5f9; padding: 36px 24px 32px; }
        .cdp-hero-inner { max-width: 800px; margin: 0 auto; }
        .cdp-back {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; color: #94a3b8; font-weight: 500;
          text-decoration: none; margin-bottom: 20px; transition: color 0.15s;
        }
        .cdp-back:hover { color: #f97316; }
        .cdp-badges { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
        .cdp-badge {
          font-family: 'Syne', sans-serif;
          font-weight: 700; font-size: 11px; letter-spacing: 0.8px;
          text-transform: uppercase; padding: 4px 12px;
          border-radius: 100px; border: 1px solid;
        }
        .cdp-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900; font-size: 28px; letter-spacing: -1px;
          color: #0f172a; margin-bottom: 8px; line-height: 1.2;
        }
        .cdp-desc { font-size: 14px; color: #94a3b8; font-weight: 300; line-height: 1.6; }
        .cdp-body { max-width: 800px; margin: 0 auto; padding: 28px 24px; }
        .cdp-tabs { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 24px; }
        .cdp-tab {
          font-family: 'Syne', sans-serif;
          font-weight: 700; font-size: 12px;
          padding: 8px 16px; border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #fff; color: #94a3b8;
          cursor: pointer; transition: all 0.15s;
          display: flex; align-items: center; gap: 6px;
        }
        .cdp-tab:hover { border-color: #fed7aa; color: #f97316; background: #fff7ed; }
        .cdp-tab.active { background: #f97316; color: #fff; border-color: #f97316; box-shadow: 0 4px 14px rgba(249,115,22,0.3); }
        .cdp-tab-count { font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 100px; }
        .cdp-tab.active .cdp-tab-count { background: rgba(255,255,255,0.3); color: #fff; }
        .cdp-tab:not(.active) .cdp-tab-count { background: #f1f5f9; color: #64748b; }
        .cdp-section-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 13px; color: #0f172a;
          margin-bottom: 10px;
          display: flex; align-items: center; gap: 8px;
        }
        .cdp-section-title::after { content: ''; flex: 1; height: 1px; background: #f1f5f9; }
        .cdp-list { display: flex; flex-direction: column; gap: 8px; }
        .cdp-exercise-group { background: #fff; border: 1px solid #f1f5f9; border-radius: 16px; overflow: hidden; }
        .cdp-exercise-group .ri-row { border-radius: 0; border: none; border-bottom: 1px solid #f8fafc; }
        .cdp-empty { text-align: center; padding: 48px 24px; color: #cbd5e1; font-size: 14px; font-family: 'Syne', sans-serif; font-weight: 700; }
      `}</style>

      <div className="cdp-root">
        <div className="cdp-hero">
          <div className="cdp-hero-inner">
            <a href={ROUTES.COURSES} className="cdp-back">
              ← Retour aux cours
            </a>
            <div className="cdp-badges">
              <span
                className="cdp-badge"
                style={{
                  color: t.accent,
                  background: t.from,
                  borderColor: t.border,
                }}
              >
                {t.icon} {t.label}
              </span>
              <span
                className="cdp-badge"
                style={{
                  color: "#64748b",
                  background: "#f8fafc",
                  borderColor: "#e2e8f0",
                }}
              >
                {course.level}
              </span>
              <span
                className="cdp-badge"
                style={{
                  color: "#64748b",
                  background: "#f8fafc",
                  borderColor: "#e2e8f0",
                }}
              >
                Chapitre {course.chapter}
              </span>
            </div>
            <h1 className="cdp-title">{course.title}</h1>
            {course.description && (
              <p className="cdp-desc">{course.description}</p>
            )}
          </div>
        </div>

        <div className="cdp-body">
          <div className="cdp-tabs">
            {TABS.map((tab) => {
              const count = tabCount(tab.key);
              if (count === 0 && tab.key !== "all") return null;
              return (
                <button
                  key={tab.key}
                  className={`cdp-tab ${activeTab === tab.key ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.icon} {tab.label}
                  <span className="cdp-tab-count">{count}</span>
                </button>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <div className="cdp-empty">
              Aucune ressource dans cette catégorie.
            </div>
          ) : activeTab === "exercise" ? (
            <div className="cdp-list">
              {exercises.map((ex) => {
                const sol = solutions.find((s) => s.linkedResourceId === ex.id);
                return (
                  <div key={ex.id} className="cdp-exercise-group">
                    <ResourceItem resource={ex} />
                    {sol && <ResourceItem resource={sol} indented />}
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              <div className="cdp-section-title">
                {TABS.find((t) => t.key === activeTab)?.icon || "◈"}{" "}
                {TABS.find((t) => t.key === activeTab)?.label ||
                  "Toutes les ressources"}
              </div>
              <div className="cdp-list">
                {filtered.map((r) => (
                  <ResourceItem key={r.id} resource={r} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
