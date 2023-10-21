import { patrocinadores } from "../Types/type";
import { apiBase } from "./api";

export async function getApoiadores(_page: Number, _busca: string) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  var url = "/colaboradores?busca=" + (_busca == "*" ? "" : _busca);
  if (_page) url += "&page=" + _page;
  const response = await apiBase.get(url, config);
  return response.data;
}

export async function postApoiadores(data: patrocinadores) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.post("/colaboradores", data, config);
  return response.data;
}

export async function updateApoiadores(
  id_patrocinador: number | undefined,
  data: patrocinadores
) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.put(
    "/colaboradores/" + id_patrocinador,
    data,
    config
  );
  return response.data;
}

export async function deleteApoiadores(id_patrocinador: number) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.delete(
    "/colaboradores/" + id_patrocinador,
    config
  );
  return response.data;
}
