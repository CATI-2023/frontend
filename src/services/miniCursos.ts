import { mini_curso } from "../Types/type";
import { apiBase } from "./api";

export async function getMiniCursos() {
    const response = await apiBase.get('/minicursos')
    return response;
}
export async function getMiniCurso(id_minicurso: number) {
    const response = await apiBase.get('/minicursos/'+id_minicurso)
    return response;
}
export async function postMiniCurso(data: mini_curso){
    const response = await apiBase.post('/minicursos', data)
    return response;
}
export async function putMiniCurso(id_minicurso: number | undefined, data: mini_curso ){
    const response = await apiBase.put('/minicursos/'+id_minicurso, data)
    return response;
}
export async function deleteMiniCurso(id_minicurso: number | undefined){
    const response = await apiBase.delete('/minicursos/'+id_minicurso)
    return response;
}