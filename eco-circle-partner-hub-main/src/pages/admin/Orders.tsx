
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import OrderCard from '@/components/orders/OrderCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const Orders = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  // This would come from API in a real app
  const mockOrders = [
    {
      id: 'ORD-001',
      address: '123 Green Street, Eco Park, Mumbai',
      status: 'pending',
      timestamp: 'Today, 10:30 AM',
    },
    {
      id: 'ORD-002',
      address: '456 Recycling Road, Clean City, Delhi',
      status: 'assigned',
      timestamp: 'Today, 09:15 AM',
      partnerName: 'Aditya Singh'
    },
    {
      id: 'ORD-003',
      address: '789 Sustainable Avenue, Green Zone, Bangalore',
      status: 'picked',
      timestamp: 'Yesterday, 03:45 PM',
      partnerName: 'Priya Sharma'
    },
    {
      id: 'ORD-004',
      address: '101 Eco Lane, Nature View, Chennai',
      status: 'completed',
      timestamp: 'Yesterday, 02:20 PM',
      partnerName: 'Rajiv Kumar'
    },
    {
      id: 'ORD-005',
      address: '202 Earth Road, Planet District, Hyderabad',
      status: 'cancelled',
      timestamp: 'Yesterday, 11:10 AM',
    }
  ];
  
  const handleAssignOrder = (id: string) => {
    toast({
      title: "Order assignment initiated",
      description: `Order #${id} is ready to be assigned to a partner.`,
    });
    // In a real app, this would open a modal to select a partner
  };
  
  const filteredOrders = mockOrders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.address.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const pendingOrders = filteredOrders.filter(order => order.status === 'pending');
  const assignedOrders = filteredOrders.filter(order => order.status === 'assigned' || order.status === 'picked');
  const completedOrders = filteredOrders.filter(order => order.status === 'completed');
  const cancelledOrders = filteredOrders.filter(order => order.status === 'cancelled');
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Orders Management</h1>
          <Button className="bg-eco-primary hover:bg-eco-dark">
            Create New Order
          </Button>
        </div>
        
        <Card className="eco-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Order Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Search by order ID or address"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button className="bg-eco-primary hover:bg-eco-dark">
                Search
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="pending">
          <TabsList className="mb-4">
            <TabsTrigger value="pending">
              Pending ({pendingOrders.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              Active ({assignedOrders.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedOrders.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({cancelledOrders.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingOrders.map(order => (
                <OrderCard
                  key={order.id}
                  id={order.id}
                  address={order.address}
                  status={order.status as any}
                  timestamp={order.timestamp}
                  onAssign={handleAssignOrder}
                  viewType="admin"
                />
              ))}
              {pendingOrders.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No pending orders found
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="active" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assignedOrders.map(order => (
                <OrderCard
                  key={order.id}
                  id={order.id}
                  address={order.address}
                  status={order.status as any}
                  timestamp={order.timestamp}
                  partnerName={order.partnerName}
                  viewType="admin"
                />
              ))}
              {assignedOrders.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No active orders found
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedOrders.map(order => (
                <OrderCard
                  key={order.id}
                  id={order.id}
                  address={order.address}
                  status={order.status as any}
                  timestamp={order.timestamp}
                  partnerName={order.partnerName}
                  viewType="admin"
                />
              ))}
              {completedOrders.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No completed orders found
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="cancelled" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cancelledOrders.map(order => (
                <OrderCard
                  key={order.id}
                  id={order.id}
                  address={order.address}
                  status={order.status as any}
                  timestamp={order.timestamp}
                  viewType="admin"
                />
              ))}
              {cancelledOrders.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No cancelled orders found
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Orders;
