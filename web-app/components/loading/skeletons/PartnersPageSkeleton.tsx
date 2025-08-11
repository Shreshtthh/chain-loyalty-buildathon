import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "./CardSkeleton";

export function PartnersPageSkeleton() {
  return (
    <div className="min-h-screen py-12 animate-fade-in-up">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <Skeleton className="w-32 h-32 rounded-full mx-auto" />
          <Skeleton className="h-16 w-80 mx-auto" />
          <Skeleton className="h-8 w-full max-w-2xl mx-auto" />
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} variant="feature" className={`stagger-${i + 1}`} />
          ))}
        </div>

        {/* Registration Card */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-effect rounded-3xl p-8 space-y-8">
            <Skeleton className="h-10 w-80 mx-auto" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6 mx-auto" />
              <Skeleton className="h-6 w-4/5 mx-auto" />
            </div>
            <Skeleton className="h-14 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}