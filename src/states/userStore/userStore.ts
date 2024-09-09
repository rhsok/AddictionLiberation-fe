import { create } from 'zustand';
import { UserStore } from '@/types/userStore/userStore.types';

const userStore = create<UserStore>((set) => ({
  accessToken: '' || null,
  setAccessToken: (newToken) => set({ accessToken: newToken }),
  user: null,
  setUser: (newUser) => set({ user: newUser }),
}));

export default userStore;
