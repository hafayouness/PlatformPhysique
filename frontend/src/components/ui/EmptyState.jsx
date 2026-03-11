export default function EmptyState({ icon = "📭", title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-5xl mb-4 block opacity-40">{icon}</span>
      <p className="font-display font-bold text-slate-300 text-lg mb-1">
        {title}
      </p>
      {subtitle && <p className="text-slate-500 text-sm mb-5">{subtitle}</p>}
      {action && action}
    </div>
  );
}
