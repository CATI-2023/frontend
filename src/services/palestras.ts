import { palestras } from "../Types/type"
import { apiBase } from "./api"

export async function getPalestras() {
    const response = await apiBase.get('/palestras')
    return response
}

export async function getPalestra(id_palestra: number) {
    const response = await apiBase.get('/palestras/' + id_palestra)
    return response
}

export async function postPalestra(data: palestras) {
    const response = await apiBase.post('/palestras', data)
    return response
}

export async function putPalestra(id_palestra: number, data: palestras) {
    const response = await apiBase.put('/palestras/' + id_palestra, data)
    return response
}

export async function deletePalestra(id_palestra: number){
    const response = await apiBase.delete('/palestras/' + id_palestra)
    return response
}