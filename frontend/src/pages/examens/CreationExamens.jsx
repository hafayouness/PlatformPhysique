import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { examsService } from "../../services/examenServices";

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

const SESSIONS = [
  { key: "normale", label: "Normale", icon: "📅" },
  { key: "rattrapage", label: "Rattrapage", icon: "🔁" },
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 20 }, (_, i) => CURRENT_YEAR - i);

function FileZone({ label, accept, icon, hint, file, onChange, onClear }) {
  const ref = useRef();
  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) onChange(f);
  };

  return (
    <div className="ce-file-zone-wrap">
      <label className="ce-label">{label}</label>
      {file ? (
        <div className="ce-file-selected">
          <span className="ce-file-icon">{icon}</span>
          <div className="ce-file-info">
            <span className="ce-file-name">{file.name}</span>
            <span className="ce-file-size">
              {(file.size / 1024).toFixed(0)} Ko
            </span>
          </div>
          <button className="ce-file-clear" onClick={onClear} type="button">
            ✕
          </button>
        </div>
      ) : (
        <div
          className="ce-file-zone"
          onClick={() => ref.current.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            ref={ref}
            type="file"
            accept={accept}
            style={{ display: "none" }}
            onChange={(e) => onChange(e.target.files?.[0] || null)}
          />
          <span className="ce-file-zone-icon">{icon}</span>
          <span className="ce-file-zone-text">
            Glisse ou <u>clique</u> pour importer
          </span>
          <span className="ce-file-zone-hint">{hint}</span>
        </div>
      )}
    </div>
  );
}

export default function CreateExamPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState(CURRENT_YEAR);
  const [filiere, setFiliere] = useState("");
  const [session, setSession] = useState("normale");
  const [isFree, setIsFree] = useState(true);
  const [subjectPdf, setSubjectPdf] = useState(null);
  const [solutionPdf, setSolutionPdf] = useState(null);
  const [solutionVid, setSolutionVid] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const reset = () => {
    setTitle("");
    setYear(CURRENT_YEAR);
    setFiliere("");
    setSession("normale");
    setIsFree(true);
    setSubjectPdf(null);
    setSolutionPdf(null);
    setSolutionVid(null);
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);
    if (!title.trim() || !filiere) {
      setError("Titre et filière sont requis.");
      return;
    }
    setLoading(true);
    try {
      const form = new FormData();
      form.append("title", title);
      form.append("year", year);
      form.append("filiere", filiere);
      form.append("session", session);
      form.append("isFree", isFree);
      if (subjectPdf) form.append("subjectPdf", subjectPdf);
      if (solutionPdf) form.append("solutionPdf", solutionPdf);
      if (solutionVid) form.append("solutionVideo", solutionVid);

      await examsService.create(form);
      setSuccess(true);
      navigate("/exams", { state: { refresh: true } });
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

        .ce-root {
          font-family: 'DM Sans', sans-serif;
          max-width: 720px;
          margin: 0 auto;
        }

        .ce-page-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: 26px;
          letter-spacing: -1px;
          color: #111;
          margin-bottom: 4px;
          text-align: center;
        }

        .ce-page-sub {
          color: #aaa;
          font-size: 14px;
          font-weight: 300;
          margin-bottom: 28px;
          text-align: center;
        }

        .ce-alert {
          padding: 13px 18px;
          border-radius: 14px;
          font-size: 13px;
          margin-bottom: 20px;
        }
        .ce-alert.error {
          background: rgba(239,68,68,0.06);
          border: 1px solid rgba(239,68,68,0.15);
          color: #ef4444;
        }
        .ce-alert.success {
          background: rgba(34,197,94,0.07);
          border: 1px solid rgba(34,197,94,0.2);
          color: #16a34a;
        }

        .ce-card {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          margin-bottom: 16px;
        }

        .ce-card-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 13px;
          color: #111;
          margin-bottom: 20px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ce-group { margin-bottom: 20px; }
        .ce-group:last-child { margin-bottom: 0; }

        .ce-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .ce-label {
          display: block;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #bbb;
          margin-bottom: 8px;
        }
        .ce-label .req { color: #f97316; margin-left: 2px; }

        .ce-input {
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
          appearance: none;
        }
        .ce-input:focus {
          border-color: #f97316;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.08);
        }
        .ce-input::placeholder { color: #ccc; font-weight: 300; }

        /* Select wrapper */
        .ce-select-wrap { position: relative; }
        .ce-select-wrap::after {
          content: '▾';
          position: absolute;
          right: 14px; top: 50%;
          transform: translateY(-50%);
          color: #bbb; font-size: 13px;
          pointer-events: none;
        }
        .ce-select-wrap .ce-input { padding-right: 36px; cursor: pointer; }

        /* Filieres */
        .ce-filieres {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .ce-filiere-card {
          border: 1.5px solid rgba(0,0,0,0.09);
          border-radius: 14px;
          padding: 14px 10px;
          background: #fafafa;
          cursor: pointer;
          text-align: center;
          transition: all 0.18s ease;
          user-select: none;
        }
        .ce-filiere-card:hover {
          border-color: rgba(249,115,22,0.4);
          background: #fff;
        }
        .ce-filiere-card.active {
          background: linear-gradient(135deg, rgba(249,115,22,0.10), rgba(234,88,12,0.06));
          border-color: rgba(249,115,22,0.5);
          box-shadow: 0 0 0 3px rgba(249,115,22,0.08);
        }
        .ce-filiere-icon { font-size: 22px; margin-bottom: 6px; }
        .ce-filiere-key {
          font-family: 'Syne', sans-serif;
          font-weight: 900; font-size: 14px; color: #111; margin-bottom: 2px;
        }
        .ce-filiere-full { font-size: 10px; color: #bbb; font-weight: 300; line-height: 1.3; }
        .ce-filiere-card.active .ce-filiere-key { color: #ea580c; }
        .ce-filiere-card.active .ce-filiere-full { color: #f97316; }

        /* Session pills */
        .ce-pills { display: flex; flex-wrap: wrap; gap: 8px; }

        .ce-pill {
          padding: 7px 18px;
          border-radius: 100px;
          border: 1.5px solid rgba(0,0,0,0.09);
          background: #fafafa;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 500; color: #666;
          cursor: pointer; transition: all 0.15s; user-select: none;
          display: flex; align-items: center; gap: 6px;
        }
        .ce-pill:hover { border-color: #f97316; color: #ea580c; background: #fff; }
        .ce-pill.active {
          background: linear-gradient(135deg, rgba(249,115,22,0.12), rgba(234,88,12,0.07));
          border-color: rgba(249,115,22,0.5);
          color: #ea580c; font-weight: 600;
        }

        /* Toggle isFree */
        .ce-toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fafafa;
          border: 1px solid rgba(0,0,0,0.09);
          border-radius: 14px;
          padding: 14px 18px;
        }
        .ce-toggle-info { display: flex; flex-direction: column; gap: 2px; }
        .ce-toggle-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 500; color: #111;
        }
        .ce-toggle-sub { font-size: 12px; color: #bbb; font-weight: 300; }

        .ce-toggle {
          position: relative;
          width: 44px; height: 24px;
          cursor: pointer; flex-shrink: 0;
        }
        .ce-toggle input { opacity: 0; width: 0; height: 0; }
        .ce-toggle-slider {
          position: absolute; inset: 0;
          background: #e5e5e5;
          border-radius: 100px;
          transition: background 0.2s;
        }
        .ce-toggle-slider::before {
          content: '';
          position: absolute;
          width: 18px; height: 18px;
          left: 3px; top: 3px;
          background: white;
          border-radius: 50%;
          transition: transform 0.2s;
          box-shadow: 0 1px 4px rgba(0,0,0,0.15);
        }
        .ce-toggle input:checked + .ce-toggle-slider { background: linear-gradient(135deg, #f97316, #ea580c); }
        .ce-toggle input:checked + .ce-toggle-slider::before { transform: translateX(20px); }

        /* File upload zones */
        .ce-files-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
        }

        .ce-file-zone-wrap { display: flex; flex-direction: column; }

        .ce-file-zone {
          border: 1.5px dashed rgba(0,0,0,0.12);
          border-radius: 14px;
          padding: 20px 12px;
          background: #fafafa;
          cursor: pointer;
          text-align: center;
          transition: all 0.18s;
          display: flex; flex-direction: column;
          align-items: center; gap: 6px;
          min-height: 110px; justify-content: center;
        }
        .ce-file-zone:hover {
          border-color: rgba(249,115,22,0.5);
          background: rgba(249,115,22,0.03);
        }
        .ce-file-zone-icon { font-size: 24px; }
        .ce-file-zone-text { font-size: 12px; color: #888; font-weight: 400; }
        .ce-file-zone-text u { color: #f97316; }
        .ce-file-zone-hint { font-size: 10px; color: #ccc; font-weight: 300; }

        .ce-file-selected {
          border: 1.5px solid rgba(249,115,22,0.3);
          border-radius: 14px;
          padding: 12px 14px;
          background: linear-gradient(135deg, rgba(249,115,22,0.06), rgba(234,88,12,0.03));
          display: flex; align-items: center; gap: 10px;
          min-height: 110px;
        }
        .ce-file-icon { font-size: 22px; flex-shrink: 0; }
        .ce-file-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
        .ce-file-name {
          font-size: 12px; font-weight: 500; color: #111;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .ce-file-size { font-size: 11px; color: #bbb; font-weight: 300; }
        .ce-file-clear {
          background: none; border: none; cursor: pointer;
          color: #ccc; font-size: 14px; flex-shrink: 0;
          transition: color 0.15s; padding: 4px;
        }
        .ce-file-clear:hover { color: #ef4444; }

        /* Actions */
        .ce-actions {
          display: flex; align-items: center;
          justify-content: flex-end; gap: 12px; padding-top: 4px;
        }

        .ce-btn-cancel {
          padding: 11px 22px; border-radius: 12px;
          border: 1.5px solid rgba(0,0,0,0.10);
          background: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 500; color: #666;
          cursor: pointer; transition: all 0.15s;
        }
        .ce-btn-cancel:hover { border-color: #111; color: #111; }

        .ce-btn-submit {
          padding: 11px 28px; border-radius: 12px; border: none;
          background: linear-gradient(135deg, #f97316, #ea580c);
          font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 800; color: #fff;
          cursor: pointer; letter-spacing: -0.3px;
          transition: all 0.18s;
          display: flex; align-items: center; gap: 8px;
          box-shadow: 0 4px 14px rgba(249,115,22,0.3);
        }
        .ce-btn-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(249,115,22,0.4);
        }
        .ce-btn-submit:active:not(:disabled) { transform: translateY(0); }
        .ce-btn-submit:disabled {
          opacity: 0.6; cursor: not-allowed;
          transform: none; box-shadow: none;
        }

        .ce-spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: ce-spin 0.6s linear infinite;
        }
        @keyframes ce-spin { to { transform: rotate(360deg); } }

        @media (max-width: 640px) {
          .ce-filieres { grid-template-columns: repeat(2, 1fr); }
          .ce-files-grid { grid-template-columns: 1fr; }
          .ce-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="ce-root">
        <h1 className="ce-page-title">📋 Créer un examen</h1>
        <p className="ce-page-sub">
          Remplis les informations pour ajouter un nouvel examen national
        </p>

        {error && <div className="ce-alert error">⚠ {error}</div>}
        {success && (
          <div className="ce-alert success">✓ Examen créé avec succès !</div>
        )}

        <div className="ce-card">
          <div className="ce-card-title">📝 Informations générales</div>

          <div className="ce-group">
            <label className="ce-label">
              Titre <span className="req">*</span>
            </label>
            <input
              className="ce-input"
              type="text"
              placeholder="ex : Examen National — Physique-Chimie 2023"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="ce-row">
            <div className="ce-group" style={{ marginBottom: 0 }}>
              <label className="ce-label">
                Année <span className="req">*</span>
              </label>
              <div className="ce-select-wrap">
                <select
                  className="ce-input"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="ce-group" style={{ marginBottom: 0 }}>
              <label className="ce-label">Session</label>
              <div className="ce-pills">
                {SESSIONS.map((s) => (
                  <div
                    key={s.key}
                    className={`ce-pill${session === s.key ? " active" : ""}`}
                    onClick={() => setSession(s.key)}
                  >
                    {s.icon} {s.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="ce-card">
          <div className="ce-card-title">
            🎓 Filière{" "}
            <span style={{ color: "#f97316", marginLeft: 2 }}>*</span>
          </div>
          <div className="ce-filieres">
            {FILIERES.map((f) => (
              <div
                key={f.key}
                className={`ce-filiere-card${filiere === f.key ? " active" : ""}`}
                onClick={() => setFiliere(f.key)}
              >
                <div className="ce-filiere-icon">{f.icon}</div>
                <div className="ce-filiere-key">{f.label}</div>
                <div className="ce-filiere-full">{f.full}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="ce-card">
          <div className="ce-card-title">📎 Fichiers joints</div>
          <div className="ce-files-grid">
            <FileZone
              label="Sujet (PDF)"
              accept=".pdf"
              icon="📄"
              hint="PDF uniquement"
              file={subjectPdf}
              onChange={setSubjectPdf}
              onClear={() => setSubjectPdf(null)}
            />
            <FileZone
              label="Correction (PDF)"
              accept=".pdf"
              icon="✅"
              hint="PDF uniquement"
              file={solutionPdf}
              onChange={setSolutionPdf}
              onClear={() => setSolutionPdf(null)}
            />
            <FileZone
              label="Correction (Vidéo)"
              accept="video/*"
              icon="🎬"
              hint="MP4, MOV, AVI…"
              file={solutionVid}
              onChange={setSolutionVid}
              onClear={() => setSolutionVid(null)}
            />
          </div>
        </div>

        <div className="ce-card">
          <div className="ce-card-title">🔒 Accès</div>
          <div className="ce-toggle-row">
            <div className="ce-toggle-info">
              <span className="ce-toggle-title">Accès gratuit</span>
              <span className="ce-toggle-sub">
                {isFree
                  ? "Tous les étudiants peuvent accéder à cet examen"
                  : "Examen réservé aux abonnés premium"}
              </span>
            </div>
            <label className="ce-toggle">
              <input
                type="checkbox"
                checked={isFree}
                onChange={(e) => setIsFree(e.target.checked)}
              />
              <span className="ce-toggle-slider" />
            </label>
          </div>
        </div>

        <div className="ce-actions">
          <button className="ce-btn-cancel" onClick={() => navigate(-1)}>
            Annuler
          </button>
          <button
            className="ce-btn-submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading && <div className="ce-spinner" />}
            {loading ? "Création…" : "Créer l'examen"}
          </button>
        </div>
      </div>
    </>
  );
}
