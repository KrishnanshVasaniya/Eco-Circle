
import React from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from './AdminSidebar';
import { Toaster } from "@/components/ui/toaster";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background to-white">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <div className="container p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <SidebarTrigger className="md:hidden flex items-center justify-center w-10 h-10 rounded-md bg-white shadow-sm border border-border"/>
              <div className="h-10 md:hidden"></div> {/* Spacer for mobile */}
            </div>
            <div className="animate-fade-in">
              {children}
            </div>
          </div>
        </main>
        <Toaster />
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
