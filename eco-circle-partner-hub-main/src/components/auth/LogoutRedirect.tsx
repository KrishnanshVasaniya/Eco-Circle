
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

const LogoutRedirect = () => {
  const { logout } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    // Add a small delay for better UX before logout
    const timer = setTimeout(() => {
      logout();
      toast({
        title: "Logged out successfully",
        description: "You have been securely logged out of your account.",
        variant: "default",
        className: "bg-green-50 border-green-200 text-green-800",
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, [logout, toast]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-eco-light to-white p-4">
      <div className="w-16 h-16 rounded-full bg-eco-primary flex items-center justify-center mb-6 animate-pulse-gentle">
        <span className="text-white text-xl font-bold">EC</span>
      </div>
      <h1 className="text-2xl font-bold mb-2 text-eco-dark">Logging out...</h1>
      <p className="text-gray-600 mb-4">Please wait while we securely sign you out.</p>
      <div className="w-10 h-10 border-t-4 border-eco-primary rounded-full animate-spin"></div>
      <Navigate to="/" replace />
    </div>
  );
};

export default LogoutRedirect;
