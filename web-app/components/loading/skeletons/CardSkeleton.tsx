import { Skeleton, SkeletonAvatar, SkeletonText, SkeletonButton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface CardSkeletonProps {
  variant?: "feature" | "stat" | "product" | "admin";
  className?: string;
}

export function CardSkeleton({ variant = "feature", className }: CardSkeletonProps) {
  if (variant === "stat") {
    return (
      <div className={cn("glass-effect rounded-2xl p-6 text-center space-y-4", className)}>
        <SkeletonAvatar size="md" className="mx-auto" />
        <SkeletonText lines={1} className="w-3/4 mx-auto" />
        <Skeleton className="h-8 w-16 mx-auto" />
      </div>
    );
  }

  if (variant === "product") {
    return (
      <div className={cn("glass-effect rounded-2xl p-6 space-y-4", className)}>
        <Skeleton className="h-48 w-full rounded-xl" />
        <SkeletonText lines={1} className="w-3/4" />
        <SkeletonText lines={2} />
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-20" />
          <SkeletonButton />
        </div>
      </div>
    );
  }

  if (variant === "admin") {
    return (
      <div className={cn("glass-effect rounded-2xl p-6 text-center space-y-4", className)}>
        <SkeletonAvatar size="lg" className="mx-auto bg-gradient-to-br from-red-500/20 to-orange-500/20" />
        <SkeletonText lines={1} className="w-2/3 mx-auto" />
        <SkeletonText lines={2} />
      </div>
    );
  }

  // Feature variant (default)
  return (
    <div className={cn("glass-effect rounded-2xl p-6 text-center space-y-4", className)}>
      <div className="flex justify-center mb-4">
        <SkeletonAvatar size="lg" />
      </div>
      <SkeletonText lines={1} className="w-3/4 mx-auto" />
      <SkeletonText lines={3} />
    </div>
  );
}