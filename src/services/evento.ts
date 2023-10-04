import { evento } from "../Types/type";
import { apiBase } from "./api";

export async function getEventos(){
    const response = await apiBase("/eventos");
    return response
}
export async function getEvento(id_evento: number){
    const response = await apiBase(`/eventos/${id_evento}`);
    return response
}
export async function postEvento(data: evento){
    const response = await apiBase.post('/eventos', data);
    return response;
}
export async function putEvento(id_evento: number, data: evento){
    const response = await apiBase.put(`/eventos/${id_evento}`, data);
    return response;
}
export async function deleteEvento(id_evento: number){ 
    const response = await apiBase.delete(`/eventos/${id_evento}`);
    return response;
}