import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { FILIERES } from "../../constants/filieres";
import clsx from "clsx";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname.startsWith(path);
  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="relative max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          onClick={() => setMobileOpen(false)}
        >
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-orange-500 rounded-lg rotate-3 group-hover:rotate-6 transition-transform" />
            <div className="absolute inset-0 bg-orange-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">📘</span>
            </div>
          </div>
          <span className="font-display font-black text-lg text-gray-800">
            Édu<span className="text-orange-500">Pc</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {[
            { to: "/courses", label: "Cours" },
            { to: "/exams", label: "Examens Nationaux" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={clsx(
                "px-4 py-2 rounded-xl text-sm font-display font-medium transition-all",
                isActive(l.to)
                  ? "text-orange-500 bg-orange-100"
                  : "text-gray-700 hover:text-blue-700 hover:bg-gray-100",
              )}
            >
              {l.label}
            </Link>
          ))}

          <div className="relative group">
            <button className="px-4 py-2 rounded-xl text-sm font-display font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-100 transition-all flex items-center gap-1.5">
              Filières
              <svg
                className="w-3 h-3 opacity-50 group-hover:rotate-180 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="absolute top-full left-0 mt-2 w-60 bg-white border border-gray-200 rounded-2xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0 overflow-hidden">
              {FILIERES.map((f) => (
                <Link
                  key={f.key}
                  to={`/courses?filiere=${f.key}`}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-700 hover:bg-gray-100 text-sm transition-colors"
                >
                  <span
                    className={clsx("w-2 h-2 rounded-full bg-orange-500")}
                  />
                  <span>{f.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {isAdmin() && (
            <Link
              to="/admin"
              className={clsx(
                "px-4 py-2 rounded-xl text-sm font-display font-semibold transition-all border",
                isActive("/admin")
                  ? "text-orange-500 bg-orange-100 border-orange-300"
                  : "text-gray-700 border-gray-200 hover:text-orange-500 hover:border-orange-300 hover:bg-orange-50",
              )}
            >
              ⚙ Admin
            </Link>
          )}
        </div>

        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-right hidden lg:block">
                <p className="text-xs text-gray-500">Connecté en tant que</p>
                <p className="text-sm font-display font-semibold text-blue-700">
                  {user.name}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 text-sm font-display rounded-xl transition-all"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-blue-700 text-sm font-display transition-colors"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-orange-500 hover:bg-orange-400 text-white font-display font-bold text-sm rounded-xl transition-all shadow-md shadow-orange-300/50"
              >
                S'inscrire
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-blue-700 hover:bg-gray-100 rounded-xl transition-all"
        >
          <div className="w-5 space-y-1.5">
            <span
              className={clsx(
                "block h-0.5 bg-current transition-all",
                mobileOpen && "rotate-45 translate-y-2",
              )}
            />
            <span
              className={clsx(
                "block h-0.5 bg-current transition-all",
                mobileOpen && "opacity-0",
              )}
            />
            <span
              className={clsx(
                "block h-0.5 bg-current transition-all",
                mobileOpen && "-rotate-45 -translate-y-2",
              )}
            />
          </div>
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden relative bg-white border-t border-gray-200 px-4 pb-6 pt-2 space-y-1">
          {[
            { to: "/courses", label: "Cours" },
            { to: "/exams", label: "Examens Nationaux" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-gray-700 hover:text-blue-700 rounded-xl hover:bg-gray-100 font-display"
            >
              {l.label}
            </Link>
          ))}
          {FILIERES.map((f) => (
            <Link
              key={f.key}
              to={`/courses?filiere=${f.key}`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-700 rounded-xl hover:bg-gray-100 text-sm pl-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              {f.label}
            </Link>
          ))}
          {isAdmin() && (
            <Link
              to="/admin"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-orange-500 rounded-xl hover:bg-orange-50 font-display"
            >
              ⚙ Admin
            </Link>
          )}
          <div className="pt-3 border-t border-gray-200 flex gap-2">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-display"
              >
                Déconnexion
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 py-3 text-center text-gray-700 bg-gray-100 rounded-xl text-sm font-display"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 py-3 text-center text-white bg-orange-500 rounded-xl text-sm font-bold font-display"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
