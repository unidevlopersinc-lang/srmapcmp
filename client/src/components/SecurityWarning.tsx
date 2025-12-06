import { AlertTriangle } from "lucide-react";

export function SecurityWarning() {
  return (
    <div 
      className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6"
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-amber-800 dark:text-amber-200 text-sm">
            Security Notice - Demo Only
          </h3>
          <p className="text-amber-700 dark:text-amber-300 text-sm mt-1">
            This is a static demonstration portal. Credentials are hardcoded in client-side code 
            and visible to anyone. <strong>Do not use real credentials or sensitive data.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
