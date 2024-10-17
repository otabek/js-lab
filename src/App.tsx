import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchMockPosts, createMockPost, Post } from './data';

const Posts = ({ setPostId }: { setPostId: React.Dispatch<React.SetStateAction<number>> }) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [currentPage, setCurrentPage] = useState(1); 

  const {
    data,
    isError,
  } = useQuery<Post[], Error>({
    queryKey: ['posts', currentPage],
    queryFn: () => fetchMockPosts(currentPage, 5), 
  });

  const mutation = useMutation({
    mutationFn: createMockPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      title,
      body,
      userId: 1, 
      id: Date.now(),
    });
    setTitle('');
    setBody('');
  };

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1); 
  };

  const handlePreviousPosts = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1); 
    }
  };

  if (isError) return <div>Error loading posts</div>;

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
        {data?.map((post) => (
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
      </ul>
      <div>
        <button
          onClick={handlePreviousPosts}
          disabled={currentPage === 1} 
        >
          Previous Posts
        </button>
        <button onClick={handleLoadMore}>Load More</button>
      </div>
    </div>
  );
};

export default Posts;
