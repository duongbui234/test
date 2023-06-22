import instance from "../helpers/instance";
const authHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("userInfo")).token
      }`,
    },
  };
};

export const getAllTask = async (status, title) =>
  await instance.get(
    `/api/tasks?status=${status}&title=${title}`,
    authHeader()
  );

export const createTask = async (title, desc) =>
  await instance.post(
    "/api/tasks",
    {
      title,
      description: desc,
    },
    authHeader()
  );

export const deleteTask = async (id) =>
  await instance.delete(`/api/tasks/${id}`, authHeader());

export const updateStatus = async (id, status) =>
  await instance.put(
    `/api/tasks/${id}`,
    {
      is_done: status,
    },
    authHeader()
  );

export const getSingleTask = async (id) =>
  await instance.get(`/api/tasks/${id}`, authHeader());

export const updateTask = async (id, title, desc) =>
  await instance.put(
    `/api/tasks/${id}`,
    {
      title: title,
      desc: desc,
    },
    authHeader()
  );
