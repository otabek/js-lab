import React, { useState } from 'react'
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'
import { createMockPost, fetchMockPosts, getPostById, PostType } from './data'
import { useInView } from 'react-intersection-observer'

function usePost(postId: number) {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  })
}

const Post = ({
  postId,
  setPostId,
}: {
  postId: number
  setPostId: React.Dispatch<React.SetStateAction<number>>
}) => {
  const { status, data, error, isFetching } = usePost(postId)

  return (
    <div>
      <div>
        <a onClick={() => setPostId(-1)} href="#">
          Back
        </a>
      </div>
      {!postId || status === 'pending' ? (
        'Loading...'
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <h1>{data?.title}</h1>
          <div>
            <p>{data?.body}</p>
          </div>
          <div>{isFetching ? 'Background Updating...' : ' '}</div>
        </>
      )}
    </div>
  )
}

const Posts = ({
  setPostId,
}: {
  setPostId: React.Dispatch<React.SetStateAction<number>>
}) => {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<PostType[], Error>({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 1 }) => {
      return await fetchMockPosts(pageParam as number, 5) 
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < 5 ? undefined : allPages.length + 1
    },
    initialPageParam: undefined
  })

  const { ref, inView } = useInView()

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createMockPost({ title, body, userId: 1, id: Date.now() }) // Default userId and id
    setTitle('')
    setBody('')
    queryClient.invalidateQueries({ queryKey: ['posts'] })
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading posts</div>

  return (
    <div>
      <h1>Posts</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="Post body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>

      <ul>
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => (
              <li key={post.id}>
                <a
                  onClick={() => setPostId(post.id)}
                  href="#"
                  style={
                    queryClient.getQueryData(['post', post.id])
                      ? {
                          fontWeight: 'bold',
                          color: 'green',
                        }
                      : {}
                  }
                >
                  <h3>{post.title}</h3>
                </a>
                <p>{post.body}</p>
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <div ref={ref} style={{ height: '20px', backgroundColor: 'transparent' }}>
        {isFetchingNextPage ? 'Loading more...' : 'Load more'}
      </div>
    </div>
  )
}

const App = () => {
  const [postId, setPostId] = useState(-1)

  return (
    <div>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
    </div>
  )
}

export default App
