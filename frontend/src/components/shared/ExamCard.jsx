import { useState } from "react";
import { SERVER_URL } from "../../lib/axios";

const BTN_BASE = {
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  fontSize: 11,
  fontFamily: "'Syne', sans-serif",
  fontWeight: 700,
  padding: "6px 12px",
  borderRadius: 8,
  border: "1.5px solid",
  textDecoration: "none",
  transition: "all 0.15s",
  cursor: "pointer",
};

function PdfModal({ url, title, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 20,
          overflow: "hidden",
          width: "100%",
          maxWidth: 900,
          height: "85vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <span
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: 14,
              color: "#0f172a",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: 600,
            }}
          >
            📄 {title}
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <a
              href={url}
              download
              style={{
                ...BTN_BASE,
                background: "#f97316",
                color: "#fff",
                borderColor: "#f97316",
              }}
            >
              ⬇ Télécharger
            </a>
            <button
              onClick={onClose}
              style={{
                ...BTN_BASE,
                background: "#f1f5f9",
                color: "#64748b",
                borderColor: "#f1f5f9",
              }}
            >
              ✕ Fermer
            </button>
          </div>
        </div>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <iframe
            src={url}
            title={title}
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        </div>
      </div>
    </div>
  );
}

function FileBtn({ href, label, type }) {
  const [pdfOpen, setPdfOpen] = useState(false);

  const STYLES = {
    pdf: {
      view: {
        ...BTN_BASE,
        background: "#fff7ed",
        color: "#f97316",
        borderColor: "#fed7aa",
      },
      dl: {
        ...BTN_BASE,
        background: "#f97316",
        color: "#fff",
        borderColor: "#f97316",
        boxShadow: "0 3px 10px rgba(249,115,22,0.25)",
      },
    },
    correct: {
      view: {
        ...BTN_BASE,
        background: "#f0fdf4",
        color: "#16a34a",
        borderColor: "#bbf7d0",
      },
      dl: {
        ...BTN_BASE,
        background: "#16a34a",
        color: "#fff",
        borderColor: "#16a34a",
        boxShadow: "0 3px 10px rgba(22,163,74,0.25)",
      },
    },
    video: {
      btn: {
        ...BTN_BASE,
        background: "#2563eb",
        color: "#fff",
        borderColor: "#2563eb",
        boxShadow: "0 3px 10px rgba(37,99,235,0.25)",
      },
    },
  };

  if (!href)
    return (
      <span
        style={{
          ...BTN_BASE,
          background: "#f8fafc",
          color: "#cbd5e1",
          borderColor: "#f1f5f9",
          cursor: "default",
        }}
      >
        Bientôt
      </span>
    );

  if (type === "video")
    return (
      <a href={href} target="_blank" rel="noreferrer" style={STYLES.video.btn}>
        ▶ Regarder
      </a>
    );

  const s = STYLES[type] || STYLES.pdf;
  return (
    <>
      <div style={{ display: "flex", gap: 5 }}>
        <button onClick={() => setPdfOpen(true)} style={s.view}>
          👁 Voir
        </button>
        <a href={href} download style={s.dl}>
          ⬇ Télécharger
        </a>
      </div>
      {pdfOpen && (
        <PdfModal url={href} title={label} onClose={() => setPdfOpen(false)} />
      )}
    </>
  );
}

function ExamModal({ exam, sessionLabel, theme: t, onClose }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        .exm-ov { position:fixed;inset:0;background:rgba(0,0,0,0.55);backdrop-filter:blur(6px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:24px;animation:exmF .2s ease }
        @keyframes exmF{from{opacity:0}to{opacity:1}}
        .exm-box { background:#fff;border-radius:22px;overflow:hidden;width:100%;max-width:500px;display:flex;flex-direction:column;box-shadow:0 32px 80px rgba(0,0,0,0.2);animation:exmU .22s ease }
        @keyframes exmU{from{transform:translateY(14px);opacity:0}to{transform:translateY(0);opacity:1}}
        .exm-head { padding:18px 20px 14px;border-bottom:1px solid #f1f5f9 }
        .exm-head-row { display:flex;align-items:flex-start;justify-content:space-between;gap:10px }
        .exm-badges { display:flex;gap:5px;flex-wrap:wrap;margin-bottom:7px }
        .exm-badge { font-family:'Syne',sans-serif;font-weight:700;font-size:10px;letter-spacing:.8px;text-transform:uppercase;padding:3px 9px;border-radius:100px;border:1px solid }
        .exm-title { font-family:'Syne',sans-serif;font-weight:900;font-size:15px;color:#0f172a;line-height:1.3 }
        .exm-yr { font-family:'Syne',sans-serif;font-weight:900;font-size:34px;line-height:1;flex-shrink:0 }
        .exm-close { width:28px;height:28px;border-radius:50%;background:#f8fafc;border:1px solid #f1f5f9;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:12px;color:#94a3b8;transition:all .15s;flex-shrink:0;margin-left:4px }
        .exm-close:hover { background:#fee2e2;color:#ef4444;border-color:#fecaca }
        .exm-body { padding:14px 20px 18px;display:flex;flex-direction:column;gap:8px }
        .exm-lbl { font-size:10px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;color:#cbd5e1;margin-bottom:2px }
        .exm-row { display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-radius:11px;background:#f8fafc;border:1px solid #f1f5f9;gap:10px }
        .exm-left { display:flex;align-items:center;gap:9px }
        .exm-ico { width:32px;height:32px;border-radius:8px;background:#fff;border:1px solid #eef2f7;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0 }
        .exm-name { font-family:'Syne',sans-serif;font-weight:700;font-size:12px;color:#1e293b }
        .exm-sub { font-size:10px;color:#94a3b8;margin-top:1px }
        .exm-acts { display:flex;gap:5px;flex-wrap:wrap;flex-shrink:0 }
      `}</style>

      <div className="exm-ov" onClick={onClose}>
        <div className="exm-box" onClick={(e) => e.stopPropagation()}>
          <div
            className="exm-head"
            style={{ background: `linear-gradient(135deg,${t.from},#fff)` }}
          >
            <div className="exm-head-row">
              <div style={{ flex: 1 }}>
                <div className="exm-badges">
                  <span
                    className="exm-badge"
                    style={{
                      color: t.accent,
                      background: t.from,
                      borderColor: t.border,
                    }}
                  >
                    {t.icon} {t.label}
                  </span>
                  <span
                    className="exm-badge"
                    style={{
                      color:
                        sessionLabel === "Rattrapage" ? "#64748b" : t.accent,
                      background:
                        sessionLabel === "Rattrapage" ? "#f8fafc" : t.from,
                      borderColor:
                        sessionLabel === "Rattrapage" ? "#e2e8f0" : t.border,
                    }}
                  >
                    {sessionLabel}
                  </span>
                  {!exam.isFree && (
                    <span
                      className="exm-badge"
                      style={{
                        color: "#f97316",
                        background: "#fff7ed",
                        borderColor: "#fed7aa",
                      }}
                    >
                      🔒 Premium
                    </span>
                  )}
                </div>
                <h2 className="exm-title">{exam.title}</h2>
              </div>
              <span className="exm-yr" style={{ color: t.border }}>
                {exam.year}
              </span>
              <button className="exm-close" onClick={onClose}>
                ✕
              </button>
            </div>
          </div>

          <div className="exm-body">
            <p className="exm-lbl">Ressources disponibles</p>

            <div className="exm-row">
              <div className="exm-left">
                <div className="exm-ico">📄</div>
                <div>
                  <div className="exm-name">Sujet PDF</div>
                  <div className="exm-sub">Énoncé de l'examen</div>
                </div>
              </div>
              <div className="exm-acts">
                <FileBtn
                  href={
                    exam.subjectPdfUrl
                      ? `${SERVER_URL}${exam.subjectPdfUrl}`
                      : null
                  }
                  label="Sujet PDF"
                  type="pdf"
                />
              </div>
            </div>

            <div className="exm-row">
              <div className="exm-left">
                <div className="exm-ico">✅</div>
                <div>
                  <div className="exm-name">Correction PDF</div>
                  <div className="exm-sub">Corrigé officiel</div>
                </div>
              </div>
              <div className="exm-acts">
                <FileBtn
                  href={
                    exam.solutionPdfUrl
                      ? `${SERVER_URL}${exam.solutionPdfUrl}`
                      : null
                  }
                  label="Correction PDF"
                  type="correct"
                />
              </div>
            </div>

            <div className="exm-row">
              <div className="exm-left">
                <div className="exm-ico">🎬</div>
                <div>
                  <div className="exm-name">Correction vidéo</div>
                  <div className="exm-sub">Explication détaillée</div>
                </div>
              </div>
              <div className="exm-acts">
                <FileBtn
                  href={
                    exam.solutionVideoUrl
                      ? `${SERVER_URL}${exam.solutionVideoUrl}`
                      : null
                  }
                  label="Regarder"
                  type="video"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── EXAM CARD : une ligne par année, boutons Normale + Rattrapage ──
export default function ExamCard({ year, exams, theme: t }) {
  const [modal, setModal] = useState(null); // { exam, sessionLabel }

  const normale = exams.find((e) => e.session === "normale");
  const rattrapage = exams.find((e) => e.session === "rattrapage");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        .ec-wrap { background:#fff;border-radius:12px;border:1px solid #f1f5f9;box-shadow:0 1px 3px rgba(0,0,0,0.04);display:flex;align-items:stretch;overflow:hidden;transition:box-shadow .2s,transform .2s;font-family:'DM Sans',sans-serif }
        .ec-wrap:hover { box-shadow:0 6px 20px rgba(0,0,0,0.07);transform:translateY(-1px) }
        .ec-stripe { width:4px;flex-shrink:0 }
        .ec-inner { display:flex;flex:1;align-items:center;padding:12px 16px;gap:12px;flex-wrap:wrap }
        .ec-year { font-family:'Syne',sans-serif;font-weight:900;font-size:22px;letter-spacing:-1px;line-height:1;width:52px;flex-shrink:0;margin-right:14px}
        .ec-sep { width:1px;height:28px;background:#f1f5f9;flex-shrink:0 }
        .ec-btns { display:flex;gap:7px;flex:1;align-items:center;flex-wrap:wrap }
        .ec-sess {
          display:inline-flex;align-items:center;gap:6px;
          font-family:'Syne',sans-serif;font-weight:700;font-size:12px;
          padding:7px 15px;border-radius:9px;border:1.5px solid;
          cursor:pointer;transition:all .18s;
        }
        .ec-sess:hover { transform:translateY(-1px);box-shadow:0 4px 12px rgba(0,0,0,0.1) }
        .ec-dot { width:6px;height:6px;border-radius:50%;flex-shrink:0 }
        .ec-sess.off { opacity:.28;cursor:not-allowed;pointer-events:none }
      `}</style>

      <div className="ec-wrap">
        <div className="ec-stripe" style={{ background: t.accent }} />
        <div className="ec-inner">
          <span className="ec-year" style={{ color: t.accent }}>
            {year}
          </span>
          <div className="ec-sep" />

          <div className="ec-btns">
            <button
              className={`ec-sess${!normale ? " off" : ""}`}
              style={{
                color: t.accent,
                borderColor: t.border,
                background: t.from,
              }}
              onClick={() =>
                normale && setModal({ exam: normale, sessionLabel: "Normale" })
              }
            >
              <span className="ec-dot" style={{ background: t.accent }} />
              Normale
            </button>

            <button
              className={`ec-sess${!rattrapage ? " off" : ""}`}
              style={{
                color: "#64748b",
                borderColor: "#e2e8f0",
                background: "#f8fafc",
              }}
              onClick={() =>
                rattrapage &&
                setModal({ exam: rattrapage, sessionLabel: "Rattrapage" })
              }
            >
              <span className="ec-dot" style={{ background: "#94a3b8" }} />
              Rattrapage
            </button>
          </div>
        </div>
      </div>

      {modal && (
        <ExamModal
          exam={modal.exam}
          sessionLabel={modal.sessionLabel}
          theme={t}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
