import { participantes } from "../Types/type";
import { apiBase } from "./api";


export async function getEuParticipante(token:string){
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await apiBase.get("/participantes/eu", config);
  return response;
}

export async function getParticipantes() {
  const response = await apiBase.get("/participantes");
  return response;
}

export async function getParticipante(id_participante: number) {
  const response = await apiBase.get("/participantes/" + id_participante);
  return response;
}

export async function createParticipante(data: participantes) {
  const response = await apiBase.post("/participantes", data);
  return response;
}

export async function updateParticipante(
  id_participante: number,
  data: participantes
) {
  const response = await apiBase.put("/participantes/" + id_participante, data);
  return response;
}

export async function deleteParticipante(id_participante: number) {
  const response = await apiBase.delete("/participantes/" + id_participante);
  return response;
}
