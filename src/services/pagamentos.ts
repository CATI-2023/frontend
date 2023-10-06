import { pagamentos } from "../Types/type";
import { apiBase } from "./api";

export async function getPagamento() {
    const res = await apiBase("/pagamentos")
    return res
}
export async function getPagamentos(id_pagamentos: number){
    const res = await apiBase("/pagamentos/"+id_pagamentos)
    return res
}
export async function putPagamentos(id_pagamentos: number, data: pagamentos){
    const res = await apiBase.put("/pagamentos/"+id_pagamentos, data)
    return res
}