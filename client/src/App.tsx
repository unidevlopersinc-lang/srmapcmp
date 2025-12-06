import { Switch, Route, Redirect, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/lib/auth";
import { ThemeProvider } from "@/lib/theme";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Students from "@/pages/Students";
import StudentProfile from "@/pages/StudentProfile";
import MyProfile from "@/pages/MyProfile";
import Academics from "@/pages/Academics";
import Analytics from "@/pages/Analytics";
import NotFound from "@/pages/not-found";

function ProtectedRoute({ 
  children, 
  requireAdmin = false 
}: { 
  children: React.ReactNode; 
  requireAdmin?: boolean;
}) {
  const { isAuthenticated, isAdmin } = useAuth();
  const [, setLocation] = useLocation();

  if (!isAuthenticated) {
    setLocation("/");
    return null;
  }

  if (requireAdmin && !isAdmin) {
    setLocation("/profile");
    return null;
  }

  return <>{children}</>;
}

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={sidebarStyle as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          <header className="sticky top-0 z-50 flex h-14 items-center justify-between gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function AdminRoutes() {
  return (
    <AuthenticatedLayout>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/students" component={Students} />
        <Route path="/student/:roll" component={StudentProfile} />
        <Route path="/analytics" component={Analytics} />
        <Route>
          <Redirect to="/dashboard" />
        </Route>
      </Switch>
    </AuthenticatedLayout>
  );
}

function StudentRoutes() {
  return (
    <AuthenticatedLayout>
      <Switch>
        <Route path="/profile" component={MyProfile} />
        <Route path="/academics" component={Academics} />
        <Route>
          <Redirect to="/profile" />
        </Route>
      </Switch>
    </AuthenticatedLayout>
  );
}

function AppRouter() {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return (
      <Switch>
        <Route path="/" component={Login} />
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    );
  }

  if (isAdmin) {
    return <AdminRoutes />;
  }

  return <StudentRoutes />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <AppRouter />
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
