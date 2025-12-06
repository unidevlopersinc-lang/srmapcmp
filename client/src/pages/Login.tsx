import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/Logo";
import { SecurityWarning } from "@/components/SecurityWarning";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Shield, UserCircle, Eye, EyeOff, Loader2 } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const { loginAsAdmin, loginAsStudent } = useAuth();
  const { toast } = useToast();

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);

  const [studentRoll, setStudentRoll] = useState("");
  const [studentDob, setStudentDob] = useState("");
  const [studentLoading, setStudentLoading] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoading(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    if (loginAsAdmin(adminEmail, adminPassword)) {
      toast({
        title: "Welcome, Admin!",
        description: "You have successfully logged in.",
      });
      setLocation("/dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Try admin@srmap.edu.in / demo123",
        variant: "destructive",
      });
    }
    setAdminLoading(false);
  };

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStudentLoading(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    const roll = parseInt(studentRoll, 10);
    if (isNaN(roll)) {
      toast({
        title: "Invalid Roll Number",
        description: "Please enter a valid roll number.",
        variant: "destructive",
      });
      setStudentLoading(false);
      return;
    }

    if (loginAsStudent(roll, studentDob)) {
      toast({
        title: "Welcome!",
        description: "You have successfully logged in.",
      });
      setLocation("/profile");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid roll number or date of birth.",
        variant: "destructive",
      });
    }
    setStudentLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex flex-col">
      <header className="absolute top-0 right-0 p-4">
        <ThemeToggle />
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>

          <SecurityWarning />

          <Card className="border-none shadow-xl bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
              <CardDescription>
                Access the student management portal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="admin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger 
                    value="admin" 
                    className="gap-2"
                    data-testid="tab-admin-login"
                  >
                    <Shield className="h-4 w-4" />
                    Admin
                  </TabsTrigger>
                  <TabsTrigger 
                    value="student" 
                    className="gap-2"
                    data-testid="tab-student-login"
                  >
                    <UserCircle className="h-4 w-4" />
                    Student
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="admin">
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Email</Label>
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="admin@srmap.edu.in"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        required
                        data-testid="input-admin-email"
                        aria-describedby="admin-email-hint"
                      />
                      <p id="admin-email-hint" className="text-xs text-muted-foreground">
                        Demo: admin@srmap.edu.in
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="admin-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          required
                          className="pr-10"
                          data-testid="input-admin-password"
                          aria-describedby="admin-password-hint"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          data-testid="button-toggle-password"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      <p id="admin-password-hint" className="text-xs text-muted-foreground">
                        Demo: demo123
                      </p>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-[#08AEEA] to-[#7C5CFF] hover:opacity-90 transition-opacity"
                      disabled={adminLoading}
                      data-testid="button-admin-submit"
                    >
                      {adminLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign in as Admin"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="student">
                  <form onSubmit={handleStudentLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-roll">Roll Number</Label>
                      <Input
                        id="student-roll"
                        type="text"
                        placeholder="Enter your roll number"
                        value={studentRoll}
                        onChange={(e) => setStudentRoll(e.target.value)}
                        required
                        data-testid="input-student-roll"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-dob">Date of Birth</Label>
                      <Input
                        id="student-dob"
                        type="date"
                        value={studentDob}
                        onChange={(e) => setStudentDob(e.target.value)}
                        required
                        data-testid="input-student-dob"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-[#08AEEA] to-[#7C5CFF] hover:opacity-90 transition-opacity"
                      disabled={studentLoading}
                      data-testid="button-student-submit"
                    >
                      {studentLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign in as Student"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            SRM University, Andhra Pradesh
          </p>
        </div>
      </div>
    </div>
  );
}
