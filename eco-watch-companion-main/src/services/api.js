const API_BASE = "http://localhost:8080/api";

export async function fetchSensors() {
  const res = await fetch(`${API_BASE}/sensors`);
  return res.json();
}

export async function fetchSensorById(id) {
  const res = await fetch(`${API_BASE}/sensors/${id}`);
  if (!res.ok) throw new Error("Sensor not found");
  return res.json();
}

export async function createSensor(sensorData) {
  const res = await fetch(`${API_BASE}/sensors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sensorData),
  });
  return res.json();
}

export async function updateSensor(id, sensorData) {
  const res = await fetch(`${API_BASE}/sensors/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sensorData),
  });
  return res.json();
}

export async function deleteSensor(id) {
  await fetch(`${API_BASE}/sensors/${id}`, { method: "DELETE" });
}
