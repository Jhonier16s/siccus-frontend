import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '.././ui/card';
import { Button } from '.././ui/button';
import { Badge } from '.././ui/badge';
import { Progress } from '.././ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '.././ui/tabs';
import {
  Activity,
  Clock,
  Target,
  Zap,
  Timer,
  Play,
  Pause,
  CheckCircle2,
  Star,
  Trophy,
  Flame,
  Calendar,
  TrendingUp
} from 'lucide-react';

export function ExerciseScreen() {
  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  // Mock data para ejercicios
  const weeklyGoal = {
    current: 4,
    target: 7,
    percentage: 57
  };

  const todayWorkouts = [
    {
      id: '1',
      name: 'Rutina Matutina',
      duration: '15 min',
      type: 'Cardio Ligero',
      calories: '120 kcal',
      difficulty: 'Fácil',
      exercises: ['Jumping Jacks', 'Sentadillas', 'Flexiones de brazos'],
      completed: false
    },
    {
      id: '2',
      name: 'Fuerza Básica',
      duration: '20 min',
      type: 'Fuerza',
      calories: '180 kcal',
      difficulty: 'Intermedio',
      exercises: ['Planchas', 'Burpees', 'Sentadillas con salto'],
      completed: false
    },
    {
      id: '3',
      name: 'Relajación',
      duration: '10 min',
      type: 'Estiramiento',
      calories: '50 kcal',
      difficulty: 'Fácil',
      exercises: ['Yoga básico', 'Respiración', 'Meditación'],
      completed: false
    }
  ];

  const weekStats = [
    { day: 'Lun', completed: true, duration: 25 },
    { day: 'Mar', completed: true, duration: 15 },
    { day: 'Mié', completed: false, duration: 0 },
    { day: 'Jue', completed: true, duration: 30 },
    { day: 'Vie', completed: true, duration: 20 },
    { day: 'Sáb', completed: false, duration: 0 },
    { day: 'Dom', completed: false, duration: 0 }
  ];

  const achievements = [
    {
      id: '1',
      title: 'Primera Rutina',
      description: 'Completa tu primera sesión de ejercicio',
      icon: '🎯',
      unlocked: true,
      xp: 50
    },
    {
      id: '2',
      title: 'Racha de 3 días',
      description: 'Ejercítate 3 días consecutivos',
      icon: '🔥',
      unlocked: false,
      xp: 100
    },
    {
      id: '3',
      title: 'Guerrero del Fin de Semana',
      description: 'Completa ejercicios durante el fin de semana',
      icon: '🏆',
      unlocked: false,
      xp: 75
    }
  ];

  const handleStartWorkout = (workoutId: string) => {
    setActiveTimer(activeTimer === workoutId ? null : workoutId);
  };

  const handleCompleteWorkout = (workoutId: string) => {
    setCompletedExercises(prev => [...prev, workoutId]);
    setActiveTimer(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Intermedio': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Difícil': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-6xl mx-auto">
      {/* Header con estadísticas rápidas */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-blue-primary">Centro de Ejercicios</h1>
          <p className="text-muted-foreground">Tu rutina diaria de actividad física</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-orange-100 text-orange-800 border-0 dark:bg-orange-900/20 dark:text-orange-400">
            <Flame className="h-3 w-3 mr-1" />
            {weeklyGoal.current} días activos
          </Badge>
        </div>
      </div>

      {/* Progreso semanal */}
      <Card className="gaming-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-primary" />
            <span>Progreso Semanal</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Meta semanal</span>
            <span className="text-blue-primary">{weeklyGoal.current}/{weeklyGoal.target} días</span>
          </div>
          <Progress value={weeklyGoal.percentage} className="h-2" />
          
          {/* Gráfico semanal */}
          <div className="grid grid-cols-7 gap-2 mt-4">
            {weekStats.map((day, index) => (
              <div key={index} className="text-center">
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-1 ${
                  day.completed 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }`}>
                  {day.completed ? <CheckCircle2 className="h-4 w-4" /> : <div className="w-2 h-2 bg-current rounded-full" />}
                </div>
                <p className="text-xs text-muted-foreground">{day.day}</p>
                {day.duration > 0 && (
                  <p className="text-xs text-blue-primary">{day.duration}min</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="workouts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="workouts">Rutinas de Hoy</TabsTrigger>
          <TabsTrigger value="stats">Estadísticas</TabsTrigger>
          <TabsTrigger value="achievements">Logros</TabsTrigger>
        </TabsList>

        <TabsContent value="workouts" className="space-y-4">
          <div className="grid gap-4">
            {todayWorkouts.map((workout) => {
              const isCompleted = completedExercises.includes(workout.id);
              const isActive = activeTimer === workout.id;
              
              return (
                <Card key={workout.id} className={`gaming-card ${isCompleted ? 'opacity-75' : ''}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className={`flex items-center space-x-2 ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                        <Activity className="h-5 w-5 text-blue-primary" />
                        <span>{workout.name}</span>
                        {isCompleted && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                      </CardTitle>
                      <Badge className={getDifficultyColor(workout.difficulty)}>
                        {workout.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <Clock className="h-4 w-4 mx-auto text-blue-primary mb-1" />
                        <p className="text-sm text-muted-foreground">{workout.duration}</p>
                      </div>
                      <div>
                        <Zap className="h-4 w-4 mx-auto text-orange-500 mb-1" />
                        <p className="text-sm text-muted-foreground">{workout.calories}</p>
                      </div>
                      <div>
                        <Target className="h-4 w-4 mx-auto text-green-500 mb-1" />
                        <p className="text-sm text-muted-foreground">{workout.type}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Ejercicios incluidos:</p>
                      <div className="flex flex-wrap gap-1">
                        {workout.exercises.map((exercise, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {exercise}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {!isCompleted && (
                        <>
                          <Button
                            onClick={() => handleStartWorkout(workout.id)}
                            className={`gaming-button flex-1 ${isActive ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
                          >
                            {isActive ? (
                              <>
                                <Pause className="h-4 w-4 mr-2" />
                                Pausar
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                Iniciar
                              </>
                            )}
                          </Button>
                          <Button
                            onClick={() => handleCompleteWorkout(workout.id)}
                            variant="outline"
                            className="flex-1"
                          >
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Completar
                          </Button>
                        </>
                      )}
                      {isCompleted && (
                        <Button disabled className="w-full">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          ¡Completado! +50 XP
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="gaming-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-blue-primary" />
                  <span>Esta Semana</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl text-blue-primary">4 días</p>
                <p className="text-sm text-muted-foreground">Días activos</p>
              </CardContent>
            </Card>

            <Card className="gaming-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Timer className="h-4 w-4 text-orange-500" />
                  <span>Tiempo Total</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl text-orange-500">90 min</p>
                <p className="text-sm text-muted-foreground">Esta semana</p>
              </CardContent>
            </Card>

            <Card className="gaming-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-red-500" />
                  <span>Calorías</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl text-red-500">650</p>
                <p className="text-sm text-muted-foreground">kcal quemadas</p>
              </CardContent>
            </Card>
          </div>

          <Card className="gaming-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-primary" />
                <span>Progreso Mensual</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Días activos</span>
                  <span className="text-blue-primary">16/30 días</span>
                </div>
                <Progress value={53} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  ¡Excelente progreso! Mantén el ritmo para alcanzar tu meta mensual.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={`gaming-card ${achievement.unlocked ? 'border-yellow-200 dark:border-yellow-800' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`text-3xl p-3 rounded-full ${
                      achievement.unlocked 
                        ? 'bg-yellow-100 dark:bg-yellow-900/20' 
                        : 'bg-gray-100 dark:bg-gray-800 grayscale'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    <div className="text-right">
                      {achievement.unlocked ? (
                        <Badge className="bg-yellow-100 text-yellow-800 border-0 dark:bg-yellow-900/20 dark:text-yellow-400">
                          <Trophy className="h-3 w-3 mr-1" />
                          +{achievement.xp} XP
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          <Star className="h-3 w-3 mr-1" />
                          {achievement.xp} XP
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}