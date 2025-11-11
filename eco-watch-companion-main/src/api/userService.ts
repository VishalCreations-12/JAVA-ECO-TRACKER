// userService.ts
import axios from "axios";

export async function fetchUser(userId: number) {
  const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to fetch user");
  return response.json();
}

export const updateUser = async (id: number, user: any) => {
  const res = await axios.put(`http://localhost:8080/api/users/${id}`, user, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};
