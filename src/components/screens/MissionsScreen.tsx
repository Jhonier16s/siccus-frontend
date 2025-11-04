import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '.././ui/card';
import { Button } from '.././ui/button';
import { Badge } from '.././ui/badge';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '.././ui/pagination';
import { Trophy, Target } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '.././ui/tabs';
import { useAuthStore } from '@/store/authStore';
import { Mission, MissionUsuario, assignMissionToUser, getAssignedMissionsByUser, getMissionsCatalog, updateMissionUsuario } from '@/services/missionsService';
import { getProgressSummary } from '@/services/progressService';
import { useProgressStore } from '@/store/progressStore';

export function MissionsScreen() {
  const authUser = useAuthStore(s => s.user);
  const userId = Number((authUser as any)?.id ?? (authUser as any)?.id_usuario);
  const [isLoading, setIsLoading] = useState(false);
  const [missions, setMissions] = useState<MissionUsuario[]>([]);
  const [catalog, setCatalog] = useState<Mission[]>([]);
  const [isAssigning, setIsAssigning] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageAssigned, setCurrentPageAssigned] = useState(1);
  const itemsPerPage = 6;
  const setProgressSummary = useProgressStore(s => s.setSummary);

  // Load assigned missions from backend
  useEffect(() => {
    if (!userId) return;
    (async () => {
      setIsLoading(true);
      try {
        const data = await getAssignedMissionsByUser(userId);
        setMissions(data);
      } catch (e) {
        console.error('Error cargando misiones:', e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [userId]);

  // Load catalog missions
  useEffect(() => {
    (async () => {
      try {
        const data = await getMissionsCatalog();
        setCatalog(data);
      } catch (e) {
        console.error('Error cargando catálogo de misiones:', e);
      }
    })();
  }, []);

  const totalPagesCatalog = Math.max(1, Math.ceil(catalog.length / itemsPerPage));
  const totalPagesAssigned = Math.max(1, Math.ceil(missions.length / itemsPerPage));
  const clampedCatalogPage = Math.min(currentPage, totalPagesCatalog);
  const clampedAssignedPage = Math.min(currentPageAssigned, totalPagesAssigned);
  useEffect(() => {
    if (currentPage !== clampedCatalogPage) setCurrentPage(clampedCatalogPage);
    if (currentPageAssigned !== clampedAssignedPage) setCurrentPageAssigned(clampedAssignedPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPagesCatalog, totalPagesAssigned]);

  const pageCatalog = useMemo(() => {
    const start = (clampedCatalogPage - 1) * itemsPerPage;
    return catalog.slice(start, start + itemsPerPage);
  }, [catalog, clampedCatalogPage]);

  const pageAssigned = useMemo(() => {
    const start = (clampedAssignedPage - 1) * itemsPerPage;
    return missions.slice(start, start + itemsPerPage);
  }, [missions, clampedAssignedPage]);

  const completed = missions.filter(m => m.estado === 'COMPLETADA').length;
  const totalXp = missions
    .filter(m => m.estado === 'COMPLETADA')
    .reduce((s, m) => s + (m.mision?.xp || 0), 0);

  const toggleMission = async (id_mision_usuario: number) => {
    const current = missions.find(m => m.id_mision_usuario === id_mision_usuario);
    if (!current) return;
    const willComplete = current.estado !== 'COMPLETADA';
    // Optimistic update
    setMissions(prev => prev.map(m => m.id_mision_usuario === id_mision_usuario ? { ...m, estado: willComplete ? 'COMPLETADA' : 'PENDIENTE' } : m));
    try {
      await updateMissionUsuario(id_mision_usuario, { estado: willComplete ? 'COMPLETADA' : 'PENDIENTE' });
      // Si se completó por primera vez, refrescar resumen de progreso para actualizar XP/nivel
      if (willComplete && userId) {
        try {
          const summary = await getProgressSummary(userId);
          setProgressSummary(summary);
        } catch (e) {
          console.error('No se pudo refrescar el progreso después de completar la misión', e);
        }
      }
    } catch (e) {
      // revert on error
      setMissions(prev => prev.map(m => m.id_mision_usuario === id_mision_usuario ? { ...m, estado: current.estado } : m));
      console.error('No se pudo actualizar la misión', e);
    }
  };

  const assignedByMissionId = useMemo(() => {
    const map = new Map<number, MissionUsuario>();
    missions.forEach(m => map.set(m.id_mision, m));
    return map;
  }, [missions]);

  const assignMission = async (idMision: number) => {
    if (!userId) return;
    setIsAssigning(idMision);
    try {
      const created = await assignMissionToUser({ idUsuario: userId, idMision });
      // prepend to assigned list
      setMissions(prev => [created, ...prev]);
    } catch (e) {
      console.error('No se pudo asignar la misión', e);
    } finally {
      setIsAssigning(null);
    }
  };

  const resetMissions = () => {
    // Para una versión conectada, el reset podría refetch
    if (!userId) return;
    setCurrentPage(1);
    setCurrentPageAssigned(1);
    setIsLoading(true);
    getAssignedMissionsByUser(userId)
      .then(setMissions)
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-blue-primary mb-1">Misiones</h1>
          <p className="text-muted-foreground">Marca tus tareas como hechas y gana XP</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetMissions}>
            Restablecer
          </Button>
        </div>
      </div>

      {/* Quick stats */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="gaming-card">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-primary" />
              <span className="text-sm text-foreground">Completadas</span>
            </div>
            <Badge className="bg-blue-primary text-white">{completed}/{missions.length}</Badge>
          </CardContent>
        </Card>
        <Card className="gaming-card">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="text-sm text-foreground">XP ganada</span>
            </div>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">+{totalXp} XP</Badge>
          </CardContent>
        </Card>
        <Card className="gaming-card">
          <CardContent className="p-4 flex items-center justify-between">
            <span className="text-sm text-foreground">Misiones por página</span>
            <Badge variant="outline">{itemsPerPage}</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Tabs: Asignadas primero, luego Catálogo */}
      <Tabs defaultValue="assigned" className="space-y-4">
        <TabsList>
          <TabsTrigger value="assigned">Asignadas</TabsTrigger>
          <TabsTrigger value="catalog">Catálogo</TabsTrigger>
        </TabsList>

        {/* Misiones asignadas (con toggle) */}
        <TabsContent value="assigned" className="space-y-4">
          <Card className="gaming-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-primary">Misiones asignadas</CardTitle>
              <CardDescription className="text-muted-foreground">Pulsa para marcar como hecha o deshacer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {pageAssigned.map((m) => (
                <div
                  key={m.id_mision_usuario}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer ${
                    m.estado === 'COMPLETADA'
                      ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                      : 'bg-card border-border hover:border-blue-primary'
                  }`}
                  onClick={() => toggleMission(m.id_mision_usuario)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        m.estado === 'COMPLETADA' ? 'bg-green-500 border-green-500' : 'border-border'
                      }`}
                    >
                      {m.estado === 'COMPLETADA' && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className={m.estado === 'COMPLETADA' ? 'text-green-700 dark:text-green-300 line-through' : 'text-foreground'}>
                      {m.mision?.nombre || `Misión #${m.id_mision}`}
                    </span>
                  </div>
                  <Badge variant={m.estado === 'COMPLETADA' ? 'secondary' : 'outline'} className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                    +{m.mision?.xp ?? 0} XP
                  </Badge>
                </div>
              ))}

              {pageAssigned.length === 0 && (
                <p className="text-center text-muted-foreground py-8">{isLoading ? 'Cargando misiones...' : 'No hay misiones en esta página.'}</p>
              )}
            </CardContent>
          </Card>

          {/* Paginación asignadas */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPageAssigned(p => Math.max(1, p - 1)); }} />
              </PaginationItem>
              {Array.from({ length: totalPagesAssigned }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink href="#" isActive={i + 1 === clampedAssignedPage} onClick={(e) => { e.preventDefault(); setCurrentPageAssigned(i + 1); }}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPageAssigned(p => Math.min(totalPagesAssigned, p + 1)); }} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </TabsContent>

        {/* Catálogo de misiones en tarjetas */}
        <TabsContent value="catalog" className="space-y-4">
          <Card className="gaming-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-primary">Catálogo de misiones</CardTitle>
              <CardDescription className="text-muted-foreground">Explora y asigna misiones del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              {pageCatalog.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Catálogo vacío.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pageCatalog.map((m) => {
                    const assigned = assignedByMissionId.get(m.id_mision);
                    const isBlocked = !!m.bloqueada;
                    return (
                      <Card key={m.id_mision} className="bg-card border-border h-full">
                        <CardContent className="p-4 h-full flex flex-col justify-between">
                          <div className="space-y-1">
                            <div className="flex items-start justify-between">
                              <h5 className="text-foreground font-medium leading-tight pr-2">{m.nombre}</h5>
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">+{m.xp} XP</Badge>
                            </div>
                            {m.descripcion && (
                              <p className="text-xs text-muted-foreground">{m.descripcion}</p>
                            )}
                          </div>
                          <div className="pt-3 flex items-center justify-end gap-2">
                            {isBlocked ? (
                              <Badge variant="outline" className="opacity-70">Bloqueada</Badge>
                            ) : assigned ? (
                              <Badge className="bg-blue-primary text-white">Asignada • {assigned.estado}</Badge>
                            ) : (
                              <Button size="sm" disabled={isAssigning === m.id_mision} onClick={() => assignMission(m.id_mision)} className="gaming-button text-white border-0">
                                {isAssigning === m.id_mision ? 'Asignando…' : 'Asignar'}
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Paginación catálogo */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }} />
              </PaginationItem>
              {Array.from({ length: totalPagesCatalog }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink href="#" isActive={i + 1 === clampedCatalogPage} onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); }}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPagesCatalog, p + 1)); }} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </TabsContent>
      </Tabs>
    </div>
  );
}
