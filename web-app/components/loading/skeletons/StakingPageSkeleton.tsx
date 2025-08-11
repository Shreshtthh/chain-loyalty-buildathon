import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { CardSkeleton } from "./CardSkeleton";

export function StakingPageSkeleton() {
  return (
    <div className="min-h-screen py-12 animate-fade-in-up">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Skeleton */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <Skeleton className="w-24 h-24 rounded-2xl" />
          </div>
          <Skeleton className="h-14 w-96 mx-auto" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} variant="stat" className={`stagger-${i + 1}`} />
          ))}
        </div>

        {/* Main Interface Skeleton */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-effect rounded-3xl p-8 space-y-8">
            <div className="text-center space-y-4">
              <Skeleton className="h-10 w-80 mx-auto" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-14 w-full rounded-xl" />
                <Skeleton className="h-4 w-48" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Skeleton className="h-14 w-full rounded-xl" />
                <Skeleton className="h-14 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards Skeleton */}
        <div className="grid md:grid-cols-2 gap-8">
          <CardSkeleton variant="feature" className="stagger-5" />
          <CardSkeleton variant="feature" className="stagger-6" />
        </div>
      </div>
    </div>
  );
}