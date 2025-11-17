import React, { useState, useEffect } from "react";
import { Button } from ".././ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from ".././ui/card";
import { Badge } from ".././ui/badge";
import { AvatarWithLoader } from ".././AvatarWithLoader";
import { useAuthStore } from "../../store/authStore";
import { getRpmImageUrl } from "../../utils/avatar";
import {
  Trophy,
  Target,
  TrendingUp,
  Award,
  Plus,
  Heart,
  Zap,
  Share2,
  Sparkles,
  Flame,
  Star,
} from "lucide-react";
import { useProgressStore } from "@/store/progressStore";
import { Progress } from "../ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from ".././ui/dialog";
import { getUserAchievements } from "../../services/achievementsService";

interface DashboardProps {
  onNavigate: (view: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const authUser = useAuthStore((s) => s.user);
  const storedAvatar = (authUser?.avatarUrl as string) || "";
  console.log("🔍 authUser en Dashboard:", authUser);
  console.log("🔍 authUser?.id:", authUser?.id);
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
  const [userStats] = useState({
    level,
    health,
    energy,
    experience: xpTotal,
    streak: 0,
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

  // LOGROS DINÁMICOS DESDE BACKEND
const [achievements, setAchievements] = useState<any[]>([]);
  // Fetch de logros del usuario
  useEffect(() => {
    const fetchAchievements = async () => {
      if (!authUser?.id_usuario) return;  // ← Cambio aquí

      try {
        console.log("Fetching achievements for user:", authUser.id_usuario);  // ← Y aquí
        const response = await fetch(
          `http://localhost:3000/logros/usuario/${authUser.id_usuario}`  // ← Y aquí
        );

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        console.log("✅ Achievements:", data);
        setAchievements(data);
      } catch (error) {
        console.error("❌ Error:", error);
        setAchievements([]);
      }
    };

    fetchAchievements();
  }, [authUser?.id_usuario]);  // ← Y aquí en la dependencia


  const completedTasks = dailyTasks.filter((task) => task.completed).length;
  const totalXP = dailyTasks
    .filter((task) => task.completed)
    .reduce((sum, task) => sum + task.xp, 0);

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
                    {achievements.slice(0, 3).map((ach: any, idx) => (
                      <div
                        key={ach.id_logro_usuario || idx}
                        className="text-2xl opacity-90 hover:scale-110 transition-transform"
                      >
                        {ach.logro?.icono || "🏆"}
                      </div>
                    ))}
                    <div className="ml-2 text-left">
                      <div className="text-sm font-bold text-white">
                        {achievements.filter((a: any) => a.fecha_obtenido).length}
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
          {/* Daily Tasks */}
          <Card className="gaming-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-blue-primary">
                  Misiones Diarias
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Completa tus tareas para ganar XP y mejorar tu salud
                </CardDescription>
              </div>
              <Button
                className="gaming-button text-white border-0"
                size="sm"
                onClick={() => onNavigate("missions")}
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
                    variant={task.completed ? "secondary" : "outline"}
                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                  >
                    +{task.xp} XP
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements - DINÁMICO DESDE BACKEND */}
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
  <p className="text-sm text-gray-500 mb-4">
    Logros cargados: {achievements.length}
  </p>

  {achievements.length === 0 ? (
    <div className="col-span-4 text-center text-muted-foreground py-6">
      No tienes logros aún...
    </div>
  ) : (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {achievements.slice(0, 4).map((achievement: any) => (
          <div
            key={achievement.id_logro_usuario}
            className="text-center p-4 rounded-lg border bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => onNavigate("achievements")}
          >
            <div className="text-3xl mb-2">
              {achievement.logro?.icono || "🏆"}
            </div>
            <h5 className="text-blue-primary mb-1 text-sm font-semibold">
              {achievement.logro?.nombre || "Logro"}
            </h5>
            <Badge className="bg-yellow-500 text-white text-xs">
              <Trophy className="h-3 w-3 mr-1" />
              +{achievement.logro?.puntos_xp || 0} XP
            </Badge>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Button
          variant="outline"
          onClick={() => onNavigate("achievements")}
          className="border-blue-primary text-blue-primary hover:bg-blue-primary hover:text-white transition-colors"
        >
          Ver todos los logros
        </Button>
      </div>
    </>
  )}
</CardContent>

          </Card>
        </div>
      </div>
    </div>
  );
}
