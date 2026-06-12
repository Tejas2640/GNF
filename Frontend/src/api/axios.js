import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1503/api",
});

export default api;