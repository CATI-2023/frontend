import { membroEquipe } from "../Types/type";
import { apiBase } from "./api";

export async function postMembroEquipe(data: membroEquipe) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.post("/membros-equipe", data, config);
  return response;
}

export async function putMembroEquipe(
  id_membro_equipe: number | undefined,
  data: membroEquipe
) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const response = await apiBase.put(
    "/membros-equipe/" + id_membro_equipe,
    data,
    config
  );
  return response;
}

export async function deleteMembroEquipe(id_membro_equipe: number | undefined) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const response = await apiBase.delete(
    "/membros-equipe/" + id_membro_equipe,
    config
  );
  return response;
}
