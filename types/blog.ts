export type Author = {
  name: string;
  image: string;
  bio?: string;
  _id?: number | string;
  _ref?: number | string;
};

// export type Blog = {
//   _id: number;
//   title: string;
//   slug?: any;
//   metadata?: string;
//   body?: string;
//   mainImage?: any;
//   author?: Author;
//   tags?: string[];
//   publishedAt?: string;
// };

export type Blog = {
  id: string; // Firestore ID عادة يكون string
  title: string;
  metadata: string;
  content: string;
  createdAt: string;
  mainImage: string;
  author?: string; // "الريمي"
  category?: string; // "Blog"
};

