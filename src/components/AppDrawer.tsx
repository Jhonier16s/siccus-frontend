import React from "react";
import logo from "../assets/logo.png";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { AvatarWithLoader } from "./AvatarWithLoader";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  Menu,
  Home,
  User,
  Bell,
  TrendingUp,
  Activity,
  Trophy,
  Settings,
  LogOut,
  Star,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { getRpmImageUrl } from "../utils/avatar";

interface AppDrawerProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  userStats: {
    level: number;
    experience: number;
    streak: number;
  };
}

export function AppDrawer({
  currentView,
  onNavigate,
  onLogout,
  userStats,
}: AppDrawerProps) {
  const authUser = useAuthStore((s) => s.user);
  const displayName =
    (authUser?.nombre as string) || (authUser?.name as string) || "Usuario";
  const storedAvatar = (authUser?.avatarUrl as string) || "";
  const avatarImageUrl = getRpmImageUrl(storedAvatar);

  const isUserLoading = useAuthStore(s => s.isUserLoading);

  const menuItems = [
    { id: "dashboard", label: "Inicio", icon: Home },
    { id: "profile", label: "Mi Perfil", icon: User },
    { id: "progress", label: "Mi Progreso", icon: TrendingUp },
    { id: "reminders", label: "Recordatorios", icon: Bell },
    { id: "exercise", label: "Ejercicio", icon: Activity },
    { id: "achievements", label: "Logros", icon: Trophy },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-border text-foreground hover:bg-muted"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-80 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-6 bg-header border-b border-border">
            <div className="flex items-center space-x-3 mb-4">
              <div>
                <img
                  src={logo}
                  alt="Siccus Logo"
                  className="h-10 w-10 object-contain"
                />
              </div>
              <div>
                <SheetTitle className="text-blue-primary">Siccus</SheetTitle>
                <p className="text-muted-foreground text-sm">
                  Tu aventura saludable
                </p>
              </div>
            </div>

            {/* User Stats */}
            <div className="gaming-card rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
                  <AvatarWithLoader 
                    imageUrl={avatarImageUrl || undefined}
                    loading={isUserLoading}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full ring-2 ring-blue-primary"
                  />
                  <div>
                    <p className="text-foreground">{displayName}</p>
                    <p className="text-muted-foreground text-xs">Miembro</p>
                  </div>
                </div>

                <Badge className="bg-yellow-500 text-white border-0 dark:bg-yellow-600">
                  <Star className="h-3 w-3 mr-1" />
                  Nivel {userStats.level}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <p className="text-xl text-foreground">
                    {userStats.experience}
                  </p>
                  <p className="text-muted-foreground text-xs">XP Total</p>
                </div>
                <div>
                  <p className="text-xl text-foreground">{userStats.streak}</p>
                  <p className="text-muted-foreground text-xs">Días Seguidos</p>
                </div>
              </div>
            </div>
          </SheetHeader>

          {/* Navigation Menu */}
          <div className="flex-1 p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-blue-primary text-white"
                        : "text-foreground hover:bg-muted dark:hover:bg-accent"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        isActive ? "text-white" : "text-muted-foreground"
                      }`}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Separator className="mb-4" />

            <div className="space-y-2">
              <button
                onClick={() => onNavigate("settings")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  currentView === "settings"
                    ? "bg-blue-primary text-white"
                    : "text-foreground hover:bg-muted dark:hover:bg-accent"
                }`}
              >
                <Settings
                  className={`h-5 w-5 ${
                    currentView === "settings"
                      ? "text-white"
                      : "text-muted-foreground"
                  }`}
                />
                <span>Configuración</span>
              </button>

              <button
                onClick={onLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-all"
              >
                <LogOut className="h-5 w-5" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
