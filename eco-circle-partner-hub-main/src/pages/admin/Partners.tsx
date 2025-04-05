
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const Partners = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data - would come from API
  const partners = [
    {
      id: 'P001',
      name: 'Rajiv Kumar',
      phone: '+91 98765 43210',
      email: 'rajiv@example.com',
      address: 'Mumbai, Maharashtra',
      status: 'active',
      joinDate: '15 Jan 2023',
      completedOrders: 124,
      rating: 4.8,
    },
    {
      id: 'P002',
      name: 'Priya Sharma',
      phone: '+91 87654 32109',
      email: 'priya@example.com',
      address: 'Delhi, NCR',
      status: 'active',
      joinDate: '22 Feb 2023',
      completedOrders: 98,
      rating: 4.6,
    },
    {
      id: 'P003',
      name: 'Aditya Singh',
      phone: '+91 76543 21098',
      email: 'aditya@example.com',
      address: 'Bangalore, Karnataka',
      status: 'active',
      joinDate: '10 Mar 2023',
      completedOrders: 86,
      rating: 4.7,
    },
    {
      id: 'P004',
      name: 'Neha Gupta',
      phone: '+91 65432 10987',
      email: 'neha@example.com',
      address: 'Chennai, Tamil Nadu',
      status: 'inactive',
      joinDate: '05 Apr 2023',
      completedOrders: 64,
      rating: 4.5,
    },
    {
      id: 'P005',
      name: 'Vijay Patel',
      phone: '+91 54321 09876',
      email: 'vijay@example.com',
      address: 'Hyderabad, Telangana',
      status: 'pending',
      joinDate: '18 May 2023',
      completedOrders: 0,
      rating: 0,
    }
  ];
  
  const filteredPartners = partners.filter(partner => 
    partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    partner.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    partner.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    partner.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const activePartners = filteredPartners.filter(partner => partner.status === 'active');
  const inactivePartners = filteredPartners.filter(partner => partner.status === 'inactive');
  const pendingPartners = filteredPartners.filter(partner => partner.status === 'pending');
  
  const handleAddPartner = () => {
    toast({
      title: "Add partner",
      description: "Feature to add new partner will be implemented soon.",
    });
  };
  
  const handlePartnerAction = (id: string, action: string) => {
    toast({
      title: `Partner ${action}`,
      description: `Partner #${id} has been ${action}.`,
    });
  };
  
  const renderPartnerTable = (partners: typeof filteredPartners) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4">ID</th>
            <th className="text-left py-3 px-4">Name</th>
            <th className="text-left py-3 px-4 hidden md:table-cell">Contact</th>
            <th className="text-left py-3 px-4 hidden lg:table-cell">Orders</th>
            <th className="text-left py-3 px-4 hidden lg:table-cell">Rating</th>
            <th className="text-center py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {partners.map(partner => (
            <tr key={partner.id} className="border-b hover:bg-muted/50">
              <td className="py-3 px-4">{partner.id}</td>
              <td className="py-3 px-4">
                <div>
                  <div className="font-medium">{partner.name}</div>
                  <div className="text-xs text-muted-foreground">{partner.address}</div>
                </div>
              </td>
              <td className="py-3 px-4 hidden md:table-cell">
                <div>
                  <div>{partner.phone}</div>
                  <div className="text-xs text-muted-foreground">{partner.email}</div>
                </div>
              </td>
              <td className="py-3 px-4 hidden lg:table-cell">
                {partner.completedOrders}
              </td>
              <td className="py-3 px-4 hidden lg:table-cell">
                {partner.rating > 0 ? (
                  <div className="flex items-center">
                    <span>{partner.rating}</span>
                    <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </td>
              <td className="py-3 px-4">
                <div className="flex justify-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handlePartnerAction(partner.id, 'viewed')}
                  >
                    View
                  </Button>
                  {partner.status === 'active' ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-500 text-amber-500 hover:bg-amber-50"
                      onClick={() => handlePartnerAction(partner.id, 'deactivated')}
                    >
                      Deactivate
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-500 text-green-500 hover:bg-green-50"
                      onClick={() => handlePartnerAction(partner.id, 'activated')}
                    >
                      Activate
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {partners.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No partners found
        </div>
      )}
    </div>
  );
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pickup Partners</h1>
          <Button 
            className="bg-eco-primary hover:bg-eco-dark"
            onClick={handleAddPartner}
          >
            Add New Partner
          </Button>
        </div>
        
        <Card className="eco-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Partner Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Search by name, ID, phone or email"
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
        
        <Card className="eco-card">
          <CardHeader className="pb-0">
            <Tabs defaultValue="active">
              <TabsList>
                <TabsTrigger value="active">
                  Active ({activePartners.length})
                </TabsTrigger>
                <TabsTrigger value="inactive">
                  Inactive ({inactivePartners.length})
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pending ({pendingPartners.length})
                </TabsTrigger>
                <TabsTrigger value="all">
                  All ({filteredPartners.length})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="active" className="mt-0">
              {renderPartnerTable(activePartners)}
            </TabsContent>
            <TabsContent value="inactive" className="mt-0">
              {renderPartnerTable(inactivePartners)}
            </TabsContent>
            <TabsContent value="pending" className="mt-0">
              {renderPartnerTable(pendingPartners)}
            </TabsContent>
            <TabsContent value="all" className="mt-0">
              {renderPartnerTable(filteredPartners)}
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Partners;
