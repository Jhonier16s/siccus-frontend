import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useTheme } from './ThemeProvider';
import { 
  Moon, 
  Sun, 
  Monitor,
  Palette,
  Bell,
  Shield,
  Database,
  Download,
  Upload,
  Trash2,
  Info,
  HelpCircle,
  Mail,
  Globe,
  Volume2,
  Vibrate,
  Clock
} from 'lucide-react';

export function SettingsScreen() {
  const { theme, toggleTheme, setTheme } = useTheme();
  const [settings, setSettings] = useState({
    notifications: true,
    soundEffects: true,
    hapticFeedback: true,
    autoSync: true,
    dataSharing: false,
    weeklyReports: true,
    language: 'es',
    timeFormat: '24h'
  });

  const updateSetting = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleExportData = () => {
    // Mock export functionality
    console.log('Exporting user data...');
  };

  const handleImportData = () => {
    // Mock import functionality
    console.log('Importing user data...');
  };

  const handleDeleteAccount = () => {
    // Mock delete account functionality
    console.log('Delete account requested...');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-blue-primary mb-2">Configuración</h1>
  <p className="text-gray-medium">Personaliza tu experiencia en Siccus</p>
      </div>

      {/* Appearance Settings */}
      <Card className="gaming-card border-0">
        <CardHeader>
          <CardTitle className="text-blue-primary flex items-center space-x-2">
            <Palette className="h-5 w-5" />
            <span>Apariencia</span>
          </CardTitle>
          <CardDescription>Personaliza el aspecto visual de la aplicación</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-blue-primary mb-3 block">Tema de la aplicación</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme === 'light'
                      ? 'border-blue-primary bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-primary'
                  }`}
                >
                  <Sun className="h-6 w-6 mx-auto mb-2 text-blue-primary" />
                  <p className="text-sm text-blue-primary">Claro</p>
                </button>
                
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme === 'dark'
                      ? 'border-blue-primary bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-primary'
                  }`}
                >
                  <Moon className="h-6 w-6 mx-auto mb-2 text-blue-primary" />
                  <p className="text-sm text-blue-primary">Oscuro</p>
                </button>
                
                <button
                  onClick={() => {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    setTheme(prefersDark ? 'dark' : 'light');
                  }}
                  className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-primary transition-all"
                >
                  <Monitor className="h-6 w-6 mx-auto mb-2 text-blue-primary" />
                  <p className="text-sm text-blue-primary">Sistema</p>
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="gaming-card border-0">
        <CardHeader>
          <CardTitle className="text-blue-primary flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notificaciones</span>
          </CardTitle>
          <CardDescription>Controla cómo y cuándo recibes notificaciones</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-blue-primary" />
              <div>
                <p className="text-blue-primary">Notificaciones push</p>
                <p className="text-sm text-gray-medium">Recibe alertas en tu dispositivo</p>
              </div>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => updateSetting('notifications', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Volume2 className="h-5 w-5 text-blue-primary" />
              <div>
                <p className="text-blue-primary">Efectos de sonido</p>
                <p className="text-sm text-gray-medium">Sonidos en la interfaz</p>
              </div>
            </div>
            <Switch
              checked={settings.soundEffects}
              onCheckedChange={(checked) => updateSetting('soundEffects', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Vibrate className="h-5 w-5 text-blue-primary" />
              <div>
                <p className="text-blue-primary">Vibración</p>
                <p className="text-sm text-gray-medium">Feedback háptico</p>
              </div>
            </div>
            <Switch
              checked={settings.hapticFeedback}
              onCheckedChange={(checked) => updateSetting('hapticFeedback', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-blue-primary" />
              <div>
                <p className="text-blue-primary">Reportes semanales</p>
                <p className="text-sm text-gray-medium">Resumen por correo electrónico</p>
              </div>
            </div>
            <Switch
              checked={settings.weeklyReports}
              onCheckedChange={(checked) => updateSetting('weeklyReports', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Data */}
      <Card className="gaming-card border-0">
        <CardHeader>
          <CardTitle className="text-blue-primary flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Privacidad y Datos</span>
          </CardTitle>
          <CardDescription>Gestiona tu información personal y privacidad</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Database className="h-5 w-5 text-blue-primary" />
              <div>
                <p className="text-blue-primary">Sincronización automática</p>
                <p className="text-sm text-gray-medium">Guardar datos en la nube</p>
              </div>
            </div>
            <Switch
              checked={settings.autoSync}
              onCheckedChange={(checked) => updateSetting('autoSync', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Info className="h-5 w-5 text-blue-primary" />
              <div>
                <p className="text-blue-primary">Análisis anónimo</p>
                <p className="text-sm text-gray-medium">Ayudar a mejorar la app</p>
              </div>
            </div>
            <Switch
              checked={settings.dataSharing}
              onCheckedChange={(checked) => updateSetting('dataSharing', checked)}
            />
          </div>

          <Separator />

          <div className="space-y-3">
            <p className="text-blue-primary">Gestión de datos</p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={handleExportData}
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Exportar datos</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={handleImportData}
                className="flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Importar datos</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card className="gaming-card border-0">
        <CardHeader>
          <CardTitle className="text-blue-primary flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Idioma y Región</span>
          </CardTitle>
          <CardDescription>Configura el idioma y formato regional</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-blue-primary">Idioma</label>
              <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-blue-primary">Formato de hora</label>
              <Select value={settings.timeFormat} onValueChange={(value) => updateSetting('timeFormat', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12h">12 horas (AM/PM)</SelectItem>
                  <SelectItem value="24h">24 horas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About & Support */}
      <Card className="gaming-card border-0">
        <CardHeader>
          <CardTitle className="text-blue-primary flex items-center space-x-2">
            <HelpCircle className="h-5 w-5" />
            <span>Soporte y Acerca de</span>
          </CardTitle>
          <CardDescription>Información de la aplicación y ayuda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-blue-primary mb-1">Versión de la aplicación</p>
              <Badge variant="secondary">v1.0.0</Badge>
            </div>
            
            <div>
              <p className="text-blue-primary mb-1">Última actualización</p>
              <p className="text-sm text-gray-medium">27 de Agosto, 2025</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <p className="text-blue-primary">Ayuda y soporte</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="flex items-center space-x-2">
                <HelpCircle className="h-4 w-4" />
                <span>Centro de ayuda</span>
              </Button>
              
              <Button variant="outline" className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Contactar soporte</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="gaming-card border-0 border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="text-red-600 flex items-center space-x-2">
            <Trash2 className="h-5 w-5" />
            <span>Zona de peligro</span>
          </CardTitle>
          <CardDescription>Acciones irreversibles de la cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <p className="text-red-700 dark:text-red-300 mb-4">
              Esta acción eliminará permanentemente tu cuenta y todos los datos asociados. 
              Esta acción no se puede deshacer.
            </p>
            <Button 
              variant="destructive" 
              onClick={handleDeleteAccount}
              className="flex items-center space-x-2"
            >
              <Trash2 className="h-4 w-4" />
              <span>Eliminar cuenta</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}