
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, MapPin, Clock, FileText } from 'lucide-react';
import OrderCard from '@/components/orders/OrderCard';
import { useToast } from "@/components/ui/use-toast";

const PartnerDashboard = () => {
  const { toast } = useToast();
  
  // Mock data - would come from API
  const partnerInfo = {
    name: 'Rajiv Kumar',
    status: 'active',
    walletBalance: 3500,
    totalEarnings: 24500,
    completedOrders: 124,
    activeOrders: 2
  };
  
  const mockOrders = [
    {
      id: 'ORD-006',
      address: '123 Green Street, Eco Park, Mumbai',
      status: 'assigned',
      timestamp: 'Today, 10:30 AM',
    },
    {
      id: 'ORD-007',
      address: '456 Recycling Road, Clean City, Delhi',
      status: 'picked',
      timestamp: 'Today, 09:15 AM',
    },
  ];
  
  const handleAcceptOrder = (id: string) => {
    toast({
      title: "Order accepted",
      description: `You've accepted order #${id}.`,
    });
  };
  
  const handleRejectOrder = (id: string) => {
    toast({
      title: "Order rejected",
      description: `You've rejected order #${id}.`,
    });
  };
  
  const handleUpdateStatus = (id: string, status: string) => {
    toast({
      title: "Order status updated",
      description: `Order #${id} has been marked as ${status}.`,
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-eco-primary text-white p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="font-bold">EC</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">EcoCircle</h1>
                <p className="text-xs opacity-80">Pickup Partner App</p>
              </div>
            </div>
            <Button variant="outline" className="border-white/50 hover:bg-white/20 text-white">
              <Wallet className="h-4 w-4 mr-2" />
              ₹{partnerInfo.walletBalance}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto p-4 space-y-6">
        <Card className="eco-card overflow-hidden">
          <div className="bg-eco-primary/10 p-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-bold text-lg">{partnerInfo.name}</h2>
                <Badge className="bg-green-100 text-green-800 mt-1">
                  {partnerInfo.status}
                </Badge>
              </div>
              <Button className="bg-eco-primary hover:bg-eco-dark">
                View Profile
              </Button>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-muted-foreground text-xs">Wallet</div>
                <div className="font-bold">₹{partnerInfo.walletBalance}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs">Total Earnings</div>
                <div className="font-bold">₹{partnerInfo.totalEarnings}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs">Completed</div>
                <div className="font-bold">{partnerInfo.completedOrders} orders</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg">Active Orders</h2>
            <Badge className="bg-eco-primary/20 text-eco-primary">
              {partnerInfo.activeOrders} orders
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {mockOrders.map(order => (
              <OrderCard
                key={order.id}
                id={order.id}
                address={order.address}
                status={order.status as any}
                timestamp={order.timestamp}
                onAccept={handleAcceptOrder}
                onReject={handleRejectOrder}
                onUpdateStatus={handleUpdateStatus}
                viewType="partner"
              />
            ))}
            {mockOrders.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No active orders. Check back later!
              </div>
            )}
          </div>
        </div>
        
        <Card className="eco-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Today's Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Completed Orders</span>
                </div>
                <span className="font-bold">3</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                <div className="flex items-center">
                  <Wallet className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Earnings Today</span>
                </div>
                <span className="font-bold">₹600</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Active Time</span>
                </div>
                <span className="font-bold">4h 25m</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Distance Covered</span>
                </div>
                <span className="font-bold">12.4 km</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex justify-around p-3">
          <Button variant="ghost" className="flex-1 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-14 0l2 2m0 0l7 7 7-7" />
            </svg>
            <span className="text-xs mt-1">Home</span>
          </Button>
          <Button variant="ghost" className="flex-1 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-xs mt-1">Orders</span>
          </Button>
          <Button variant="ghost" className="flex-1 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span className="text-xs mt-1">Wallet</span>
          </Button>
          <Button variant="ghost" className="flex-1 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
