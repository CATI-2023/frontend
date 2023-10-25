import { apiBase } from "./api";
import { inscricaoEvento } from "../Types/type";

export async function getInscricaoEventos(_page: Number, _busca: string) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  var url = "/inscricao-eventos?busca=" + (_busca == "*" ? "" : _busca);
  if (_page) url += "&page=" + (Number(_page) > 0 ? _page : "");

  const res = await apiBase.get(url, config);
  return res;
}

export async function getInscricaoEvento(id_inscricao_evento: number) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const res = await apiBase.get(
    "/inscricao-eventos/" + id_inscricao_evento,
    config
  );
  return res;
}

export async function createInscricaoEvento(data: inscricaoEvento) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.post("/inscricao-eventos", data, config);

  return response.data;
}

export async function createInscricaoEventoOrg(data: inscricaoEvento) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.post("/inscricao-eventos/org", data, config);

  return response.data;
}

export async function updateInscricaoEvento(
  id_inscricao_evento: number | undefined,
  data: inscricaoEvento
) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.put(
    "/inscricao-eventos/" + id_inscricao_evento,
    data,
    config
  );

  return response.data;
}

export async function deleteInscricaoEvento(id_inscricao_evento: number) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.delete(
    "/inscricao-eventos/" + id_inscricao_evento,
    config
  );
  return response.data;
}
