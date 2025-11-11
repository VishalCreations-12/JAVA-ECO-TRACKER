import axios from "axios";

const API_URL = "http://localhost:8080/api/usage";

export const fetchUsageLogs = async (userId: number) => {
  const res = await axios.get(`${API_URL}/${userId}`);
  return res.data;
};

export const addUsageLog = async (usageLog: any) => {
  const res = await axios.post(API_URL, usageLog);
  return res.data;
};
