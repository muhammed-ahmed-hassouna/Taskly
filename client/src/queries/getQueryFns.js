import api from "../configs/api";

// Get All Todos of user
export async function getUserTask() {
  const { data } = await api.get(`/tasks/getUserTask`);
  return data;
}
