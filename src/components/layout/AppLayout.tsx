import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Menu, LogOut } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 sticky top-0 z-10">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4">
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
              <h1 className="text-base sm:text-lg font-semibold text-foreground hidden sm:block">
                Examination Paper Sales - Inventory Management
              </h1>
              <h1 className="text-base font-semibold text-foreground sm:hidden">
                Inventory System
              </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              {currentUser && (
                <div className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                  {currentUser.name} ({currentUser.role})
                </div>
              )}
              <Button onClick={handleLogout} variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Logout</span>
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
