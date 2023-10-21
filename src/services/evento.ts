import { evento } from "../Types/type";
import { apiBase } from "./api";

export async function getEventos() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase("/eventos", config);
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
export async function putEvento(id_evento: number, data: evento) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.put(`/eventos/${id_evento}`, data, config);
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
