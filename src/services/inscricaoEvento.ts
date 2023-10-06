import { apiBase } from "./api";
import { inscricaoEvento } from "../Types/type";

export async function getInscricaoEventos() {
  const res = await apiBase.get("/inscricao-eventos");
  return res;
}
export async function getInscricaoEvento(id_inscricao_evento: number) {
  const res = await apiBase.get("/inscricao-eventos/" + id_inscricao_evento);
  return res;
}

export async function createInscricaoEvento(data: inscricaoEvento) {
  const response = await apiBase.post("/inscricao-eventos", data);
  return response;
}
