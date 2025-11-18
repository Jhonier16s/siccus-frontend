

/* 

  "edad": 25,
  "peso": 70.5,
  "altura": 1.75,
  "objetivo": "Bajar grasa",
  "genero": "male",
  "imc": 22.98,
  "antecedenteSobrepeso": 1,
  "aguaCh20A": 8,
  "nivelActividad": 3
*/

export interface CreateProfileHealthUserDto {
    idUsuario: number;
    edad: number;
    peso: number;
    altura: number;
    objetivo: string;
    genero: string;
    imc: number;
    antecedenteSobrepeso: number;
    aguaCh20A: number;
    nivelActividad: number;
}


import { httpPost } from './http';

export async function createProfileHealthUser(data: CreateProfileHealthUserDto): Promise<any> {
    return httpPost<any>('/perfil-salud', data);
}