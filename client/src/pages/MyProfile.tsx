import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { SkeletonProfile } from "@/components/SkeletonCard";
import { Mail, Phone, MapPin, Calendar, Building2, GraduationCap, Home, CreditCard, ClipboardCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import type { Student } from "@shared/schema";

function InfoItem({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | number | null }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
      <div className="p-2 rounded-lg bg-background">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function SubjectCard({ subject }: { subject: Student["subjects"][0] }) {
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

  const maxMarks = {
    internal1: 30,
    internal2: 30,
    assignment: 10,
    endSem: 100,
    total: 170,
  };

  return (
    <Card className="overflow-visible">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-base font-semibold">{subject.name}</CardTitle>
          <Badge className={`${gradeColors[subject.grade]} font-bold`}>
            {subject.grade}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground text-xs">Internal 1</p>
            <div className="flex items-center gap-2">
              <Progress value={(subject.internal1 / maxMarks.internal1) * 100} className="h-2 flex-1" />
              <span className="font-medium w-12 text-right">{subject.internal1}/{maxMarks.internal1}</span>
            </div>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Internal 2</p>
            <div className="flex items-center gap-2">
              <Progress value={(subject.internal2 / maxMarks.internal2) * 100} className="h-2 flex-1" />
              <span className="font-medium w-12 text-right">{subject.internal2}/{maxMarks.internal2}</span>
            </div>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Assignment</p>
            <div className="flex items-center gap-2">
              <Progress value={(subject.assignment / maxMarks.assignment) * 100} className="h-2 flex-1" />
              <span className="font-medium w-12 text-right">{subject.assignment}/{maxMarks.assignment}</span>
            </div>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">End Sem</p>
            <div className="flex items-center gap-2">
              <Progress value={(subject.endSem / maxMarks.endSem) * 100} className="h-2 flex-1" />
              <span className="font-medium w-12 text-right">{subject.endSem}/{maxMarks.endSem}</span>
            </div>
          </div>
        </div>
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Marks</span>
            <span className="font-bold text-lg">{subject.total}/{maxMarks.total}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MyProfile() {
  const { student } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return "text-emerald-600 dark:text-emerald-400";
    if (attendance >= 75) return "text-[#08AEEA]";
    if (attendance >= 60) return "text-[#FFB86B]";
    return "text-red-600 dark:text-red-400";
  };

  const getCGPAColor = (cgpa: number) => {
    if (cgpa >= 9) return "from-emerald-500 to-teal-500";
    if (cgpa >= 8) return "from-[#08AEEA] to-[#7C5CFF]";
    if (cgpa >= 7) return "from-[#7C5CFF] to-purple-500";
    return "from-[#FFB86B] to-orange-500";
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <SkeletonProfile />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="p-6">
        <div className="flex flex-col items-center justify-center py-16">
          <GraduationCap className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Profile Not Available</h2>
          <p className="text-muted-foreground">Unable to load your profile information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground">View your personal and academic information</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-lg">
          <AvatarFallback className="bg-gradient-to-br from-[#08AEEA] to-[#7C5CFF] text-white text-3xl font-bold">
            {student.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{student.name}</h2>
            <p className="text-muted-foreground">
              Roll No: {student.roll} | {student.course} - {student.branch}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="gap-1">
              Year {student.year}
            </Badge>
            <Badge variant="secondary" className="gap-1">
              Section {student.section}
            </Badge>
            <Badge variant="secondary" className={`gap-1 ${student.gender === "Male" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" : student.gender === "Female" ? "bg-pink-500/10 text-pink-600 dark:text-pink-400" : "bg-purple-500/10 text-purple-600 dark:text-purple-400"}`}>
              {student.gender}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-[#08AEEA]/10 to-[#7C5CFF]/10 border border-[#08AEEA]/20">
              <p className="text-xs text-muted-foreground mb-1">CGPA</p>
              <p className={`text-2xl font-bold bg-gradient-to-r ${getCGPAColor(student.cgpa)} bg-clip-text text-transparent`}>
                {student.cgpa.toFixed(2)}
              </p>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-[#7C5CFF]/10 to-purple-500/10 border border-[#7C5CFF]/20">
              <p className="text-xs text-muted-foreground mb-1">SGPA</p>
              <p className="text-2xl font-bold text-[#7C5CFF]">
                {student.sgpa.toFixed(2)}
              </p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/50 border">
              <p className="text-xs text-muted-foreground mb-1">Attendance</p>
              <p className={`text-2xl font-bold ${getAttendanceColor(student.attendance)}`}>
                {student.attendance.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
          <TabsTrigger value="personal" className="gap-2 py-2" data-testid="tab-personal">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Personal</span>
          </TabsTrigger>
          <TabsTrigger value="academics" className="gap-2 py-2" data-testid="tab-academics">
            <GraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">Academics</span>
          </TabsTrigger>
          <TabsTrigger value="fee" className="gap-2 py-2" data-testid="tab-fee">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Fee Status</span>
          </TabsTrigger>
          <TabsTrigger value="hostel" className="gap-2 py-2" data-testid="tab-hostel">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Hostel</span>
          </TabsTrigger>
          <TabsTrigger value="attendance" className="gap-2 py-2" data-testid="tab-attendance">
            <ClipboardCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Attendance</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your contact and personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem icon={Mail} label="Email" value={student.email} />
                <InfoItem icon={Phone} label="Phone" value={student.phone} />
                <InfoItem icon={MapPin} label="Address" value={student.address} />
                <InfoItem icon={Calendar} label="Date of Birth" value={new Date(student.dob).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} />
                <InfoItem icon={Building2} label="Course" value={`${student.course} - ${student.branch}`} />
                <InfoItem icon={Calendar} label="Admission Year" value={student.admissionYear} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Academic Records</CardTitle>
              <CardDescription>Your current semester subjects and grades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {student.subjects.map((subject, index) => (
                  <SubjectCard key={index} subject={subject} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fee" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Fee Status</CardTitle>
              <CardDescription>Your payment details and dues</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-sm text-muted-foreground mb-1">Amount Paid</p>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    Rs. {student.feePaid.toLocaleString()}
                  </p>
                </div>
                <div className={`p-4 rounded-xl ${student.feePending > 0 ? "bg-[#FFB86B]/10 border border-[#FFB86B]/20" : "bg-muted/50 border"}`}>
                  <p className="text-sm text-muted-foreground mb-1">Amount Pending</p>
                  <p className={`text-2xl font-bold ${student.feePending > 0 ? "text-[#FFB86B]" : "text-muted-foreground"}`}>
                    Rs. {student.feePending.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border">
                  <p className="text-sm text-muted-foreground mb-1">Total Fee</p>
                  <p className="text-2xl font-bold">
                    Rs. {(student.feePaid + student.feePending).toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Payment Progress</span>
                  <span className="font-medium">
                    {((student.feePaid / (student.feePaid + student.feePending)) * 100).toFixed(0)}%
                  </span>
                </div>
                <Progress 
                  value={(student.feePaid / (student.feePaid + student.feePending)) * 100} 
                  className="h-3"
                />
              </div>

              {student.feePending > 0 && (
                <div className="p-4 rounded-xl bg-[#FFB86B]/10 border border-[#FFB86B]/20">
                  <p className="text-sm text-[#FFB86B] font-medium">
                    Please clear the pending dues of Rs. {student.feePending.toLocaleString()} at the earliest.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hostel" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Hostel Information</CardTitle>
              <CardDescription>Your accommodation details</CardDescription>
            </CardHeader>
            <CardContent>
              {student.hostelName ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem icon={Building2} label="Hostel Name" value={student.hostelName} />
                  <InfoItem icon={Home} label="Room Number" value={student.roomNo} />
                </div>
              ) : (
                <div className="text-center py-8">
                  <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium">Day Scholar</p>
                  <p className="text-muted-foreground">You are not enrolled in hostel accommodation.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Details</CardTitle>
              <CardDescription>Your attendance statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="16"
                      className="text-muted"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="16"
                      strokeDasharray={`${(student.attendance / 100) * 553} 553`}
                      strokeLinecap="round"
                      className={getAttendanceColor(student.attendance)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-4xl font-bold ${getAttendanceColor(student.attendance)}`}>
                      {student.attendance.toFixed(1)}%
                    </span>
                    <span className="text-sm text-muted-foreground">Attendance</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-2xl font-bold">
                    {Math.round((student.attendance / 100) * 180)}
                  </p>
                  <p className="text-xs text-muted-foreground">Classes Attended</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-2xl font-bold">180</p>
                  <p className="text-xs text-muted-foreground">Total Classes</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-2xl font-bold">
                    {180 - Math.round((student.attendance / 100) * 180)}
                  </p>
                  <p className="text-xs text-muted-foreground">Classes Missed</p>
                </div>
              </div>

              {student.attendance < 75 && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                    Warning: Your attendance is below 75%. Please improve your attendance to avoid academic penalties.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
