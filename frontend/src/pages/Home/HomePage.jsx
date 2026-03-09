import { Link } from "react-router-dom";
import { FILIERES } from "../../constants/filieres";
import { coursesByFiliere } from "../../constants/routes";
import clsx from "clsx";

const FEATURES = [
  {
    icon: "📄",
    label: "Cours PDF",
    desc: "Chapitres complets téléchargeables",
  },
  {
    icon: "🎥",
    label: "Vidéos explicatives",
    desc: "Explications claires et visuelles",
  },
  { icon: "📝", label: "Exercices", desc: "Pratique adaptée à chaque niveau" },
  {
    icon: "✅",
    label: "Corrections détaillées",
    desc: "Solutions PDF et vidéo",
  },
  { icon: "📌", label: "Fiches résumé", desc: "Synthèse pour réviser vite" },
  {
    icon: "📋",
    label: "Examens nationaux",
    desc: "Sujets 2015–2024 avec corrigés",
  },
];

export default function HomePage() {
  const stats = [
    { value: "40+", label: "Cours disponibles" },
    { value: "70+", label: "Examens nationaux" },
    { value: "4", label: "Filières couvertes" },
    { value: "2015", label: "Depuis l'année" },
  ];

  return (
    <div className="page-enter bg-gray-200 text-gray-800">
      <section className="relative overflow-hidden pt-20 pb-28 px-4">
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 rounded-full px-5 py-2 text-orange-600 text-sm font-display font-semibold mb-8">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
            Plateforme dédiée au Baccalauréat Marocain
          </div>

          <h1 className="font-display font-black text-6xl md:text-8xl mb-6 leading-none tracking-tight">
            <span className="text-white ">Maîtrise</span>
            <br />
            <span
              className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              la Physique
            </span>
          </h1>

          <p className="text-gray-600 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Cours, exercices, vidéos et{" "}
            <span className="text-black font-semibold">
              tous les examens nationaux
            </span>{" "}
            pour SP, SVT, SM-A et SM-B.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-display font-black px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-lg shadow-orange-300/50"
            >
              Commencer maintenant
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>

            <Link
              to="/exams"
              className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-orange-300 text-gray-800 font-display font-bold px-8 py-4 rounded-2xl text-lg transition-all"
            >
              Examens nationaux
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-orange-200 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display font-black text-4xl md:text-5xl text-orange-500 mb-1">
                {s.value}
              </div>
              <div className="text-gray-600 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Filières Section */}
      <section className="py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display font-black text-4xl md:text-5xl text-black mb-4">
              Ta filière, ton programme
            </h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Contenu spécialement adapté à chaque filière du baccalauréat
              marocain
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {FILIERES.map((f) => (
              <Link
                key={f.key}
                to={coursesByFiliere(f.key)}
                className={clsx(
                  "group relative border rounded-3xl p-7 overflow-hidden card-hover bg-gray-50 border-orange-300",
                )}
              >
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/20 blur-3xl pointer-events-none" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-5">
                    <span className="font-display font-black text-5xl opacity-80">
                      {f.icon}
                    </span>
                    <span className="text-xs font-display font-bold px-3 py-1 rounded-full border bg-white/20">
                      {f.key}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-xl text-black mb-2">
                    {f.label}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">{f.desc}</p>
                  <div className="inline-flex items-center gap-2 text-sm font-display font-semibold group-hover:gap-3 transition-all text-orange-500">
                    Voir les cours →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-black text-3xl md:text-4xl text-black text-center mb-14">
            Tout ce dont tu as besoin
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.label}
                className="bg-gray-100 border border-orange-300 hover:border-orange-400 rounded-2xl p-5 transition-all group hover:-translate-y-1"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <p className="font-display font-bold text-blue-700 text-sm mb-1">
                  {f.label}
                </p>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examens Nationaux Section */}
      <section className="py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 border border-orange-200 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/10 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-orange-100/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100/20 border border-orange-300 rounded-2xl text-3xl mb-6">
                📋
              </div>
              <h2 className="font-display font-black text-4xl md:text-5xl text-black mb-5">
                Examens Nationaux
              </h2>
              <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Accède à tous les sujets du bac de{" "}
                <strong className="text-orange-400">2008 à 2024</strong> avec
                leurs corrections complètes en PDF et vidéo.
              </p>
              <Link
                to="/exams"
                className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-white font-display font-black px-10 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-lg shadow-orange-300/50"
              >
                Accéder aux examens →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
