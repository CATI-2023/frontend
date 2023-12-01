import { equipe } from "../Types/type";
import { apiBase } from "./api";

export async function getEquipes(_page: Number, _busca: string) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  var url = "/equipes?busca=" + (_busca == "*" ? "" : _busca);
  if (_page) url += "&page=" + +(Number(_page) > 0 ? _page : "");

  const response = await apiBase(url, config);
  return response;
}

export async function getEquipesByParticipante(
  _page: Number,
  _participante_id: Number
) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  var url = "/equipes-participante/" + _participante_id;
  if (_page) url += "?page=" + +(Number(_page) > 0 ? _page : "");

  const response = await apiBase(url, config);
  return response;
}

export async function getEquipesIndex() {
  const response = await apiBase("/index/equipes");
  return response.data;
}

export async function getEquipe(id_equipe: number) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.get("/equipes/" + id_equipe, config);
  return response;
}

export async function postEquipe(data: equipe) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const response = await apiBase.post("/equipes", data, config);
  return response;
}

export async function putEquipe(id_equipe: number | undefined, data: equipe) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const response = await apiBase.put("/equipes/" + id_equipe, data, config);
  return response;
}

export async function deleteEquipe(id_equipe: number | undefined) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const response = await apiBase.delete("/equipes/" + id_equipe, config);
  return response;
}
