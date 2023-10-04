import { apiBase } from "./api";

export async function postPresenca(presenca: string) {
    const response = await apiBase.post('/presenca', presenca);
    return response;
}