import { apiBase } from "../services/api";
import useSWR from "swr";

export function useFetch<Data = unknown, Error = unknown>(url: string) {
  const { data, error, mutate, isValidating } = useSWR<Data, Error>(
    url,
    async (url) => {
      const response = await apiBase.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
        },
      });

      return response.data;
    },
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return { data, error, mutate, loading: isValidating };
}
