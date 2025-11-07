
export interface CreateProfileHealthUserDto {
    idUsuario: number;
    edad: number;
    peso: number;
    altura: number;
    objetivo: string;
}


import { httpPost } from './http';

export async function createProfileHealthUser(data: CreateProfileHealthUserDto): Promise<any> {
    return httpPost<any>('/perfil-salud', data);
}