import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { AuthUser, Student } from "@shared/schema";
import { adminCredentials } from "@shared/schema";
import { validateStudentLogin, getStudentByRoll } from "./generateStudents";

interface AuthContextType {
  user: AuthUser | null;
  student: Student | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loginAsAdmin: (email: string, password: string) => boolean;
  loginAsStudent: (roll: string, dob: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem("srmap_auth");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [student, setStudent] = useState<Student | null>(() => {
    const storedUser = localStorage.getItem("srmap_auth");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed.type === "student" && parsed.roll) {
          return getStudentByRoll(parsed.roll) || null;
        }
      } catch {
        return null;
      }
    }
    return null;
  });

  const loginAsAdmin = useCallback((email: string, password: string): boolean => {
    if (email === adminCredentials.email && password === adminCredentials.password) {
      const authUser: AuthUser = { type: "admin", email };
      setUser(authUser);
      setStudent(null);
      localStorage.setItem("srmap_auth", JSON.stringify(authUser));
      return true;
    }
    return false;
  }, []);

  const loginAsStudent = useCallback((roll: string, dob: string): boolean => {
    const validStudent = validateStudentLogin(roll, dob);
    if (validStudent) {
      const authUser: AuthUser = { 
        type: "student", 
        roll: validStudent.roll, 
        name: validStudent.name 
      };
      setUser(authUser);
      setStudent(validStudent);
      localStorage.setItem("srmap_auth", JSON.stringify(authUser));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setStudent(null);
    localStorage.removeItem("srmap_auth");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        student,
        isAuthenticated: !!user,
        isAdmin: user?.type === "admin",
        loginAsAdmin,
        loginAsStudent,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
