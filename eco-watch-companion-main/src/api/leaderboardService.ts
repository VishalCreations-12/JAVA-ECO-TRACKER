import axios from "axios";

const API_URL = "http://localhost:8080/api/leaderboard";

// ✅ Fetch complete leaderboard list
export const fetchLeaderboard = async () => {
  const response = await axios.get(API_URL);
  return response.data; // [{ rank: 1, userId: 1, userName: "John", totalEnergy: 120 }, ...]
};

// ✅ Fetch specific user's rank
export const fetchUserRank = async (userId: number) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data; // { userId: 1, rank: 2 }
};
