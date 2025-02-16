import api from "../configs/api";

export async function getUserTask() {
  const { data } = await api.get(`/tasks/getUserTask`);
  return data;
}

export async function getAllUsers() {
  const { data } = await api.get(`/dashboard/getAllUsers`);
  return data.Users;
}

export async function getUsersTask() {
  const { data } = await api.get(`/dashboard/getUsersTask`);
  return data.Tasks;
}
