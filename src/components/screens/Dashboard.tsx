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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from ".././ui/dialog";
import { AvatarWithLoader } from ".././AvatarWithLoader";
import { useAuthStore } from "../../store/authStore";
import { getRpmImageUrl } from "../../utils/avatar";
import {
  Trophy,
  Award,
  Target,
  Heart,
  Zap,
  Share2,
  Sparkles,
  Flame,
  Star,
  Clock3,
  CalendarDays,
  PlayCircle,
  CirclePause,
} from "lucide-react";
import { useProgressStore } from "@/store/progressStore";
import { Progress } from "../ui/progress";

interface DashboardProps {
  onNavigate: (view: string) => void;
}

type AiProfileKey = 0 | 1 | 2 | 3 | 4;

const ROUTINE_ICON_MAP = {
  spark: Sparkles,
  flame: Flame,
  heart: Heart,
  zap: Zap,
  star: Star,
  target: Target,
  trophy: Trophy,
  award: Award,
};

type RoutineIcon = keyof typeof ROUTINE_ICON_MAP;

type AiRoutine = {
  id: string;
  title: string;
  focus: string;
  details: string;
  duration: string;
  frequency: string;
  intensity: "Baja" | "Media" | "Alta";
  equipment?: string;
  icon: RoutineIcon;
  image?: string;
  color: string;
};

type AiRoutineProfile = {
  label: string;
  description: string;
  recommendation: string;
  routines: AiRoutine[];
};

const AI_ROUTINE_LIBRARY: Record<AiProfileKey, AiRoutineProfile> = {
  0: {
    label: "Saludables / activos",
    description: "Perfil con hábitos estables y buena actividad física.",
    recommendation:
      "Mantén la rutina y monitorea cambios de peso trimestralmente.",
    routines: [
      {
        id: "0-1",
        title: "Circuito full-body ligero",
        focus: "Mantenimiento metabólico",
        details:
          "3 rondas con planchas, sentadillas y remo con banda para conservar tono sin fatiga.",
        duration: "25 min",
        frequency: "3-4x semana",
        intensity: "Media",
        equipment: "Bandas o peso corporal",
        icon: "trophy",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=250&fit=crop",
        color: "orange",
      },
      {
        id: "0-2",
        title: "HIIT expres",
        focus: "Zona aeróbica alta",
        details:
          "Intervalos 40/20 con saltos suaves, mountain climbers y burpees controlados.",
        duration: "18 min",
        frequency: "2x semana",
        intensity: "Alta",
        equipment: "Sin equipamiento",
        icon: "flame",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=250&fit=crop",
        color: "sky",
      },
      {
        id: "0-3",
        title: "Yoga de recuperación",
        focus: "Movilidad + respiración",
        details:
          "Flujo guiado para descargar articulaciones y mejorar la variabilidad cardiaca.",
        duration: "30 min",
        frequency: "1-2x semana",
        intensity: "Baja",
        icon: "spark",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop",
        color: "purple",
      },
    ],
  },
  1: {
    label: "Riesgo genético + poca actividad",
    description: "Personas con antecedente familiar y baja frecuencia de ejercicio.",
    recommendation:
      "Refuerza la actividad aeróbica 3-4 días/semana y revisa antecedentes clínicos.",
    routines: [
      {
        id: "1-1",
        title: "Caminata consciente",
        focus: "Base aeróbica",
        details:
          "Bloques de 10 min con control de respiración para elevar pulsaciones sin riesgo.",
        duration: "30 min",
        frequency: "4x semana",
        intensity: "Baja",
        icon: "star",
        image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=250&fit=crop",
        color: "emerald",
      },
      {
        id: "1-2",
        title: "Fuerza guiada",
        focus: "Protección articular",
        details:
          "Circuito con silla/bandas enfocando tren inferior y core para mejorar estabilidad.",
        duration: "20 min",
        frequency: "3x semana",
        intensity: "Media",
        equipment: "Bandas livianas",
        icon: "target",
        image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&h=250&fit=crop",
        color: "red",
      },
      {
        id: "1-3",
        title: "Respiración + movilidad",
        focus: "Regulación del estrés",
        details:
          "Secuencia de cat-cow, puente y estiramientos torácicos alineados con respiración diafragmática.",
        duration: "15 min",
        frequency: "Diario",
        intensity: "Baja",
        icon: "heart",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=250&fit=crop",
        color: "pink",
      },
    ],
  },
  2: {
    label: "Riesgo moderado, baja actividad",
    description:
      "Consumo de agua aceptable pero poca actividad física sostenida.",
    recommendation:
      "Planifica caminatas diarias de 30 min y ajusta porciones.",
    routines: [
      {
        id: "2-1",
        title: "Caminata progresiva",
        focus: "Adherencia diaria",
        details:
          "Bloques de 5 min + 1 min de pausa activa hasta llegar a 30 min totales.",
        duration: "30 min",
        frequency: "Diario",
        intensity: "Baja",
        icon: "star",
        image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=400&h=250&fit=crop",
        color: "blue",
      },
      {
        id: "2-2",
        title: "Fuerza básica",
        focus: "Tonificación inicial",
        details:
          "3 series de sentadillas asistidas, remo con banda y press de pared.",
        duration: "20 min",
        frequency: "3x semana",
        intensity: "Media",
        equipment: "Banda ligera",
        icon: "trophy",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=250&fit=crop",
        color: "amber",
      },
      {
        id: "2-3",
        title: "Core + hidratación",
        focus: "Estabilidad postural",
        details:
          "Plancha apoyada, dead bug y bird-dog sincronizados con recordatorio de hidratación.",
        duration: "15 min",
        frequency: "2x semana",
        intensity: "Media",
        icon: "zap",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=250&fit=crop",
        color: "indigo",
      },
    ],
  },
  3: {
    label: "Casos más severos",
    description:
      "Peso corporal elevado y combinación de hábitos desfavorables.",
    recommendation:
      "Consulta médica/nutricional prioritaria y seguimiento mensual del IMC.",
    routines: [
      {
        id: "3-1",
        title: "Marcha asistida",
        focus: "Baja carga articular",
        details:
          "Series de 3 min caminando + 2 min respirando sentado para controlar pulsaciones.",
        duration: "25 min",
        frequency: "5x semana",
        intensity: "Baja",
        icon: "star",
        image: "https://images.unsplash.com/photo-1445384763658-0400939829cd?w=400&h=250&fit=crop",
        color: "teal",
      },
      {
        id: "3-2",
        title: "Movilidad en silla",
        focus: "Reactivar tejido",
        details:
          "Rutina sentada con elevaciones de piernas, empujes isométricos y rotaciones suaves.",
        duration: "15 min",
        frequency: "Diario",
        intensity: "Baja",
        equipment: "Silla estable",
        icon: "heart",
        image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=250&fit=crop",
        color: "rose",
      },
      {
        id: "3-3",
        title: "Fuerza asistida",
        focus: "Control motor",
        details:
          "Apoyos en pared, levantarse de la silla y remo con banda larga para ganar fuerza básica.",
        duration: "18 min",
        frequency: "3x semana",
        intensity: "Baja",
        icon: "target",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=250&fit=crop",
        color: "violet",
      },
    ],
  },
  4: {
    label: "Sedentarios + malos hábitos",
    description: "Baja actividad física y consumo de agua limitado.",
    recommendation:
      "Incorpora rutinas ligeras (FAF ≥ 2) y metas de hidratación (≥ 5 vasos/día).",
    routines: [
      {
        id: "4-1",
        title: "Activación matutina",
        focus: "Romper el sedentarismo",
        details:
          "Secuencia de movilidad articular completa + respiración cuadrada para iniciar el día.",
        duration: "12 min",
        frequency: "Diario",
        intensity: "Baja",
        icon: "spark",
        image: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=400&h=250&fit=crop",
        color: "lime",
      },
      {
        id: "4-2",
        title: "Mini circuito FAF",
        focus: "Gasto calórico ligero",
        details:
          "Bloques de 45 seg con jumping jacks adaptados, step touch y sentadillas al aire.",
        duration: "20 min",
        frequency: "3x semana",
        intensity: "Media",
        equipment: "Peso corporal",
        icon: "zap",
        image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=400&h=250&fit=crop",
        color: "cyan",
      },
      {
        id: "4-3",
        title: "Caminar + hidratar",
        focus: "Hábitos duales",
        details:
          "Recordatorios de 5 vasos de agua repartidos en pausas de caminata suave.",
        duration: "Todo el día",
        frequency: "Objetivo diario",
        intensity: "Baja",
        icon: "heart",
        image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&h=250&fit=crop",
        color: "fuchsia",
      },
    ],
  },
};

export function Dashboard({ onNavigate }: DashboardProps) {
  const authUser = useAuthStore((s) => s.user);
  const storedAvatar = (authUser?.avatarUrl as string) || "";
  const avatarImageUrl = getRpmImageUrl(storedAvatar);
  const isUserLoading = useAuthStore((s) => s.isUserLoading);
  const displayName =
    (authUser?.nombre as string) || (authUser?.name as string) || "Siccus";
  const [isShareOpen, setIsShareOpen] = useState(false);
  const progress = useProgressStore((s) => s.summary);
  const level = progress.nivel || 1;
  const xpTotal = progress.xpTotal || 0;
  const xpInLevel = Math.max(0, progress.xpIntoLevel ?? 0);
  const xpPerLevel = Math.max(1, progress.xpPerLevel ?? 100);
  const xpPercent = Math.min(100, Math.max(0, progress.progressPct ?? 0));
  const xpToNext = Math.max(
    0,
    progress.xpToNext ?? Math.max(0, xpPerLevel - xpInLevel)
  );
  const energy = Math.min(100, Math.max(0, progress.energiaTotal || 0));
  const health = Math.min(100, Math.max(0, progress.saludTotal || 0));
  
  // Obtener el cluster del perfil de salud
  const healthProfile = authUser?.healthProfile ?? authUser?.perfilSalud;
  const clusterFromProfile = healthProfile?.cluster;
  
  // Priorizar cluster del perfil de salud, luego aiProfileType, luego riskProfile
  const rawAiProfileType = clusterFromProfile ?? authUser?.aiProfileType ?? authUser?.riskProfile;
  const parsedAiProfile =
    typeof rawAiProfileType === "string"
      ? Number.parseInt(rawAiProfileType, 10)
      : rawAiProfileType;
  // Se utiliza el perfil entregado por la IA (0-4). Mientras no exista, asumimos el más saludable.
  const aiProfileKey: AiProfileKey =
    typeof parsedAiProfile === "number" &&
    Number.isInteger(parsedAiProfile) &&
    parsedAiProfile >= 0 &&
    parsedAiProfile <= 4
      ? (parsedAiProfile as AiProfileKey)
      : 0;
  const aiProfile = AI_ROUTINE_LIBRARY[aiProfileKey];

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

  const [selectedRoutine, setSelectedRoutine] = useState<AiRoutine | null>(null);
  const [simulatedTime, setSimulatedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Efecto para el cronómetro simulado
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && selectedRoutine) {
      interval = setInterval(() => {
        setSimulatedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, selectedRoutine]);

  // Resetear cronómetro cuando se cierra el modal
  React.useEffect(() => {
    if (!selectedRoutine) {
      setSimulatedTime(0);
      setIsTimerRunning(false);
    }
  }, [selectedRoutine]);

  // Función para formatear el tiempo
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Avatar Column */}
        <div className="lg:col-span-1">

            <button
              type="button"
              title="Personalizar avatar"
              onClick={() => onNavigate("avatar-creator")}
              className="group relative flex items-center justify-center mx-auto w-40 h-40 rounded-xl overflow-hidden border border-border transition-all duration-200 cursor-pointer hover:border-blue-primary hover:shadow-[0_0_0_3px_rgba(59,130,246,0.45)] focus:outline-none focus:ring-2 focus:ring-blue-primary/60"
            >
              <AvatarWithLoader
                hasImg
                imageUrl={avatarImageUrl || undefined}
                loading={isUserLoading}
                className="w-full h-full"
              />
            </button>

          {/* Player Stats (gamified) */}
          <Card className="gaming-card mt-6">
            <CardHeader className="pb-3 flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-blue-primary">
                  Estado del Héroe
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Tu progreso en tiempo real
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-border hover:bg-blue-primary/10"
                onClick={() => setIsShareOpen(true)}
                title="Compartir"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Nivel */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-foreground">Nivel</span>
                </div>
                <Badge className="bg-yellow-500 text-white border-0">
                  {level}
                </Badge>
              </div>

              {/* XP */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-blue-primary" />
                    <span className="text-sm text-foreground">Experiencia</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {xpInLevel}/{xpPerLevel} XP
                  </span>
                </div>
                <Progress value={xpPercent} className="h-2" />
              </div>

              {/* Energía */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-indigo-500" />
                    <span className="text-sm text-foreground">Energía</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {energy}%
                  </span>
                </div>
                <Progress value={energy} className="h-2" />
              </div>

              {/* Salud */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-foreground">Salud</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {health}%
                  </span>
                </div>
                <Progress value={health} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Share Modal Gamificado */}
          <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
            <DialogContent className="!w-auto !max-w-none !border-0 !bg-transparent !shadow-none !p-0 flex items-center justify-center [&>button]:text-white [&>button]:hover:bg-white/10 [&>button]:z-50">
              {/* Card principal con diseño gamificado */}
              <div
                className="relative w-[420px] sm:w-[460px] rounded-3xl overflow-visible shadow-[0_20px_60px_rgba(0,0,0,0.65)]
                 bg-gradient-to-b from-[#0d1628] via-[#0a1220] to-[#070d18]"
              >
                {/* Borde con efecto neón */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-500/20 p-[2px]">
                  <div className="w-full h-full rounded-3xl bg-gradient-to-b from-[#0d1628] via-[#0a1220] to-[#070d18]" />
                </div>

                {/* Efectos de luz flotantes */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden"
                  style={{
                    background: `
                      radial-gradient(circle 280px at 50% 0%, rgba(56,189,248,0.15), transparent),
                      radial-gradient(circle 230px at 100% 50%, rgba(168,85,247,0.12), transparent),
                      radial-gradient(circle 200px at 0% 100%, rgba(236,72,153,0.10), transparent)
                    `,
                  }}
                />

                {/* Decoración superior - Badges flotantes con iconos */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-xl flex items-center justify-center animate-bounce">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 shadow-lg flex items-center justify-center animate-pulse">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-400 to-red-500 shadow-lg flex items-center justify-center animate-pulse delay-75">
                    <Heart className="w-6 h-6 text-white fill-white" />
                  </div>
                </div>

                {/* Contenido principal */}
                <div className="relative px-6 py-8 pt-14 text-white text-center flex flex-col items-center">
                  {/* Avatar con efecto de brillo */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 blur-xl opacity-50 animate-pulse" />
                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-yellow-400/50 shadow-2xl">
                      {avatarImageUrl ? (
                        <img
                          src={avatarImageUrl}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-800" />
                      )}
                    </div>
                    {/* Badge de nivel flotante */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-white fill-white" />
                      <span className="text-sm font-bold text-white">
                        Nivel {level}
                      </span>
                    </div>
                  </div>

                  {/* Nombre y motivación */}
                  <div className="mb-5">
                    <h3 className="font-bold text-2xl bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-1">
                      {displayName}
                    </h3>
                    <p className="text-sm text-blue-200 font-medium flex items-center justify-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      ¡Está conquistando su salud!
                    </p>
                  </div>

                  {/* Stats Cards Gamificados */}
                  <div className="w-full grid grid-cols-3 gap-3 mb-5">
                    {/* XP Card */}
                    <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-xl p-3 backdrop-blur-sm hover:scale-105 transition-transform">
                      <Award className="w-5 h-5 text-yellow-400 mx-auto mb-1.5" />
                      <div className="text-2xl font-bold text-yellow-300">
                        {xpInLevel}
                      </div>
                      <div className="text-[10px] text-yellow-200/70 uppercase tracking-wide">
                        XP Total
                      </div>
                    </div>

                    {/* Energía Card */}
                    <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-indigo-400/30 rounded-xl p-3 backdrop-blur-sm hover:scale-105 transition-transform">
                      <Zap className="w-5 h-5 text-indigo-400 mx-auto mb-1.5" />
                      <div className="text-2xl font-bold text-indigo-300">
                        {energy}%
                      </div>
                      <div className="text-[10px] text-indigo-200/70 uppercase tracking-wide">
                        Energía
                      </div>
                    </div>

                    {/* Salud Card */}
                    <div className="bg-gradient-to-br from-rose-500/20 to-pink-500/20 border border-rose-400/30 rounded-xl p-3 backdrop-blur-sm hover:scale-105 transition-transform">
                      <Heart className="w-5 h-5 text-rose-400 mx-auto mb-1.5" />
                      <div className="text-2xl font-bold text-rose-300">
                        {health}%
                      </div>
                      <div className="text-[10px] text-rose-200/70 uppercase tracking-wide">
                        Salud
                      </div>
                    </div>
                  </div>

                  {/* Barra de progreso destacada */}
                  <div className="w-full mb-5 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-semibold text-white/90">
                        Progreso al siguiente nivel
                      </span>
                      <span className="text-xs font-bold text-yellow-300">
                        {xpInLevel}/{xpPerLevel} XP
                      </span>
                    </div>
                    <div className="relative h-3 rounded-full bg-white/20 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 rounded-full transition-all duration-500"
                        style={{ width: `${xpPercent}%` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </div>
                  </div>

                  {/* Achievements mini showcase */}
                  <div className="w-full flex items-center justify-center gap-3 mb-5 py-3 px-4 bg-white/5 rounded-xl border border-white/10">
                    {achievements.slice(0, 3).map((achievement, idx) => (
                      <div
                        key={achievement.id}
                        className="text-2xl opacity-90 hover:scale-110 transition-transform"
                      >
                        {achievement.icon}
                      </div>
                    ))}
                    <div className="ml-2 text-left">
                      <div className="text-sm font-bold text-white">
                        {achievements.filter((a) => a.unlocked).length}
                      </div>
                      <div className="text-[10px] text-white/60 uppercase tracking-wide">
                        Logros
                      </div>
                    </div>
                  </div>

                  {/* CTA - Call to Action */}
                  <div className="w-full p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-400/30 backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Share2 className="w-4 h-4 text-blue-300" />
                      <p className="text-sm font-bold text-blue-200">
                        ¡Comparte tu progreso!
                      </p>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Toma un pantallazo y muestra a tus amigos cómo estás
                      transformando tu vida.{" "}
                      <span className="text-yellow-300 font-semibold">
                        ¡Inspira a otros!
                      </span>
                    </p>
                  </div>

                  {/* Footer motivacional */}
                  <div className="mt-5 flex items-center justify-center gap-1.5 text-[10px] text-white/50 uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    <span>Siccus • Tu compañero de salud</span>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* AI Recommended Routines */}
          <Card className="gaming-card overflow-hidden">
            <CardHeader className="pb-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-blue-primary/70 mb-1">
                  Recomendaciones según tu perfil
                </p>
                <CardTitle className="text-xl font-semibold text-foreground">
                  Rutinas asistidas por IA
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground mt-1">
                  Acciones diseñadas para sostener tu progreso sin saturarte.
                </CardDescription>
              </div>
              <div className="rounded-2xl border border-blue-primary/20 bg-blue-primary/5 p-4 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-primary text-white border-0 text-xs">
                    {aiProfile.label}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{aiProfile.description}</span>
                </div>
                <p className="text-xs text-foreground/90">
                  {aiProfile.recommendation}
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-1 px-6 pb-6">
              {aiProfile.routines.map((routine, index) => {
                const RoutineIcon = ROUTINE_ICON_MAP[routine.icon] || Sparkles;

                const colorMap: Record<string, { border: string; icon: string; accent: string }> = {
                  orange: { border: "border-orange-500", icon: "bg-orange-500 text-white", accent: "text-orange-600" },
                  sky: { border: "border-sky-500", icon: "bg-sky-500 text-white", accent: "text-sky-600" },
                  purple: { border: "border-purple-500", icon: "bg-purple-500 text-white", accent: "text-purple-600" },
                  emerald: { border: "border-emerald-500", icon: "bg-emerald-500 text-white", accent: "text-emerald-600" },
                  red: { border: "border-red-500", icon: "bg-red-500 text-white", accent: "text-red-600" },
                  pink: { border: "border-pink-500", icon: "bg-pink-500 text-white", accent: "text-pink-600" },
                  blue: { border: "border-blue-500", icon: "bg-blue-500 text-white", accent: "text-blue-600" },
                  amber: { border: "border-amber-500", icon: "bg-amber-500 text-white", accent: "text-amber-600" },
                  indigo: { border: "border-indigo-500", icon: "bg-indigo-500 text-white", accent: "text-indigo-600" },
                  teal: { border: "border-teal-500", icon: "bg-teal-500 text-white", accent: "text-teal-600" },
                  rose: { border: "border-rose-500", icon: "bg-rose-500 text-white", accent: "text-rose-600" },
                  violet: { border: "border-violet-500", icon: "bg-violet-500 text-white", accent: "text-violet-600" },
                  lime: { border: "border-lime-500", icon: "bg-lime-500 text-white", accent: "text-lime-600" },
                  cyan: { border: "border-cyan-500", icon: "bg-cyan-500 text-white", accent: "text-cyan-600" },
                  fuchsia: { border: "border-fuchsia-500", icon: "bg-fuchsia-500 text-white", accent: "text-fuchsia-600" },
                };

                const colors = colorMap[routine.color] || colorMap.blue;

                return (
                  <div
                    key={routine.id}
                    className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-card border-2 ${colors.border} hover:border-blue-primary flex cursor-pointer hover:scale-[1.01] active:scale-[0.99]`}
                    onClick={() => setSelectedRoutine(routine)}
                  >
                    {/* Contenedor de texto - 60% */}
                    <div className="relative z-10 w-[60%] p-6">
                      <div className="mb-4">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                          {routine.focus}
                        </p>
                        <h4 className="text-xl font-bold text-foreground leading-tight group-hover:text-blue-primary transition-colors">
                          {routine.title}
                        </h4>
                      </div>

                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {routine.details}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5 font-semibold">
                            <Clock3 className="h-4 w-4" />
                            {routine.duration}
                          </span>
                          <span className="inline-flex items-center gap-1.5 font-semibold">
                            <CalendarDays className="h-4 w-4" />
                            {routine.frequency}
                          </span>
                          {routine.equipment && (
                            <span className="font-medium">
                              • {routine.equipment}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Contenedor de imagen - 40% */}
                    {routine.image && (
                      <div className="relative w-[40%] overflow-hidden">
                        <img
                          src={routine.image}
                          alt={routine.title}
                          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
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
                    onClick={() =>
                      achievement.unlocked && onNavigate("achievements")
                    }
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
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
              {achievements.some((a) => a.unlocked) && (
                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    onClick={() => onNavigate("achievements")}
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

      {/* Modal de Detalles de Rutina */}
      <Dialog open={!!selectedRoutine} onOpenChange={() => setSelectedRoutine(null)}>
        <DialogContent className="max-w-2xl !bg-slate-900 border-2 border-slate-700 shadow-2xl [&>button]:text-white [&>button]:hover:bg-white/10">
          {selectedRoutine && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <DialogTitle className="text-2xl font-bold text-white mb-2">
                      {selectedRoutine.title}
                    </DialogTitle>
                    <DialogDescription className="text-base text-gray-200">
                      {selectedRoutine.focus}
                    </DialogDescription>
                  </div>
                  {(() => {
                    const IconComponent = ROUTINE_ICON_MAP[selectedRoutine.icon];
                    const iconColorMap: Record<string, { bg: string; icon: string }> = {
                      orange: { bg: 'bg-orange-100', icon: 'text-orange-600' },
                      sky: { bg: 'bg-sky-100', icon: 'text-sky-600' },
                      purple: { bg: 'bg-purple-100', icon: 'text-purple-600' },
                      emerald: { bg: 'bg-emerald-100', icon: 'text-emerald-600' },
                      red: { bg: 'bg-red-100', icon: 'text-red-600' },
                      pink: { bg: 'bg-pink-100', icon: 'text-pink-600' },
                      blue: { bg: 'bg-blue-100', icon: 'text-blue-600' },
                      amber: { bg: 'bg-amber-100', icon: 'text-amber-600' },
                      indigo: { bg: 'bg-indigo-100', icon: 'text-indigo-600' },
                      teal: { bg: 'bg-teal-100', icon: 'text-teal-600' },
                      rose: { bg: 'bg-rose-100', icon: 'text-rose-600' },
                      violet: { bg: 'bg-violet-100', icon: 'text-violet-600' },
                      lime: { bg: 'bg-lime-100', icon: 'text-lime-600' },
                      cyan: { bg: 'bg-cyan-100', icon: 'text-cyan-600' },
                      fuchsia: { bg: 'bg-fuchsia-100', icon: 'text-fuchsia-600' },
                    };
                    const iconColors = iconColorMap[selectedRoutine.color] || iconColorMap.blue;
                    return (
                      <div className={`p-3 ${iconColors.bg} rounded-xl`}>
                        <IconComponent className={`w-8 h-8 ${iconColors.icon}`} />
                      </div>
                    );
                  })()}
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Imagen de la rutina */}
                {selectedRoutine.image && (
                  <div className="relative h-48 rounded-xl overflow-hidden border-2 border-slate-700">
                    <img 
                      src={selectedRoutine.image} 
                      alt={selectedRoutine.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                )}

                {/* Descripción */}
                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-primary" />
                    Descripción
                  </h4>
                  <p className="text-gray-200 leading-relaxed">
                    {selectedRoutine.details}
                  </p>
                </div>

                {/* Información de la rutina */}
                <div className="grid grid-cols-2 gap-4">
                  {(() => {
                    const infoColorMap: Record<string, { bg: string; border: string; icon: string }> = {
                      orange: { bg: 'bg-orange-50', border: 'border-orange-300', icon: 'text-orange-600' },
                      sky: { bg: 'bg-sky-50', border: 'border-sky-300', icon: 'text-sky-600' },
                      purple: { bg: 'bg-purple-50', border: 'border-purple-300', icon: 'text-purple-600' },
                      emerald: { bg: 'bg-emerald-50', border: 'border-emerald-300', icon: 'text-emerald-600' },
                      red: { bg: 'bg-red-50', border: 'border-red-300', icon: 'text-red-600' },
                      pink: { bg: 'bg-pink-50', border: 'border-pink-300', icon: 'text-pink-600' },
                      blue: { bg: 'bg-blue-50', border: 'border-blue-300', icon: 'text-blue-600' },
                      amber: { bg: 'bg-amber-50', border: 'border-amber-300', icon: 'text-amber-600' },
                      indigo: { bg: 'bg-indigo-50', border: 'border-indigo-300', icon: 'text-indigo-600' },
                      teal: { bg: 'bg-teal-50', border: 'border-teal-300', icon: 'text-teal-600' },
                      rose: { bg: 'bg-rose-50', border: 'border-rose-300', icon: 'text-rose-600' },
                      violet: { bg: 'bg-violet-50', border: 'border-violet-300', icon: 'text-violet-600' },
                      lime: { bg: 'bg-lime-50', border: 'border-lime-300', icon: 'text-lime-600' },
                      cyan: { bg: 'bg-cyan-50', border: 'border-cyan-300', icon: 'text-cyan-600' },
                      fuchsia: { bg: 'bg-fuchsia-50', border: 'border-fuchsia-300', icon: 'text-fuchsia-600' },
                    };
                    const infoColors = infoColorMap[selectedRoutine.color] || infoColorMap.blue;

                    return (
                      <>
                        <div className={`${infoColors.bg} rounded-xl p-4 border ${infoColors.border}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <Clock3 className={`w-4 h-4 ${infoColors.icon}`} />
                            <span className="text-sm font-medium text-gray-700">Duración</span>
                          </div>
                          <p className="font-semibold text-gray-900">{selectedRoutine.duration}</p>
                        </div>

                        <div className={`${infoColors.bg} rounded-xl p-4 border ${infoColors.border}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <CalendarDays className={`w-4 h-4 ${infoColors.icon}`} />
                            <span className="text-sm font-medium text-gray-700">Frecuencia</span>
                          </div>
                          <p className="font-semibold text-gray-900">{selectedRoutine.frequency}</p>
                        </div>

                        {selectedRoutine.equipment && (
                          <div className={`${infoColors.bg} rounded-xl p-4 border ${infoColors.border} col-span-2`}>
                            <div className="flex items-center gap-2 mb-1">
                              <Target className={`w-4 h-4 ${infoColors.icon}`} />
                              <span className="text-sm font-medium text-gray-700">Equipamiento</span>
                            </div>
                            <p className="font-semibold text-gray-900">{selectedRoutine.equipment}</p>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>

                {/* Cronómetro de Rutina */}
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-6 border-2 border-slate-600">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock3 className="w-5 h-5 text-white" />
                    <h4 className="font-semibold text-white">Cronómetro de Rutina</h4>
                  </div>
                  
                  <div className="flex items-center justify-center mb-4">
                    <div className="text-5xl font-bold text-white font-mono tabular-nums">
                      {formatTime(simulatedTime)}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {!isTimerRunning ? (
                      <Button
                        onClick={() => setIsTimerRunning(true)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold border border-green-700"
                      >
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Iniciar
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setIsTimerRunning(false)}
                        className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold border border-orange-700"
                      >
                        <CirclePause className="w-4 h-4 mr-2" />
                        Pausar
                      </Button>
                    )}
                    <Button
                      onClick={() => {
                        setSimulatedTime(0);
                        setIsTimerRunning(false);
                      }}
                      className="flex-1 bg-slate-600 hover:bg-slate-500 !text-white border-0 font-semibold"
                    >
                      Reiniciar
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
