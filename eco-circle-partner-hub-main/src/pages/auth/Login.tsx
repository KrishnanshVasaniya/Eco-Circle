
import React from 'react';
import { useParams } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  const { userType = 'admin' } = useParams<{ userType: 'admin' | 'partner' }>();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-eco-light to-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-eco-dark">
            <span className="text-eco-primary">Eco</span>Circle
          </h1>
          <p className="text-muted-foreground">
            {userType === 'admin' 
              ? 'Admin Dashboard Login' 
              : 'Pickup Partner Login'}
          </p>
        </div>
        
        <LoginForm userType={userType as 'admin' | 'partner'} />
      </div>
    </div>
  );
};

export default Login;
