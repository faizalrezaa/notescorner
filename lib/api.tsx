import axios from "axios";

import { User } from "@/types/user";

const API_URL = `${process.env.MOCK_API_URL}`;

export const api = {
  getAll: async () => {
    const res = await axios.get<User[]>(API_URL);
    return res.data;
  },

  getOne: async (id: string) => {
    const res = await axios.get<User>(`${API_URL}/${id}`);
    return res.data;
  },

  create: async ({ name, text, color, date }: User) => {
    const res = await axios.post<User>(API_URL, {
      name,
      color,
      text,
      date,
    });
    return res.data;
  },

  update: async ({ id, name, text, color, date }: User) => {
    const res = await axios.put<User>(`${API_URL}/${id}`, {
      name,
      text,
      color,
      date,
    });
    return res.data;
  },

  delete: async ({ id }: User) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  },
};
