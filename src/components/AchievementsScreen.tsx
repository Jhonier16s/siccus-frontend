import React, { useState, useEffect } from 'react';
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
import { useAuthStore } from '@/store/authStore';


export function AchievementsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { user: authUser } = useAuthStore();

  // ⭐ Estado para logros reales del backend
  const [achievements, setAchievements] = useState<any[]>([]);

  // ⭐ Fetch de logros reales
  useEffect(() => {
    const fetchAchievements = async () => {
      if (!authUser?.id_usuario) return;

      try {
        console.log('Fetching achievements for user:', authUser.id_usuario);
        const response = await fetch(
          `http://localhost:3000/logros/usuario/${authUser.id_usuario}`
        );

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        console.log('✅ Achievements loaded:', data);
        
        const transformedData = data.map((item: any) => ({
          id: item.id_logro_usuario.toString(),
          title: item.logro.nombre,
          description: item.logro.descripcion,
          category: 'all',
          icon: item.logro.icono,
          rarity: item.logro.rareza || 'common',
          xp: item.logro.puntos_xp,
          unlocked: true,
          unlockedDate: new Date(item.fecha_obtenido).toLocaleDateString('es-ES'),
          progress: 100
        }));

        setAchievements(transformedData);
      } catch (error) {
        console.error('❌ Error fetching achievements:', error);
        setAchievements([]);
      }
    };

    fetchAchievements();
  }, [authUser?.id_usuario]);


  // ⭐ Logros BALANCEADOS: COMMON desbloqueados, resto bloqueados con progreso
  const exampleAchievements = {
    exercise: [
      { 
        id: 'ex1', 
        title: 'Primera Sesión', 
        description: 'Completa tu primer entrenamiento', 
        category: 'exercise', 
        icon: '💪', 
        rarity: 'common', 
        xp: 50, 
        unlocked: true, 
        unlockedDate: '10/11/2024',
        progress: 100,
        current: 1, 
        target: 1 
      },
      { 
        id: 'ex2', 
        title: 'Guerrero Semanal', 
        description: 'Entrena 7 días seguidos', 
        category: 'exercise', 
        icon: '🏃', 
        rarity: 'rare', 
        xp: 200, 
        unlocked: false, 
        progress: 28, 
        current: 2, 
        target: 7 
      },
      { 
        id: 'ex3', 
        title: 'Atleta Constante', 
        description: 'Completa 30 entrenamientos', 
        category: 'exercise', 
        icon: '🏋️', 
        rarity: 'epic', 
        xp: 500, 
        unlocked: false, 
        progress: 43, 
        current: 13, 
        target: 30 
      },
      { 
        id: 'ex4', 
        title: 'Maratonista', 
        description: 'Corre un total de 100km', 
        category: 'exercise', 
        icon: '🏅', 
        rarity: 'rare', 
        xp: 300, 
        unlocked: false, 
        progress: 15, 
        current: 15, 
        target: 100 
      },
      { 
        id: 'ex5', 
        title: 'Maestro del Fitness', 
        description: 'Completa 100 sesiones de entrenamiento', 
        category: 'exercise', 
        icon: '🥇', 
        rarity: 'legendary', 
        xp: 1000, 
        unlocked: false, 
        progress: 8, 
        current: 8, 
        target: 100 
      },
      { 
        id: 'ex6', 
        title: 'Escalador Supremo', 
        description: 'Sube 1000 pisos en total', 
        category: 'exercise', 
        icon: '🧗', 
        rarity: 'epic', 
        xp: 600, 
        unlocked: false, 
        progress: 82, 
        current: 820, 
        target: 1000 
      },
    ],
    habits: [
      { 
        id: 'hab1', 
        title: 'Hidratación Perfecta', 
        description: 'Bebe 8 vasos de agua al día', 
        category: 'habits', 
        icon: '💧', 
        rarity: 'common', 
        xp: 50, 
        unlocked: true, 
        unlockedDate: '12/11/2024',
        progress: 100, 
        current: 1, 
        target: 1 
      },
      { 
        id: 'hab2', 
        title: 'Sueño Reparador', 
        description: 'Duerme 8 horas durante 7 días', 
        category: 'habits', 
        icon: '😴', 
        rarity: 'rare', 
        xp: 150, 
        unlocked: false, 
        progress: 57, 
        current: 4, 
        target: 7 
      },
      { 
        id: 'hab3', 
        title: 'Nutrición Balanceada', 
        description: 'Come 5 porciones de frutas/verduras al día por 7 días', 
        category: 'habits', 
        icon: '🥗', 
        rarity: 'rare', 
        xp: 200, 
        unlocked: false, 
        progress: 29, 
        current: 2, 
        target: 7 
      },
      { 
        id: 'hab4', 
        title: 'Meditación Diaria', 
        description: 'Medita 10 minutos al día durante 14 días', 
        category: 'habits', 
        icon: '🧘', 
        rarity: 'epic', 
        xp: 400, 
        unlocked: false, 
        progress: 0, 
        current: 0, 
        target: 14 
      },
      { 
        id: 'hab5', 
        title: 'Desconexión Digital', 
        description: 'Sin pantallas 1 hora antes de dormir por 7 días', 
        category: 'habits', 
        icon: '📵', 
        rarity: 'rare', 
        xp: 250, 
        unlocked: false, 
        progress: 14, 
        current: 1, 
        target: 7 
      },
      { 
        id: 'hab6', 
        title: 'Gratitud Diaria', 
        description: 'Escribe 3 cosas por las que estás agradecido durante 30 días', 
        category: 'habits', 
        icon: '📝', 
        rarity: 'epic', 
        xp: 500, 
        unlocked: false, 
        progress: 0, 
        current: 0, 
        target: 30 
      },
      { 
        id: 'hab7', 
        title: 'Maestro de Hábitos', 
        description: 'Mantén 5 hábitos saludables durante 90 días', 
        category: 'habits', 
        icon: '🌟', 
        rarity: 'legendary', 
        xp: 1500, 
        unlocked: false, 
        progress: 3, 
        current: 3, 
        target: 90 
      },
    ],
    streaks: [
      { 
        id: 'str1', 
        title: 'Llama Inicial', 
        description: 'Mantén una racha de 3 días', 
        category: 'streaks', 
        icon: '🔥', 
        rarity: 'common', 
        xp: 100, 
        unlocked: true, 
        unlockedDate: '15/11/2024',
        progress: 100, 
        current: 3, 
        target: 3 
      },
      { 
        id: 'str2', 
        title: 'Semana Completa', 
        description: 'Mantén una racha de 7 días', 
        category: 'streaks', 
        icon: '🌤️', 
        rarity: 'rare', 
        xp: 200, 
        unlocked: false, 
        progress: 43, 
        current: 3, 
        target: 7 
      },
      { 
        id: 'str3', 
        title: 'Mes Perfecto', 
        description: 'Mantén una racha de 30 días', 
        category: 'streaks', 
        icon: '⚡', 
        rarity: 'epic', 
        xp: 500, 
        unlocked: false, 
        progress: 10, 
        current: 3, 
        target: 30 
      },
      { 
        id: 'str4', 
        title: 'Trimestre Imparable', 
        description: 'Mantén una racha de 90 días', 
        category: 'streaks', 
        icon: '💫', 
        rarity: 'epic', 
        xp: 800, 
        unlocked: false, 
        progress: 0, 
        current: 0, 
        target: 90 
      },
      { 
        id: 'str5', 
        title: 'Centurión', 
        description: 'Mantén una racha de 100 días', 
        category: 'streaks', 
        icon: '💯', 
        rarity: 'legendary', 
        xp: 1200, 
        unlocked: false, 
        progress: 0, 
        current: 0, 
        target: 100 
      },
      { 
        id: 'str6', 
        title: 'Año Legendario', 
        description: 'Mantén una racha de 365 días', 
        category: 'streaks', 
        icon: '🏆', 
        rarity: 'legendary', 
        xp: 3000, 
        unlocked: false, 
        progress: 0, 
        current: 0, 
        target: 365 
      },
    ],
    milestones: [
      { 
        id: 'mil1', 
        title: 'Aprendiz', 
        description: 'Alcanza el nivel 5', 
        category: 'milestones', 
        icon: '🎓', 
        rarity: 'common', 
        xp: 100, 
        unlocked: true, 
        unlockedDate: '08/11/2024',
        progress: 100, 
        current: 5, 
        target: 5 
      },
      { 
        id: 'mil2', 
        title: 'Competente', 
        description: 'Alcanza el nivel 10', 
        category: 'milestones', 
        icon: '📈', 
        rarity: 'rare', 
        xp: 250, 
        unlocked: false, 
        progress: 50, 
        current: 5, 
        target: 10 
      },
      { 
        id: 'mil3', 
        title: 'Experto', 
        description: 'Alcanza el nivel 25', 
        category: 'milestones', 
        icon: '⭐', 
        rarity: 'epic', 
        xp: 600, 
        unlocked: false, 
        progress: 20, 
        current: 5, 
        target: 25 
      },
      { 
        id: 'mil4', 
        title: 'Maestro', 
        description: 'Alcanza el nivel 50', 
        category: 'milestones', 
        icon: '👑', 
        rarity: 'legendary', 
        xp: 1500, 
        unlocked: false, 
        progress: 10, 
        current: 5, 
        target: 50 
      },
      { 
        id: 'mil5', 
        title: 'Coleccionista', 
        description: 'Desbloquea 50 logros', 
        category: 'milestones', 
        icon: '🎖️', 
        rarity: 'epic', 
        xp: 800, 
        unlocked: false, 
        progress: 18, 
        current: 9, 
        target: 50 
      },
      { 
        id: 'mil6', 
        title: 'Millonario XP', 
        description: 'Acumula 1,000,000 XP total', 
        category: 'milestones', 
        icon: '💎', 
        rarity: 'legendary', 
        xp: 5000, 
        unlocked: false, 
        progress: 0, 
        current: 630, 
        target: 1000000 
      },
      { 
        id: 'mil7', 
        title: 'Leyenda Viviente', 
        description: 'Alcanza el nivel 100', 
        category: 'milestones', 
        icon: '🌟', 
        rarity: 'legendary', 
        xp: 10000, 
        unlocked: false, 
        progress: 5, 
        current: 5, 
        target: 100 
      },
      { 
        id: 'mil8', 
        title: 'Primera Misión', 
        description: 'Completa tu primera misión', 
        category: 'milestones', 
        icon: '🎯', 
        rarity: 'common', 
        xp: 50, 
        unlocked: true, 
        unlockedDate: '06/11/2024',
        progress: 100, 
        current: 1, 
        target: 1 
      },
    ],
  };


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
    : (exampleAchievements[selectedCategory as keyof typeof exampleAchievements] || []);


  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const completionPercentage = totalCount > 0 ? (unlockedCount / totalCount) * 100 : 0;


  return (
    <div className="space-y-6 p-4 max-w-6xl mx-auto">
      {/* Header */}
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


      {/* Resumen */}
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
          {/* Filtros */}
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


          {/* Lista */}
          <div className="grid gap-4">
            {filteredAchievements.length === 0 ? (
              <Card className="gaming-card">
                <CardContent className="p-8 text-center">
                  <Trophy className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-muted-foreground">No tienes logros desbloqueados aún...</p>
                  <p className="text-sm text-muted-foreground mt-2">¡Completa misiones para obtener logros!</p>
                </CardContent>
              </Card>
            ) : (
              filteredAchievements.map((achievement: any) => (
                <Card key={achievement.id} className={`gaming-card ${
                  achievement.unlocked 
                    ? 'border-yellow-200 dark:border-yellow-800' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      {/* ⭐ Icono a todo color */}
                      <div className={`text-4xl p-3 rounded-full ${
                        achievement.unlocked 
                          ? 'bg-yellow-100 dark:bg-yellow-900/20' 
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}>
                        <span>
                          {achievement.icon}
                        </span>
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
                        
                        {!achievement.unlocked && achievement.current !== undefined && achievement.target && (
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
                              {achievement.unlockedDate && (
                                <span className="text-sm text-muted-foreground">
                                  {achievement.unlockedDate}
                                </span>
                              )}
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
              ))
            )}
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
                const percentage = categoryAchievements.length > 0 ? (unlockedInCategory / categoryAchievements.length) * 100 : 0;
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
