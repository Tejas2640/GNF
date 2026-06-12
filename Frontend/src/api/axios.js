import axios from "axios";

const api = axios.create({
  baseURL: "https://gnf-1.onrender.com/api",
});

export default api;