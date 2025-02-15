import api from "../configs/api";

export async function updateTask({ id, updatedData }) {
  const { data } = await api.patch(`/tasks/update/${id}`, { ...updatedData });
  return data;
}
