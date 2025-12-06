import { useState, useMemo, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { Search, Filter, ChevronDown, Eye, Download, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SkeletonTableRow } from "@/components/SkeletonCard";
import { getStudents } from "@/lib/generateStudents";
import type { Student } from "@shared/schema";

const ITEMS_PER_PAGE = 50;

export default function Students() {
  const [, setLocation] = useLocation();
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [sectionFilter, setSectionFilter] = useState<string>("all");
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStudents(getStudents());
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        searchQuery === "" ||
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.roll.toString().includes(searchQuery) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBranch = branchFilter === "all" || student.branch === branchFilter;
      const matchesYear = yearFilter === "all" || student.year.toString() === yearFilter;
      const matchesSection = sectionFilter === "all" || student.section === sectionFilter;

      return matchesSearch && matchesBranch && matchesYear && matchesSection;
    });
  }, [students, searchQuery, branchFilter, yearFilter, sectionFilter]);

  const displayedStudents = useMemo(() => {
    return filteredStudents.slice(0, displayCount);
  }, [filteredStudents, displayCount]);

  const loadMore = useCallback(() => {
    setDisplayCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredStudents.length));
  }, [filteredStudents.length]);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      if (scrollHeight - scrollTop <= clientHeight + 200) {
        loadMore();
      }
    },
    [loadMore]
  );

  const getGradeColor = (cgpa: number) => {
    if (cgpa >= 9) return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    if (cgpa >= 8) return "bg-[#08AEEA]/10 text-[#08AEEA]";
    if (cgpa >= 7) return "bg-[#7C5CFF]/10 text-[#7C5CFF]";
    if (cgpa >= 6) return "bg-[#FFB86B]/10 text-[#FFB86B]";
    return "bg-red-500/10 text-red-600 dark:text-red-400";
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return "text-emerald-600 dark:text-emerald-400";
    if (attendance >= 75) return "text-[#08AEEA]";
    if (attendance >= 60) return "text-[#FFB86B]";
    return "text-red-600 dark:text-red-400";
  };

  const clearFilters = () => {
    setSearchQuery("");
    setBranchFilter("all");
    setYearFilter("all");
    setSectionFilter("all");
  };

  const hasActiveFilters = searchQuery || branchFilter !== "all" || yearFilter !== "all" || sectionFilter !== "all";

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Students</h1>
          <p className="text-muted-foreground">
            Manage and view all {students.length.toLocaleString()} students
          </p>
        </div>
        <Button variant="outline" className="gap-2" data-testid="button-export">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, roll number, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search"
                aria-label="Search students"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select value={branchFilter} onValueChange={setBranchFilter}>
                <SelectTrigger className="w-[130px]" data-testid="select-branch">
                  <SelectValue placeholder="Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  <SelectItem value="CSE">CSE</SelectItem>
                  <SelectItem value="ECE">ECE</SelectItem>
                  <SelectItem value="EEE">EEE</SelectItem>
                  <SelectItem value="MECH">MECH</SelectItem>
                  <SelectItem value="CIVIL">CIVIL</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                </SelectContent>
              </Select>

              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-[120px]" data-testid="select-year">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="1">Year 1</SelectItem>
                  <SelectItem value="2">Year 2</SelectItem>
                  <SelectItem value="3">Year 3</SelectItem>
                  <SelectItem value="4">Year 4</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sectionFilter} onValueChange={setSectionFilter}>
                <SelectTrigger className="w-[120px]" data-testid="select-section">
                  <SelectValue placeholder="Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  <SelectItem value="A">Section A</SelectItem>
                  <SelectItem value="B">Section B</SelectItem>
                  <SelectItem value="C">Section C</SelectItem>
                  <SelectItem value="D">Section D</SelectItem>
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} data-testid="button-clear-filters">
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div 
            className="max-h-[600px] overflow-auto"
            onScroll={handleScroll}
          >
            {isLoading ? (
              <div className="divide-y divide-border">
                {Array.from({ length: 10 }).map((_, i) => (
                  <SkeletonTableRow key={i} />
                ))}
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">No students found</h3>
                <p className="text-muted-foreground text-center max-w-sm">
                  Try adjusting your search or filter criteria to find students.
                </p>
                {hasActiveFilters && (
                  <Button variant="outline" className="mt-4" onClick={clearFilters}>
                    Clear all filters
                  </Button>
                )}
              </div>
            ) : (
              <Table>
                <TableHeader className="sticky top-0 bg-card z-10">
                  <TableRow>
                    <TableHead className="w-[300px]">Student</TableHead>
                    <TableHead>Roll No.</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>CGPA</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Fee Status</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedStudents.map((student) => (
                    <TableRow 
                      key={student.roll} 
                      className="hover-elevate cursor-pointer"
                      onClick={() => setLocation(`/student/${student.roll}`)}
                      data-testid={`row-student-${student.roll}`}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gradient-to-br from-[#08AEEA] to-[#7C5CFF] text-white text-sm">
                              {student.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-medium truncate">{student.name}</p>
                            <p className="text-sm text-muted-foreground truncate">{student.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">{student.roll}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-medium">
                          {student.branch}
                        </Badge>
                      </TableCell>
                      <TableCell>Year {student.year}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getGradeColor(student.cgpa)}>
                          {student.cgpa.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`font-medium ${getAttendanceColor(student.attendance)}`}>
                          {student.attendance.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell>
                        {student.feePending > 0 ? (
                          <Badge variant="secondary" className="bg-[#FFB86B]/10 text-[#FFB86B]">
                            Rs. {student.feePending.toLocaleString()} due
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            Paid
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLocation(`/student/${student.roll}`);
                          }}
                          aria-label={`View ${student.name}'s profile`}
                          data-testid={`button-view-${student.roll}`}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          {displayedStudents.length < filteredStudents.length && (
            <div className="p-4 text-center border-t">
              <Button variant="outline" onClick={loadMore} data-testid="button-load-more">
                Load more ({filteredStudents.length - displayedStudents.length} remaining)
              </Button>
            </div>
          )}
          {filteredStudents.length > 0 && (
            <div className="p-4 border-t text-sm text-muted-foreground text-center">
              Showing {displayedStudents.length} of {filteredStudents.length} students
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
