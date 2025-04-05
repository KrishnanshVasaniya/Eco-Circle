
import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, User, FileText } from 'lucide-react';

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard 
            title="Wallet Balance" 
            value="₹24,500" 
            description="Available funds"
            icon={<Wallet />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard 
            title="Active Partners" 
            value="18" 
            description="Out of 22 total partners"
            icon={<User />}
          />
          <StatsCard 
            title="Today's Orders" 
            value="34" 
            description="8 pending, 26 completed"
            icon={<FileText />}
            trend={{ value: 5, isPositive: true }}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="eco-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex items-start space-x-3 border-b pb-3 last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-eco-primary mt-2"></div>
                    <div>
                      <p className="text-sm">New order assigned to Aditya Singh</p>
                      <p className="text-xs text-muted-foreground">Today at 14:32</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="eco-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Top Performing Partners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Rajiv Kumar', orders: 28, earnings: '₹5,600' },
                  { name: 'Priya Sharma', orders: 24, earnings: '₹4,800' },
                  { name: 'Aditya Singh', orders: 22, earnings: '₹4,400' },
                  { name: 'Neha Gupta', orders: 20, earnings: '₹4,000' },
                  { name: 'Vijay Patel', orders: 18, earnings: '₹3,600' },
                ].map((partner, i) => (
                  <div key={i} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-eco-primary/20 text-eco-primary flex items-center justify-center font-medium">
                        {partner.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{partner.name}</p>
                        <p className="text-xs text-muted-foreground">{partner.orders} orders this month</p>
                      </div>
                    </div>
                    <div className="text-sm font-medium">{partner.earnings}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
