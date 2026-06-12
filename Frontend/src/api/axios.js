import axios from "axios";

const api = axios.create({
  baseURL: "http://gnf-git-main-tjs03.vercel.app/",
});

export default api;