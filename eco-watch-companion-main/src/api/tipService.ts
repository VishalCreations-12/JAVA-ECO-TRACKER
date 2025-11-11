import api from "../api";

export async function fetchTips() {
  try {
    const res = await api.get("/tips"); // backend endpoint
    return res.data;
  } catch (err) {
    console.error("Error fetching tips:", err);
    return [];
  }
}
