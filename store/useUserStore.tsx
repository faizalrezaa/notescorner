import { User } from "@/types/user";
import { create } from "zustand";

export const useUserStore = create<User>((set) => ({
  id: "",
  name: "",
  text: "",
  color: "bg-pink",
  date: new Date().toLocaleDateString("en-GB"),

  setName: (value: string) =>
    set({
      name: value,
    }),

  setText: (value: string) =>
    set({
      text: value,
    }),

  setColor: (value: string) =>
    set({
      color: value,
    }),

  setDate: (value: string) => set({ date: value }),
}));
