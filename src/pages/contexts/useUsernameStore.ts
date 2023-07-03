import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UsernameStore {
  username: string;
  setUsername: (username: string) => void;
}

export const useUsernameStore = create<UsernameStore>()(
  persist(
    (set) => ({
      username: "",
      setUsername: (username: string) => set({ username }),
    }),
    {
      name: "username",
    }
  )
);
