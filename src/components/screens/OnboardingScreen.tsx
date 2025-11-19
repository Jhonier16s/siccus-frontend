import React, { useState } from "react";
import { Button } from ".././ui/button";
import { Input } from ".././ui/input";
import { Label } from ".././ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from ".././ui/card";
import { RadioGroup, RadioGroupItem } from ".././ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from ".././ui/select";
import { Progress } from ".././ui/progress";
import {
  ChevronRight,
  ChevronLeft,
  Target,
  Activity,
  Calendar,
  Ruler,
  Weight,
  Droplets,
} from "lucide-react";
import { createProfileHealthUser } from "@/services/profileHealtUser";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner@2.0.3";
import RiseLoader from "react-spinners/RiseLoader";
import { AvatarWithLoader } from "../AvatarWithLoader";
import { getRpmImageUrl } from "@/utils/avatar";
interface OnboardingScreenProps {
  onComplete: () => void;
}

interface OnboardingData {
  age: number;
  gender: string;
  height: string;
  weight: number;
  activityLevel: string;
  goal: string;
  waterIntake: string;
  overweightHistory: string;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    age: 0,
    gender: "",
    height: "",
    weight: 0,
    activityLevel: "",
    goal: "",
    waterIntake: "",
    overweightHistory: "",
  });

  const totalSteps = 5;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const authUser = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const userId = Number((authUser as any)?.id ?? (authUser as any)?.id_usuario);

  const handleSaveData = async () => {
    let activityLevelMap: { [key: string]: number } = {
      sedentary: 1,
      light: 2,
      moderate: 3,
      active: 4,
    };
    
    // Mapear el rango de agua a valores 1-3 para el modelo CH20_A
    const waterIntakeMap: { [key: string]: number } = {
      "1-2": 1,  // Muy poca agua
      "3-5": 2,  // Moderada
      "6+": 3,   // Adecuada
    };
    const waterIntakeValue = waterIntakeMap[data.waterIntake] || 2;
    
    const response = await createProfileHealthUser({
      idUsuario: userId,
      edad: data.age,
      peso: data.weight,
      altura: Number(data.height),
      objetivo: data.goal,
      genero: data.gender,
      imc: 0,
      antecedenteSobrepeso: data.overweightHistory === "yes" ? 1 : 0,
      aguaCh20A: waterIntakeValue,
      nivelActividad: activityLevelMap[data.activityLevel] || 1,
    });
    return response;
  };

  const handleNext = async () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsProcessing(true);
      try {
        const [response] = await Promise.all([
          handleSaveData(),
          new Promise((resolve) => setTimeout(resolve, 3000)),
        ]);
        if (response) {
          // Guardar el perfil de salud en el store
          if (response.perfilModelo) {
            const healthProfile = {
              cluster: response.perfilModelo.cluster,
              perfilModelo: response.perfilModelo,
            };
            setUser({
              ...authUser,
              healthProfile,
              perfilSalud: healthProfile,
            });
          }
          onComplete();
        } else {
          toast.error(
            "Error al guardar la información. Por favor, intenta de nuevo."
          );
          setIsProcessing(false);
        }
      } catch (error) {
        console.error("Error durante el onboarding:", error);
        toast.error("Hubo un problema al finalizar. Intenta nuevamente.");
        setIsProcessing(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateData = (field: keyof OnboardingData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return data.age && data.gender;
      case 1:
        return data.height && data.weight;
      case 2:
        return data.waterIntake && data.overweightHistory;
      case 3:
        return data.activityLevel;
      case 4:
        return data.goal;
      default:
        return false;
    }
  };

  const steps = [
    {
      title: "Información Personal",
      description: "Cuéntanos sobre ti",
      icon: <Calendar className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="age">¿Cuántos años tienes?</Label>
            <Input
              id="age"
              type="number"
              placeholder="25"
              value={data.age}
              onChange={(e) => updateData("age", e.target.value)}
              className="border-gray-300 focus:border-blue-primary"
            />
          </div>
          <div className="space-y-3">
            <Label>Género</Label>
            <RadioGroup
              value={data.gender}
              onValueChange={(value) => updateData("gender", value)}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="male"
                  id="male"
                  className="border-blue-primary data-[state=checked]:bg-blue-primary"
                />
                <Label htmlFor="male">Masculino</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="female"
                  id="female"
                  className="border-blue-primary data-[state=checked]:bg-blue-primary"
                />
                <Label htmlFor="female">Femenino</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="other"
                  id="other"
                  className="border-blue-primary data-[state=checked]:bg-blue-primary"
                />
                <Label htmlFor="other">Otro</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      ),
    },
    {
      title: "Medidas Corporales",
      description: "Datos físicos básicos",
      icon: <Ruler className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="height">Altura (cm)</Label>
            <div className="relative">
              <Ruler className="absolute left-3 top-3 h-4 w-4 text-gray-medium" />
              <Input
                id="height"
                type="number"
                placeholder="170"
                value={data.height}
                onChange={(e) => updateData("height", e.target.value)}
                className="pl-10 border-gray-300 focus:border-blue-primary"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Peso (kg)</Label>
            <div className="relative">
              <Weight className="absolute left-3 top-3 h-4 w-4 text-gray-medium" />
              <Input
                id="weight"
                type="number"
                placeholder="70"
                value={data.weight}
                onChange={(e) => updateData("weight", e.target.value)}
                className="pl-10 border-gray-300 focus:border-blue-primary"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Acerca de ti",
      description: "Hábitos de hidratación y antecedentes",
      icon: <Droplets className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="water-intake">
              ¿Cuánta agua tomas al día?
            </Label>
            <Select
              value={data.waterIntake}
              onValueChange={(value) => updateData("waterIntake", value)}
            >
              <SelectTrigger className="border-gray-300 focus:border-blue-primary">
                <SelectValue placeholder="Selecciona tu consumo de agua" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-2">
                  <div className="flex flex-col">
                    <span className="font-medium">Muy poca agua</span>
                    <span className="text-xs text-muted-foreground">1-2 vasos al día</span>
                  </div>
                </SelectItem>
                <SelectItem value="3-5">
                  <div className="flex flex-col">
                    <span className="font-medium">Moderada</span>
                    <span className="text-xs text-muted-foreground">3-5 vasos al día</span>
                  </div>
                </SelectItem>
                <SelectItem value="6+">
                  <div className="flex flex-col">
                    <span className="font-medium">Adecuada</span>
                    <span className="text-xs text-muted-foreground">6 o más vasos al día</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label>¿Has tenido antecedentes de sobrepeso?</Label>
            <RadioGroup
              value={data.overweightHistory}
              onValueChange={(value) => updateData("overweightHistory", value)}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="yes"
                  id="overweight_yes"
                  className="border-blue-primary data-[state=checked]:bg-blue-primary"
                />
                <Label htmlFor="overweight_yes">Sí</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="no"
                  id="overweight_no"
                  className="border-blue-primary data-[state=checked]:bg-blue-primary"
                />
                <Label htmlFor="overweight_no">No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      ),
    },
    {
      title: "Nivel de Actividad",
      description: "¿Qué tan activo eres?",
      icon: <Activity className="h-6 w-6" />,
      content: (
        <div className="space-y-4">
          <RadioGroup
            value={data.activityLevel}
            onValueChange={(value) => updateData("activityLevel", value)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-blue-primary dark:hover:border-blue-500 transition-colors">
              <RadioGroupItem
                value="sedentary"
                id="sedentary"
                className="border-blue-primary data-[state=checked]:bg-blue-primary"
              />
              <div className="flex-1">
                <Label htmlFor="sedentary" className="cursor-pointer">
                  Sedentario
                </Label>
                <p className="text-sm text-muted-foreground">
                  Poco o ningún ejercicio
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-blue-primary dark:hover:border-blue-500 transition-colors">
              <RadioGroupItem
                value="light"
                id="light"
                className="border-blue-primary data-[state=checked]:bg-blue-primary"
              />
              <div className="flex-1">
                <Label htmlFor="light" className="cursor-pointer">
                  Ligero
                </Label>
                <p className="text-sm text-muted-foreground">
                  Ejercicio ligero 1-3 días/semana
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-blue-primary dark:hover:border-blue-500 transition-colors">
              <RadioGroupItem
                value="moderate"
                id="moderate"
                className="border-blue-primary data-[state=checked]:bg-blue-primary"
              />
              <div className="flex-1">
                <Label htmlFor="moderate" className="cursor-pointer">
                  Moderado
                </Label>
                <p className="text-sm text-muted-foreground">
                  Ejercicio moderado 3-5 días/semana
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-blue-primary dark:hover:border-blue-500 transition-colors">
              <RadioGroupItem
                value="active"
                id="active"
                className="border-blue-primary data-[state=checked]:bg-blue-primary"
              />
              <div className="flex-1">
                <Label htmlFor="active" className="cursor-pointer">
                  Muy Activo
                </Label>
                <p className="text-sm text-muted-foreground">
                  Ejercicio intenso 6-7 días/semana
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
      ),
    },
    {
      title: "Tu Objetivo",
      description: "¿Cuál es tu meta principal?",
      icon: <Target className="h-6 w-6" />,
      content: (
        <div className="space-y-4">
          <RadioGroup
            value={data.goal}
            onValueChange={(value) => updateData("goal", value)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-blue-primary dark:hover:border-blue-500 transition-colors">
              <RadioGroupItem
                value="lose_weight"
                id="lose_weight"
                className="border-blue-primary data-[state=checked]:bg-blue-primary"
              />
              <div className="flex-1">
                <Label htmlFor="lose_weight" className="cursor-pointer">
                  Perder Peso
                </Label>
                <p className="text-sm text-muted-foreground">
                  Reducir grasa corporal de forma saludable
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-blue-primary dark:hover:border-blue-500 transition-colors">
              <RadioGroupItem
                value="maintain_weight"
                id="maintain_weight"
                className="border-blue-primary data-[state=checked]:bg-blue-primary"
              />
              <div className="flex-1">
                <Label htmlFor="maintain_weight" className="cursor-pointer">
                  Mantener Peso
                </Label>
                <p className="text-sm text-muted-foreground">
                  Conservar un peso saludable
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-blue-primary dark:hover:border-blue-500 transition-colors">
              <RadioGroupItem
                value="gain_muscle"
                id="gain_muscle"
                className="border-blue-primary data-[state=checked]:bg-blue-primary"
              />
              <div className="flex-1">
                <Label htmlFor="gain_muscle" className="cursor-pointer">
                  Ganar Músculo
                </Label>
                <p className="text-sm text-muted-foreground">
                  Aumentar masa muscular
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-blue-primary dark:hover:border-blue-500 transition-colors">
              <RadioGroupItem
                value="improve_health"
                id="improve_health"
                className="border-blue-primary data-[state=checked]:bg-blue-primary"
              />
              <div className="flex-1">
                <Label htmlFor="improve_health" className="cursor-pointer">
                  Mejorar Salud
                </Label>
                <p className="text-sm text-muted-foreground">
                  Adoptar hábitos más saludables
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
      ),
    },
  ];

  const currentStepData = steps[currentStep];
  const storedAvatar = (authUser?.avatarUrl as string) || "";
  const isUserLoading = useAuthStore((s) => s.isUserLoading);
  const avatarImageUrl = getRpmImageUrl(storedAvatar);

  if (isProcessing) {
    return (
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="w-32 h-32 ">
          <AvatarWithLoader
            hasImg
            imageUrl={avatarImageUrl || undefined}
            loading={isUserLoading}
            className="w-32 h-32"
          />
        </div>
        <div className="relative z-10 text-center space-y-6 px-6 -ml-6"
        style={{
          marginLeft: '-200px !important',
        }}>
          <div className="mx-3 mb-3 -mt-12">
            <RiseLoader
              color="#ffffff"
              loading={true}
              size={30}
              speedMultiplier={1.2}
              margin={"30px 0px"}
            />
          </div>
          <div>
            <p className="text-blue-primary text-xl font-semibold ">
              Estamos utilizando tus datos
            </p>
            <p className="text-muted-foreground mt-2">
              para recomendarte lo mejor. Espera unos segundos…
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Este proceso tarda aproximadamente 3 segundos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Subtle background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large soft gradient circle top-right */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/30 to-transparent dark:from-blue-500/10 dark:to-transparent rounded-full blur-3xl" />

        {/* Medium gradient circle bottom-left */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-slate-100/40 to-transparent dark:from-slate-800/30 dark:to-transparent rounded-full blur-3xl" />

        {/* Small accent circle top-left */}
        <div className="absolute top-32 left-10 w-48 h-48 bg-blue-50/50 dark:bg-blue-500/5 rounded-full blur-2xl" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Minimal geometric accents */}
        <div className="absolute top-20 right-20 w-20 h-20 border border-slate-200/60 dark:border-slate-700/60 rotate-45 rounded-lg" />
        <div className="absolute bottom-32 right-32 w-16 h-16 border border-blue-200/40 dark:border-blue-500/30 rotate-12 rounded-lg" />
        <div className="absolute top-1/2 left-20 w-12 h-12 border border-slate-200/50 dark:border-slate-700/50 rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-300/40 dark:bg-blue-500/40 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-slate-300/60 dark:bg-slate-600/60 rounded-full" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Progress Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1" />
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-primary rounded-xl text-white dark:text-background">
              {currentStepData.icon}
            </div>
          </div>
          <h1 className="text-blue-primary mb-2">Configuración Inicial</h1>
          <p className="text-muted-foreground mb-6">
            Paso {currentStep + 1} de {totalSteps}
          </p>
          <Progress
            value={progress}
            className="h-2 bg-gray-200 dark:bg-slate-700"
          />
        </div>

        <Card className="gaming-card border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-blue-primary">
              {currentStepData.title}
            </CardTitle>
            <CardDescription>{currentStepData.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStepData.content}

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="border-gray-300 text-gray-600 hover:border-blue-primary hover:text-blue-primary"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Anterior
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="gaming-button text-white border-0"
              >
                {currentStep === totalSteps - 1 ? "Finalizar" : "Siguiente"}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Skip information */}
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            Puedes completar esta información más tarde en tu perfil
          </p>
        </div>
      </div>
    </div>
  );
}
