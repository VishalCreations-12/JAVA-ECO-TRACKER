import axios from "axios";

const API_URL = "http://localhost:8080/api/alerts";

export const fetchAlerts = async (userId: number) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return [];
  }
};

export const markAlertAsRead = async (alertId: number) => {
  try {
    const response = await axios.put(`${API_URL}/${alertId}/read`);
    return response.data;
  } catch (error) {
    console.error("Error marking alert as read:", error);
    return null;
  }
};
