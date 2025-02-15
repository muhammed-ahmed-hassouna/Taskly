import api from "../configs/api";

export async function getUserTask() {
  const { data } = await api.get(`/tasks/getUserTask`);
  return data;
}
