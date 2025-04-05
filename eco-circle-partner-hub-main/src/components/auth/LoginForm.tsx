
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const LoginForm: React.FC<{ userType: 'admin' | 'partner' }> = ({ userType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would make an API call to authenticate
      // const response = await loginUser({ email, password, userType });
      
      // For now, we'll just simulate a successful login
      localStorage.setItem('authToken', 'fake-jwt-token');
      localStorage.setItem('userType', userType);
      
      toast({
        title: "Login successful",
        description: "Welcome back to EcoCircle!",
      });
      
      // Redirect based on user type
      if (userType === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/partner/dashboard');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login to EcoCircle</CardTitle>
        <CardDescription>
          {userType === 'admin' 
            ? 'Access the MCP Admin dashboard' 
            : 'Access your pickup partner account'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="eco-input"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="eco-input"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-eco-primary hover:bg-eco-dark"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account? 
          <a href="/auth/register" className="ml-1 text-eco-primary hover:underline">
            Register here
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
