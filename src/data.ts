import { faker } from "@faker-js/faker";
import { MOCK_DATA_LIMIT, POST_LIMIT_IN_PAGE } from "./constants";

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

// Initial mock posts
let posts: Post[] = [];

for (let i = 0; i < MOCK_DATA_LIMIT; i++) {
  const post: Post = {
    id: faker.number.int(),
    title: faker.company.name(),
    body: faker.finance.transactionDescription(),
    userId: faker.number.int(),
  };

  posts.push(post);
}

// Simulate fetching all posts
export const fetchMockPosts = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<{ data: Post[]; currentPage: number; nextPage: number | null }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: posts.slice(pageParam, pageParam + POST_LIMIT_IN_PAGE),
        currentPage: pageParam,
        nextPage:
          pageParam + POST_LIMIT_IN_PAGE < posts?.length
            ? pageParam + POST_LIMIT_IN_PAGE
            : null,
      });
    }, 500); // Simulate network latency
  });
};

// Simulate fetching a single post by ID
export const fetchMockPostById = async (
  id: number,
): Promise<Post | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = posts.find((post) => post.id === id);
      resolve(post);
    }, 500); // Simulate network latency
  });
};

export const createMockPost = async (post: Post): Promise<Post> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      posts = [...posts, post];
      resolve(post);
    }, 500); // Simulate network latency
  });
};

export const getPostById = (id: number): Promise<Post | undefined> => {
  // Simulate fetching a single post by ID
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = posts.find((post) => post.id === id);
      resolve(post);
    }, 1000); // Simulate network latency
  });
};
