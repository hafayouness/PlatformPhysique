import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCourses } from "../../hooks/useCourse";
import { useCoursesFilterStore } from "../../stores/Coursesfilterstore";
import { LEVELS } from "../../constants/filieres";
import PageHeader from "../../components/layout/PageHeader";
import CourseCard from "../../components/shared/CourseCard";
import FiliereTabs from "../../components/ui/FiliereTabs";
import FilterPill from "../../components/ui/FilterPill";
import EmptyState from "../../components/ui/EmptyState";
import { CourseCardSkeleton } from "../../components/ui/Skeleton";

export default function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filiere, level, setFiliere, setLevel } = useCoursesFilterStore();

  useEffect(() => {
    const f = searchParams.get("filiere") || "";
    const l = searchParams.get("level") || "";
    if (f) setFiliere(f);
    if (l) setLevel(l);
  }, []);

  const updateFilter = (key, val, setter) => {
    setter(val);
    const next = new URLSearchParams(searchParams);
    if (val) next.set(key, val);
    else next.delete(key);
    setSearchParams(next);
  };

  const {
    data: courses,
    isLoading,
    isError,
  } = useCourses({
    filiere: filiere || undefined,
    level: level || undefined,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');

        .cp-root {
          min-height: 100vh;
          background: #f8f8f8;
          font-family: 'DM Sans', sans-serif;
        }

        .cp-header {
          background: #fff;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          padding: 36px 0 28px;
        }

        .cp-header-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .cp-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: 28px;
          letter-spacing: -1px;
          color: #111;
          margin-bottom: 4px;
        }

        .cp-subtitle {
          color: #aaa;
          font-size: 14px;
          font-weight: 300;
        }

        .cp-body {
          max-width: 1100px;
          margin: 0 auto;
          padding: 32px 24px;
        }

        .cp-filters {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 20px;
          padding: 20px 24px;
          margin-bottom: 28px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cp-filter-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .cp-filter-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #ccc;
          width: 52px;
          flex-shrink: 0;
        }

        .cp-count {
          font-size: 13px;
          color: #bbb;
          font-weight: 300;
          margin-bottom: 20px;
        }

        .cp-count strong {
          color: #111;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
        }

        .cp-error {
          background: rgba(239,68,68,0.06);
          border: 1px solid rgba(239,68,68,0.15);
          color: #ef4444;
          padding: 14px 18px;
          border-radius: 14px;
          font-size: 13px;
          margin-bottom: 24px;
        }

        .cp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 18px;
        }
      `}</style>

      <div className="cp-root">
        <div className="cp-header">
          <div className="cp-header-inner">
            <h1 className="cp-title">📚 Cours</h1>
            <p className="cp-subtitle">
              Sélectionne ta filière et ton niveau pour accéder aux ressources
            </p>
          </div>
        </div>

        <div className="cp-body">
          <div className="cp-filters">
            <div className="cp-filter-row">
              <span className="cp-filter-label">Filière</span>
              <FiliereTabs
                value={filiere}
                onChange={(v) => updateFilter("filiere", v, setFiliere)}
              />
            </div>
            <div className="cp-filter-row">
              <span className="cp-filter-label">Niveau</span>
              {LEVELS.map((l) => (
                <FilterPill
                  key={l.key}
                  active={level === l.key}
                  onClick={() => updateFilter("level", l.key, setLevel)}
                >
                  {l.label}
                </FilterPill>
              ))}
            </div>
          </div>

          {!isLoading && !isError && (
            <p className="cp-count">
              <strong>{courses?.length || 0}</strong> cours trouvé
              {courses?.length !== 1 ? "s" : ""}
            </p>
          )}

          {isError && (
            <div className="cp-error">
              ⚠ Impossible de charger les cours. Vérifie que le serveur est
              démarré.
            </div>
          )}

          {isLoading ? (
            <div className="cp-grid">
              {[...Array(6)].map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))}
            </div>
          ) : courses?.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="Aucun cours trouvé"
              subtitle="Essaie de modifier les filtres"
            />
          ) : (
            <div className="cp-grid">
              {courses?.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
