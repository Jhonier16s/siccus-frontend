import React, { useState } from 'react';
import { AuthScreen } from './components/screens/AuthScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { Dashboard } from './components/screens/Dashboard';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { RemindersScreen } from './components/screens/RemindersScreen';
import { ProgressScreen } from './components/screens/ProgressScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { ExerciseScreen } from './components/screens/ExerciseScreen';
import { AchievementsScreen } from './components/AchievementsScreen';
import { AppLayout } from './components/AppLayout';
import { ThemeProvider } from './components/ThemeProvider';

type AppState = 'auth' | 'onboarding' | 'dashboard' | 'profile' | 'reminders' | 'progress' | 'exercise' | 'achievements' | 'settings';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<AppState>('auth');
  const [user, setUser] = useState<any>(null);

  // Mock user stats - in a real app this would come from your data store
  const userStats = {
    level: 12,
    experience: 1450,
    streak: 7
  };

  const handleLogin = () => {
    // Simulate user login
    setUser({ name: 'Usuario', isNewUser: true });
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
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

  // All other screens use the AppLayout
  const renderContent = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
        
      case 'profile':
        return <ProfileScreen />;
        
      case 'reminders':
        return <RemindersScreen />;
        
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
    </ThemeProvider>
  );
}