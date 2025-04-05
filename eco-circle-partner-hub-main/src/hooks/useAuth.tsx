
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'partner';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: 'admin' | 'partner') => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('authToken');
      const userType = localStorage.getItem('userType');
      
      if (token) {
        try {
          // In a real app, verify the token with your backend
          // const response = await verifyToken(token);
          
          // For demo, we'll simulate a user
          setUser({
            id: '1',
            name: 'Demo User',
            email: 'user@example.com',
            role: (userType as 'admin' | 'partner') || 'admin'
          });
        } catch (error) {
          console.error('Auth token verification failed', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('userType');
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string, role: 'admin' | 'partner') => {
    setIsLoading(true);
    try {
      // In a real app, make API call to login
      // const response = await loginAPI(email, password);
      
      // For demo, simulate successful login
      const token = 'fake-jwt-token';
      localStorage.setItem('authToken', token);
      localStorage.setItem('userType', role);
      
      setUser({
        id: '1',
        name: 'Demo User',
        email,
        role
      });
      
      navigate(role === 'admin' ? '/admin/dashboard' : '/partner/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    try {
      // In a real app, make API call to register
      // const response = await registerAPI(userData);
      
      // For demo purposes, just simulate a successful registration
      console.log('User registered:', userData);
      
      // Usually you would navigate to login after registration
      navigate(`/auth/login/${userData.role}`);
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
