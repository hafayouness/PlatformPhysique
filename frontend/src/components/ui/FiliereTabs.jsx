import { FILIERES_WITH_ALL } from "../../constants/filieres";
import FilterPill from "../ui/FilterPill";
import clsx from "clsx";

export default function FiliereTabs({ value, onChange, withAll = true }) {
  const list = withAll ? FILIERES_WITH_ALL : FILIERES_WITH_ALL.slice(1);
  return (
    <div className="flex flex-wrap gap-2">
      {list.map((f) => (
        <FilterPill
          key={f.key}
          active={value === f.key}
          onClick={() => onChange(f.key)}
        >
          {f.dot && (
            <span
              className={clsx("inline-block w-1.5 h-1.5 rounded-full", f.dot)}
            />
          )}
          {f.short || f.label}
        </FilterPill>
      ))}
    </div>
  );
}
