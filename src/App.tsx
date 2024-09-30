import React, { useState } from 'react'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createMockPost, fetchMockPosts, getPostById } from './data'

function usePost(postId: number) {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  })
}

const Post = ({ postId, setPostId }: { postId: number; setPostId: React.Dispatch<React.SetStateAction<number>> }) => {
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

const Posts = ({ setPostId }: { setPostId: React.Dispatch<React.SetStateAction<number>> }) => {
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
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => fetchMockPosts(pageParam, 5),
    getNextPageParam: (lastPage) => {
      return lastPage.length === 5 ? lastPage.length / 5 + 1 : undefined
    },
  })

  const mutation = useMutation({
    mutationFn: createMockPost,
    onSuccess: () => {
      // Invalidate and refetch the posts query after a successful mutation
      queryClient.invalidateQueries(['posts'])
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({
      title,
      body,
      userId: 1, // default user ID
      id: Date.now(),
    })
    setTitle('')
    setBody('')
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
        {data?.pages.map((page) =>
          page.map((post) => (
            <li key={post.id}>
              <a
                onClick={() => setPostId(post.id)}
                href="#"
                style={
                  queryClient.getQueryData(['post', post.id])
                    ? { fontWeight: 'bold', color: 'green' }
                    : {}
                }
              >
                <h3>{post.title}</h3>
              </a>
              <p>{post.body}</p>
            </li>
          ))
        )}
      </ul>

      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'No More Posts'}
        </button>
      </div>

      {/* Scroll event listener for infinite scroll */}
      <div
        style={{ height: '100px', overflow: 'auto' }}
        onScroll={(e) => {
          if (
            e.currentTarget.scrollTop + e.currentTarget.clientHeight >=
              e.currentTarget.scrollHeight &&
            hasNextPage &&
            !isFetchingNextPage
          ) {
            fetchNextPage()
          }
        }}
      >
        <p>Scroll down to load more posts...</p>
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
