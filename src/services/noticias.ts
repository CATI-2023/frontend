import { noticia } from "../Types/type";
import { apiBase } from "./api";

export async function getNoticias() {
  const response = await apiBase.get("/noticias");
  return response;
}

export async function getNoticia(id_noticia: number) {
  const response = await apiBase.get("/noticias/" + id_noticia);
  return response;
}

export async function postNoticia(data: noticia) {
  const response = await apiBase.post("/noticias", data);
  return response;
}

export async function putNoticia(id_noticia: number, data: noticia) {
  const response = await apiBase.put("/noticias/" + id_noticia, data);
  return response;
}

export async function deleteNoticia(id_noticia: number) {
  const response = await apiBase.delete("/noticias/" + id_noticia);
  return response;
}
