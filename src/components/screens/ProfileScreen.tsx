import React, { useState } from 'react';
import { Button } from '.././ui/button';
import { Input } from '.././ui/input';
import { Label } from '.././ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '.././ui/card';
import { RadioGroup, RadioGroupItem } from '.././ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '.././ui/tabs';
import { Avatar } from '.././ui/avatar';
import { Badge } from '.././ui/badge';
import { 
  User, 
  Mail, 
  Calendar, 
  Ruler, 
  Weight, 
  Target, 
  Activity, 
  Save,
  Camera,
  Star,
  Trophy
} from 'lucide-react';

export function ProfileScreen() {
  const [profileData, setProfileData] = useState({
    name: 'Usuario',
    email: 'usuario@example.com',
    age: '28',
    gender: 'male',
    height: '175',
    weight: '70',
    activityLevel: 'moderate',
    goal: 'lose_weight',
    targetWeight: '65',
    dailyCalories: '2000'
  });

  const [isEditing, setIsEditing] = useState(false);

  const updateData = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save to your backend/database
    console.log('Saving profile data:', profileData);
  };

  const stats = {
    level: 12,
    experience: 1450,
    achievementsUnlocked: 8,
    totalAchievements: 15,
    streak: 7
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Profile Header */}
      <Card className="gaming-card border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar className="w-24 h-24 bg-blue-primary">
                <div className="w-full h-full flex items-center justify-center text-white text-2xl">
                  😊
                </div>
              </Avatar>
              <button className="absolute -bottom-2 -right-2 bg-blue-primary text-white p-2 rounded-full hover:bg-blue-light transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-blue-primary mb-2">{profileData.name}</h1>
              <p className="text-gray-medium mb-4">{profileData.email}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Badge className="bg-blue-primary text-white">
                  <Star className="h-3 w-3 mr-1" />
                  Nivel {stats.level}
                </Badge>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  <Trophy className="h-3 w-3 mr-1" />
                  {stats.achievementsUnlocked}/{stats.totalAchievements} Logros
                </Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  🔥 {stats.streak} días seguidos
                </Badge>
              </div>
            </div>
            
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className={isEditing ? "gaming-button text-white border-0" : ""}
              variant={isEditing ? "default" : "outline"}
            >
              {isEditing ? 'Cancelar' : 'Editar Perfil'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Configuration */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal" className="data-[state=active]:bg-blue-primary data-[state=active]:text-white">
            Información Personal
          </TabsTrigger>
          <TabsTrigger value="health" className="data-[state=active]:bg-blue-primary data-[state=active]:text-white">
            Datos de Salud
          </TabsTrigger>
          <TabsTrigger value="goals" className="data-[state=active]:bg-blue-primary data-[state=active]:text-white">
            Metas y Objetivos
          </TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="personal">
          <Card className="gaming-card border-0">
            <CardHeader>
              <CardTitle className="text-blue-primary">Información Personal</CardTitle>
              <CardDescription>Gestiona tu información básica de perfil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-medium" />
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => updateData('name', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10 border-gray-300 focus:border-blue-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-medium" />
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => updateData('email', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10 border-gray-300 focus:border-blue-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Edad</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-medium" />
                    <Input
                      id="age"
                      type="number"
                      value={profileData.age}
                      onChange={(e) => updateData('age', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10 border-gray-300 focus:border-blue-primary"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Género</Label>
                  <RadioGroup
                    value={profileData.gender}
                    onValueChange={(value) => updateData('gender', value)}
                    disabled={!isEditing}
                    className="flex space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" className="border-blue-primary data-[state=checked]:bg-blue-primary" />
                      <Label htmlFor="male">Masculino</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" className="border-blue-primary data-[state=checked]:bg-blue-primary" />
                      <Label htmlFor="female">Femenino</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" className="border-blue-primary data-[state=checked]:bg-blue-primary" />
                      <Label htmlFor="other">Otro</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Health Data */}
        <TabsContent value="health">
          <Card className="gaming-card border-0">
            <CardHeader>
              <CardTitle className="text-blue-primary">Datos de Salud</CardTitle>
              <CardDescription>Información física y nivel de actividad</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm)</Label>
                  <div className="relative">
                    <Ruler className="absolute left-3 top-3 h-4 w-4 text-gray-medium" />
                    <Input
                      id="height"
                      type="number"
                      value={profileData.height}
                      onChange={(e) => updateData('height', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10 border-gray-300 focus:border-blue-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Peso actual (kg)</Label>
                  <div className="relative">
                    <Weight className="absolute left-3 top-3 h-4 w-4 text-gray-medium" />
                    <Input
                      id="weight"
                      type="number"
                      value={profileData.weight}
                      onChange={(e) => updateData('weight', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10 border-gray-300 focus:border-blue-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Nivel de actividad física</Label>
                <RadioGroup
                  value={profileData.activityLevel}
                  onValueChange={(value) => updateData('activityLevel', value)}
                  disabled={!isEditing}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200">
                    <RadioGroupItem value="sedentary" id="sedentary" className="border-blue-primary data-[state=checked]:bg-blue-primary" />
                    <div className="flex-1">
                      <Label htmlFor="sedentary" className="cursor-pointer">Sedentario</Label>
                      <p className="text-sm text-gray-medium">Poco o ningún ejercicio</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200">
                    <RadioGroupItem value="light" id="light" className="border-blue-primary data-[state=checked]:bg-blue-primary" />
                    <div className="flex-1">
                      <Label htmlFor="light" className="cursor-pointer">Ligero</Label>
                      <p className="text-sm text-gray-medium">Ejercicio ligero 1-3 días/semana</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200">
                    <RadioGroupItem value="moderate" id="moderate" className="border-blue-primary data-[state=checked]:bg-blue-primary" />
                    <div className="flex-1">
                      <Label htmlFor="moderate" className="cursor-pointer">Moderado</Label>
                      <p className="text-sm text-gray-medium">Ejercicio moderado 3-5 días/semana</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200">
                    <RadioGroupItem value="active" id="active" className="border-blue-primary data-[state=checked]:bg-blue-primary" />
                    <div className="flex-1">
                      <Label htmlFor="active" className="cursor-pointer">Muy Activo</Label>
                      <p className="text-sm text-gray-medium">Ejercicio intenso 6-7 días/semana</p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goals */}
        <TabsContent value="goals">
          <Card className="gaming-card border-0">
            <CardHeader>
              <CardTitle className="text-blue-primary">Metas y Objetivos</CardTitle>
              <CardDescription>Define tus objetivos de salud y fitness</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Objetivo principal</Label>
                <RadioGroup
                  value={profileData.goal}
                  onValueChange={(value) => updateData('goal', value)}
                  disabled={!isEditing}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200">
                    <RadioGroupItem value="lose_weight" id="lose_weight" className="border-blue-primary data-[state=checked]:bg-blue-primary" />
                    <div className="flex-1">
                      <Label htmlFor="lose_weight" className="cursor-pointer">Perder Peso</Label>
                      <p className="text-sm text-gray-medium">Reducir grasa corporal de forma saludable</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200">
                    <RadioGroupItem value="maintain_weight" id="maintain_weight" className="border-blue-primary data-[state=checked]:bg-blue-primary" />
                    <div className="flex-1">
                      <Label htmlFor="maintain_weight" className="cursor-pointer">Mantener Peso</Label>
                      <p className="text-sm text-gray-medium">Conservar un peso saludable</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200">
                    <RadioGroupItem value="gain_muscle" id="gain_muscle" className="border-blue-primary data-[state=checked]:bg-blue-primary" />
                    <div className="flex-1">
                      <Label htmlFor="gain_muscle" className="cursor-pointer">Ganar Músculo</Label>
                      <p className="text-sm text-gray-medium">Aumentar masa muscular</p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="targetWeight">Peso objetivo (kg)</Label>
                  <div className="relative">
                    <Target className="absolute left-3 top-3 h-4 w-4 text-gray-medium" />
                    <Input
                      id="targetWeight"
                      type="number"
                      value={profileData.targetWeight}
                      onChange={(e) => updateData('targetWeight', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10 border-gray-300 focus:border-blue-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dailyCalories">Calorías diarias objetivo</Label>
                  <div className="relative">
                    <Activity className="absolute left-3 top-3 h-4 w-4 text-gray-medium" />
                    <Input
                      id="dailyCalories"
                      type="number"
                      value={profileData.dailyCalories}
                      onChange={(e) => updateData('dailyCalories', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10 border-gray-300 focus:border-blue-primary"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      {isEditing && (
        <div className="flex justify-end">
          <Button onClick={handleSave} className="gaming-button text-white border-0">
            <Save className="h-4 w-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>
      )}
    </div>
  );
}