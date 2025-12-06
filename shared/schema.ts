import { z } from "zod";

export const subjectSchema = z.object({
  name: z.string(),
  internal1: z.number().min(0).max(30),
  internal2: z.number().min(0).max(30),
  assignment: z.number().min(0).max(10),
  endSem: z.number().min(0).max(100),
  total: z.number().min(0).max(170),
  grade: z.enum(["O", "A+", "A", "B+", "B", "C", "D", "F"]),
});

export const studentSchema = z.object({
  roll: z.string(),
  name: z.string(),
  dob: z.string(),
  gender: z.enum(["Male", "Female", "Other"]),
  phone: z.string(),
  email: z.string().email(),
  address: z.string(),
  course: z.string(),
  branch: z.enum(["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT"]),
  year: z.number().min(1).max(4),
  section: z.enum(["A", "B", "C", "D"]),
  admissionYear: z.number(),
  subjects: z.array(subjectSchema),
  sgpa: z.number().min(0).max(10),
  cgpa: z.number().min(0).max(10),
  feePaid: z.number(),
  feePending: z.number(),
  hostelName: z.string().nullable(),
  roomNo: z.number().nullable(),
  attendance: z.number().min(0).max(100),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Subject = z.infer<typeof subjectSchema>;
export type Student = z.infer<typeof studentSchema>;

export const adminCredentials = {
  email: "admin@srmap.edu.in",
  password: "demo123",
};

export const testStudentCredentials = [
  { roll: "AP22110010001", dob: "2004-05-15", name: "Aarav Sharma" },
  { roll: "AP22110010002", dob: "2004-08-22", name: "Priya Patel" },
  { roll: "AP23120010001", dob: "2005-01-10", name: "Rahul Reddy" },
  { roll: "AP23130010001", dob: "2005-03-25", name: "Sneha Kumar" },
  { roll: "AP24110010001", dob: "2006-07-12", name: "Arjun Singh" },
];

export interface AuthUser {
  type: "admin" | "student";
  email?: string;
  roll?: string;
  name?: string;
}
