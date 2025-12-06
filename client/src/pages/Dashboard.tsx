import { useMemo, useState, useEffect } from "react";
import { Users, GraduationCap, Calendar, IndianRupee, TrendingUp, UserCheck } from "lucide-react";
import { KPICard } from "@/components/KPICard";
import { SkeletonKPICard, SkeletonChart } from "@/components/SkeletonCard";
import { GradeDistributionChart, BranchDistributionChart, AttendanceChart } from "@/components/GradeChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getStudents } from "@/lib/generateStudents";
import type { Student } from "@shared/schema";

export default function Dashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStudents(getStudents());
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(() => {
    if (students.length === 0) return null;

    const totalStudents = students.length;
    const avgCGPA = students.reduce((sum, s) => sum + s.cgpa, 0) / totalStudents;
    const avgAttendance = students.reduce((sum, s) => sum + s.attendance, 0) / totalStudents;
    const totalFeeCollected = students.reduce((sum, s) => sum + s.feePaid, 0);
    const totalFeePending = students.reduce((sum, s) => sum + s.feePending, 0);
    const highPerformers = students.filter(s => s.cgpa >= 8.5).length;
    const goodAttendance = students.filter(s => s.attendance >= 75).length;

    return {
      totalStudents,
      avgCGPA: parseFloat(avgCGPA.toFixed(2)),
      avgAttendance: parseFloat(avgAttendance.toFixed(1)),
      totalFeeCollected,
      totalFeePending,
      highPerformers,
      goodAttendance,
      attendancePercentage: parseFloat(((goodAttendance / totalStudents) * 100).toFixed(1)),
    };
  }, [students]);

  const recentStudents = useMemo(() => {
    return [...students]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }, [students]);

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to SRM AP College Portal</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to SRM AP College Portal</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Students"
          value={stats?.totalStudents || 0}
          icon={Users}
          color="teal"
          trend={{ value: 12.5, isPositive: true }}
        />
        <KPICard
          title="Average CGPA"
          value={stats?.avgCGPA || 0}
          icon={GraduationCap}
          decimals={2}
          color="purple"
          trend={{ value: 3.2, isPositive: true }}
        />
        <KPICard
          title="Avg Attendance"
          value={stats?.avgAttendance || 0}
          icon={Calendar}
          suffix="%"
          decimals={1}
          color="orange"
        />
        <KPICard
          title="Fee Collected"
          value={stats?.totalFeeCollected || 0}
          icon={IndianRupee}
          prefix="Rs. "
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10">
                <TrendingUp className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">High Performers</p>
                <p className="text-2xl font-bold">{stats?.highPerformers}</p>
                <p className="text-xs text-muted-foreground">CGPA above 8.5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#08AEEA]/10">
                <UserCheck className="h-6 w-6 text-[#08AEEA]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Good Attendance</p>
                <p className="text-2xl font-bold">{stats?.attendancePercentage}%</p>
                <p className="text-xs text-muted-foreground">Above 75% attendance</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#FFB86B]/10">
                <IndianRupee className="h-6 w-6 text-[#FFB86B]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fee Pending</p>
                <p className="text-2xl font-bold">Rs. {stats?.totalFeePending?.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total outstanding</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GradeDistributionChart 
          students={students} 
          description="Overall grade distribution across all subjects"
        />
        <BranchDistributionChart students={students} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceChart students={students} />
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Admissions</CardTitle>
            <CardDescription>Latest students enrolled</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentStudents.map((student) => (
                <div 
                  key={student.roll} 
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover-elevate"
                >
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#08AEEA] to-[#7C5CFF] flex items-center justify-center text-white font-medium text-sm">
                    {student.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {student.branch} - Year {student.year}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{student.roll}</p>
                    <p className="text-xs text-muted-foreground">Roll No.</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
