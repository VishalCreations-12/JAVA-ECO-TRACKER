export async function fetchSensorData(userId: number) {
  const response = await fetch(`http://localhost:8080/api/sensors/user/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch sensor data");
  }

  return response.json();
}

export async function fetchTotalEnergy(userId: number) {
  const response = await fetch(`http://localhost:8080/api/sensors/user/${userId}/total`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch total energy");
  }

  return response.json();
}
