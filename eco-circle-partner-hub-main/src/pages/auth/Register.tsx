
import React from 'react';
import { useParams } from 'react-router-dom';
import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
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
              ? 'Create Admin Account' 
              : 'Join as Pickup Partner'}
          </p>
        </div>
        
        <RegisterForm userType={userType as 'admin' | 'partner'} />
      </div>
    </div>
  );
};

export default Register;
