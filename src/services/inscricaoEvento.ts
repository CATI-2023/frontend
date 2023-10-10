import { apiBase } from "./api";

export async function getInscricaoEventos() {
    const res = await apiBase.get("/inscricao-eventos")
    return res
}
export async function getInscricaoEvento(id_inscricao_evento: number) {
    const res = await apiBase.get("/inscricao-eventos/" + id_inscricao_evento)
    return res
}

const baseURL = "/inscricao-eventos";

export async function createInscricaoEvento(inscricao: unknown) {
    const response = await apiBase.post(`${baseURL}/`, inscricao);

    return response.data;
}
