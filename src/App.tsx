import React, { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createMockPost, fetchMockPosts, getPostById } from './data'
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
  postId: number;
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
  const [pageParams, setPageParams] = useState(0);
  

  const {
    data: posts,
    isLoading,
    isError,
  }= useQuery({
    queryKey: ['posts', pageParams],
    queryFn: () => fetchMockPosts(pageParams, 5),
    // keepPreviousData: true, // Keep previous data while fetching the next page
  })
  

  const mutation = useMutation({
    mutationFn: createMockPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({
      title,
      body,
      userId: 1, 
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
        {posts?.map((post: any) => (
          <React.Fragment key={post.id}>
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
          </React.Fragment>
        ))}
      </ul>

      <div>
      <button
        disabled={pageParams === 0}
        onClick={() => setPageParams((prevPage) => prevPage - 1)}
      >
        Prev page
      </button>
      <button
        disabled={pageParams === 2}
        onClick={() => setPageParams((prevPage) => prevPage + 1)}
      >
        Next Page
      </button>
      </div>
    </div>
  )
}

const App = () => {
  const [postId, setPostId] = React.useState(-1)

  return (
    <div>
      {/* {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : ( */}
        {/* <Post postId={postId} setPostId={setPostId} /> */}
        <Posts setPostId={setPostId} />
      {/* )} */}
    </div>
  )
}

export default App

