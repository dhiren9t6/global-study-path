import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import UniversityDashboard from "./pages/UniversityDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const [isDark, setIsDark] = useState(false);
  const { user, userType } = useAuth();
  
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onToggleTheme={toggleTheme} 
        isDark={isDark}
        isAuthenticated={!!user}
        userType={userType}
      />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/student-dashboard" 
            element={
              <ProtectedRoute requiredUserType="student">
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/university-dashboard" 
            element={
              <ProtectedRoute requiredUserType="university">
                <UniversityDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
