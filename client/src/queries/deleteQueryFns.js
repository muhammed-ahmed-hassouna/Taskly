import api from "../configs/api";

export async function deleteTask({id}) {
    const { data } = await api.delete(`/tasks/delete/${id}`);
    return data;
  }
  
export async function dsDeleteTask(id) {
    const { data } = await api.delete(`/dashboard/deleteTask/${id}`);
    return data;
  }
  