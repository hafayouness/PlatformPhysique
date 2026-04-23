import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { coursesService } from "../../services/CourseService";

const FILIERES = [
  { key: "SP", label: "SP", icon: "🔬" },
  { key: "SVT", label: "SVT", icon: "🌿" },
  { key: "SMA", label: "SMA", icon: "📐" },
  { key: "SMB", label: "SMB", icon: "📊" },
];

const LEVELS = ["1bac", "2bac", "TCS"];

function Badge({ children, color }) {
  const colors = {
    orange: {
      bg: "rgba(249,115,22,0.10)",
      border: "rgba(249,115,22,0.25)",
      text: "#ea580c",
    },
    blue: {
      bg: "rgba(59,130,246,0.10)",
      border: "rgba(59,130,246,0.25)",
      text: "#2563eb",
    },
    green: {
      bg: "rgba(34,197,94,0.10)",
      border: "rgba(34,197,94,0.25)",
      text: "#16a34a",
    },
    gray: { bg: "rgba(0,0,0,0.05)", border: "rgba(0,0,0,0.10)", text: "#666" },
  };
  const c = colors[color] || colors.gray;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 10px",
        borderRadius: 100,
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.text,
        fontSize: 11,
        fontWeight: 600,
        fontFamily: "'DM Sans', sans-serif",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function EditModal({ course, onClose, onSaved }) {
  const [title, setTitle] = useState(course.title || "");
  const [description, setDescription] = useState(course.description || "");
  const [filiere, setFiliere] = useState(course.filiere || "");
  const [level, setLevel] = useState(course.level || "");
  const [chapter, setChapter] = useState(course.chapter || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setError("");
    if (!title.trim() || !filiere || !level || !chapter.trim()) {
      setError("Titre, filière, niveau et chapitre sont requis.");
      return;
    }
    setLoading(true);
    try {
      await coursesService.update(course.id, {
        title,
        description,
        filiere,
        level,
        chapter,
      });
      onSaved();
    } catch (err) {
      setError(err?.response?.data?.message || "Erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cl-modal-overlay" onClick={onClose}>
      <div className="cl-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cl-modal-header">
          <span className="cl-modal-title">✏️ Modifier le cours</span>
          <button className="cl-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {error && <div className="cl-modal-error">⚠ {error}</div>}

        <div className="cl-modal-body">
          <div className="cl-group">
            <label className="cl-label">
              Titre <span className="req">*</span>
            </label>
            <input
              className="cl-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre du cours"
            />
          </div>

          <div className="cl-group">
            <label className="cl-label">Description</label>
            <textarea
              className="cl-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description…"
            />
          </div>

          <div className="cl-group">
            <label className="cl-label">
              Filière <span className="req">*</span>
            </label>
            <div className="cl-pills">
              {FILIERES.map((f) => (
                <div
                  key={f.key}
                  className={`cl-pill${filiere === f.key ? " active" : ""}`}
                  onClick={() => setFiliere(f.key)}
                >
                  {f.icon} {f.label}
                </div>
              ))}
            </div>
          </div>

          <div className="cl-row">
            <div className="cl-group" style={{ marginBottom: 0 }}>
              <label className="cl-label">
                Niveau <span className="req">*</span>
              </label>
              <div className="cl-pills" style={{ flexWrap: "wrap" }}>
                {LEVELS.map((l) => (
                  <div
                    key={l}
                    className={`cl-pill${level === l ? " active" : ""}`}
                    onClick={() => setLevel(l)}
                  >
                    {l}
                  </div>
                ))}
              </div>
            </div>
            <div className="cl-group" style={{ marginBottom: 0 }}>
              <label className="cl-label">
                Chapitre <span className="req">*</span>
              </label>
              <input
                className="cl-input"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                placeholder="ex : Chapitre 1"
              />
            </div>
          </div>
        </div>

        <div className="cl-modal-footer">
          <button className="cl-btn-cancel" onClick={onClose}>
            Annuler
          </button>
          <button
            className="cl-btn-save"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="cl-spinner" /> Enregistrement…
              </>
            ) : (
              "Enregistrer"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ course, onClose, onDeleted }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await coursesService.delete(course.id);
      onDeleted();
    } catch {
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cl-modal-overlay" onClick={onClose}>
      <div
        className="cl-modal cl-modal-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cl-delete-icon">🗑️</div>
        <div className="cl-delete-title">Supprimer ce cours ?</div>
        <div className="cl-delete-sub">
          <strong>« {course.title} »</strong> sera supprimé définitivement.
          Cette action est irréversible.
        </div>
        <div
          className="cl-modal-footer"
          style={{ justifyContent: "center", gap: 12 }}
        >
          <button className="cl-btn-cancel" onClick={onClose}>
            Annuler
          </button>
          <button
            className="cl-btn-delete"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="cl-spinner" /> Suppression…
              </>
            ) : (
              "Supprimer"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CoursesList() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterFiliere, setFilterFiliere] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [editCourse, setEditCourse] = useState(null);
  const [deleteCourse, setDeleteCourse] = useState(null);
  const [toast, setToast] = useState(null);

  const fetchCourses = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await coursesService.list();
      setCourses(data);
    } catch {
      setError("Impossible de charger les cours.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaved = () => {
    setEditCourse(null);
    fetchCourses();
    showToast("Cours modifié avec succès !");
  };

  const handleDeleted = () => {
    setDeleteCourse(null);
    fetchCourses();
    showToast("Cours supprimé.", "error");
  };

  const filiereColor = (f) =>
    ({ SP: "orange", SVT: "green", SMA: "blue", SMB: "gray" })[f] || "gray";

  const filtered = courses.filter((c) => {
    const matchSearch =
      !search || c.title.toLowerCase().includes(search.toLowerCase());
    const matchFiliere = !filterFiliere || c.filiere === filterFiliere;
    const matchLevel = !filterLevel || c.level === filterLevel;
    return matchSearch && matchFiliere && matchLevel;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');

        .cl-root { font-family: 'DM Sans', sans-serif; max-width: 1000px; margin: 0 auto; padding: 20px; }

        .cl-page-header {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 16px;
          margin-bottom: 28px; flex-wrap: wrap;
        }
        .cl-page-title {
          font-family: 'Syne', sans-serif; font-weight: 900;
          font-size: 26px; letter-spacing: -1px; color: #111; margin-bottom: 4px;
        }
        .cl-page-sub { color: #aaa; font-size: 14px; font-weight: 300; }

        .cl-btn-new {
          padding: 11px 22px; border-radius: 12px; border: none;
          background: linear-gradient(135deg, #f97316, #ea580c);
          font-family: 'Syne', sans-serif; font-size: 13px;
          font-weight: 800; color: #fff; cursor: pointer;
          display: flex; align-items: center; gap: 7px;
          box-shadow: 0 4px 14px rgba(249,115,22,0.3);
          transition: all 0.18s; white-space: nowrap; flex-shrink: 0;
        }
        .cl-btn-new:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(249,115,22,0.4); }

        /* Filters bar */
        .cl-filters {
          background: #fff; border: 1px solid rgba(0,0,0,0.07);
          border-radius: 16px; padding: 16px 20px;
          margin-bottom: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          display: flex; flex-wrap: wrap; gap: 12px; align-items: center;
        }

        .cl-search-wrap { position: relative; flex: 1; min-width: 200px; }
        .cl-search-wrap::before {
          content: '🔍'; position: absolute;
          left: 13px; top: 50%; transform: translateY(-50%);
          font-size: 13px; pointer-events: none;
        }
        .cl-search {
          width: 100%; background: #fafafa;
          border: 1px solid rgba(0,0,0,0.09); border-radius: 10px;
          padding: 9px 14px 9px 36px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; color: #111;
          outline: none; transition: border-color 0.15s, box-shadow 0.15s;
        }
        .cl-search:focus {
          border-color: #f97316; background: #fff;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.08);
        }
        .cl-search::placeholder { color: #ccc; }

        .cl-filter-pills { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
        .cl-filter-label {
          font-size: 10px; font-weight: 600; letter-spacing: 1.4px;
          text-transform: uppercase; color: #ccc;
        }
        .cl-fpill {
          padding: 6px 13px; border-radius: 100px;
          border: 1.5px solid rgba(0,0,0,0.09); background: #fafafa;
          font-size: 12px; font-weight: 500; color: #666;
          cursor: pointer; transition: all 0.15s; user-select: none;
        }
        .cl-fpill:hover { border-color: #f97316; color: #ea580c; }
        .cl-fpill.active {
          background: linear-gradient(135deg, rgba(249,115,22,0.12), rgba(234,88,12,0.07));
          border-color: rgba(249,115,22,0.5); color: #ea580c; font-weight: 600;
        }
        .cl-fpill-clear {
          padding: 6px 13px; border-radius: 100px;
          border: 1.5px solid rgba(239,68,68,0.2); background: rgba(239,68,68,0.05);
          font-size: 12px; font-weight: 500; color: #ef4444;
          cursor: pointer; transition: all 0.15s;
        }
        .cl-fpill-clear:hover { background: rgba(239,68,68,0.10); }

        /* Stats row */
        .cl-stats {
          font-size: 13px; color: #bbb; font-weight: 300; margin-bottom: 14px;
        }
        .cl-stats strong { color: #111; font-weight: 700; font-family: 'Syne', sans-serif; }

        /* Table card */
        .cl-table-card {
          background: #fff; border: 1px solid rgba(0,0,0,0.07);
          border-radius: 20px; overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
        }

        .cl-table { width: 100%; border-collapse: collapse; }

        .cl-table thead tr {
          border-bottom: 1px solid rgba(0,0,0,0.06);
          background: #fafafa;
        }
        .cl-table th {
          padding: 12px 16px; text-align: left;
          font-size: 10px; font-weight: 600;
          letter-spacing: 1.4px; text-transform: uppercase; color: #bbb;
        }
        .cl-table th:last-child { text-align: right; }

        .cl-table tbody tr {
          border-bottom: 1px solid rgba(0,0,0,0.04);
          transition: background 0.15s;
        }
        .cl-table tbody tr:last-child { border-bottom: none; }
        .cl-table tbody tr:hover { background: #fafaf8; }

        .cl-table td { padding: 14px 16px; vertical-align: middle; }

        .cl-course-title {
          font-family: 'DM Sans', sans-serif; font-weight: 500;
          font-size: 14px; color: #111;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 260px;
        }
        .cl-course-desc {
          font-size: 12px; color: #bbb; font-weight: 300;
          margin-top: 2px; white-space: nowrap; overflow: hidden;
          text-overflow: ellipsis; max-width: 260px;
        }
        .cl-course-id {
          font-size: 10px; color: #ddd; font-family: monospace;
          margin-top: 2px;
        }

        /* Action buttons */
        .cl-actions { display: flex; justify-content: flex-end; gap: 8px; }
        .cl-btn-edit {
          padding: 7px 14px; border-radius: 10px;
          border: 1.5px solid rgba(249,115,22,0.25);
          background: rgba(249,115,22,0.05);
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          font-weight: 500; color: #ea580c; cursor: pointer;
          transition: all 0.15s; display: flex; align-items: center; gap: 5px;
        }
        .cl-btn-edit:hover {
          background: rgba(249,115,22,0.12); border-color: rgba(249,115,22,0.5);
        }
        .cl-btn-del {
          padding: 7px 14px; border-radius: 10px;
          border: 1.5px solid rgba(239,68,68,0.2);
          background: rgba(239,68,68,0.05);
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          font-weight: 500; color: #ef4444; cursor: pointer;
          transition: all 0.15s; display: flex; align-items: center; gap: 5px;
        }
        .cl-btn-del:hover { background: rgba(239,68,68,0.12); border-color: rgba(239,68,68,0.4); }

        /* Empty / error / loading */
        .cl-empty {
          padding: 60px 20px; text-align: center;
          color: #ccc; font-size: 14px; font-weight: 300;
        }
        .cl-empty-icon { font-size: 36px; margin-bottom: 10px; }

        .cl-skeleton-row td { padding: 14px 16px; }
        .cl-skel {
          height: 14px; border-radius: 8px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: cl-shimmer 1.4s infinite;
        }
        @keyframes cl-shimmer { to { background-position: -200% 0; } }

        .cl-error-bar {
          background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.15);
          color: #ef4444; padding: 13px 18px; border-radius: 14px;
          font-size: 13px; margin-bottom: 18px;
        }

        /* Toast */
        .cl-toast {
          position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
          padding: 12px 22px; border-radius: 14px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          z-index: 9999; animation: cl-toast-in 0.25s ease;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12); white-space: nowrap;
        }
        .cl-toast.success {
          background: #111; color: #fff;
        }
        .cl-toast.error {
          background: #ef4444; color: #fff;
        }
        @keyframes cl-toast-in { from { opacity: 0; transform: translateX(-50%) translateY(10px); } }

        /* Modal */
        .cl-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.35);
          backdrop-filter: blur(3px); z-index: 1000;
          display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        .cl-modal {
          background: #fff; border-radius: 24px;
          width: 100%; max-width: 560px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.15);
          animation: cl-modal-in 0.22s ease;
          overflow: hidden;
        }
        .cl-modal-sm { max-width: 400px; padding: 32px; text-align: center; }
        @keyframes cl-modal-in { from { opacity: 0; transform: scale(0.96) translateY(8px); } }

        .cl-modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 22px 24px 0;
        }
        .cl-modal-title {
          font-family: 'Syne', sans-serif; font-weight: 900;
          font-size: 18px; color: #111;
        }
        .cl-modal-close {
          background: none; border: none; cursor: pointer;
          color: #bbb; font-size: 16px; transition: color 0.15s; padding: 4px;
        }
        .cl-modal-close:hover { color: #111; }

        .cl-modal-error {
          margin: 12px 24px 0;
          background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.15);
          color: #ef4444; padding: 10px 14px; border-radius: 10px; font-size: 13px;
        }

        .cl-modal-body { padding: 20px 24px; display: flex; flex-direction: column; gap: 0; }

        .cl-group { margin-bottom: 16px; }
        .cl-group:last-child { margin-bottom: 0; }
        .cl-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

        .cl-label {
          display: block; font-size: 10px; font-weight: 600;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: #bbb; margin-bottom: 7px;
        }
        .cl-label .req { color: #f97316; margin-left: 2px; }

        .cl-input, .cl-textarea {
          width: 100%; background: #fafafa;
          border: 1px solid rgba(0,0,0,0.09); border-radius: 12px;
          padding: 11px 14px; font-family: 'DM Sans', sans-serif;
          font-size: 13px; color: #111; outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .cl-input:focus, .cl-textarea:focus {
          border-color: #f97316; background: #fff;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.08);
        }
        .cl-input::placeholder, .cl-textarea::placeholder { color: #ccc; }
        .cl-textarea { resize: vertical; min-height: 72px; line-height: 1.5; }

        .cl-pills { display: flex; flex-wrap: wrap; gap: 7px; }
        .cl-pill {
          padding: 6px 14px; border-radius: 100px;
          border: 1.5px solid rgba(0,0,0,0.09); background: #fafafa;
          font-size: 12px; font-weight: 500; color: #666;
          cursor: pointer; transition: all 0.15s; user-select: none;
        }
        .cl-pill:hover { border-color: #f97316; color: #ea580c; }
        .cl-pill.active {
          background: linear-gradient(135deg, rgba(249,115,22,0.12), rgba(234,88,12,0.07));
          border-color: rgba(249,115,22,0.5); color: #ea580c; font-weight: 600;
        }

        .cl-modal-footer {
          padding: 16px 24px 22px;
          display: flex; justify-content: flex-end; gap: 10px;
          border-top: 1px solid rgba(0,0,0,0.06);
        }
        .cl-btn-cancel {
          padding: 10px 20px; border-radius: 11px;
          border: 1.5px solid rgba(0,0,0,0.10); background: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          font-weight: 500; color: #666; cursor: pointer; transition: all 0.15s;
        }
        .cl-btn-cancel:hover { border-color: #111; color: #111; }
        .cl-btn-save {
          padding: 10px 22px; border-radius: 11px; border: none;
          background: linear-gradient(135deg, #f97316, #ea580c);
          font-family: 'Syne', sans-serif; font-size: 13px;
          font-weight: 800; color: #fff; cursor: pointer;
          display: flex; align-items: center; gap: 7px;
          box-shadow: 0 4px 12px rgba(249,115,22,0.3); transition: all 0.15s;
        }
        .cl-btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
        .cl-btn-delete {
          padding: 10px 22px; border-radius: 11px; border: none;
          background: #ef4444; font-family: 'Syne', sans-serif;
          font-size: 13px; font-weight: 800; color: #fff; cursor: pointer;
          display: flex; align-items: center; gap: 7px;
          box-shadow: 0 4px 12px rgba(239,68,68,0.3); transition: all 0.15s;
        }
        .cl-btn-delete:disabled { opacity: 0.6; cursor: not-allowed; }

        .cl-delete-icon { font-size: 40px; margin-bottom: 12px; }
        .cl-delete-title {
          font-family: 'Syne', sans-serif; font-weight: 900;
          font-size: 20px; color: #111; margin-bottom: 8px;
        }
        .cl-delete-sub { font-size: 13px; color: #999; font-weight: 300; line-height: 1.6; margin-bottom: 24px; }

        .cl-spinner {
          width: 13px; height: 13px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff; border-radius: 50%;
          animation: cl-spin 0.6s linear infinite; display: inline-block;
        }
        @keyframes cl-spin { to { transform: rotate(360deg); } }

        @media (max-width: 640px) {
          .cl-table thead { display: none; }
          .cl-table tbody tr { display: block; padding: 14px 16px; }
          .cl-table td { display: block; padding: 3px 0; border: none; }
          .cl-actions { margin-top: 10px; justify-content: flex-start; }
          .cl-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="cl-root">
        <div className="cl-page-header">
          <div>
            <h1 className="cl-page-title">📚 Liste des cours</h1>
            <p className="cl-page-sub">
              Gérer, modifier ou supprimer les cours existants
            </p>
          </div>
          <button
            className="cl-btn-new"
            onClick={() => navigate("/admin/courses/create")}
          >
            + Nouveau cours
          </button>
        </div>

        {error && <div className="cl-error-bar">⚠ {error}</div>}

        <div className="cl-filters">
          <div className="cl-search-wrap">
            <input
              className="cl-search"
              placeholder="Rechercher un cours…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="cl-filter-pills">
            <span className="cl-filter-label">Filière</span>
            {FILIERES.map((f) => (
              <div
                key={f.key}
                className={`cl-fpill${filterFiliere === f.key ? " active" : ""}`}
                onClick={() =>
                  setFilterFiliere(filterFiliere === f.key ? "" : f.key)
                }
              >
                {f.icon} {f.label}
              </div>
            ))}
          </div>

          <div className="cl-filter-pills">
            <span className="cl-filter-label">Niveau</span>
            {LEVELS.map((l) => (
              <div
                key={l}
                className={`cl-fpill${filterLevel === l ? " active" : ""}`}
                onClick={() => setFilterLevel(filterLevel === l ? "" : l)}
              >
                {l}
              </div>
            ))}
          </div>

          {(filterFiliere || filterLevel || search) && (
            <div
              className="cl-fpill-clear"
              onClick={() => {
                setSearch("");
                setFilterFiliere("");
                setFilterLevel("");
              }}
            >
              ✕ Réinitialiser
            </div>
          )}
        </div>

        {/* Count */}
        {!loading && !error && (
          <p className="cl-stats">
            <strong>{filtered.length}</strong> cours trouvé
            {filtered.length !== 1 ? "s" : ""}
            {courses.length !== filtered.length && ` sur ${courses.length}`}
          </p>
        )}

        <div className="cl-table-card">
          <table className="cl-table">
            <thead>
              <tr>
                <th>Cours</th>
                <th>Filière</th>
                <th>Niveau</th>
                <th>Chapitre</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="cl-skeleton-row">
                    <td>
                      <div
                        className="cl-skel"
                        style={{ width: "70%", height: 13 }}
                      />
                    </td>
                    <td>
                      <div
                        className="cl-skel"
                        style={{ width: 48, height: 22, borderRadius: 100 }}
                      />
                    </td>
                    <td>
                      <div
                        className="cl-skel"
                        style={{ width: 36, height: 22, borderRadius: 100 }}
                      />
                    </td>
                    <td>
                      <div
                        className="cl-skel"
                        style={{ width: 60, height: 13 }}
                      />
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: 8,
                        }}
                      >
                        <div
                          className="cl-skel"
                          style={{ width: 70, height: 30, borderRadius: 10 }}
                        />
                        <div
                          className="cl-skel"
                          style={{ width: 70, height: 30, borderRadius: 10 }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div className="cl-empty">
                      <div className="cl-empty-icon">🔍</div>
                      Aucun cours trouvé. Modifie les filtres ou crée un nouveau
                      cours.
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div className="cl-course-title">{c.title}</div>
                      {c.description && (
                        <div className="cl-course-desc">{c.description}</div>
                      )}
                      <div className="cl-course-id">#{c.id}</div>
                    </td>
                    <td>
                      <Badge color={filiereColor(c.filiere)}>
                        {FILIERES.find((f) => f.key === c.filiere)?.icon}{" "}
                        {c.filiere}
                      </Badge>
                    </td>
                    <td>
                      <Badge color="blue">{c.level}</Badge>
                    </td>
                    <td
                      style={{ fontSize: 13, color: "#666", fontWeight: 300 }}
                    >
                      {c.chapter}
                    </td>
                    <td>
                      <div className="cl-actions">
                        <button
                          className="cl-btn-edit"
                          onClick={() => setEditCourse(c)}
                        >
                          ✏️ Modifier
                        </button>
                        <button
                          className="cl-btn-del"
                          onClick={() => setDeleteCourse(c)}
                        >
                          🗑️ Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editCourse && (
        <EditModal
          course={editCourse}
          onClose={() => setEditCourse(null)}
          onSaved={handleSaved}
        />
      )}
      {deleteCourse && (
        <DeleteModal
          course={deleteCourse}
          onClose={() => setDeleteCourse(null)}
          onDeleted={handleDeleted}
        />
      )}

      {toast && <div className={`cl-toast ${toast.type}`}>{toast.msg}</div>}
    </>
  );
}
