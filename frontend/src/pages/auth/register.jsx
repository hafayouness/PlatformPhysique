import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authServices";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authService.register(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');

        .rp-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          font-family: 'DM Sans', sans-serif;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        .rp-glow-1 {
          position: absolute;
          top: -100px; left: 50%;
          transform: translateX(-50%);
          width: 700px; height: 400px;
          background: radial-gradient(ellipse, rgba(249,115,22,0.07) 0%, transparent 65%);
          pointer-events: none;
        }

        .rp-card {
          position: relative;
          width: 100%;
          max-width: 460px;
          background: #ffffff;
          border-radius: 28px;
          padding: 52px 48px;
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(249,115,22,0.05);
        }

        .rp-header {
          margin-bottom: 36px;
        }

        .rp-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: 34px;
          text-align:center;
          letter-spacing: -1.5px;
          color: #111;
          line-height: 1.05;
          margin-bottom: 10px;
        }

        .rp-sub {
          color: #bbb;
          font-size: 14px;
          font-weight: 300;
        }

        .rp-error {
          background: rgba(239,68,68,0.06);
          border: 1px solid rgba(239,68,68,0.2);
          color: #ef4444;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 13px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .rp-fields {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-bottom: 28px;
        }

        .rp-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .rp-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: #999;
        }

        .rp-input-wrap {
          border-radius: 14px;
          padding: 1.5px;
          background: linear-gradient(135deg, rgba(0,0,0,0.08), rgba(0,0,0,0.03), rgba(0,0,0,0.08));
          transition: background 0.25s;
        }

        .rp-input-wrap:hover {
          background: linear-gradient(135deg, rgba(249,115,22,0.35), rgba(251,191,36,0.15), rgba(234,88,12,0.35));
        }

        .rp-input-wrap:focus-within {
          background: linear-gradient(135deg, rgba(249,115,22,0.7), rgba(251,191,36,0.4), rgba(234,88,12,0.7));
        }

        .rp-input {
          width: 100%;
          background: #f9f9f9;
          border-radius: 12.5px;
          padding: 14px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #111;
          outline: none;
          border: none;
          transition: background 0.2s;
          display: block;
        }

        .rp-input::placeholder { color: #ccc; }
        .rp-input:focus { background: #fff; }

        .rp-btn {
          width: 100%;
          background: linear-gradient(135deg, #f97316, #ea580c);
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 15px;
          padding: 16px 24px;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 10px 32px rgba(249,115,22,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .rp-btn:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(249,115,22,0.4);
        }

        .rp-btn:active:not(:disabled) { transform: translateY(0); }
        .rp-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        .rp-arrow {
          font-style: normal;
          transition: transform 0.2s;
          display: inline-block;
        }
        .rp-btn:hover .rp-arrow { transform: translateX(4px); }

        .rp-footer {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid rgba(0,0,0,0.06);
          text-align: center;
          font-size: 13px;
          color: #bbb;
        }

        .rp-footer a {
          color: #f97316;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .rp-footer a:hover { color: #ea580c; }
      `}</style>

      <div className="rp-root">
        <div className="rp-glow-1" />

        <div className="rp-card">
          <div className="rp-header">
            <h1 className="rp-title">Inscription</h1>
            <p className="rp-sub">Rejoins la communauté ÉduPc</p>
          </div>

          {error && (
            <div className="rp-error">
              <span>⚠</span> {error}
            </div>
          )}

          <div className="rp-fields">
            <div className="rp-field">
              <label className="rp-label">Nom complet</label>
              <div className="rp-input-wrap">
                <input
                  className="rp-input"
                  type="text"
                  required
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Ahmed Benali"
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="rp-field">
              <label className="rp-label">Adresse email</label>
              <div className="rp-input-wrap">
                <input
                  className="rp-input"
                  type="email"
                  required
                  value={form.email}
                  onChange={set("email")}
                  placeholder="ton@email.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="rp-field">
              <label className="rp-label">Mot de passe</label>
              <div className="rp-input-wrap">
                <input
                  className="rp-input"
                  type="password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={set("password")}
                  placeholder="Minimum 6 caractères"
                  autoComplete="new-password"
                />
              </div>
            </div>
          </div>

          <button className="rp-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              "Création en cours…"
            ) : (
              <>
                {" "}
                Créer mon compte <em className="rp-arrow">→</em>{" "}
              </>
            )}
          </button>

          <div className="rp-footer">
            Déjà inscrit ? <Link to="/login">Se connecter</Link>
          </div>
        </div>
      </div>
    </>
  );
}
