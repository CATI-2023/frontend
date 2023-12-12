import { competicao } from "../Types/type";
import { apiBase } from "./api";

export async function getCompeticoes(_page: Number, _busca: string) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  var url = "/competicoes?busca=" + (_busca == "*" ? "" : _busca);
  if (_page) url += "&page=" + +(Number(_page) > 0 ? _page : "");

  const response = await apiBase(url, config);
  return response;
}

export async function getCompeticoesOpen() {
  const response = await apiBase("/index/competicoes");
  return response.data;
}

export async function getCompeticao(id_competicao: number) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.get("/competicoes/" + id_competicao, config);
  return response;
}

export async function postCompeticao(data: competicao) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const response = await apiBase.post("/competicoes", data, config);
  return response;
}

export async function putCompeticao(
  id_competicao: number | undefined,
  data: competicao
) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const response = await apiBase.put("/competicoes/" + id_competicao, data, config);
  return response;
}

export async function deleteCompeticao(id_competicao: number | undefined) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const response = await apiBase.delete("/competicoes/" + id_competicao, config);
  return response;
}
