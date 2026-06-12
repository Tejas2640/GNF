import axios from "axios";

const api = axios.create({
  baseURL: "https://gnf-delta.vercel.app/api",
});

export default api;