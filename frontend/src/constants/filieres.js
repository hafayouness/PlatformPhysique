export const FILIERES = [
  {
    key: "SP",
    label: "Sciences Physiques",
    short: "SP",
    icon: "⚡",
    gradient: "from-blue-600/20 to-cyan-500/10",
    accent: "text-blue-400",
    dot: "bg-blue-400",
    border: "border-blue-500/20",
    bg: "bg-blue-500/10",
    desc: "Mécanique · Électricité · Optique · Chimie",
  },
  {
    key: "SVT",
    label: "Sciences de la Vie et de la Terre",
    short: "SVT",
    icon: "🌿",
    gradient: "from-green-600/20 to-emerald-500/10",
    accent: "text-green-400",
    dot: "bg-green-400",
    border: "border-green-500/20",
    bg: "bg-green-500/10",
    desc: "Physique-Chimie · Applications biologiques",
  },
  {
    key: "SMA",
    label: "Sciences Mathématiques A",
    short: "SM-A",
    icon: "∑",
    gradient: "from-purple-600/20 to-violet-500/10",
    accent: "text-purple-400",
    dot: "bg-purple-400",
    border: "border-purple-500/20",
    bg: "bg-purple-500/10",
    desc: "Programme approfondi · Équations différentielles",
  },
  {
    key: "SMB",
    label: "Sciences Mathématiques B",
    short: "SM-B",
    icon: "∫",
    gradient: "from-orange-600/20 to-amber-500/10",
    accent: "text-orange-400",
    dot: "bg-orange-400",
    border: "border-orange-500/20",
    bg: "bg-orange-500/10",
    desc: "Physique-Chimie orientée mathématiques",
  },
];

export const FILIERES_WITH_ALL = [
  { key: "", label: "Toutes", short: "Toutes" },
  ...FILIERES,
];

export const FILIERES_COURSE = [
  ...FILIERES,
  { key: "ALL", label: "Commun toutes filières", short: "ALL" },
];

export const LEVELS = [
  // { key: "", label: "Tout niveau", short: "Tous" },
  // { key: "1bac", label: "1ère Bac", short: "1BAC" },
  { key: "2bac", label: "2ème Bac", short: "2BAC" },
];

export const SESSIONS = [
  { key: "", label: "Toutes sessions" },
  { key: "normale", label: "Session normale (Juin)" },
  { key: "rattrapage", label: "Rattrapage (Juillet)" },
];

export const RESOURCE_CONFIG = {
  pdf: {
    icon: "📄",
    label: "Cours PDF",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  video: {
    icon: "▶",
    label: "Vidéo",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  exercise: {
    icon: "📝",
    label: "Exercice",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  solution: {
    icon: "✓",
    label: "Correction",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  resume: {
    icon: "📌",
    label: "Résumé",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
};

export const FILIERE_MAP = Object.fromEntries(FILIERES.map((f) => [f.key, f]));
