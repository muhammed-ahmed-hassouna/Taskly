import api from "../configs/api";

export async function updateTask({ id, updatedData }) {
  const { data } = await api.patch(`/tasks/update/${id}`, { ...updatedData });
  return data;
}

export async function dsUpdateTask({ id, updatedTask }) {
  const { data } = await api.patch(`/dashboard/updateTask/${id}`, { ...updatedTask });
  return data;
}
