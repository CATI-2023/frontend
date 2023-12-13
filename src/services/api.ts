import axios from "axios";

export const config = {
  url: {
    API_URL: import.meta.env.VITE_API_URL as string,
  },
};

export const apiBase = axios.create({
  baseURL: config.url.API_URL,
});

// Add a request interceptor
apiBase.interceptors.request.use(
  function (conf) {
    if (window.location.pathname !== "/") {
      document.body.classList.add("loading-indicator");
    }
    return conf;
  },
  function () {
    document.body.classList.remove("loading-indicator");
  }
);

// Add a response interceptor
apiBase.interceptors.response.use(
  function (response) {
    document.body.classList.remove("loading-indicator");
    return response;
  },
  function () {
    document.body.classList.remove("loading-indicator");
  }
);
