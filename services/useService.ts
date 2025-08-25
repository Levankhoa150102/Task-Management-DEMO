import { userApi } from "../lib/api/user";
import { User } from "@/types/user";

export const userService = {
  fetchUsers: async () => {
    const users = await userApi.getUsers();
    return users.map((u: User) => ({
      id: u.id,
      name: u.name,
      email: u.email,
    }));
  },
};