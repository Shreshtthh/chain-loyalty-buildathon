import { LoadingSpinner } from "./LoadingSpinner";

interface ContentLoaderProps {
  title?: string;
  description?: string;
  icon?: string;
  variant?: "centered" | "inline" | "card";
  className?: string;
}

export function ContentLoader({ 
  title = "Loading", 
  description = "Please wait...",
  icon = "💎",
  variant = "centered",
  className = "" 
}: ContentLoaderProps) {
  if (variant === "inline") {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <LoadingSpinner size="sm" />
        <span className="text-muted-foreground">{title}</span>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={`glass-effect rounded-2xl p-6 text-center ${className}`}>
        <LoadingSpinner size="md" className="mx-auto mb-4" />
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    );
  }

  // Centered variant (default)
  return (
    <div className={`min-h-screen flex items-center justify-center ${className}`}>
      <div className="text-center space-y-8 max-w-md">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto animate-glow">
            <span className="text-3xl">{icon}</span>
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-3xl blur-xl animate-pulse-glow" />
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg">{description}</p>
        </div>
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>
    </div>
  );
}