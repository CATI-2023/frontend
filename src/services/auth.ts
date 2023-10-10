import { apiBase } from "./api";

type auth_request = {
  email: string;
  senha: string;
};

export async function getAuthUser(data: auth_request) {
  const response = await apiBase.post(`/auth/`, data);
  return response.data;
}
