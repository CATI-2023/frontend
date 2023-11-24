import { palestra } from "../Types/type";
import { apiBase } from "./api";

export async function getPalestras(_page: Number, _busca: string) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  var url = "/palestras?busca=" + (_busca == "*" ? "" : _busca);
  if (_page) url += "&page=" + +(Number(_page) > 0 ? _page : "");

  const response = await apiBase(url, config);
  return response;
}

export async function getPalestrasIndex() {
  const response = await apiBase("/index/palestras");
  return response.data;
}

export async function getPalestra(id_palestra: number) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.get("/palestras/" + id_palestra, config);
  return response;
}

export async function postPalestra(data: palestra) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const response = await apiBase.post("/palestras", data, config);
  return response;
}

export async function putPalestra(
  id_palestra: number | undefined,
  data: palestra
) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const response = await apiBase.put("/palestras/" + id_palestra, data, config);
  return response;
}

export async function deletePalestra(id_palestra: number | undefined) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const response = await apiBase.delete("/palestras/" + id_palestra, config);
  return response;
}
