import axios from "axios";

export const config = {
  url: {
    API_URL: import.meta.env.VITE_API_URL as string,
  }
};

export const apiBase = axios.create({
  baseURL: config.url.API_URL
});
