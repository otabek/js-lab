export type Post = {
  id: number
  title: string
  body: string
  userId: number
}

// Initial mock posts
let posts: Post[] = Array.from({ length: 200 }).map((_, i) => ({
  id: i + 1,
  title: `Mock Post ${i + 1}`,
  body: `This is the body of Mock Post ${i + 1}`,
  userId: 1,
}))

const limit = 5;

// Simulate fetching all posts and handle pagination
export function fetchMockPosts({ pageParam }: { pageParam: number }): Promise<{
  data: Post[];
  currentPage: number;
  nextPage: number | null;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: posts.slice(pageParam, pageParam + limit),
        currentPage: pageParam,
        nextPage: pageParam + limit < posts.length ? pageParam + limit : null,
      });
    }, 500); // Simulate network latency
  });
}


// Simulate fetching a single post by ID
export const fetchMockPostById = async (
  id: number
): Promise<Post | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = posts.find((post) => post.id === id)
      resolve(post)
    }, 500) // Simulate network latency
  })
}

export const createMockPost = async (post: Post): Promise<Post> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      posts = [...posts, post]
      resolve(post)
    }, 500) // Simulate network latency
  })
}

export const getPostById = (id: number): Promise<Post | undefined> => {
  // Simulate fetching a single post by ID
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = posts.find((post) => post.id === id)
      resolve(post)
    }, 1000) // Simulate network latency
  })
}
