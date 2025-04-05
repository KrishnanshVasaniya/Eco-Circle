
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Recycle, TrendingUp, Users, Shield } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-eco-light via-green-50 to-white">
      {/* Hero Section */}
      <header className="w-full py-16 md:py-24 px-6 flex flex-col items-center justify-center text-center">
        <div className="animate-float mb-10">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-eco-primary mx-auto flex items-center justify-center shadow-eco">
            <span className="text-white text-3xl md:text-4xl font-bold">EC</span>
          </div>
        </div>
        
        <h1 className="animate-fade-in text-4xl md:text-6xl font-bold mb-6 text-eco-dark">
          <span className="text-eco-primary">Eco</span>Circle
        </h1>
        
        <p className="animate-fade-in animate-slide-up text-xl md:text-2xl mb-10 text-gray-600 max-w-2xl">
          Connecting communities for sustainable waste collection and recycling through our Micro Collection Partner (MCP) System
        </p>
        
        <div className="animate-scale mb-10 flex flex-wrap justify-center gap-4">
          <Link to="/auth/login/admin">
            <Button className="bg-eco-primary hover:bg-eco-dark px-6 py-6 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all">
              Access Admin Dashboard
            </Button>
          </Link>
          <Link to="/auth/login/partner">
            <Button variant="outline" className="border-eco-primary text-eco-primary hover:bg-eco-primary/10 px-6 py-6 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all">
              Partner Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="w-full py-16 px-6 bg-white/70">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-eco-dark">Our Platform Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Leaf className="w-10 h-10 text-eco-primary" />}
              title="Eco-Friendly"
              description="Promoting sustainable practices for a greener planet through efficient waste management"
            />
            <FeatureCard 
              icon={<Recycle className="w-10 h-10 text-eco-primary" />}
              title="Efficient Recycling"
              description="Streamlined collection systems that maximize recycling rates and minimize waste"
            />
            <FeatureCard 
              icon={<TrendingUp className="w-10 h-10 text-eco-primary" />}
              title="Performance Tracking"
              description="Real-time metrics and analytics to monitor collection efficiency and impact"
            />
            <FeatureCard 
              icon={<Users className="w-10 h-10 text-eco-primary" />}
              title="Community Focused"
              description="Empowering local partners to create sustainable jobs while helping the environment"
            />
          </div>
        </div>
      </section>

      {/* Portal Access Section */}
      <section className="w-full py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-eco-dark">Access Your Portal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="glass-effect eco-card-hover overflow-hidden border-0">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-20 h-20 rounded-full bg-eco-primary/10 mx-auto flex items-center justify-center">
                    <Shield className="h-10 w-10 text-eco-primary" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-center text-eco-dark">MCP Admin</h2>
                <p className="text-gray-600 mb-8 text-center">
                  Manage collection partners, assign orders, and monitor performance metrics from your admin dashboard.
                </p>
                <div className="flex justify-center">
                  <Link to="/auth/login/admin">
                    <Button className="bg-eco-primary hover:bg-eco-dark w-full">
                      Access Admin Dashboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-effect eco-card-hover overflow-hidden border-0">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-20 h-20 rounded-full bg-eco-primary/10 mx-auto flex items-center justify-center">
                    <Users className="h-10 w-10 text-eco-primary" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-center text-eco-dark">Pickup Partner</h2>
                <p className="text-gray-600 mb-8 text-center">
                  View assigned orders, update collection status, and manage your earnings through the partner portal.
                </p>
                <div className="flex justify-center">
                  <Link to="/auth/login/partner">
                    <Button className="bg-eco-primary hover:bg-eco-dark w-full">
                      Partner Login
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-eco-dark text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <span className="text-eco-dark font-bold">EC</span>
            </div>
            <span className="text-lg font-semibold">EcoCircle</span>
          </div>
          <p className="text-sm opacity-80">
            Powered by EcoCircle | Sustainable Solutions for a Better Tomorrow &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-green-100">
      <div className="mb-4 flex justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-center text-eco-dark">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default Index;
