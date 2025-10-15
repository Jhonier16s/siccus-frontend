import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Bell, 
  Plus, 
  Clock, 
  Droplets, 
  Apple, 
  Activity, 
  Moon, 
  Pill,
  Trash2,
  Edit,
  Volume2
} from 'lucide-react';

interface Reminder {
  id: number;
  title: string;
  time: string;
  frequency: string;
  category: string;
  enabled: boolean;
  days?: string[];
}

export function RemindersScreen() {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: 1,
      title: 'Beber agua',
      time: '09:00',
      frequency: 'every_2_hours',
      category: 'hydration',
      enabled: true,
      days: ['mon', 'tue', 'wed', 'thu', 'fri']
    },
    {
      id: 2,
      title: 'Desayuno saludable',
      time: '08:00',
      frequency: 'daily',
      category: 'nutrition',
      enabled: true,
      days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
    },
    {
      id: 3,
      title: 'Ejercicio matutino',
      time: '06:30',
      frequency: 'weekdays',
      category: 'exercise',
      enabled: false,
      days: ['mon', 'tue', 'wed', 'thu', 'fri']
    },
    {
      id: 4,
      title: 'Hora de dormir',
      time: '22:30',
      frequency: 'daily',
      category: 'sleep',
      enabled: true,
      days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    time: '',
    frequency: 'daily',
    category: 'general',
    enabled: true
  });

  const categories = {
    hydration: { label: 'Hidratación', icon: Droplets, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
    nutrition: { label: 'Alimentación', icon: Apple, color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
    exercise: { label: 'Ejercicio', icon: Activity, color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' },
    sleep: { label: 'Descanso', icon: Moon, color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' },
    medication: { label: 'Medicamentos', icon: Pill, color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
    general: { label: 'General', icon: Bell, color: 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300' }
  };

  const frequencies = {
    daily: 'Todos los días',
    weekdays: 'Días laborables',
    weekends: 'Fines de semana',
    every_2_hours: 'Cada 2 horas',
    every_4_hours: 'Cada 4 horas',
    custom: 'Personalizado'
  };

  const toggleReminder = (id: number) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder
    ));
  };

  const deleteReminder = (id: number) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  const createReminder = () => {
    const reminder: Reminder = {
      id: Date.now(),
      ...newReminder,
      days: newReminder.frequency === 'weekdays' 
        ? ['mon', 'tue', 'wed', 'thu', 'fri']
        : newReminder.frequency === 'weekends'
        ? ['sat', 'sun']
        : ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
    };
    
    setReminders(prev => [...prev, reminder]);
    setNewReminder({ title: '', time: '', frequency: 'daily', category: 'general', enabled: true });
    setIsCreating(false);
  };

  const groupedReminders = reminders.reduce((groups, reminder) => {
    const category = reminder.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(reminder);
    return groups;
  }, {} as Record<string, Reminder[]>);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-blue-primary mb-2">Recordatorios</h1>
          <p className="text-muted-foreground">Gestiona tus alertas y notificaciones de salud</p>
        </div>
        
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button className="gaming-button text-white border-0">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Recordatorio
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-blue-primary">Crear Recordatorio</DialogTitle>
              <DialogDescription>
                Configura un nuevo recordatorio para mantener tus hábitos saludables
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  placeholder="Ej: Beber agua"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
                  className="border-border focus:border-blue-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Hora</Label>
                <Input
                  id="time"
                  type="time"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
                  className="border-border focus:border-blue-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select value={newReminder.category} onValueChange={(value) => setNewReminder(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="border-border focus:border-blue-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categories).map(([key, cat]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center space-x-2">
                          <cat.icon className="h-4 w-4" />
                          <span>{cat.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Frecuencia</Label>
                <Select value={newReminder.frequency} onValueChange={(value) => setNewReminder(prev => ({ ...prev, frequency: value }))}>
                  <SelectTrigger className="border-border focus:border-blue-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(frequencies).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancelar
                </Button>
                <Button 
                  onClick={createReminder} 
                  disabled={!newReminder.title || !newReminder.time}
                  className="gaming-button text-white border-0"
                >
                  Crear
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="gaming-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Bell className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recordatorios activos</p>
                <p className="text-blue-primary">{reminders.filter(r => r.enabled).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gaming-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Próximo recordatorio</p>
                <p className="text-blue-primary">08:00</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gaming-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Volume2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Notificaciones hoy</p>
                <p className="text-blue-primary">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reminders by Category */}
      <div className="space-y-6">
        {Object.entries(groupedReminders).map(([categoryKey, categoryReminders]) => {
          const category = categories[categoryKey as keyof typeof categories];
          const CategoryIcon = category.icon;

          return (
            <Card key={categoryKey} className="gaming-card">
              <CardHeader>
                <CardTitle className="text-blue-primary flex items-center space-x-2">
                  <CategoryIcon className="h-5 w-5" />
                  <span>{category.label}</span>
                  <Badge className={category.color}>
                    {categoryReminders.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {categoryReminders.map((reminder) => (
                  <div key={reminder.id} className="flex items-center justify-between p-4 bg-muted/30 dark:bg-muted/10 rounded-lg border border-border/50 transition-all hover:bg-muted/50 dark:hover:bg-muted/20">
                    <div className="flex items-center space-x-4">
                      <Switch
                        checked={reminder.enabled}
                        onCheckedChange={() => toggleReminder(reminder.id)}
                      />
                      <div className="flex-1">
                        <p className={`${reminder.enabled ? 'text-foreground' : 'text-muted-foreground'} transition-colors`}>
                          {reminder.title}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{reminder.time}</span>
                          </span>
                          <span>{frequencies[reminder.frequency as keyof typeof frequencies]}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-primary transition-colors">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteReminder(reminder.id)}
                        className="text-muted-foreground hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Settings */}
      <Card className="gaming-card">
        <CardHeader>
          <CardTitle className="text-blue-primary">Configuración de Notificaciones</CardTitle>
          <CardDescription className="text-muted-foreground">Personaliza cómo quieres recibir tus recordatorios</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground">Sonido de notificación</p>
              <p className="text-sm text-muted-foreground">Reproducir sonido con los recordatorios</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground">Notificaciones push</p>
              <p className="text-sm text-muted-foreground">Recibir notificaciones en el dispositivo</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground">Modo no molestar</p>
              <p className="text-sm text-muted-foreground">Pausar recordatorios durante las horas de sueño</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}