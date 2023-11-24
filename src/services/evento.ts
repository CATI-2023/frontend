import { evento } from "../Types/type";
import { apiBase } from "./api";

export async function getEventos(_page: Number, _busca: string) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  var url = "/eventos?busca=" + (_busca == "*" ? "" : _busca);
  if (_page) url += "&page=" + +(Number(_page) > 0 ? _page : "");

  const response = await apiBase(url, config);
  return response;
}

export async function getEventoVigente() {
  const response = await apiBase("/index/evento-vigente");
  return response;
}

export async function getEvento(id_evento: number) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const response = await apiBase(`/eventos/${id_evento}`, config);
  return response;
}

export async function postEvento(data: evento) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.post("/eventos", data, config);
  return response;
}

export async function putEvento(id_evento: number | undefined, data: evento) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.put(`/eventos/${id_evento}`, data, config);
  return response;
}

export async function putEventoSetVigente(id_evento: number | undefined) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.put(
    `/eventos/vigente/${id_evento}`,
    { evento_id: id_evento },
    config
  );
  return response;
}

export async function deleteEvento(id_evento: number) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.delete(`/eventos/${id_evento}`, config);
  return response;
}
