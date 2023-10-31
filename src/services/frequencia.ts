import { apiBase } from "./api";

import { frequencia } from "../Types/type";

export async function getFrequencias(_page: Number, _busca: string) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  var url = "/frequencias?busca=" + (_busca == "*" ? "" : _busca);
  if (_page) url += "&page=" + (Number(_page) > 0 ? _page : "");

  const res = await apiBase.get(url, config);
  return res;
}

export async function getFrequencia(id_frequencia: number) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const res = await apiBase.get(
    "/frequencias/" + id_frequencia,
    config
  );
  return res;
}

export async function createFrequencia(data: frequencia) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.post("/frequencias", data, config);

  return response.data;
}

export async function updateFrequencia(
  id_frequencia: number | undefined,
  data: frequencia
) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.put(
    "/frequencias/" + id_frequencia,
    data,
    config
  );

  return response.data;
}

export async function deleteFrequencia(id_frequencia: number) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.delete(
    "/frequencias/" + id_frequencia,
    config
  );
  return response.data;
}


export async function postFrequencia(frequencia: string) {
    const response = await apiBase.post('/frequencias', frequencia);
    return response;
}