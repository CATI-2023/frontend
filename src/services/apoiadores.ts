import { apiBase } from "./api"

export async function getApoiadores() {
  const response = await apiBase.get('/apoiadores')
  return response.data
}
