import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, BookOpen, Trophy, TrendingUp } from "lucide-react";
import type { Student } from "@shared/schema";

function SubjectRow({ subject, index }: { subject: Student["subjects"][0]; index: number }) {
  const gradeColors: Record<string, string> = {
    O: "bg-emerald-500 text-white",
    "A+": "bg-teal-500 text-white",
    A: "bg-cyan-500 text-white",
    "B+": "bg-blue-500 text-white",
    B: "bg-indigo-500 text-white",
    C: "bg-purple-500 text-white",
    D: "bg-orange-500 text-white",
    F: "bg-red-500 text-white",
  };

  const percentage = (subject.total / 170) * 100;

  return (
    <tr className="border-b last:border-0 hover-elevate">
      <td className="py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#08AEEA]/20 to-[#7C5CFF]/20 flex items-center justify-center text-sm font-medium text-[#7C5CFF]">
            {index + 1}
          </div>
          <span className="font-medium">{subject.name}</span>
        </div>
      </td>
      <td className="py-4 text-center">{subject.internal1}/30</td>
      <td className="py-4 text-center">{subject.internal2}/30</td>
      <td className="py-4 text-center">{subject.assignment}/10</td>
      <td className="py-4 text-center">{subject.endSem}/100</td>
      <td className="py-4 text-center font-medium">{subject.total}/170</td>
      <td className="py-4 text-center">
        <div className="flex items-center gap-2">
          <Progress value={percentage} className="h-2 w-16" />
          <span className="text-sm text-muted-foreground">{percentage.toFixed(0)}%</span>
        </div>
      </td>
      <td className="py-4 text-center">
        <Badge className={gradeColors[subject.grade]}>
          {subject.grade}
        </Badge>
      </td>
    </tr>
  );
}

export default function Academics() {
  const { student } = useAuth();

  if (!student) {
    return (
      <div className="p-6">
        <div className="flex flex-col items-center justify-center py-16">
          <GraduationCap className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Academic Records Not Available</h2>
          <p className="text-muted-foreground">Unable to load your academic information.</p>
        </div>
      </div>
    );
  }

  const totalMarks = student.subjects.reduce((sum, s) => sum + s.total, 0);
  const maxMarks = student.subjects.length * 170;
  const overallPercentage = (totalMarks / maxMarks) * 100;

  const gradeCount = student.subjects.reduce((acc, s) => {
    acc[s.grade] = (acc[s.grade] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const bestSubject = [...student.subjects].sort((a, b) => b.total - a.total)[0];
  const needsImprovement = [...student.subjects].sort((a, b) => a.total - b.total)[0];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Academic Performance</h1>
        <p className="text-muted-foreground">Your detailed academic records and analysis</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#08AEEA]/10 to-[#7C5CFF]/10">
                <GraduationCap className="h-6 w-6 text-[#08AEEA]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CGPA</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-[#08AEEA] to-[#7C5CFF] bg-clip-text text-transparent">
                  {student.cgpa.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#7C5CFF]/10">
                <BookOpen className="h-6 w-6 text-[#7C5CFF]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">SGPA</p>
                <p className="text-2xl font-bold text-[#7C5CFF]">
                  {student.sgpa.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10">
                <Trophy className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall</p>
                <p className="text-2xl font-bold text-emerald-500">
                  {overallPercentage.toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#FFB86B]/10">
                <TrendingUp className="h-6 w-6 text-[#FFB86B]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Marks</p>
                <p className="text-2xl font-bold text-[#FFB86B]">
                  {totalMarks}/{maxMarks}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Subject-wise Performance</CardTitle>
            <CardDescription>Detailed marks breakdown for all subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-3 font-medium text-muted-foreground">Subject</th>
                    <th className="pb-3 font-medium text-muted-foreground text-center">Int 1</th>
                    <th className="pb-3 font-medium text-muted-foreground text-center">Int 2</th>
                    <th className="pb-3 font-medium text-muted-foreground text-center">Assign</th>
                    <th className="pb-3 font-medium text-muted-foreground text-center">End Sem</th>
                    <th className="pb-3 font-medium text-muted-foreground text-center">Total</th>
                    <th className="pb-3 font-medium text-muted-foreground text-center">Progress</th>
                    <th className="pb-3 font-medium text-muted-foreground text-center">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {student.subjects.map((subject, index) => (
                    <SubjectRow key={index} subject={subject} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Grade Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(gradeCount)
                  .sort(([a], [b]) => {
                    const order = ["O", "A+", "A", "B+", "B", "C", "D", "F"];
                    return order.indexOf(a) - order.indexOf(b);
                  })
                  .map(([grade, count]) => (
                    <div key={grade} className="flex items-center justify-between">
                      <Badge variant="secondary" className="font-medium">
                        Grade {grade}
                      </Badge>
                      <span className="font-medium">{count} subject{count > 1 ? "s" : ""}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Highlights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-xs text-muted-foreground mb-1">Best Performance</p>
                <p className="font-medium text-emerald-600 dark:text-emerald-400">{bestSubject.name}</p>
                <p className="text-sm text-muted-foreground">
                  {bestSubject.total}/170 ({((bestSubject.total / 170) * 100).toFixed(1)}%)
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[#FFB86B]/10 border border-[#FFB86B]/20">
                <p className="text-xs text-muted-foreground mb-1">Needs Improvement</p>
                <p className="font-medium text-[#FFB86B]">{needsImprovement.name}</p>
                <p className="text-sm text-muted-foreground">
                  {needsImprovement.total}/170 ({((needsImprovement.total / 170) * 100).toFixed(1)}%)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
