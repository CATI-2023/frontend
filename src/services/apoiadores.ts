import { patrocinadores } from "../Types/type"
import { apiBase } from "./api"

export async function getApoiadores() {
  const response = await apiBase.get('/colaboradores')
  return response.data
}

export async function postApoiadores(data: patrocinadores){
  const response = await apiBase.post('/colaboradores', data)
  return response.data
}

export async function updateApoiadores(id_patrocinador: number|undefined, data: patrocinadores){
  const response = await apiBase.put('/colaboradores/'+id_patrocinador, data)
  return response.data
}

export async function deleteApoiadores(id_patrocinador: number ) {
  const response = await apiBase.delete('/colaboradores/'+id_patrocinador)
  return response.data
}


