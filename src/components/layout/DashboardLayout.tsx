import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, Map, TrendingUp, Activity, AlertTriangle, Users, Settings, LogOut,
  Bell, User, Menu, X, Shield, FileText, Upload, MessageSquare, ChevronRight
} from 'lucide-react';
import { UserRole } from '@/types';
import { cn } from '@/lib/utils';

export default function DashboardLayout() {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: Home, roles: ['operator', 'inspector', 'main_admin', 'site_admin'] as UserRole[] },
    { name: 'Risk Map', href: '/dashboard/risk-map', icon: Map, roles: ['operator', 'inspector', 'main_admin'] as UserRole[] },
    { name: 'Forecasts', href: '/dashboard/forecasts', icon: TrendingUp, roles: ['operator', 'inspector', 'main_admin'] as UserRole[] },
    { name: 'Sensors', href: '/dashboard/sensors', icon: Activity, roles: ['operator', 'inspector', 'main_admin'] as UserRole[] },
    { name: 'Alerts', href: '/dashboard/alerts', icon: AlertTriangle, roles: ['operator', 'inspector', 'main_admin'] as UserRole[] },
    { name: 'Incidents', href: '/dashboard/incidents', icon: FileText, roles: ['operator', 'inspector', 'main_admin'] as UserRole[] },
    // { name: 'Drone Imagery', href: '/dashboard/drone', icon: Upload, roles: ['operator', 'inspector'] as UserRole[] },
    // { name: 'Inspections', href: '/dashboard/inspections', icon: Shield, roles: ['inspector'] as UserRole[] },
    { name: 'Users', href: '/dashboard/users', icon: Users, roles: ['main_admin', 'site_admin'] as UserRole[] },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings, roles: ['main_admin', 'site_admin'] as UserRole[] },
  ];

  const filteredNavigation = navigation.filter(item => 
    item.roles.some(role => hasRole(role))
  );

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar-background border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-lg font-semibold text-sidebar-foreground">RockfallAI</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-sidebar-foreground hover:text-sidebar-primary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {filteredNavigation.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.href);
                  setSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
                {isActive(item.href) && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>
            ))}
          </nav>

          {/* User section */}
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
                <User className="w-5 h-5 text-sidebar-accent-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-sidebar-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role.replace('_', ' ')}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-foreground hover:text-primary"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-4">
              {/* Notification button */}
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-risk-high rounded-full"></span>
              </button>

              {/* Chat button */}
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <MessageSquare className="w-5 h-5" />
              </button> 

              {/* Status indicator */}
              <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-card border border-border">
                <div className="w-2 h-2 bg-risk-low rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">Live</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}