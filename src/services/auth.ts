import { apiBase } from "./api";

type auth_request = {
  email: string;
  senha: string;
};

type recuperacao_senha_request = {
  email: string;
};

type recuperacao_senha_update = {
  senha: string;
};

export async function getAuthUser(data: auth_request) {
  const response = await apiBase.post(`/auth/`, data);
  return response.data;
}

export async function getRecuperacaoSenha(hash: string) {
  const response = await apiBase.get(`/auth/recuperacao-senha?hash=` + hash);
  return response;
}

export async function postRecuperacaoSenha(data: recuperacao_senha_request) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const response = await apiBase.post(`/auth/recuperacao-senha`, data, config);
  return response;
}

export async function putRecuperacaoSenha(
  id_recuperacao: number,
  data: recuperacao_senha_update
) {
  const response = await apiBase.put(
    `/auth/recuperacao-senha/` + id_recuperacao,
    data
  );
  return response;
}
