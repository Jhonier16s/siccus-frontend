import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Trophy,
  Star,
  Target,
  Crown,
  Medal,
  Award,
  Flame,
  Zap,
  Calendar,
  Activity,
  Heart,
  Clock,
  TrendingUp,
  CheckCircle2,
  Lock
} from 'lucide-react';

export function AchievementsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data para logros
  const userLevel = {
    current: 12,
    xp: 1450,
    xpToNext: 550,
    totalXpNeeded: 2000,
    progress: 72.5
  };

  const categories = [
    { id: 'all', label: 'Todos', icon: Trophy },
    { id: 'exercise', label: 'Ejercicio', icon: Activity },
    { id: 'habits', label: 'Hábitos', icon: Heart },
    { id: 'streaks', label: 'Rachas', icon: Flame },
    { id: 'milestones', label: 'Hitos', icon: Crown }
  ];

  const achievements = [
    // Ejercicio
    {
      id: '1',
      title: 'Primera Sesión',
      description: 'Completa tu primera rutina de ejercicio',
      category: 'exercise',
      icon: '🎯',
      rarity: 'common',
      xp: 50,
      unlocked: true,
      unlockedDate: '2024-01-15',
      progress: 100
    },
    {
      id: '2',
      title: 'Guerrero del Ejercicio',
      description: 'Completa 10 rutinas de ejercicio',
      category: 'exercise',
      icon: '💪',
      rarity: 'rare',
      xp: 200,
      unlocked: false,
      progress: 40,
      current: 4,
      target: 10
    },
    {
      id: '3',
      title: 'Maratonista',
      description: 'Acumula 100 minutos de ejercicio',
      category: 'exercise',
      icon: '🏃‍♂️',
      rarity: 'epic',
      xp: 300,
      unlocked: false,
      progress: 75,
      current: 75,
      target: 100
    },

    // Hábitos
    {
      id: '4',
      title: 'Hidratación Hero',
      description: 'Bebe 8 vasos de agua en un día',
      category: 'habits',
      icon: '💧',
      rarity: 'common',
      xp: 25,
      unlocked: true,
      unlockedDate: '2024-01-20',
      progress: 100
    },
    {
      id: '5',
      title: 'Recordatorio Master',
      description: 'Completa todos los recordatorios durante 3 días',
      category: 'habits',
      icon: '✅',
      rarity: 'rare',
      xp: 150,
      unlocked: false,
      progress: 66,
      current: 2,
      target: 3
    },

    // Rachas
    {
      id: '6',
      title: 'Racha de Fuego',
      description: 'Mantén una racha de 3 días consecutivos',
      category: 'streaks',
      icon: '🔥',
      rarity: 'rare',
      xp: 100,
      unlocked: true,
      unlockedDate: '2024-01-18',
      progress: 100
    },
    {
      id: '7',
      title: 'Consistencia Legendaria',
      description: 'Racha de 30 días consecutivos',
      category: 'streaks',
      icon: '🌟',
      rarity: 'legendary',
      xp: 1000,
      unlocked: false,
      progress: 23,
      current: 7,
      target: 30
    },

    // Hitos
    {
      id: '8',
      title: 'Bienvenido',
      description: 'Completa tu perfil por primera vez',
      category: 'milestones',
      icon: '👋',
      rarity: 'common',
      xp: 25,
      unlocked: true,
      unlockedDate: '2024-01-10',
      progress: 100
    },
    {
      id: '9',
      title: 'Nivel 10',
      description: 'Alcanza el nivel 10',
      category: 'milestones',
      icon: '👑',
      rarity: 'epic',
      xp: 500,
      unlocked: true,
      unlockedDate: '2024-01-22',
      progress: 100
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700';
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800';
      case 'legendary': return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 border-orange-200 dark:from-yellow-900/20 dark:to-orange-900/20 dark:text-orange-400 dark:border-orange-800';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const completionPercentage = (unlockedCount / totalCount) * 100;

  return (
    <div className="space-y-6 p-4 max-w-6xl mx-auto">
      {/* Header con información del nivel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-blue-primary">Centro de Logros</h1>
          <p className="text-muted-foreground">Tu colección de triunfos y reconocimientos</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-purple-100 text-purple-800 border-0 dark:bg-purple-900/20 dark:text-purple-400">
            <Crown className="h-3 w-3 mr-1" />
            Nivel {userLevel.current}
          </Badge>
        </div>
      </div>

      {/* Progreso de Nivel */}
      <Card className="gaming-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span>Progreso de Nivel</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white">
                <span className="text-xl">{userLevel.current}</span>
              </div>
              <div>
                <p className="text-xl text-blue-primary">{userLevel.xp.toLocaleString()} XP</p>
                <p className="text-sm text-muted-foreground">
                  {userLevel.xpToNext} XP para el siguiente nivel
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl text-blue-primary">{userLevel.current + 1}</p>
              <p className="text-sm text-muted-foreground">Próximo nivel</p>
            </div>
          </div>
          <Progress value={userLevel.progress} className="h-3" />
        </CardContent>
      </Card>

      {/* Resumen de logros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="gaming-card">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
            <p className="text-2xl text-blue-primary">{unlockedCount}</p>
            <p className="text-sm text-muted-foreground">Logros Desbloqueados</p>
          </CardContent>
        </Card>
        
        <Card className="gaming-card">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto text-blue-500 mb-2" />
            <p className="text-2xl text-blue-primary">{completionPercentage.toFixed(0)}%</p>
            <p className="text-sm text-muted-foreground">Completado</p>
          </CardContent>
        </Card>
        
        <Card className="gaming-card">
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 mx-auto text-orange-500 mb-2" />
            <p className="text-2xl text-blue-primary">{achievements.reduce((sum, a) => sum + (a.unlocked ? a.xp : 0), 0)}</p>
            <p className="text-sm text-muted-foreground">XP Total Ganado</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="achievements" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="achievements">Logros</TabsTrigger>
          <TabsTrigger value="stats">Estadísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-4">
          {/* Filtros de categoría */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-primary text-white'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">{category.label}</span>
                </button>
              );
            })}
          </div>

          {/* Lista de logros */}
          <div className="grid gap-4">
            {filteredAchievements.map((achievement) => (
              <Card key={achievement.id} className={`gaming-card ${
                achievement.unlocked 
                  ? 'border-yellow-200 dark:border-yellow-800' 
                  : 'opacity-75'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className={`text-4xl p-3 rounded-full ${
                      achievement.unlocked 
                        ? 'bg-yellow-100 dark:bg-yellow-900/20' 
                        : 'bg-gray-100 dark:bg-gray-800 grayscale'
                    }`}>
                      {achievement.unlocked ? achievement.icon : <Lock className="h-6 w-6 text-gray-400" />}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium ${
                          achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {achievement.title}
                        </h3>
                        <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                      
                      {!achievement.unlocked && achievement.current && achievement.target && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progreso</span>
                            <span className="text-blue-primary">
                              {achievement.current}/{achievement.target}
                            </span>
                          </div>
                          <Progress value={achievement.progress} className="h-2" />
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-4">
                        {achievement.unlocked ? (
                          <>
                            <Badge className="bg-green-100 text-green-800 border-0 dark:bg-green-900/20 dark:text-green-400">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Desbloqueado
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {achievement.unlockedDate}
                            </span>
                          </>
                        ) : (
                          <Badge variant="outline">
                            <Lock className="h-3 w-3 mr-1" />
                            Bloqueado
                          </Badge>
                        )}
                        
                        <Badge className="bg-blue-100 text-blue-800 border-0 dark:bg-blue-900/20 dark:text-blue-400">
                          <Star className="h-3 w-3 mr-1" />
                          {achievement.xp} XP
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="gaming-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Medal className="h-4 w-4 text-yellow-500" />
                  <span>Comunes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl text-blue-primary">
                  {achievements.filter(a => a.rarity === 'common' && a.unlocked).length}
                </p>
                <p className="text-sm text-muted-foreground">
                  de {achievements.filter(a => a.rarity === 'common').length}
                </p>
              </CardContent>
            </Card>

            <Card className="gaming-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Award className="h-4 w-4 text-blue-500" />
                  <span>Raros</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl text-blue-primary">
                  {achievements.filter(a => a.rarity === 'rare' && a.unlocked).length}
                </p>
                <p className="text-sm text-muted-foreground">
                  de {achievements.filter(a => a.rarity === 'rare').length}
                </p>
              </CardContent>
            </Card>

            <Card className="gaming-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Trophy className="h-4 w-4 text-purple-500" />
                  <span>Épicos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl text-blue-primary">
                  {achievements.filter(a => a.rarity === 'epic' && a.unlocked).length}
                </p>
                <p className="text-sm text-muted-foreground">
                  de {achievements.filter(a => a.rarity === 'epic').length}
                </p>
              </CardContent>
            </Card>

            <Card className="gaming-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Crown className="h-4 w-4 text-orange-500" />
                  <span>Legendarios</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl text-blue-primary">
                  {achievements.filter(a => a.rarity === 'legendary' && a.unlocked).length}
                </p>
                <p className="text-sm text-muted-foreground">
                  de {achievements.filter(a => a.rarity === 'legendary').length}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="gaming-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-primary" />
                <span>Progreso por Categoría</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categories.slice(1).map((category) => {
                const categoryAchievements = achievements.filter(a => a.category === category.id);
                const unlockedInCategory = categoryAchievements.filter(a => a.unlocked).length;
                const percentage = (unlockedInCategory / categoryAchievements.length) * 100;
                const Icon = category.icon;
                
                return (
                  <div key={category.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4 text-blue-primary" />
                        <span className="text-muted-foreground">{category.label}</span>
                      </div>
                      <span className="text-blue-primary">
                        {unlockedInCategory}/{categoryAchievements.length}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}