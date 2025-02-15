import api from "../configs/api";

export async function deleteTask({id}) {
    const { data } = await api.delete(`/tasks/delete/${id}`);
    return data;
  }
  