export type Post = {
  id: number
  title: string
  body: string
  userId: number
}

// Initial mock posts
let posts: Post[] = [
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
]

// Simulate fetching all posts
export const fetchMockPosts = async (pageParam: number, limit: number): Promise<Array<Post>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (pageParam - 1) * limit
      const end = start + limit
      resolve(posts.slice(start, end))
    }, 500) 
  })
}

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
