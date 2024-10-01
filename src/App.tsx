import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { createMockPost, fetchMockPosts, getPostById } from './data';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
        <span>Error: {error instanceof Error ? error.message : 'Unknown error occurred'}</span>
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

const InfinitePosts = ({ setPostId }: { setPostId: React.Dispatch<React.SetStateAction<number>> }) => {
  const queryClient = useQueryClient()
  const {
    data,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchMockPosts,
    initialPageParam: 0,
    getNextPageParam: (page) => page.nextPage,
  });


  const { ref, inView } = useInView();

  useEffect(() => {
    console.log(inView);

    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const mutation = useMutation({
    mutationFn: createMockPost,
    onSuccess: () => {
      // Invalidate and refetch the posts query after a successful mutation
      queryClient.invalidateQueries({ queryKey: ['posts'] })
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

  if (status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return <div>{error.message}</div>;

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

      {data?.pages.map((page) => (
        <ul key={page.currentPage}>
          {page.data.map((post) => (
            <li key={post.id}>
              <a
                onClick={() => setPostId(post.id)}
                href="#"
                style={
                  // We can access the query data here to show bold links for
                  // ones that are cached
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
        </ul>
      ))}
      <div ref={ref} style={{height: "40px"}}>{isFetchingNextPage && 'Loading...'}</div>
    </div>
  );
}


const App = () => {
  const [postId, setPostId] = useState(-1)

  return (
    <div>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <InfinitePosts setPostId={setPostId} />
      )}
    </div>
  );
}


export default App
