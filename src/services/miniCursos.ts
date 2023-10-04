import { apiBase } from "./api";
export type mini_curso = {
    titulo: string;
    valor: number;
    descricao: string;
    qtde_vagas: number;
    data: string;
    evento_id_reference: number;
    ministrante_participante_id_reference: number;
}
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
export async function putMiniCurso(id_minicurso: number, data: mini_curso){
    const response = await apiBase.put('/minicursos/'+id_minicurso, data)
    return response;
}
export async function deleteMiniCurso(id_minicurso: number){
    const response = await apiBase.delete('/minicursos/'+id_minicurso)
    return response;
}