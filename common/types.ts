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
