export type Post = {
  author: {
    bio: string;
    name: string;
    id: string;
    photo: {
      url: string;
    };
  };
  createdAt: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: {
    url: string;
  };
  categories: {
    slug: string;
    name: string;
  }[];
};

export type PostEdges = {
  node: Post;
}[];

export type PostsData = {
  postsConnection: {
    edges: PostEdges;
  };
};

export type RecentPost = {
  title: string;
  createdAt: string;
  slug: string;
  featuredImage: {
    url: string;
  };
};

export type RecentPosts = {
  posts: RecentPost[];
};

export type Category = {
  name: string;
  slug: string;
};

export type Categories = {
  categories: Category[];
};

export type Author = {
  bio: string;
  name: string;
  id: string;
  photo: {
    url: string;
  };
};

export type PostDetail = {
  author: Author;
  createdAt: string;
  slug: string;
  title: string;
  excerpt: string;
  content: {
    raw: any;
  };
  featuredImage: {
    url: string;
  };
  categories: {
    slug: string;
    name: string;
  }[];
};

export type PostDetailData = {
  post: PostDetail;
};

export type Comment = {
  comment: string;
  name: string;
  email: string;
};

export type CommentObj = Comment & { slug: string };
export type CommentData = Comment & { createdAt: string };

export type Comments = {
  comments: CommentData[];
};

export type FeaturedPost = {
  author: {
    name: string;
    photo: {
      url: string;
    };
  };
  featuredImage: {
    url: string;
  };
  title: string;
  slug: string;
  createdAt: string;
};

export type FeaturedPosts = {
  posts: FeaturedPost[];
};
