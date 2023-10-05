import axios from "axios";

export const config = {
  url: {
    API_URL: import.meta.env.VITE_API_URL as string
  }
};

const api = axios.create({
  baseURL: config.url.API_URL
});

export default api;
