export type PostType = {
  id: number
  title: string
  body: string
  userId: number
}

// Initial mock posts
let posts: PostType[] = [
  {
    id: 1,
    title: 'Mock Post 1',
    body: 'This is the body of Mock Post 1',
    userId: 1,
  },
  {
    id: 2,
    title: 'Mock Post 2',
    body: 'This is the body of Mock Post 2',
    userId: 1,
  },
  {
    id: 3,
    title: 'Mock Post 3',
    body: 'This is the body of Mock Post 3',
    userId: 2,
  },
  {
    id: 1,
    title: 'Mock Post 4',
    body: 'This is the body of Mock Post 1',
    userId: 1,
  },
  {
    id: 2,
    title: 'Mock Post 5',
    body: 'This is the body of Mock Post 2',
    userId: 1,
  },
  {
    id: 3,
    title: 'Mock Post 6',
    body: 'This is the body of Mock Post 3',
    userId: 2,
  },
  {
    id: 1,
    title: 'Mock Post 7',
    body: 'This is the body of Mock Post 1',
    userId: 1,
  },
  {
    id: 2,
    title: 'Mock Post 8',
    body: 'This is the body of Mock Post 2',
    userId: 1,
  },
  {
    id: 3,
    title: 'Mock Post 9',
    body: 'This is the body of Mock Post 3',
    userId: 2,
  },
  {
    id: 1,
    title: 'Mock Post 10',
    body: 'This is the body of Mock Post 1',
    userId: 1,
  },
  {
    id: 2,
    title: 'Mock Post 11',
    body: 'This is the body of Mock Post 2',
    userId: 1,
  },
  {
    id: 3,
    title: 'Mock Post 12',
    body: 'This is the body of Mock Post 3',
    userId: 2,
  },
]
export const fetchMockPosts = async (page: number = 1, limit: number = 5): Promise<Array<PostType>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * limit;
      const end = page * limit;
      resolve(posts.slice(start, end)); // Return a slice of the posts array for pagination
    }, 500); // Simulate network latency
  });
};

// Simulate fetching a single post by ID
export const fetchMockPostById = async (
  id: number
): Promise<PostType | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = posts.find((post) => post.id === id)
      resolve(post)
    }, 500) // Simulate network latency
  })
}

export const createMockPost = async (post: PostType): Promise<PostType> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      posts = [...posts, post]
      resolve(post)
    }, 500) // Simulate network latency
  })
}

export const getPostById = (id: number): Promise<PostType | undefined> => {
  // Simulate fetching a single post by ID
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = posts.find((post) => post.id === id)
      resolve(post)
    }, 1000) // Simulate network latency
  })
}
