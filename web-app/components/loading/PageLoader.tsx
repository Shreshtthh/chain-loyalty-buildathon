import { LoadingSpinner } from "./LoadingSpinner";

interface PageLoaderProps {
  title?: string;
  description?: string;
  variant?: "default" | "minimal" | "brand";
}

export function PageLoader({ 
  title = "Loading...", 
  description = "Preparing your experience",
  variant = "default" 
}: PageLoaderProps) {
  if (variant === "minimal") {
    return (
      <div className="fixed inset-0 bg-background/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <LoadingSpinner size="lg" variant="orbit" />
      </div>
    );
  }

  if (variant === "brand") {
    return (
      <div className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex items-center justify-center">
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center animate-glow mx-auto">
              <span className="text-4xl font-bold text-white">₡</span>
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-3xl blur-xl animate-pulse-glow" />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ChainLoyalty
            </h2>
            <p className="text-muted-foreground">Loading your loyalty experience...</p>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="glass-effect rounded-3xl p-8 text-center space-y-6 animate-bounce-in max-w-md mx-4">
        <div className="relative">
          <LoadingSpinner size="lg" variant="orbit" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full animate-ping" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {title}
          </h3>
          <p className="text-muted-foreground">{description}</p>
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