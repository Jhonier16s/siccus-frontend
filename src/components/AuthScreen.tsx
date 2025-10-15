import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, Mail, Lock, Gamepad2 } from 'lucide-react';

interface AuthScreenProps {
  onLogin: () => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <img src={logo} alt="Siccus Logo" className="h-16 w-16 object-contain mx-auto" />
          </div>
          <h1 className="text-blue-primary mb-2">Siccus</h1>
          <p className="text-gray-medium">Tu aventura hacia una vida saludable</p>
        </div>

        <Card className="gaming-card border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-blue-primary text-center">¡Bienvenido!</CardTitle>
            <CardDescription className="text-center">
              Inicia tu viaje hacia una mejor salud
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" className="data-[state=active]:bg-blue-primary data-[state=active]:text-white">
                  Ingresar
                </TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-blue-primary data-[state=active]:text-white">
                  Registrarse
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-medium" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        className="pl-10 border-gray-300 focus:border-blue-primary"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-medium" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 border-gray-300 focus:border-blue-primary"
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full gaming-button text-white border-0"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-medium" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Tu nombre"
                        className="pl-10 border-gray-300 focus:border-blue-primary"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-medium" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="tu@email.com"
                        className="pl-10 border-gray-300 focus:border-blue-primary"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-medium" />
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 border-gray-300 focus:border-blue-primary"
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full gaming-button text-white border-0"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-medium">
                Al continuar, aceptas nuestros términos de servicio y política de privacidad
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}