// src/api.js
import axios from "axios";

export const baseURL =
  process.env.REACT_APP_API_URL || (window.location.origin.replace(/\/$/, '') + '/api');


export const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const t = localStorage.getItem("tm_token") || localStorage.getItem("token");
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

if (process.env.NODE_ENV !== "production") {
  console.log("[API] baseURL =", baseURL);
}
