
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter } from "@/components/ui/sidebar";
import { Home, User, Wallet, FileText, Settings, LogOut } from 'lucide-react';
import { useAuth } from "@/hooks/useAuth";

const AdminSidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const menuItems = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: Home,
    },
    {
      title: "Partners",
      url: "/admin/partners",
      icon: User,
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: FileText,
    },
    {
      title: "Wallet",
      url: "/admin/wallet",
      icon: Wallet,
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings,
    },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-eco-primary flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">EC</span>
          </div>
          <div>
            <div className="text-lg font-semibold text-sidebar-foreground">EcoCircle</div>
            <div className="text-xs text-muted-foreground">MCP Admin Panel</div>
          </div>
        </div>
        {user && (
          <div className="mt-4 p-3 bg-sidebar-accent rounded-lg">
            <div className="text-xs text-muted-foreground">Logged in as:</div>
            <div className="font-medium text-sm flex items-center space-x-2">
              <User className="h-3 w-3" />
              <span>{user.name}</span>
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={isActiveRoute(item.url) 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                      : "hover:bg-sidebar-accent/50"
                    }
                  >
                    <Link to={item.url} className="transition-all duration-200">
                      <item.icon className={`h-4 w-4 ${isActiveRoute(item.url) ? "text-eco-primary" : ""}`} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="text-destructive hover:bg-destructive/10">
              <Link to="/auth/logout" className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="mt-4 pt-4 border-t border-sidebar-border/50 text-xs text-center text-muted-foreground">
          <p>EcoCircle v1.0</p>
          <p className="mt-1">&copy; {new Date().getFullYear()} EcoCircle</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
