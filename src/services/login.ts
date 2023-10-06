import { userLogin } from "../Types/type";
import { apiBase } from "./api";

export async function doLogin(data: userLogin) {
  const response = await apiBase.post("/auth", data);
  return response;
}
