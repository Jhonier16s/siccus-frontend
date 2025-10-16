import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '.././ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '.././ui/tabs';
import { Badge } from '.././ui/badge';
import { Progress } from '.././ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '.././ui/select';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Award, 
  Activity, 
  Heart, 
  Zap,
  Weight
} from 'lucide-react';

export function ProgressScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock data for charts
  const weightData = [
    { date: '2024-01-01', weight: 75 },
    { date: '2024-01-08', weight: 74.5 },
    { date: '2024-01-15', weight: 74.2 },
    { date: '2024-01-22', weight: 73.8 },
    { date: '2024-01-29', weight: 73.5 },
    { date: '2024-02-05', weight: 73.1 },
    { date: '2024-02-12', weight: 72.8 }
  ];

  const weeklyActivityData = [
    { day: 'Lun', steps: 8500, calories: 320, exercise: 45 },
    { day: 'Mar', steps: 10200, calories: 480, exercise: 60 },
    { day: 'Mié', steps: 7800, calories: 290, exercise: 30 },
    { day: 'Jue', steps: 12000, calories: 550, exercise: 75 },
    { day: 'Vie', steps: 9500, calories: 410, exercise: 50 },
    { day: 'Sáb', steps: 11200, calories: 520, exercise: 90 },
    { day: 'Dom', steps: 6800, calories: 250, exercise: 20 }
  ];

  const habitData = [
    { name: 'Agua (8 vasos)', value: 85, color: '#3b82f6' },
    { name: 'Ejercicio (30 min)', value: 72, color: '#10b981' },
    { name: 'Sueño (8 horas)', value: 68, color: '#8b5cf6' },
    { name: 'Frutas/Verduras', value: 90, color: '#f59e0b' }
  ];

  const weeklyStats = {
    totalSteps: 65000,
    avgSteps: 9286,
    totalCalories: 3320,
    avgCalories: 474,
    totalExercise: 370,
    avgExercise: 53,
    waterIntake: 85,
    sleepQuality: 68
  };

  const achievements = [
    { id: 1, title: 'Meta de pasos semanal', description: 'Completaste 65,000 pasos esta semana', icon: '🚶', unlocked: true, date: '2024-02-12' },
    { id: 2, title: 'Hidratación perfecta', description: '7 días seguidos bebiendo 8 vasos de agua', icon: '💧', unlocked: true, date: '2024-02-10' },
    { id: 3, title: 'Atleta dedicado', description: 'Ejercitaste 5 días esta semana', icon: '🏃', unlocked: true, date: '2024-02-11' },
    { id: 4, title: 'Pérdida constante', description: 'Perdiste peso durante 4 semanas seguidas', icon: '📉', unlocked: false, date: null }
  ];

  const getCurrentWeight = () => weightData[weightData.length - 1]?.weight || 0;
  const getWeightChange = () => {
    if (weightData.length < 2) return 0;
    return weightData[weightData.length - 1].weight - weightData[weightData.length - 2].weight;
  };

  const formatChange = (value: number, unit: string = '') => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}${unit}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-blue-primary mb-2">Mi Progreso</h1>
          <p className="text-gray-medium">Seguimiento detallado de tu evolución de salud</p>
        </div>
        
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-48 border-gray-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Última semana</SelectItem>
            <SelectItem value="month">Último mes</SelectItem>
            <SelectItem value="quarter">Últimos 3 meses</SelectItem>
            <SelectItem value="year">Último año</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="gaming-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-medium">Peso actual</p>
                <p className="text-blue-primary">{getCurrentWeight()} kg</p>
                <div className="flex items-center space-x-1 mt-1">
                  {getWeightChange() < 0 ? (
                    <TrendingDown className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingUp className="h-3 w-3 text-red-500" />
                  )}
                  <span className={`text-xs ${getWeightChange() < 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {formatChange(getWeightChange(), ' kg')}
                  </span>
                </div>
              </div>
              <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                <Weight className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gaming-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-medium">Pasos promedio</p>
                <p className="text-blue-primary">{weeklyStats.avgSteps.toLocaleString()}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+12% vs semana anterior</span>
                </div>
              </div>
              <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                <Activity className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gaming-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-medium">Calorías quemadas</p>
                <p className="text-blue-primary">{weeklyStats.avgCalories}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+8% vs semana anterior</span>
                </div>
              </div>
              <div className="inline-flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
                <Zap className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gaming-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-medium">Ejercicio promedio</p>
                <p className="text-blue-primary">{weeklyStats.avgExercise} min</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+15% vs semana anterior</span>
                </div>
              </div>
              <div className="inline-flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
                <Heart className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="weight" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="weight" className="data-[state=active]:bg-blue-primary data-[state=active]:text-white">
            Peso
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-blue-primary data-[state=active]:text-white">
            Actividad
          </TabsTrigger>
          <TabsTrigger value="habits" className="data-[state=active]:bg-blue-primary data-[state=active]:text-white">
            Hábitos
          </TabsTrigger>
          <TabsTrigger value="goals" className="data-[state=active]:bg-blue-primary data-[state=active]:text-white">
            Objetivos
          </TabsTrigger>
        </TabsList>

        {/* Weight Progress */}
        <TabsContent value="weight">
          <Card className="gaming-card border-0">
            <CardHeader>
              <CardTitle className="text-blue-primary">Evolución del Peso</CardTitle>
              <CardDescription>Seguimiento de tu progreso de peso a lo largo del tiempo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                    <Tooltip />
                    <Line type="monotone" dataKey="weight" stroke="#152A38" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Progress */}
        <TabsContent value="activity">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="gaming-card border-0">
              <CardHeader>
                <CardTitle className="text-blue-primary">Pasos Diarios</CardTitle>
                <CardDescription>Actividad de la semana actual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyActivityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="day" 
                        tick={{ fill: '#ffffff', fontSize: 12 }}
                        stroke="#ffffff"
                      />
                      <YAxis 
                        tick={{ fill: '#ffffff', fontSize: 12 }}
                        stroke="#ffffff"
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e293b', 
                          border: '1px solid #60a5fa',
                          borderRadius: '8px',
                          color: '#ffffff'
                        }}
                      />
                      <Bar dataKey="steps" fill="#60a5fa" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="gaming-card border-0">
              <CardHeader>
                <CardTitle className="text-blue-primary">Calorías Quemadas</CardTitle>
                <CardDescription>Energía gastada durante la semana</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyActivityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="day" 
                        tick={{ fill: '#ffffff', fontSize: 12 }}
                        stroke="#ffffff"
                      />
                      <YAxis 
                        tick={{ fill: '#ffffff', fontSize: 12 }}
                        stroke="#ffffff"
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e293b', 
                          border: '1px solid #60a5fa',
                          borderRadius: '8px',
                          color: '#ffffff'
                        }}
                      />
                      <Bar dataKey="calories" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Habits Progress */}
        <TabsContent value="habits">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="gaming-card border-0">
              <CardHeader>
                <CardTitle className="text-blue-primary">Cumplimiento de Hábitos</CardTitle>
                <CardDescription>Porcentaje de cumplimiento semanal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {habitData.map((habit, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">{habit.name}</span>
                      <span className="text-sm text-white">{habit.value}%</span>
                    </div>
                    <Progress 
                      value={habit.value} 
                      className="h-2"
                      style={{ backgroundColor: `${habit.color}20` }}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="gaming-card border-0">
              <CardHeader>
                <CardTitle className="text-blue-primary">Distribución de Actividades</CardTitle>
                <CardDescription>Tiempo dedicado a cada actividad</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={habitData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {habitData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Goals Progress */}
        <TabsContent value="goals">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="gaming-card border-0">
              <CardHeader>
                <CardTitle className="text-blue-primary">Objetivos del Mes</CardTitle>
                <CardDescription>Progreso hacia tus metas mensuales</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-600">Perder 2 kg</span>
                    <span className="text-sm text-blue-primary">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-gray-medium">1.5 kg de 2 kg completados</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-600">300,000 pasos</span>
                    <span className="text-sm text-blue-primary">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                  <p className="text-xs text-gray-medium">246,000 de 300,000 pasos</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-600">20 horas de ejercicio</span>
                    <span className="text-sm text-blue-primary">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <p className="text-xs text-gray-medium">13 de 20 horas completadas</p>
                </div>
              </CardContent>
            </Card>

            <Card className="gaming-card border-0">
              <CardHeader>
                <CardTitle className="text-blue-primary">Logros Recientes</CardTitle>
                <CardDescription>Tus últimos logros desbloqueados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.filter(a => a.unlocked).slice(0, 3).map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <p className="text-blue-600">{achievement.title}</p>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{achievement.date}</p>
                    </div>
                    <Badge className="bg-blue-500 text-white hover:bg-blue-600">
                      <Award className="h-3 w-3 mr-1" />
                      Nuevo
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}