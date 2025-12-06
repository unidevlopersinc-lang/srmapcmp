import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCounter } from "./AnimatedCounter";
import type { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "teal" | "purple" | "orange" | "green" | "red";
}

const colorClasses = {
  teal: "text-[#08AEEA] bg-[#08AEEA]/10",
  purple: "text-[#7C5CFF] bg-[#7C5CFF]/10",
  orange: "text-[#FFB86B] bg-[#FFB86B]/10",
  green: "text-emerald-500 bg-emerald-500/10",
  red: "text-red-500 bg-red-500/10",
};

export function KPICard({
  title,
  value,
  icon: Icon,
  prefix = "",
  suffix = "",
  decimals = 0,
  trend,
  color = "teal",
}: KPICardProps) {
  return (
    <Card className="relative overflow-visible hover:-translate-y-0.5 transition-transform duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <div className="text-3xl font-bold text-foreground">
              <AnimatedCounter
                value={value}
                prefix={prefix}
                suffix={suffix}
                decimals={decimals}
              />
            </div>
            {trend && (
              <p
                className={`text-sm mt-2 font-medium ${
                  trend.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                }`}
              >
                {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%{" "}
                <span className="text-muted-foreground font-normal">vs last month</span>
              </p>
            )}
          </div>
          <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
