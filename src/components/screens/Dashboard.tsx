import React, { useState } from "react";
import { Button } from ".././ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from ".././ui/card";
import { Badge } from ".././ui/badge";
import { Avatar3D } from ".././Avatar3D";
import { 
  Trophy, 
  Target, 
  TrendingUp,
  Award,
  Plus
} from "lucide-react";

interface DashboardProps {
  onNavigate: (view: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [userStats] = useState({
    level: 12,
    health: 85,
    energy: 72,
    experience: 1450,
    streak: 7,
    weeklyGoal: 75,
  });

  const [dailyTasks] = useState([
    {
      id: 1,
      title: "Beber 8 vasos de agua",
      completed: true,
      xp: 50,
    },
    {
      id: 2,
      title: "Caminar 10,000 pasos",
      completed: true,
      xp: 100,
    },
    {
      id: 3,
      title: "Ejercicio 30 minutos",
      completed: false,
      xp: 150,
    },
    {
      id: 4,
      title: "Comer 5 porciones de frutas/verduras",
      completed: false,
      xp: 80,
    },
    {
      id: 5,
      title: "Dormir 8 horas",
      completed: false,
      xp: 120,
    },
  ]);

  const [achievements] = useState([
    {
      id: 1,
      title: "Primera Semana",
      icon: "🎯",
      unlocked: true,
    },
    {
      id: 2,
      title: "Caminante Dedicado",
      icon: "🚶",
      unlocked: true,
    },
    {
      id: 3,
      title: "Hidratación Pro",
      icon: "💧",
      unlocked: true,
    },
    {
      id: 4,
      title: "Atleta Principiante",
      icon: "🏃",
      unlocked: false,
    },
  ]);

  const completedTasks = dailyTasks.filter(
    (task) => task.completed,
  ).length;
  const totalXP = dailyTasks
    .filter((task) => task.completed)
    .reduce((sum, task) => sum + task.xp, 0);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Avatar Column */}
        <div className="lg:col-span-1">
          <Avatar3D
            level={userStats.level}
            health={userStats.health}
            energy={userStats.energy}
            experience={userStats.experience}
          />

          {/* Quick Stats */}
          <Card className="gaming-card mt-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-primary">
                Resumen de Hoy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-blue-primary" />
                  <span className="text-sm text-foreground">
                    Tareas completadas
                  </span>
                </div>
                <Badge className="bg-blue-primary text-white">
                  {completedTasks}/{dailyTasks.length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-foreground">XP ganada</span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                >
                  +{totalXP} XP
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-foreground">
                    Meta semanal
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                >
                  {userStats.weeklyGoal}%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Daily Tasks */}
          <Card className="gaming-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-blue-primary">
                  Misiones Diarias
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Completa tus tareas para ganar XP y mejorar
                  tu salud
                </CardDescription>
              </div>
              <Button
                className="gaming-button text-white border-0"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nueva Misión
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {dailyTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                    task.completed
                      ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                      : "bg-card border-border hover:border-blue-primary"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        task.completed
                          ? "bg-green-500 border-green-500"
                          : "border-border"
                      }`}
                    >
                      {task.completed && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span
                      className={
                        task.completed
                          ? "text-green-700 dark:text-green-300 line-through"
                          : "text-foreground"
                      }
                    >
                      {task.title}
                    </span>
                  </div>
                  <Badge
                    variant={
                      task.completed ? "secondary" : "outline"
                    }
                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                  >
                    +{task.xp} XP
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="gaming-card">
            <CardHeader>
              <CardTitle className="text-blue-primary">
                Logros Recientes
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Tus trofeos y reconocimientos más recientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`text-center p-4 rounded-lg border transition-all cursor-pointer ${
                      achievement.unlocked
                        ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800 hover:shadow-lg"
                        : "bg-muted border-border opacity-60"
                    }`}
                    onClick={() => achievement.unlocked && onNavigate('achievements')}
                  >
                    <div className="text-3xl mb-2">
                      {achievement.icon}
                    </div>
                    <h5 className="text-blue-primary mb-1 text-sm">
                      {achievement.title}
                    </h5>
                    {achievement.unlocked && (
                      <Badge className="bg-yellow-500 text-white text-xs">
                        <Trophy className="h-3 w-3 mr-1" />
                        Desbloqueado
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              {achievements.some(a => a.unlocked) && (
                <div className="mt-6 text-center">
                  <Button 
                    variant="outline" 
                    onClick={() => onNavigate('achievements')}
                    className="border-blue-primary text-blue-primary hover:bg-blue-primary hover:text-white transition-colors"
                  >
                    Ver todos los logros
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>


    </div>
  );
}