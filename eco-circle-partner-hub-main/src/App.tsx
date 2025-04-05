
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOrders from "./pages/admin/Orders";
import AdminPartners from "./pages/admin/Partners";
import AdminWallet from "./pages/admin/Wallet";
import AdminSettings from "./pages/admin/Settings";
import PartnerDashboard from "./pages/partner/Dashboard";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LogoutRedirect from "./components/auth/LogoutRedirect";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth/login/:userType" element={<Login />} />
            <Route path="/auth/register/:userType" element={<Register />} />
            
            {/* Admin Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute userRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/orders" 
              element={
                <ProtectedRoute userRole="admin">
                  <AdminOrders />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/partners" 
              element={
                <ProtectedRoute userRole="admin">
                  <AdminPartners />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/wallet" 
              element={
                <ProtectedRoute userRole="admin">
                  <AdminWallet />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/settings" 
              element={
                <ProtectedRoute userRole="admin">
                  <AdminSettings />
                </ProtectedRoute>
              } 
            />
            
            {/* Partner Routes */}
            <Route 
              path="/partner/dashboard" 
              element={
                <ProtectedRoute userRole="partner">
                  <PartnerDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Auth Routes */}
            <Route path="/auth/logout" element={<LogoutRedirect />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
