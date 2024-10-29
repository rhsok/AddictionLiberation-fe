import { PostStore } from '@/types/postStore/postStore.types';
import { create } from 'zustand';

const postStore = create<PostStore>((set) => ({
  post: null,
  setPost: (newPost) => set({ post: newPost }),
}));

export default postStore;
