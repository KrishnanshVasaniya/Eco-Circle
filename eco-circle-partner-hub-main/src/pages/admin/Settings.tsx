
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [autoAssign, setAutoAssign] = useState(true);
  const [emailSettings, setEmailSettings] = useState({
    dailyReport: true,
    orderNotifications: true,
    partnerUpdates: false,
  });
  
  const handleSaveGeneral = () => {
    toast({
      title: "Settings saved",
      description: "Your general settings have been updated successfully.",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated successfully.",
    });
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Manage your account details and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={user?.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user?.email} />
              </div>
            </div>
            <Button onClick={handleSaveGeneral} className="bg-eco-primary hover:bg-eco-dark">Save Changes</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Preferences</CardTitle>
            <CardDescription>Configure how the system operates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-assign">Automatic Order Assignment</Label>
                <p className="text-sm text-muted-foreground">Automatically assign new orders to available partners</p>
              </div>
              <Switch 
                id="auto-assign" 
                checked={autoAssign} 
                onCheckedChange={setAutoAssign} 
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications for important system events</p>
              </div>
              <Switch 
                id="notifications" 
                checked={notifications} 
                onCheckedChange={setNotifications} 
              />
            </div>
            <Button onClick={handleSaveGeneral} className="bg-eco-primary hover:bg-eco-dark">Save Changes</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>Manage what emails you receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="daily-report">Daily Report</Label>
                <p className="text-sm text-muted-foreground">Receive a daily summary of activities</p>
              </div>
              <Switch 
                id="daily-report" 
                checked={emailSettings.dailyReport} 
                onCheckedChange={(value) => setEmailSettings({...emailSettings, dailyReport: value})} 
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="order-notifications">Order Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified about new and updated orders</p>
              </div>
              <Switch 
                id="order-notifications" 
                checked={emailSettings.orderNotifications} 
                onCheckedChange={(value) => setEmailSettings({...emailSettings, orderNotifications: value})} 
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="partner-updates">Partner Updates</Label>
                <p className="text-sm text-muted-foreground">Receive emails when partners update their information</p>
              </div>
              <Switch 
                id="partner-updates" 
                checked={emailSettings.partnerUpdates} 
                onCheckedChange={(value) => setEmailSettings({...emailSettings, partnerUpdates: value})} 
              />
            </div>
            <Button onClick={handleSaveNotifications} className="bg-eco-primary hover:bg-eco-dark">Save Changes</Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Settings;
