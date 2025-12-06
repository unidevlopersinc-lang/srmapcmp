import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Student } from "@shared/schema";

interface GradeChartProps {
  students: Student[];
  title?: string;
  description?: string;
}

export function GradeDistributionChart({ students, title = "Grade Distribution", description }: GradeChartProps) {
  const gradeData = useMemo(() => {
    const gradeCounts: Record<string, number> = {
      O: 0, "A+": 0, A: 0, "B+": 0, B: 0, C: 0, D: 0, F: 0
    };

    students.forEach(student => {
      student.subjects.forEach(subject => {
        gradeCounts[subject.grade]++;
      });
    });

    const total = Object.values(gradeCounts).reduce((a, b) => a + b, 0);
    
    return Object.entries(gradeCounts).map(([grade, count]) => ({
      grade,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0,
    }));
  }, [students]);

  const gradeColors: Record<string, string> = {
    O: "bg-emerald-500",
    "A+": "bg-teal-500",
    A: "bg-cyan-500",
    "B+": "bg-blue-500",
    B: "bg-indigo-500",
    C: "bg-purple-500",
    D: "bg-orange-500",
    F: "bg-red-500",
  };

  const maxPercentage = Math.max(...gradeData.map(d => d.percentage));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {gradeData.map((item) => (
            <div key={item.grade} className="flex items-center gap-3">
              <span className="w-8 text-sm font-medium text-muted-foreground">{item.grade}</span>
              <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden">
                <div
                  className={`h-full ${gradeColors[item.grade]} transition-all duration-700 ease-out rounded-lg flex items-center justify-end pr-2`}
                  style={{ 
                    width: `${maxPercentage > 0 ? (item.percentage / maxPercentage) * 100 : 0}%`,
                    minWidth: item.count > 0 ? "40px" : "0"
                  }}
                >
                  {item.count > 0 && (
                    <span className="text-xs font-medium text-white">{item.count}</span>
                  )}
                </div>
              </div>
              <span className="w-12 text-sm text-right text-muted-foreground">
                {item.percentage.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function BranchDistributionChart({ students }: { students: Student[] }) {
  const branchData = useMemo(() => {
    const branchCounts: Record<string, number> = {};
    
    students.forEach(student => {
      branchCounts[student.branch] = (branchCounts[student.branch] || 0) + 1;
    });

    const total = students.length;
    return Object.entries(branchCounts)
      .map(([branch, count]) => ({
        branch,
        count,
        percentage: total > 0 ? (count / total) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count);
  }, [students]);

  const branchColors: Record<string, string> = {
    CSE: "bg-[#08AEEA]",
    ECE: "bg-[#7C5CFF]",
    EEE: "bg-[#FFB86B]",
    MECH: "bg-emerald-500",
    CIVIL: "bg-rose-500",
    IT: "bg-cyan-500",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Students by Branch</CardTitle>
        <CardDescription>Distribution across engineering branches</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 h-48 items-end">
          {branchData.map((item) => (
            <div key={item.branch} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-sm font-medium">{item.count}</span>
              <div 
                className={`w-full ${branchColors[item.branch] || "bg-gray-400"} rounded-t-lg transition-all duration-700 ease-out`}
                style={{ height: `${item.percentage}%`, minHeight: item.count > 0 ? "20px" : "0" }}
              />
              <span className="text-xs font-medium text-muted-foreground">{item.branch}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function AttendanceChart({ students }: { students: Student[] }) {
  const attendanceData = useMemo(() => {
    const ranges = [
      { label: "90-100%", min: 90, max: 100, color: "bg-emerald-500" },
      { label: "75-90%", min: 75, max: 90, color: "bg-[#08AEEA]" },
      { label: "60-75%", min: 60, max: 75, color: "bg-[#FFB86B]" },
      { label: "<60%", min: 0, max: 60, color: "bg-red-500" },
    ];

    return ranges.map(range => ({
      ...range,
      count: students.filter(s => s.attendance >= range.min && s.attendance < (range.max === 100 ? 101 : range.max)).length,
    }));
  }, [students]);

  const total = students.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Attendance Overview</CardTitle>
        <CardDescription>Student attendance distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-6 rounded-full overflow-hidden mb-4">
          {attendanceData.map((item, index) => (
            <div
              key={item.label}
              className={`${item.color} transition-all duration-500`}
              style={{ width: `${total > 0 ? (item.count / total) * 100 : 0}%` }}
              title={`${item.label}: ${item.count} students`}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {attendanceData.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className="text-sm font-medium ml-auto">{item.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
