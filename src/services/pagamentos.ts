import { pagamentos } from "../Types/type";
import { apiBase } from "./api";

export async function getPagamento() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const res = await apiBase("/pagamentos", config);
  return res;
}
export async function getPagamentos(id_pagamentos: number) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const res = await apiBase("/pagamentos/" + id_pagamentos, config);
  return res;
}
export async function putPagamentos(id_pagamentos: number, data: pagamentos) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const res = await apiBase.put("/pagamentos/" + id_pagamentos, data, config);
  return res;
}
