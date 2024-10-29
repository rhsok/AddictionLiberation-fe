export type PostStore = {
  post: PostType | null;
  setPost: (newPost: PostType | null) => void;
};

export interface PostType {
  authorId: string;
  categories: {
    category: { id: number; name: string; description: string };
  }[];
  content: string;
  createAt: string;
  id: string;
  order: number;
  postTypeId: number;
  publishedDate: string;
  subtitle: string;
  thumbnailImageURL: string;
  title: String;
  updateAt: string;
  videoUrl: string;
}
