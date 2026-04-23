import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { coursesService } from "../../services/CourseService";

const FILIERES = [
  { key: "SP", label: "SP", icon: "🔬", full: "Sciences Physiques" },
  {
    key: "SVT",
    label: "SVT",
    icon: "🌿",
    full: "Sciences de la Vie et de la Terre",
  },
  { key: "SMA", label: "SMA", icon: "📐", full: "Sciences Mathématiques A" },
  { key: "SMB", label: "SMB", icon: "📊", full: "Sciences Mathématiques B" },
];

const LEVELS = [
  { key: "1bac", label: "1 BAC" },
  { key: "2bac", label: "2 BAC" },
  { key: "tcs", label: "TCS" },
];

export default function CreateCoursePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filiere, setFiliere] = useState("");
  const [level, setLevel] = useState("");
  const [chapter, setChapter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);

    if (!title.trim() || !filiere || !level || !chapter.trim()) {
      setError("Titre, filière, niveau et chapitre sont requis.");
      return;
    }

    setLoading(true);
    try {
      await coursesService.create({
        title,
        description,
        level,
        chapter,
        filiere,
      });
      setSuccess(true);
      setTitle("");
      setDescription("");
      setFiliere("");
      setLevel("");
      setChapter("");
    } catch (err) {
      setError(err?.response?.data?.message || "Erreur serveur. Réessaie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');

        .cc-root {
          font-family: 'DM Sans', sans-serif;
          max-width: 720px;
          margin: 0 auto;
        }

        .cc-page-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: 26px;
          letter-spacing: -1px;
          color: #111;
          margin-bottom: 4px;
          text-align: center;
        }

        .cc-page-sub {
          color: #aaa;
          font-size: 14px;
          font-weight: 300;
          margin-bottom: 28px;
          text-align: center;
        }

        .cc-alert {
          padding: 13px 18px;
          border-radius: 14px;
          font-size: 13px;
          margin-bottom: 20px;
        }

        .cc-alert.error {
          background: rgba(239,68,68,0.06);
          border: 1px solid rgba(239,68,68,0.15);
          color: #ef4444;
        }

        .cc-alert.success {
          background: rgba(34,197,94,0.07);
          border: 1px solid rgba(34,197,94,0.2);
          color: #16a34a;
        }

        .cc-card {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          margin-bottom: 16px;
        }

        .cc-card-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 13px;
          letter-spacing: 0.2px;
          color: #111;
          margin-bottom: 20px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cc-group {
          margin-bottom: 20px;
        }

        .cc-group:last-child { margin-bottom: 0; }

        .cc-label {
          display: block;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #bbb;
          margin-bottom: 8px;
        }

        .cc-label .req { color: #f97316; margin-left: 2px; }

        .cc-input, .cc-textarea {
          width: 100%;
          background: #fafafa;
          border: 1px solid rgba(0,0,0,0.09);
          border-radius: 12px;
          padding: 12px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #111;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
        }

        .cc-input:focus, .cc-textarea:focus {
          border-color: #f97316;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.08);
        }

        .cc-input::placeholder, .cc-textarea::placeholder {
          color: #ccc;
          font-weight: 300;
        }

        .cc-textarea {
          resize: vertical;
          min-height: 88px;
          line-height: 1.6;
        }

        /* Filière cards */
        .cc-filieres {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .cc-filiere-card {
          border: 1.5px solid rgba(0,0,0,0.09);
          border-radius: 14px;
          padding: 14px 10px;
          background: #fafafa;
          cursor: pointer;
          text-align: center;
          transition: all 0.18s ease;
          user-select: none;
        }

        .cc-filiere-card:hover {
          border-color: rgba(249,115,22,0.4);
          background: #fff;
        }

        .cc-filiere-card.active {
          background: linear-gradient(135deg, rgba(249,115,22,0.1), rgba(234,88,12,0.06));
          border-color: rgba(249,115,22,0.5);
          box-shadow: 0 0 0 3px rgba(249,115,22,0.08);
        }

        .cc-filiere-icon {
          font-size: 22px;
          margin-bottom: 6px;
        }

        .cc-filiere-key {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: 14px;
          color: #111;
          margin-bottom: 2px;
        }

        .cc-filiere-full {
          font-size: 10px;
          color: #bbb;
          font-weight: 300;
          line-height: 1.3;
        }

        .cc-filiere-card.active .cc-filiere-key { color: #ea580c; }
        .cc-filiere-card.active .cc-filiere-full { color: #f97316; }

        /* Level pills */
        .cc-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .cc-pill {
          padding: 7px 16px;
          border-radius: 100px;
          border: 1.5px solid rgba(0,0,0,0.09);
          background: #fafafa;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #666;
          cursor: pointer;
          transition: all 0.15s;
          user-select: none;
        }

        .cc-pill:hover { border-color: #f97316; color: #ea580c; background: #fff; }

        .cc-pill.active {
          background: linear-gradient(135deg, rgba(249,115,22,0.12), rgba(234,88,12,0.07));
          border-color: rgba(249,115,22,0.5);
          color: #ea580c;
          font-weight: 600;
        }

        /* Stepper */
        .cc-stepper {
          display: flex;
          align-items: center;
          border: 1px solid rgba(0,0,0,0.09);
          border-radius: 12px;
          background: #fafafa;
          overflow: hidden;
          width: fit-content;
        }

        .cc-stepper-btn {
          width: 42px;
          height: 44px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 20px;
          color: #999;
          transition: background 0.12s, color 0.12s;
          display: flex; align-items: center; justify-content: center;
        }

        .cc-stepper-btn:hover { background: #f0ede8; color: #f97316; }

        .cc-stepper-val {
          min-width: 56px;
          text-align: center;
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: 18px;
          color: #111;
          border-left: 1px solid rgba(0,0,0,0.07);
          border-right: 1px solid rgba(0,0,0,0.07);
          height: 44px;
          display: flex; align-items: center; justify-content: center;
        }

        .cc-stepper-hint {
          font-size: 12px;
          color: #ccc;
          font-weight: 300;
          margin-left: 14px;
        }

        /* Footer */
        .cc-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
          padding-top: 4px;
        }

        .cc-btn-cancel {
          padding: 11px 22px;
          border-radius: 12px;
          border: 1.5px solid rgba(0,0,0,0.10);
          background: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #666;
          cursor: pointer;
          transition: all 0.15s;
        }

        .cc-btn-cancel:hover { border-color: #111; color: #111; }

        .cc-btn-submit {
          padding: 11px 28px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #f97316, #ea580c);
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 800;
          color: #fff;
          cursor: pointer;
          letter-spacing: -0.3px;
          transition: all 0.18s;
          display: flex; align-items: center; gap: 8px;
          box-shadow: 0 4px 14px rgba(249,115,22,0.3);
        }

        .cc-btn-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(249,115,22,0.4);
        }

        .cc-btn-submit:active:not(:disabled) { transform: translateY(0); }

        .cc-btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .cc-spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: cc-spin 0.6s linear infinite;
        }

        @keyframes cc-spin { to { transform: rotate(360deg); } }

        @media (max-width: 640px) {
          .cc-filieres { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="cc-root">
        <h1 className="cc-page-title">📚 Créer un cours</h1>
        <p className="cc-page-sub">
          Remplis les informations pour ajouter un nouveau cours
        </p>

        {error && <div className="cc-alert error">⚠ {error}</div>}
        {success && (
          <div className="cc-alert success">✓ Cours créé avec succès !</div>
        )}

        <div className="cc-card">
          <div className="cc-card-title">📝 Informations générales</div>

          <div className="cc-group">
            <label className="cc-label">
              Titre <span className="req">*</span>
            </label>
            <input
              className="cc-input"
              type="text"
              placeholder="ex : Introduction à la thermodynamique"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="cc-group">
            <label className="cc-label">Description</label>
            <textarea
              className="cc-textarea"
              placeholder="Décris brièvement le contenu du cours…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="cc-card">
          <div className="cc-card-title">
            🎓 Filière{" "}
            <span style={{ color: "#f97316", marginLeft: 2 }}>*</span>
          </div>
          <div className="cc-filieres">
            {FILIERES.map((f) => (
              <div
                key={f.key}
                className={`cc-filiere-card${filiere === f.key ? " active" : ""}`}
                onClick={() => setFiliere(f.key)}
              >
                <div className="cc-filiere-icon">{f.icon}</div>
                <div className="cc-filiere-key">{f.label}</div>
                <div className="cc-filiere-full">{f.full}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="cc-card">
          <div className="cc-card-title">⚙ Paramètres du cours</div>

          <div className="cc-group">
            <label className="cc-label">
              Niveau <span className="req">*</span>
            </label>
            <div className="cc-pills">
              {LEVELS.map((l) => (
                <div
                  key={l.key}
                  className={`cc-pill${level === l.key ? " active" : ""}`}
                  onClick={() => setLevel(l.key)}
                >
                  {l.label}
                </div>
              ))}
            </div>
          </div>

          <div className="cc-group">
            <label className="cc-label">
              Chapitre <span className="req">*</span>
            </label>
            <input
              className="cc-input"
              type="text"
              placeholder="ex : Chapitre 1 — Les fonctions"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="cc-actions">
          <button className="cc-btn-cancel" onClick={() => navigate(-1)}>
            Annuler
          </button>
          <button
            className="cc-btn-submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading && <div className="cc-spinner" />}
            {loading ? "Création…" : "Créer le cours"}
          </button>
        </div>
      </div>
    </>
  );
}
