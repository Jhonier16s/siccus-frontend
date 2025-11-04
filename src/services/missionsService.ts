import { httpDelete, httpGet, httpPatch, httpPost } from './http';

// Tipos de backend
export type MissionEstado = 'PENDIENTE' | 'EN_PROGRESO' | 'COMPLETADA';

export interface Mission {
  id_mision: number;
  nombre: string;
  descripcion?: string;
  xp: number;
  completada?: boolean;
  bloqueada?: boolean;
}

export interface MissionUsuario {
  id_mision_usuario: number;
  id_usuario: number;
  id_mision: number;
  estado: MissionEstado;
  progreso?: number;
  fecha_asignacion: string;
  completada_at?: string | null;
  mision: Mission;
}

export interface AssignMissionDto {
  idUsuario: number;
  idMision: number;
}

export type UpdateMissionUsuarioDto = Partial<{
  estado: MissionEstado;
  progreso: number;
}>;

// Endpoints
export function getAssignedMissionsByUser(userId: number) {
  return httpGet<MissionUsuario[]>(`/misiones-usuario/user/${userId}`);
}

export function assignMissionToUser(body: AssignMissionDto) {
  return httpPost<MissionUsuario>(`/misiones-usuario/assign`, body);
}

export function updateMissionUsuario(idMisionUsuario: number, body: UpdateMissionUsuarioDto) {
  return httpPatch<MissionUsuario>(`/misiones-usuario/${idMisionUsuario}`, body);
}

export function deleteMissionUsuario(idMisionUsuario: number) {
  return httpDelete<{ success?: boolean }>(`/misiones-usuario/${idMisionUsuario}`);
}

export function getMissionsCatalog() {
  return httpGet<Mission[]>(`/misiones`);
}

export function getUserTotalXp(userId: number) {
  return httpGet<{ xpTotal: number }>(`/progreso/user/${userId}/total`);
}
