import axios from "axios";

const api = axios.create({
  baseURL: "https://syncup-backend-x63m.onrender.com",
});

export default api;