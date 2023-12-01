import { participante } from "../Types/type";
import { apiBase } from "./api";

export async function getEuParticipante() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.get("/participantes/eu", config);
  return response;
}

export async function getParticipanteByEmail(_email: string) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.get(
    "/participantes/email?busca=" + _email,
    config
  );
  return response;
}

export async function getParticipantes(_page: Number, _busca: string) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  var url = "/participantes?busca=" + (_busca == "*" ? "" : _busca);
  if (_page) url += "&page=" + +(Number(_page) > 0 ? _page : "");

  const response = await apiBase.get(url, config);
  return response;
}

export async function getParticipante(id_participante: number) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.get(
    "/participantes/" + id_participante,
    config
  );
  return response;
}

export async function createParticipante(data: participante) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.post("/participantes", data, config);
  return response;
}

export async function updateParticipante(
  id_participante: number | undefined,
  data: participante
) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.put(
    "/participantes/" + id_participante,
    data,
    config
  );
  return response;
}

export async function deleteParticipante(id_participante: number) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.delete(
    "/participantes/" + id_participante,
    config
  );
  return response;
}
