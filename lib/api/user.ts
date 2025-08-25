import { User } from "@/types/user";
import axiosInstance from "../axios/instance";

export const userApi = {
  getUsers: async () => {
    const res = await axiosInstance.get("/users");
    return res.data;
  },
  getUserById: async (id: string) => {
    const res = await axiosInstance.get(`/users/${id}`);
    return res.data;
  },
  createUser: async (data: User) => {
    const res = await axiosInstance.post("/users", data);
    return res.data;
  },
};