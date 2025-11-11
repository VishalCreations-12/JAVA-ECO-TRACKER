import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // backend base URL
});

// Add an interceptor for auth if needed later
export default api;
