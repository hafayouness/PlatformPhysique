import { useExams } from "../../hooks/Useexams";
import { useExamsFilterStore } from "../../stores/examsFilterStore";
import { SESSIONS } from "../../constants/filieres";
import ExamCard from "../../components/shared/ExamCard";
import EmptyState from "../../components/ui/EmptyState";
import { ExamCardSkeleton } from "../../components/ui/Skeleton";

const FILIERES = [
  { key: "", label: "Toutes" },
  { key: "SP", label: "SP — Sciences Physiques" },
  { key: "SVT", label: "SVT" },
  { key: "SMA", label: "SMA — Sciences Maths A" },
  { key: "SMB", label: "SMB — Sciences Maths B" },
];

const FILIERE_THEMES = {
  SP: {
    from: "#fff7ed",
    border: "#fed7aa",
    accent: "#f97316",
    icon: "⚗️",
    label: "SP",
  },
  SVT: {
    from: "#f0fdf4",
    border: "#bbf7d0",
    accent: "#16a34a",
    icon: "🧬",
    label: "SVT",
  },
  SMA: {
    from: "#eff6ff",
    border: "#bfdbfe",
    accent: "#2563eb",
    icon: "📐",
    label: "SMA",
  },
  SMB: {
    from: "#fdf4ff",
    border: "#e9d5ff",
    accent: "#9333ea",
    icon: "📊",
    label: "SMB",
  },
};

const FILIERE_ORDER = ["SP", "SVT", "SMA", "SMB"];

export default function ExamsPage() {
  const { filiere, session, setFiliere, setSession, reset } =
    useExamsFilterStore();

  const { data: allExams = [], isLoading } = useExams({});

  const filtered = allExams.filter((e) => {
    const okFiliere = !filiere || e.filiere === filiere;
    const okSession = !session || e.session === session;
    return okFiliere && okSession;
  });

  const grouped = filtered.reduce((acc, e) => {
    const f = e.filiere;
    const y = String(e.year);
    if (!acc[f]) acc[f] = {};
    if (!acc[f][y]) acc[f][y] = [];
    acc[f][y].push(e);
    return acc;
  }, {});

  const filiereKeys = FILIERE_ORDER.filter((k) => grouped[k]);
  // const hasFilters = !!(filiere || session);
  const total = filtered.length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        .ep-root { min-height:100vh;background:#f5f5f7;font-family:'DM Sans',sans-serif }

        .ep-hero { background:#fff;border-bottom:1px solid #f1f5f9;padding:36px 24px 32px }
        .ep-hero-in { max-width:960px;margin:0 auto }
        .ep-title { font-family:'Syne',sans-serif;font-weight:900;font-size:28px;letter-spacing:-1px;color:#0f172a;margin-bottom:4px }
        .ep-subtitle { font-size:14px;color:#94a3b8;font-weight:300 }

        .ep-body { max-width:960px;margin:0 auto;padding:24px }

        /* filters */
        .ep-filters { background:#fff;border:1px solid #f1f5f9;border-radius:16px;padding:18px 22px;margin-bottom:24px;box-shadow:0 1px 4px rgba(0,0,0,0.05);display:flex;flex-direction:column;gap:12px }
        .ep-frow { display:flex;align-items:center;gap:8px;flex-wrap:wrap }
        .ep-flbl { font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#cbd5e1;width:56px;flex-shrink:0 }
        .ep-pill { font-family:'Syne',sans-serif;font-weight:700;font-size:12px;padding:6px 14px;border-radius:100px;border:1.5px solid #e2e8f0;background:#fff;color:#94a3b8;cursor:pointer;transition:all .15s }
        .ep-pill:hover { border-color:#fed7aa;color:#f97316;background:#fff7ed }
        .ep-pill.act { background:#f97316;color:#fff;border-color:#f97316;box-shadow:0 3px 10px rgba(249,115,22,0.22) }
        .ep-pill.f-SP.act  { background:linear-gradient(135deg,#f97316,#ea580c);border-color:#f97316 }
        .ep-pill.f-SVT.act { background:linear-gradient(135deg,#16a34a,#15803d);border-color:#16a34a }
        .ep-pill.f-SMA.act { background:linear-gradient(135deg,#2563eb,#1d4ed8);border-color:#2563eb }
        .ep-pill.f-SMB.act { background:linear-gradient(135deg,#9333ea,#7e22ce);border-color:#9333ea }
        .ep-divider { height:1px;background:#f8fafc }
        .ep-reset { font-family:'Syne',sans-serif;font-weight:700;font-size:11px;color:#f97316;background:#fff7ed;border:1.5px solid #fed7aa;border-radius:8px;padding:5px 12px;cursor:pointer;transition:all .15s }
        .ep-reset:hover { background:#ffedd5 }

        .ep-count { font-size:12px;color:#bbb;margin-bottom:20px }
        .ep-count strong { font-family:'Syne',sans-serif;font-weight:800;color:#0f172a }

        /* filiere section */
        .ep-fblock { margin-bottom:32px }
        .ep-fhead { display:flex;align-items:center;gap:10px;padding:11px 16px;border-radius:12px;border:1px solid;margin-bottom:8px }
        .ep-ficon { font-size:16px }
        .ep-fname { font-family:'Syne',sans-serif;font-weight:900;font-size:15px;letter-spacing:-.5px }
        .ep-fcount { font-size:11px;font-weight:600;margin-left:auto;opacity:.55;font-family:'Syne',sans-serif }

        .ep-list { display:flex;flex-direction:column;gap:6px }
        .ep-empty { padding:48px 24px;text-align:center }
      `}</style>

      <div className="ep-root">
        <div className="ep-hero">
          <div className="ep-hero-in">
            <h1 className="ep-title">📋 Examens Nationaux</h1>
            <p className="ep-subtitle">
              Sujets et corrections de 2015 à 2024 — SP · SVT · SMA · SMB
            </p>
          </div>
        </div>

        <div className="ep-body">
          <div className="ep-filters">
            <div className="ep-frow">
              <span className="ep-flbl">Filière</span>
              {FILIERES.map((f) => (
                <button
                  key={f.key}
                  className={`ep-pill f-${f.key}${filiere === f.key ? " act" : ""}`}
                  onClick={() =>
                    setFiliere(filiere === f.key && f.key !== "" ? "" : f.key)
                  }
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="ep-divider" />

            <div className="ep-frow">
              <span className="ep-flbl">Session</span>
              {SESSIONS.map((s) => (
                <button
                  key={s.key}
                  className={`ep-pill${session === s.key ? " act" : ""}`}
                  onClick={() => setSession(session === s.key ? "" : s.key)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {!isLoading && total > 0 && (
            <p className="ep-count">
              <strong>{total}</strong> examen{total > 1 ? "s" : ""} trouvé
              {total > 1 ? "s" : ""}
            </p>
          )}

          {isLoading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[...Array(5)].map((_, i) => (
                <ExamCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="ep-empty">
              <EmptyState
                icon="📭"
                title="Aucun examen trouvé"
                subtitle="Essaie de modifier les filtres"
              />
            </div>
          ) : (
            filiereKeys.map((fKey) => {
              const t = FILIERE_THEMES[fKey];
              const yMap = grouped[fKey];
              const years = Object.keys(yMap).sort(
                (a, b) => Number(b) - Number(a),
              );
              const tot = years.reduce((s, y) => s + yMap[y].length, 0);

              return (
                <div key={fKey} className="ep-fblock">
                  <div
                    className="ep-fhead"
                    style={{ background: t.from, borderColor: t.border }}
                  >
                    <span className="ep-ficon">{t.icon}</span>
                    <span className="ep-fname" style={{ color: t.accent }}>
                      {t.label}
                    </span>
                    <span className="ep-fcount" style={{ color: t.accent }}>
                      {tot} examen{tot > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="ep-list">
                    {years.map((year) => (
                      <ExamCard
                        key={`${fKey}-${year}`}
                        year={year}
                        exams={yMap[year]}
                        theme={t}
                      />
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
