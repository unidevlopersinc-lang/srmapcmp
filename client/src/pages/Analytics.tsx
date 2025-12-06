import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SkeletonChart, SkeletonKPICard } from "@/components/SkeletonCard";
import { GradeDistributionChart, BranchDistributionChart, AttendanceChart } from "@/components/GradeChart";
import { getStudents } from "@/lib/generateStudents";
import type { Student } from "@shared/schema";

export default function Analytics() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStudents(getStudents());
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const branchPerformance = useMemo(() => {
    const branches = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT"];
    return branches.map(branch => {
      const branchStudents = students.filter(s => s.branch === branch);
      const avgCGPA = branchStudents.length > 0
        ? branchStudents.reduce((sum, s) => sum + s.cgpa, 0) / branchStudents.length
        : 0;
      const avgAttendance = branchStudents.length > 0
        ? branchStudents.reduce((sum, s) => sum + s.attendance, 0) / branchStudents.length
        : 0;
      return {
        branch,
        count: branchStudents.length,
        avgCGPA: parseFloat(avgCGPA.toFixed(2)),
        avgAttendance: parseFloat(avgAttendance.toFixed(1)),
      };
    }).sort((a, b) => b.avgCGPA - a.avgCGPA);
  }, [students]);

  const yearPerformance = useMemo(() => {
    const years = [1, 2, 3, 4];
    return years.map(year => {
      const yearStudents = students.filter(s => s.year === year);
      const avgCGPA = yearStudents.length > 0
        ? yearStudents.reduce((sum, s) => sum + s.cgpa, 0) / yearStudents.length
        : 0;
      const avgAttendance = yearStudents.length > 0
        ? yearStudents.reduce((sum, s) => sum + s.attendance, 0) / yearStudents.length
        : 0;
      return {
        year,
        count: yearStudents.length,
        avgCGPA: parseFloat(avgCGPA.toFixed(2)),
        avgAttendance: parseFloat(avgAttendance.toFixed(1)),
      };
    });
  }, [students]);

  const topPerformers = useMemo(() => {
    return [...students]
      .sort((a, b) => b.cgpa - a.cgpa)
      .slice(0, 10);
  }, [students]);

  const feeAnalytics = useMemo(() => {
    const totalFee = students.reduce((sum, s) => sum + s.feePaid + s.feePending, 0);
    const collected = students.reduce((sum, s) => sum + s.feePaid, 0);
    const pending = students.reduce((sum, s) => sum + s.feePending, 0);
    const defaulters = students.filter(s => s.feePending > 0).length;
    return { totalFee, collected, pending, defaulters };
  }, [students]);

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights and statistics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonKPICard key={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonChart />
          <SkeletonChart />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">Comprehensive insights and statistics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GradeDistributionChart 
          students={students}
          title="Overall Grade Distribution"
          description="Distribution of grades across all subjects"
        />
        <BranchDistributionChart students={students} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceChart students={students} />

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Fee Collection Analysis</CardTitle>
            <CardDescription>Overall fee collection status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex h-8 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 transition-all duration-500"
                style={{ width: `${(feeAnalytics.collected / feeAnalytics.totalFee) * 100}%` }}
              />
              <div
                className="bg-[#FFB86B] transition-all duration-500"
                style={{ width: `${(feeAnalytics.pending / feeAnalytics.totalFee) * 100}%` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-sm text-muted-foreground">Collected</span>
                <span className="text-sm font-medium ml-auto">
                  Rs. {(feeAnalytics.collected / 100000).toFixed(1)}L
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FFB86B]" />
                <span className="text-sm text-muted-foreground">Pending</span>
                <span className="text-sm font-medium ml-auto">
                  Rs. {(feeAnalytics.pending / 100000).toFixed(1)}L
                </span>
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{feeAnalytics.defaulters}</span> students with pending dues
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Branch-wise Performance</CardTitle>
          <CardDescription>Academic metrics by engineering branch</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3 font-medium text-muted-foreground">Branch</th>
                  <th className="pb-3 font-medium text-muted-foreground text-center">Students</th>
                  <th className="pb-3 font-medium text-muted-foreground text-center">Avg CGPA</th>
                  <th className="pb-3 font-medium text-muted-foreground text-center">Avg Attendance</th>
                  <th className="pb-3 font-medium text-muted-foreground text-right">Rank</th>
                </tr>
              </thead>
              <tbody>
                {branchPerformance.map((branch, index) => (
                  <tr key={branch.branch} className="border-b last:border-0 hover-elevate">
                    <td className="py-3">
                      <Badge variant="secondary" className="font-medium">
                        {branch.branch}
                      </Badge>
                    </td>
                    <td className="py-3 text-center">{branch.count}</td>
                    <td className="py-3 text-center">
                      <span className={`font-medium ${branch.avgCGPA >= 8 ? "text-emerald-600 dark:text-emerald-400" : branch.avgCGPA >= 7 ? "text-[#08AEEA]" : "text-[#FFB86B]"}`}>
                        {branch.avgCGPA}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <span className={`font-medium ${branch.avgAttendance >= 85 ? "text-emerald-600 dark:text-emerald-400" : branch.avgAttendance >= 75 ? "text-[#08AEEA]" : "text-[#FFB86B]"}`}>
                        {branch.avgAttendance}%
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Badge 
                        variant="secondary" 
                        className={`${index === 0 ? "bg-[#FFB86B]/20 text-[#FFB86B]" : index === 1 ? "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300" : index === 2 ? "bg-amber-700/20 text-amber-700 dark:text-amber-500" : ""}`}
                      >
                        #{index + 1}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Year-wise Performance</CardTitle>
            <CardDescription>Academic metrics by academic year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {yearPerformance.map((year) => (
                <div key={year.year} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="w-20">
                    <Badge variant="secondary" className="font-medium">
                      Year {year.year}
                    </Badge>
                  </div>
                  <div className="flex-1 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Students</p>
                      <p className="font-medium">{year.count}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Avg CGPA</p>
                      <p className={`font-medium ${year.avgCGPA >= 8 ? "text-emerald-600 dark:text-emerald-400" : "text-[#08AEEA]"}`}>
                        {year.avgCGPA}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Attendance</p>
                      <p className={`font-medium ${year.avgAttendance >= 85 ? "text-emerald-600 dark:text-emerald-400" : "text-[#08AEEA]"}`}>
                        {year.avgAttendance}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Top 10 Performers</CardTitle>
            <CardDescription>Students with highest CGPA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPerformers.map((student, index) => (
                <div 
                  key={student.roll} 
                  className="flex items-center gap-3 p-2 rounded-lg hover-elevate"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? "bg-[#FFB86B]/20 text-[#FFB86B]" : 
                    index === 1 ? "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300" : 
                    index === 2 ? "bg-amber-700/20 text-amber-700 dark:text-amber-500" : 
                    "bg-muted text-muted-foreground"
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.branch} - Year {student.year}</p>
                  </div>
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                    {student.cgpa.toFixed(2)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
