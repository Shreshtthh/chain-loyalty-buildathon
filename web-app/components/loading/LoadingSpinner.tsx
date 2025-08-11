import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "dots" | "pulse" | "orbit";
  className?: string;
}

export function LoadingSpinner({ size = "md", variant = "default", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const borderSizes = {
    sm: "border-2",
    md: "border-3",
    lg: "border-4", 
    xl: "border-4"
  };

  if (variant === "dots") {
    return (
      <div className={cn("flex space-x-1", className)}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "bg-purple-500 rounded-full animate-loading-dots",
              size === "sm" ? "w-2 h-2" : size === "lg" ? "w-4 h-4" : "w-3 h-3"
            )}
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={cn("relative", className)}>
        <div className={cn(
          "bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping",
          sizeClasses[size]
        )} />
        <div className={cn(
          "absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse",
          sizeClasses[size]
        )} />
      </div>
    );
  }

  if (variant === "orbit") {
    return (
      <div className={cn("relative", sizeClasses[size], className)}>
        <div className="absolute inset-0 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        <div className="absolute inset-1 border-2 border-pink-500/20 border-r-pink-500 rounded-full animate-spin" 
             style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        <div className="absolute inset-2 border border-blue-500/10 border-b-blue-500 rounded-full animate-spin"
             style={{ animationDuration: '2s' }} />
      </div>
    );
  }

  // Default spinner
  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "border-purple-500/30 border-t-purple-500 rounded-full animate-spin",
        sizeClasses[size],
        borderSizes[size]
      )} />
      <div className={cn(
        "absolute inset-0 border-pink-500/20 border-r-pink-500 rounded-full animate-spin",
        sizeClasses[size],
        borderSizes[size]
      )} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
    </div>
  );
}