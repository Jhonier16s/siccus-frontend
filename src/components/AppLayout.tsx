import React from 'react';
import logo from '../assets/logo.png';
import { AppDrawer } from './AppDrawer';
import { AppBreadcrumbs } from './AppBreadcrumbs';
import { Button } from './ui/button';
import { Gamepad2, Bell } from 'lucide-react';
import { AvatarWithLoader } from './AvatarWithLoader';
import { getRpmImageUrl } from '../utils/avatar';
import { useAuthStore } from '../store/authStore';

interface AppLayoutProps {
  children: React.ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  userStats: {
    level: number;
    experience: number;
    streak: number;
  };
  showHeader?: boolean;
  showBreadcrumbs?: boolean;
}

export function AppLayout({ 
  children, 
  currentView, 
  onNavigate, 
  onLogout, 
  userStats,
  showHeader = true,
  showBreadcrumbs = true
}: AppLayoutProps) {
  const authUser = useAuthStore(s => s.user);
  const storedAvatar = (authUser?.avatarUrl as string) || '';
  const avatarUrl = getRpmImageUrl(storedAvatar);
  const isUserLoading = useAuthStore(s => s.isUserLoading);
  return (
    <div className="min-h-screen bg-gradient-app transition-colors duration-300">
      {/* Header */}
      {showHeader && (
        <header className="bg-header border-b border-border px-4 py-4 sticky top-0 z-40 transition-colors duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AppDrawer 
                currentView={currentView}
                onNavigate={onNavigate}
                onLogout={onLogout}
                userStats={userStats}
              />
              <div>
                <img src={logo} alt="Siccus Logo" className="h-8 w-8 object-contain" />
              </div>
              <AvatarWithLoader imageUrl={avatarUrl} loading={isUserLoading} className="w-8 h-8 rounded-full" />
              <div>
                <h1 className="text-blue-primary">Siccus</h1>
                <p className="text-xs text-muted-foreground">
                  Nivel {userStats.level} • Racha {userStats.streak} días
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-border hover:bg-accent"
                onClick={() => onNavigate('reminders')}
              >
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>
      )}

      {/* Breadcrumbs */}
      {showBreadcrumbs && (
        <AppBreadcrumbs 
          currentView={currentView} 
          onNavigate={onNavigate} 
        />
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}