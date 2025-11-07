import React, { useState } from 'react';
import { AuthScreen } from './components/screens/AuthScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { Dashboard } from './components/screens/Dashboard';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { AvatarCreatorScreen } from './components/screens/AvatarCreatorScreen';
import { ProgressScreen } from './components/screens/ProgressScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { ExerciseScreen } from './components/screens/ExerciseScreen';
import { AchievementsScreen } from './components/AchievementsScreen';
import { MissionsScreen } from '@/components/screens/MissionsScreen';
import { AppLayout } from './components/AppLayout';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/sonner';
import { useAuthStore } from './store/authStore';
import { useProgressStore } from './store/progressStore';
import { getProgressSummary } from './services/progressService';

type AppState = 'auth' | 'onboarding' | 'dashboard' | 'profile' | 'missions' | 'progress' | 'exercise' | 'achievements' | 'settings' | 'avatar-creator';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<AppState>('auth');
  const [user, setUser] = useState<any>(null);
  const clearAuth = useAuthStore(s => s.clearAuth);
  const setProgressSummary = useProgressStore(s => s.setSummary);
  const progressSummary = useProgressStore(s => s.summary);

  // Stats from global progress store (no valores quemados)
  const userStats = {
    level: progressSummary.nivel || 1,
    experience: progressSummary.xpTotal || 0,
    streak: 0,
  };

  const handleLogin = async () => {
    // Después de login (AuthScreen ya colocó token/usuario en el store)
    const authUser = useAuthStore.getState().user as any;
    const userId = Number(authUser?.id ?? authUser?.id_usuario);
    const readyOnboarding = authUser?.onboardingCompleto ?? false
    if (userId) {
      try {
        const summary = await getProgressSummary(userId);
        setProgressSummary(summary);
      } catch (e) {
        console.error('No se pudo cargar el progreso del usuario:', e);
      }
    }
    setUser(authUser || { name: 'Usuario' });
    if (readyOnboarding) {
      setCurrentScreen("dashboard")
    }
    else{
      setCurrentScreen('onboarding')
    };
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    clearAuth();
    useProgressStore.getState().clear();
    setCurrentScreen('auth');
  };

  const handleNavigate = (view: string) => {
    setCurrentScreen(view as AppState);
  };

  // Placeholder components for not yet implemented views
  const PlaceholderScreen = ({ title }: { title: string }) => (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-primary rounded-2xl mb-4">
          <span className="text-white text-2xl">🚧</span>
        </div>
        <h1 className="text-blue-primary mb-2">{title}</h1>
        <p className="text-muted-foreground mb-6">Esta sección estará disponible próximamente</p>
        <button 
          onClick={() => handleNavigate('dashboard')}
          className="gaming-button text-white border-0 px-6 py-2 rounded-lg"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );

  // Special screens that don't need the layout
  if (currentScreen === 'auth') {
    return <AuthScreen onLogin={handleLogin} />;
  }

  if (currentScreen === 'onboarding') {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  // Avatar creator should be truly full-screen: render without AppLayout
  if (currentScreen === 'avatar-creator') {
    return <AvatarCreatorScreen onBack={() => setCurrentScreen('profile')} />;
  }

  // All other screens use the AppLayout
  const renderContent = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
        
      case 'profile':
        return <ProfileScreen onOpenAvatarCreator={() => setCurrentScreen('avatar-creator')} />;
        
      case 'missions':
        return <MissionsScreen />;
        
      case 'progress':
        return <ProgressScreen />;
        
      case 'settings':
        return <SettingsScreen />;
        
      case 'exercise':
        return <ExerciseScreen />;
        
      case 'achievements':
        return <AchievementsScreen />;
      
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <AppLayout
      currentView={currentScreen}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
      userStats={userStats}
    >
      {renderContent()}
    </AppLayout>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
      <Toaster position="top-right" richColors />
    </ThemeProvider>
  );
}