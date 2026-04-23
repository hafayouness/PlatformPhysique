import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resourcesService } from "../../services/ResourseServices";
import { coursesService } from "../../services/CourseService";

const TYPES = [
  {
    key: "pdf",
    label: "PDF",
    icon: "📄",
    hint: "Cours, résumés, fiches…",
    accept: ".pdf",
  },
  {
    key: "video",
    label: "Vidéo",
    icon: "🎬",
    hint: "MP4, MOV, AVI…",
    accept: "video/*",
  },
  {
    key: "image",
    label: "Image",
    icon: "🖼️",
    hint: "JPG, PNG, WEBP…",
    accept: "image/*",
  },
  {
    key: "audio",
    label: "Audio",
    icon: "🎧",
    hint: "MP3, WAV, OGG…",
    accept: "audio/*",
  },
];

function FileZone({ accept, icon, hint, file, onChange, onClear }) {
  const ref = useRef();
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) onChange(f);
  };

  return (
    <div className="cr-file-zone-wrap">
      {file ? (
        <div className="cr-file-selected">
          <span className="cr-file-icon">{icon}</span>
          <div className="cr-file-info">
            <span className="cr-file-name">{file.name}</span>
            <span className="cr-file-size">
              {(file.size / 1024).toFixed(0)} Ko
            </span>
          </div>
          <button className="cr-file-clear" onClick={onClear} type="button">
            ✕
          </button>
        </div>
      ) : (
        <div
          className={`cr-file-zone${dragging ? " dragging" : ""}`}
          onClick={() => ref.current.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <input
            ref={ref}
            type="file"
            accept={accept}
            style={{ display: "none" }}
            onChange={(e) => onChange(e.target.files?.[0] || null)}
          />
          <span className="cr-file-zone-icon">{icon}</span>
          <span className="cr-file-zone-text">
            Glisse ou <u>clique</u> pour importer
          </span>
          <span className="cr-file-zone-hint">{hint}</span>
        </div>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────
export default function CreateResourcePage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [courseId, setCourseId] = useState("");
  const [linkedResourceId, setLinkedResourceId] = useState("");
  const [order, setOrder] = useState(0);
  const [isFree, setIsFree] = useState(true);
  const [file, setFile] = useState(null);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch courses for the select
  useEffect(() => {
    coursesService
      .list()
      .then(setCourses)
      .catch(() => {});
  }, []);

  const selectedType = TYPES.find((t) => t.key === type);

  const reset = () => {
    setTitle("");
    setType("");
    setCourseId("");
    setLinkedResourceId("");
    setOrder(0);
    setIsFree(true);
    setFile(null);
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);
    if (!title.trim() || !type || !courseId) {
      setError("Titre, type et cours sont requis.");
      return;
    }
    if (!file) {
      setError("Un fichier est requis.");
      return;
    }
    setLoading(true);
    try {
      const form = new FormData();
      form.append("title", title);
      form.append("type", type);
      form.append("courseId", courseId);
      form.append("order", order);
      form.append("isFree", isFree);
      if (linkedResourceId) form.append("linkedResourceId", linkedResourceId);
      form.append("file", file);

      await resourcesService.create(form);
      setSuccess(true);
      reset();
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

        .cr-root {
          font-family: 'DM Sans', sans-serif;
          max-width: 720px;
          margin: 0 auto;
        }

        .cr-page-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900; font-size: 26px;
          letter-spacing: -1px; color: #111; margin-bottom: 4px;
          text-align: center;
        }
        .cr-page-sub {
          color: #aaa; font-size: 14px;
          font-weight: 300; margin-bottom: 28px;
          text-align: center;

        }

        .cr-alert {
          padding: 13px 18px; border-radius: 14px;
          font-size: 13px; margin-bottom: 20px;
        }
        .cr-alert.error {
          background: rgba(239,68,68,0.06);
          border: 1px solid rgba(239,68,68,0.15); color: #ef4444;
        }
        .cr-alert.success {
          background: rgba(34,197,94,0.07);
          border: 1px solid rgba(34,197,94,0.2); color: #16a34a;
        }

        .cr-card {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 20px; padding: 28px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          margin-bottom: 16px;
        }
        .cr-card-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 13px; color: #111;
          margin-bottom: 20px; padding-bottom: 14px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          display: flex; align-items: center; gap: 8px;
        }

        .cr-group { margin-bottom: 20px; }
        .cr-group:last-child { margin-bottom: 0; }

        .cr-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        .cr-label {
          display: block; font-size: 10px; font-weight: 600;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: #bbb; margin-bottom: 8px;
        }
        .cr-label .req { color: #f97316; margin-left: 2px; }

        .cr-input {
          width: 100%; background: #fafafa;
          border: 1px solid rgba(0,0,0,0.09);
          border-radius: 12px; padding: 12px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; color: #111; outline: none;
          transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
          appearance: none;
        }
        .cr-input:focus {
          border-color: #f97316; background: #fff;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.08);
        }
        .cr-input::placeholder { color: #ccc; font-weight: 300; }

        .cr-select-wrap { position: relative; }
        .cr-select-wrap::after {
          content: '▾'; position: absolute;
          right: 14px; top: 50%; transform: translateY(-50%);
          color: #bbb; font-size: 13px; pointer-events: none;
        }
        .cr-select-wrap .cr-input { padding-right: 36px; cursor: pointer; }

        /* Type cards */
        .cr-types {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        .cr-type-card {
          border: 1.5px solid rgba(0,0,0,0.09);
          border-radius: 14px; padding: 16px 10px;
          background: #fafafa; cursor: pointer;
          text-align: center; transition: all 0.18s ease;
          user-select: none;
        }
        .cr-type-card:hover {
          border-color: rgba(249,115,22,0.4); background: #fff;
        }
        .cr-type-card.active {
          background: linear-gradient(135deg, rgba(249,115,22,0.10), rgba(234,88,12,0.06));
          border-color: rgba(249,115,22,0.5);
          box-shadow: 0 0 0 3px rgba(249,115,22,0.08);
        }
        .cr-type-icon { font-size: 26px; margin-bottom: 8px; }
        .cr-type-label {
          font-family: 'Syne', sans-serif;
          font-weight: 900; font-size: 13px; color: #111; margin-bottom: 3px;
        }
        .cr-type-hint { font-size: 10px; color: #bbb; font-weight: 300; line-height: 1.3; }
        .cr-type-card.active .cr-type-label { color: #ea580c; }
        .cr-type-card.active .cr-type-hint  { color: #f97316; }

        /* File zone */
        .cr-file-zone-wrap { width: 100%; }
        .cr-file-zone {
          border: 1.5px dashed rgba(0,0,0,0.12);
          border-radius: 14px; padding: 32px 20px;
          background: #fafafa; cursor: pointer;
          text-align: center; transition: all 0.18s;
          display: flex; flex-direction: column;
          align-items: center; gap: 8px;
        }
        .cr-file-zone:hover,
        .cr-file-zone.dragging {
          border-color: rgba(249,115,22,0.5);
          background: rgba(249,115,22,0.03);
        }
        .cr-file-zone-icon { font-size: 32px; }
        .cr-file-zone-text { font-size: 13px; color: #888; }
        .cr-file-zone-text u { color: #f97316; }
        .cr-file-zone-hint { font-size: 11px; color: #ccc; font-weight: 300; }

        .cr-file-selected {
          border: 1.5px solid rgba(249,115,22,0.3);
          border-radius: 14px; padding: 16px 18px;
          background: linear-gradient(135deg, rgba(249,115,22,0.06), rgba(234,88,12,0.03));
          display: flex; align-items: center; gap: 12px;
        }
        .cr-file-icon { font-size: 24px; flex-shrink: 0; }
        .cr-file-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
        .cr-file-name {
          font-size: 13px; font-weight: 500; color: #111;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .cr-file-size { font-size: 11px; color: #bbb; font-weight: 300; }
        .cr-file-clear {
          background: none; border: none; cursor: pointer;
          color: #ccc; font-size: 15px; flex-shrink: 0;
          transition: color 0.15s; padding: 4px;
        }
        .cr-file-clear:hover { color: #ef4444; }

        /* Order stepper */
        .cr-stepper {
          display: flex; align-items: center;
          border: 1px solid rgba(0,0,0,0.09);
          border-radius: 12px; background: #fafafa;
          overflow: hidden; width: fit-content;
        }
        .cr-stepper-btn {
          width: 42px; height: 44px; background: none; border: none;
          cursor: pointer; font-size: 20px; color: #999;
          transition: background 0.12s, color 0.12s;
          display: flex; align-items: center; justify-content: center;
        }
        .cr-stepper-btn:hover { background: #f0ede8; color: #f97316; }
        .cr-stepper-val {
          min-width: 56px; text-align: center;
          font-family: 'Syne', sans-serif;
          font-weight: 900; font-size: 18px; color: #111;
          border-left: 1px solid rgba(0,0,0,0.07);
          border-right: 1px solid rgba(0,0,0,0.07);
          height: 44px; display: flex; align-items: center; justify-content: center;
        }
        .cr-stepper-hint { font-size: 12px; color: #ccc; font-weight: 300; margin-left: 14px; }

        /* Toggle */
        .cr-toggle-row {
          display: flex; align-items: center;
          justify-content: space-between;
          background: #fafafa;
          border: 1px solid rgba(0,0,0,0.09);
          border-radius: 14px; padding: 14px 18px;
        }
        .cr-toggle-info { display: flex; flex-direction: column; gap: 2px; }
        .cr-toggle-title { font-size: 14px; font-weight: 500; color: #111; }
        .cr-toggle-sub { font-size: 12px; color: #bbb; font-weight: 300; }
        .cr-toggle {
          position: relative; width: 44px; height: 24px;
          cursor: pointer; flex-shrink: 0;
        }
        .cr-toggle input { opacity: 0; width: 0; height: 0; }
        .cr-toggle-slider {
          position: absolute; inset: 0;
          background: #e5e5e5; border-radius: 100px; transition: background 0.2s;
        }
        .cr-toggle-slider::before {
          content: ''; position: absolute;
          width: 18px; height: 18px; left: 3px; top: 3px;
          background: white; border-radius: 50%;
          transition: transform 0.2s;
          box-shadow: 0 1px 4px rgba(0,0,0,0.15);
        }
        .cr-toggle input:checked + .cr-toggle-slider {
          background: linear-gradient(135deg, #f97316, #ea580c);
        }
        .cr-toggle input:checked + .cr-toggle-slider::before { transform: translateX(20px); }

        /* Actions */
        .cr-actions {
          display: flex; align-items: center;
          justify-content: flex-end; gap: 12px; padding-top: 4px;
        }
        .cr-btn-cancel {
          padding: 11px 22px; border-radius: 12px;
          border: 1.5px solid rgba(0,0,0,0.10);
          background: #fff; font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 500; color: #666;
          cursor: pointer; transition: all 0.15s;
        }
        .cr-btn-cancel:hover { border-color: #111; color: #111; }

        .cr-btn-submit {
          padding: 11px 28px; border-radius: 12px; border: none;
          background: linear-gradient(135deg, #f97316, #ea580c);
          font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 800; color: #fff;
          cursor: pointer; letter-spacing: -0.3px; transition: all 0.18s;
          display: flex; align-items: center; gap: 8px;
          box-shadow: 0 4px 14px rgba(249,115,22,0.3);
        }
        .cr-btn-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(249,115,22,0.4);
        }
        .cr-btn-submit:active:not(:disabled) { transform: translateY(0); }
        .cr-btn-submit:disabled {
          opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none;
        }
        .cr-spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff; border-radius: 50%;
          animation: cr-spin 0.6s linear infinite;
        }
        @keyframes cr-spin { to { transform: rotate(360deg); } }

        .cr-no-type {
          border: 1.5px dashed rgba(0,0,0,0.09);
          border-radius: 14px; padding: 32px 20px;
          text-align: center; color: #ccc; font-size: 13px;
          font-weight: 300;
        }

        @media (max-width: 640px) {
          .cr-types { grid-template-columns: repeat(2, 1fr); }
          .cr-row   { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="cr-root">
        <h1 className="cr-page-title">📎 Créer une ressource</h1>
        <p className="cr-page-sub">Associe un fichier à un cours existant</p>

        {error && <div className="cr-alert error">⚠ {error}</div>}
        {success && (
          <div className="cr-alert success">
            ✓ Ressource créée avec succès !
          </div>
        )}

        <div className="cr-card">
          <div className="cr-card-title">📝 Informations générales</div>

          <div className="cr-group">
            <label className="cr-label">
              Titre <span className="req">*</span>
            </label>
            <input
              className="cr-input"
              type="text"
              placeholder="ex : Fiche résumé — Thermodynamique"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="cr-row">
            <div className="cr-group" style={{ marginBottom: 0 }}>
              <label className="cr-label">
                Cours associé <span className="req">*</span>
              </label>
              <div className="cr-select-wrap">
                <select
                  className="cr-input"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                >
                  <option value="">— Sélectionner un cours —</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="cr-group" style={{ marginBottom: 0 }}>
              <label className="cr-label">
                Ressource liée{" "}
                <span
                  style={{
                    color: "#ccc",
                    fontWeight: 300,
                    textTransform: "none",
                    letterSpacing: 0,
                  }}
                >
                  (optionnel)
                </span>
              </label>
              <input
                className="cr-input"
                type="text"
                placeholder="ID de la ressource parente"
                value={linkedResourceId}
                onChange={(e) => setLinkedResourceId(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="cr-card">
          <div className="cr-card-title">
            📂 Type de ressource{" "}
            <span style={{ color: "#f97316", marginLeft: 2 }}>*</span>
          </div>
          <div className="cr-types">
            {TYPES.map((t) => (
              <div
                key={t.key}
                className={`cr-type-card${type === t.key ? " active" : ""}`}
                onClick={() => {
                  setType(t.key);
                  setFile(null);
                }}
              >
                <div className="cr-type-icon">{t.icon}</div>
                <div className="cr-type-label">{t.label}</div>
                <div className="cr-type-hint">{t.hint}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="cr-card">
          <div className="cr-card-title">
            ⬆️ Fichier{" "}
            <span style={{ color: "#f97316", marginLeft: 2 }}>*</span>
          </div>
          {selectedType ? (
            <FileZone
              accept={selectedType.accept}
              icon={selectedType.icon}
              hint={selectedType.hint}
              file={file}
              onChange={setFile}
              onClear={() => setFile(null)}
            />
          ) : (
            <div className="cr-no-type">
              ← Sélectionne d'abord un type de ressource
            </div>
          )}
        </div>

        <div className="cr-card">
          <div className="cr-card-title">⚙ Paramètres</div>

          <div className="cr-group">
            <label className="cr-label">Ordre d'affichage</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="cr-stepper">
                <button
                  className="cr-stepper-btn"
                  type="button"
                  onClick={() => setOrder((o) => Math.max(0, o - 1))}
                >
                  −
                </button>
                <div className="cr-stepper-val">{order}</div>
                <button
                  className="cr-stepper-btn"
                  type="button"
                  onClick={() => setOrder((o) => o + 1)}
                >
                  +
                </button>
              </div>
              <span className="cr-stepper-hint">Position dans la liste</span>
            </div>
          </div>

          <div className="cr-group" style={{ marginBottom: 0 }}>
            <div className="cr-toggle-row">
              <div className="cr-toggle-info">
                <span className="cr-toggle-title">Accès gratuit</span>
                <span className="cr-toggle-sub">
                  {isFree
                    ? "Tous les étudiants peuvent accéder à cette ressource"
                    : "Ressource réservée aux abonnés premium"}
                </span>
              </div>
              <label className="cr-toggle">
                <input
                  type="checkbox"
                  checked={isFree}
                  onChange={(e) => setIsFree(e.target.checked)}
                />
                <span className="cr-toggle-slider" />
              </label>
            </div>
          </div>
        </div>

        <div className="cr-actions">
          <button className="cr-btn-cancel" onClick={() => navigate(-1)}>
            Annuler
          </button>
          <button
            className="cr-btn-submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading && <div className="cr-spinner" />}
            {loading ? "Création…" : "Créer la ressource"}
          </button>
        </div>
      </div>
    </>
  );
}
