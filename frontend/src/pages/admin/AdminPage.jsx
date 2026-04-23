import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useCourses } from "../../hooks/useCourse";
import { useExams } from "../../hooks/Useexams";
import { FILIERES } from "../../constants/filieres";
import clsx from "clsx";

function StatCard({ icon, label, value, sub, gradient }) {
  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .stat-card {
          animation: fadeUp 0.5s ease both;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.05);
          position: relative;
          overflow: hidden;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--card-gradient);
        }
      `}</style>
      <div className="stat-card" style={{ "--card-gradient": gradient }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 28 }}>{icon}</span>
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 900,
              fontSize: 36,
              color: "#111",
              lineHeight: 1,
            }}
          >
            {value}
          </span>
        </div>
        <p
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: "#111",
            marginBottom: 2,
          }}
        >
          {label}
        </p>
        {sub && (
          <p
            style={{
              fontSize: 12,
              color: "#bbb",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {sub}
          </p>
        )}
      </div>
    </>
  );
}

export default function AdminPage() {
  const { user, isAdmin } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: courses } = useCourses({});
  const { data: exams } = useExams({});

  if (!isAdmin()) {
    navigate("/");
    return null;
  }

  const isActive = (to, exact) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  const coursesByFiliere = FILIERES.map((f) => ({
    ...f,
    count: (courses || []).filter(
      (c) => c.filiere === f.key || c.filiere === "ALL",
    ).length,
  }));

  const QUICK_ACTIONS = [
    {
      to: "/admin/courses/create",
      icon: "📚",
      label: "Gérer les cours",
      desc: "Créer, modifier, supprimer des cours",
      gradient: "linear-gradient(135deg, #f97316, #ea580c)",
    },
    {
      to: "/admin/exams/create",
      icon: "📋",
      label: "Gérer les examens",
      desc: "Ajouter les examens nationaux",
      gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    },
    {
      to: "/admin/resources/create",
      icon: "📎",
      label: "Gérer les ressources",
      desc: "Uploader PDF et vidéos",
      gradient: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .admin-root {
          display: flex;
          min-height: 100vh;
          background: #f8f7f4;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Sidebar ── */
        .sidebar {
          width: 260px;
          min-height: 100vh;
          background: #ffffff;
          border-right: 1px solid rgba(0,0,0,0.07);
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          box-shadow: 4px 0 24px rgba(0,0,0,0.04);
          z-index: 40;
          flex-shrink: 0;
        }

        .sidebar-logo {
          padding: 28px 24px 20px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }

        .sidebar-logo a {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .logo-icon {
          width: 36px; height: 36px;
          position: relative;
          flex-shrink: 0;
        }

        .logo-icon-back {
          position: absolute; inset: 0;
          background: #f97316;
          border-radius: 10px;
          transform: rotate(3deg);
        }

        .logo-icon-front {
          position: absolute; inset: 0;
          background: #fb923c;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
        }

        .logo-text {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: 18px;
          color: #111;
        }

        .logo-text span { color: #f97316; }

        .sidebar-badge {
          margin: 16px 24px 0;
          background: linear-gradient(135deg, rgba(249,115,22,0.1), rgba(234,88,12,0.06));
          border: 1px solid rgba(249,115,22,0.2);
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sidebar-avatar {
          width: 32px; height: 32px;
          background: linear-gradient(135deg, #f97316, #ea580c);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          color: white;
          flex-shrink: 0;
        }

        .sidebar-user-name {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 13px;
          color: #111;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sidebar-user-role {
          font-size: 11px;
          color: #f97316;
          font-weight: 500;
        }

        .sidebar-nav {
          flex: 1;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          overflow-y: auto;
        }

        .sidebar-section-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          color: #ccc;
          padding: 8px 12px 4px;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          border-radius: 14px;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #666;
          transition: all 0.18s ease;
          border: 1px solid transparent;
        }

        .sidebar-link:hover {
          background: #f8f7f4;
          color: #111;
          border-color: rgba(0,0,0,0.05);
        }

        .sidebar-link.active {
          background: linear-gradient(135deg, rgba(249,115,22,0.1), rgba(234,88,12,0.06));
          color: #ea580c;
          border-color: rgba(249,115,22,0.2);
          font-weight: 500;
        }

        .sidebar-link-icon {
          font-size: 16px;
          width: 20px;
          text-align: center;
          flex-shrink: 0;
        }

        .sidebar-link.active .sidebar-link-icon {
          filter: none;
        }

        .sidebar-footer {
          padding: 16px 12px;
          border-top: 1px solid rgba(0,0,0,0.06);
        }

        .sidebar-home-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 12px;
          text-decoration: none;
          font-size: 13px;
          color: #999;
          transition: all 0.18s;
          font-family: 'DM Sans', sans-serif;
        }

        .sidebar-home-btn:hover {
          background: #f8f7f4;
          color: #111;
        }

        /* ── Main ── */
        .admin-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        /* ── Top bar ── */
        .topbar {
          background: #ffffff;
          border-bottom: 1px solid rgba(0,0,0,0.07);
          padding: 0 32px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 30;
        }

        .topbar-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: 20px;
          color: #111;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .topbar-pill {
          background: linear-gradient(135deg, rgba(249,115,22,0.08), rgba(234,88,12,0.04));
          border: 1px solid rgba(249,115,22,0.18);
          border-radius: 100px;
          padding: 6px 14px 6px 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .topbar-dot {
          width: 8px; height: 8px;
          background: #f97316;
          border-radius: 50%;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }

        .topbar-pill-text {
          font-size: 12px;
          color: #ea580c;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Content ── */
        .admin-content {
          padding: 32px;
          flex: 1;
        }

        /* ── Stats grid ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 36px;
        }

        /* ── Section title ── */
        .section-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: 18px;
          color: #111;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .section-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(0,0,0,0.07);
          margin-left: 8px;
        }

        /* ── Quick actions ── */
        .actions-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 36px;
        }

        .action-card {
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 20px;
          padding: 24px;
          text-decoration: none;
          display: block;
          transition: all 0.22s ease;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          position: relative;
          overflow: hidden;
        }

        .action-card::after {
          content: '→';
          position: absolute;
          bottom: 20px; right: 20px;
          font-size: 18px;
          color: #ddd;
          transition: all 0.22s ease;
        }

        .action-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.1);
          border-color: rgba(0,0,0,0.12);
        }

        .action-card:hover::after {
          color: #999;
          transform: translateX(3px);
        }

        .action-icon-wrap {
          width: 48px; height: 48px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          margin-bottom: 16px;
        }

        .action-label {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 15px;
          color: #111;
          margin-bottom: 4px;
        }

        .action-desc {
          font-size: 13px;
          color: #bbb;
          font-family: 'DM Sans', sans-serif;
          line-height: 1.5;
        }

        /* ── Filieres ── */
        .filieres-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        .filiere-card {
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 18px;
          padding: 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }

        .filiere-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .filiere-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .filiere-icon {
          font-size: 22px;
        }

        .filiere-name {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 14px;
          color: #111;
        }

        .filiere-key {
          font-size: 11px;
          color: #ccc;
          font-family: 'DM Sans', sans-serif;
        }

        .filiere-count {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: 28px;
          color: #111;
        }

        .filiere-bar-bg {
          width: 100%;
          height: 6px;
          background: #f0ede8;
          border-radius: 100px;
          overflow: hidden;
        }

        .filiere-bar-fill {
          height: 100%;
          border-radius: 100px;
          background: linear-gradient(90deg, #f97316, #ea580c);
          transition: width 0.8s ease;
        }

        /* ── Mobile ── */
        .mobile-toggle {
          display: none;
          position: fixed;
          bottom: 20px; right: 20px;
          z-index: 100;
          width: 48px; height: 48px;
          background: linear-gradient(135deg, #f97316, #ea580c);
          border-radius: 50%;
          border: none;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          box-shadow: 0 8px 24px rgba(249,115,22,0.4);
        }

        .sidebar-overlay {
          display: none;
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.3);
          z-index: 39;
          backdrop-filter: blur(2px);
        }

        @keyframes fadeUpCard {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .action-card { animation: fadeUpCard 0.4s ease both; }
        .action-card:nth-child(2) { animation-delay: 0.07s; }
        .action-card:nth-child(3) { animation-delay: 0.14s; }

        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .actions-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            left: -260px;
            transition: left 0.3s ease;
          }
          .sidebar.open { left: 0; }
          .sidebar-overlay.open { display: block; }
          .mobile-toggle { display: flex; }
          .admin-content { padding: 20px; }
          .topbar { padding: 0 20px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .actions-grid { grid-template-columns: 1fr; }
          .filieres-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="admin-root">
        <main className="admin-main">
          <div className="topbar">
            <span className="topbar-title">Admin Dashboard</span>
            <div className="topbar-right">
              <div className="topbar-pill">
                <div className="topbar-dot" />
                <span className="topbar-pill-text">En ligne</span>
              </div>
            </div>
          </div>

          <div className="admin-content">
            <div className="stats-grid">
              <StatCard
                icon="📚"
                label="Cours"
                value={courses?.length || 0}
                sub="Toutes filières"
                gradient="linear-gradient(90deg, #f97316, #ea580c)"
              />
              <StatCard
                icon="📋"
                label="Examens"
                value={exams?.length || 0}
                sub="2015 → 2024"
                gradient="linear-gradient(90deg, #3b82f6, #1d4ed8)"
              />
              <StatCard
                icon="🎓"
                label="Filières"
                value={4}
                sub="SP, SVT, SMA, SMB"
                gradient="linear-gradient(90deg, #8b5cf6, #6d28d9)"
              />
              <StatCard
                icon="📅"
                label="Années"
                value={10}
                sub="D'examens disponibles"
                gradient="linear-gradient(90deg, #10b981, #059669)"
              />
            </div>

            <div className="section-title">Actions rapides</div>
            <div className="actions-grid">
              {QUICK_ACTIONS.map((a) => (
                <Link key={a.to} to={a.to} className="action-card">
                  <div
                    className="action-icon-wrap"
                    style={{
                      background: `${a.gradient.replace("linear-gradient(135deg, ", "").split(",")[0]}18`,
                    }}
                  >
                    {a.icon}
                  </div>
                  <div className="action-label">{a.label}</div>
                  <div className="action-desc">{a.desc}</div>
                </Link>
              ))}
            </div>

            <div className="section-title">Répartition par filière</div>
            <div className="filieres-grid">
              {coursesByFiliere.map((f) => (
                <div key={f.key} className="filiere-card">
                  <div className="filiere-top">
                    <div className="filiere-info">
                      <span className="filiere-icon">{f.icon}</span>
                      <div>
                        <div className="filiere-name">{f.label}</div>
                        <div className="filiere-key">{f.key}</div>
                      </div>
                    </div>
                    <span className="filiere-count">{f.count}</span>
                  </div>
                  <div className="filiere-bar-bg">
                    <div
                      className="filiere-bar-fill"
                      style={{
                        width: `${Math.min(
                          (f.count / Math.max(courses?.length || 1, 1)) * 100,
                          100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <button
          className="mobile-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "✕" : "☰"}
        </button>
      </div>
    </>
  );
}
