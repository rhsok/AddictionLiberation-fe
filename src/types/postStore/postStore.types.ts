export type PostStore = {
  post: PostType | null;
  setPost: (newPost: PostType | null) => void;
};

export interface PostType {
  authorId: string;
  categories: {
    category: { id: number; name: string; description: string };
    isMain: boolean;
    order: number;
  }[];
  content: string;
  createAt: string;
  id: string;
  order: number;
  postTypeId: number;
  publishedDate: string;
  subtitle: string;
  thumbnailImageURL: string;
  title: string;
  updateAt: string;
  videoUrl: string;
}

interface CategoryData {
  categoryId: number | boolean;
  isMain: number | boolean;
}

// 게시글 요청 데이터 타입 정의
export interface EditPostData {
  title: string;
  content: string;
  subtitle: string;
  videoUrl: string;
  published: boolean;
  postTypeId: number | boolean;
  publishedDate: Date;
  thumbnailImageURL: string;
  categories: CategoryData[];
}
