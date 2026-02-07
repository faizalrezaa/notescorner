import axios from "axios";

import { User } from "@/types/user";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 8000,
});

export const api = {
  getAll: async () => {
    const res = await axiosInstance.get<User[]>("");
    return res.data;
  },

  getOne: async (id: string) => {
    const res = await axiosInstance.get<User>(`/${id}`);
    return res.data;
  },

  create: async ({ name, text, color, date }: User) => {
    const res = await axiosInstance.post<User>("", {
      name,
      color,
      text,
      date,
    });
    return res.data;
  },

  update: async ({ id, name, text, color, date }: User) => {
    const res = await axiosInstance.put<User>(`/${id}`, {
      name,
      text,
      color,
      date,
    });
    return res.data;
  },

  delete: async ({ id }: User) => {
    const res = await axiosInstance.delete(`/${id}`);
    return res.data;
  },
};
