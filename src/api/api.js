import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

// ✅ Backend endpoints
export const getAllNews = () => api.get("/api/news");
export const getNewsById = (id) => api.get(`/api/news/${id}`);
export const createNews = (data) => api.post("/api/news", data);
export const searchNews = (query) => api.get(`/api/news/search?q=${query}`);

export default api;
