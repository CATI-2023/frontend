import { minicurso } from "../Types/type";
import { apiBase } from "./api";

export async function getMiniCursos(_page: Number, _busca: string) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  var url = "/minicursos?busca=" + (_busca == "*" ? "" : _busca);
  if (_page) url += "&page=" + +(Number(_page) > 0 ? _page : "");

  const response = await apiBase(url, config);
  return response;
}

export async function getMiniCurso(id_minicurso: number) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const response = await apiBase.get("/minicursos/" + id_minicurso, config);
  return response;
}

export async function postMiniCurso(data: minicurso) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const response = await apiBase.post("/minicursos", data, config);
  return response;
}

export async function putMiniCurso(
  id_minicurso: number | undefined,
  data: minicurso
) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const response = await apiBase.put(
    "/minicursos/" + id_minicurso,
    data,
    config
  );
  return response;
}

export async function deleteMiniCurso(id_minicurso: number | undefined) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const response = await apiBase.delete("/minicursos/" + id_minicurso, config);
  return response;
}
