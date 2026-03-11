import clsx from "clsx";

export function Skeleton({ className }) {
  return <div className={clsx("skeleton rounded-xl", className)} />;
}

export function CourseCardSkeleton() {
  return (
    <div className="bg-surface/60 border border-white/5 rounded-2xl p-5 space-y-3">
      <div className="flex gap-2">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-10" />
      </div>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-5 w-3/4" />
      <div className="flex gap-2 pt-2 border-t border-white/5">
        <Skeleton className="h-5 w-10" />
        <Skeleton className="h-5 w-10" />
        <Skeleton className="h-5 w-10" />
      </div>
    </div>
  );
}

export function ExamCardSkeleton() {
  return (
    <div className="bg-surface/60 border border-white/5 rounded-2xl p-5 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex gap-2">
            <Skeleton className="h-5 w-10" />
            <Skeleton className="h-5 w-28" />
          </div>
          <Skeleton className="h-5 w-48" />
        </div>
        <Skeleton className="h-9 w-14" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-9 w-32" />
        <Skeleton className="h-9 w-36" />
      </div>
    </div>
  );
}

export function ResourceRowSkeleton() {
  return (
    <div className="flex items-center gap-4 bg-surface/50 border border-white/5 rounded-xl px-4 py-3.5">
      <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-3 w-32" />
      </div>
      <Skeleton className="h-8 w-28 shrink-0" />
    </div>
  );
}
