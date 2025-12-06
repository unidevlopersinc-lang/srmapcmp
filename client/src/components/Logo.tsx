import { GraduationCap } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const iconSizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#08AEEA] to-[#7C5CFF] rounded-xl blur-sm opacity-50" />
        <div className="relative bg-gradient-to-br from-[#08AEEA] to-[#7C5CFF] rounded-xl p-2">
          <GraduationCap className={`${iconSizes[size]} text-white`} />
        </div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold ${textSizes[size]} text-foreground leading-tight`}>
            SRM AP
          </span>
          <span className="text-xs text-muted-foreground font-medium -mt-0.5">
            College Portal
          </span>
        </div>
      )}
    </div>
  );
}
