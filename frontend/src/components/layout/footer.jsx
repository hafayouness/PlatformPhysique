import { Link } from "react-router-dom";
import { FILIERES } from "../../constants/filieres";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">⚛</span>
              </div>
              <span className="font-display font-black text-black text-lg">
                Édu<span className="text-orange-500">PC</span>
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Plateforme d'apprentissage dédiée aux élèves du baccalauréat
              marocain.
            </p>
          </div>

          <div>
            <h3 className="font-display font-bold text-black text-sm mb-4 uppercase tracking-wider">
              Filières
            </h3>
            <ul className="space-y-2">
              {FILIERES.map((f) => (
                <li key={f.key}>
                  <Link
                    to={`/courses?filiere=${f.key}`}
                    className="text-gray-700 hover:text-blue-700 text-sm transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    {f.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-blanc text-sm mb-4 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2">
              {[
                { to: "/courses", label: "Tous les cours" },
                { to: "/exams", label: "Examens nationaux" },
                { to: "/login", label: "Connexion" },
                { to: "/register", label: "Inscription" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-gray-700 hover:text-blue-700 text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-gray-500 text-sm font-display">
            © {new Date().getFullYear()} ÉduPC — Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
