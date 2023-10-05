
import api from "./api";

const baseURL = "/inscricao-eventos";

export async function createInscricaoEvento(inscricao: unknown) {
  const response = await api.post(`${baseURL}/`, inscricao);

  return response.data;
}
