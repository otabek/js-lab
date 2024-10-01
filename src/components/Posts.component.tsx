import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { createMockPost, fetchMockPosts } from "../data";
import { MOCK_DATA_LIMIT, POST_LIMIT_IN_PAGE } from "../constants";

export const Posts = ({
  setPostId,
}: {
  setPostId: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [page, setPage] = useState<number>(1);
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const {
    isError,
    data: posts,
    isLoading,
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchMockPosts(page),
    placeholderData: keepPreviousData,
  });

  const mutation = useMutation({
    mutationFn: createMockPost,
    onSuccess: () => {
      // Invalidate and refetch the posts query after a successful mutation
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      title,
      body,
      userId: 1, // default user ID
      id: Date.now(),
    });
    setTitle("");
    setBody("");
  };

  if (isLoading) return <div>Loading...</div>;
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
        {posts?.map((post) => (
          <li key={post.id}>
            <a
              onClick={() => setPostId(post.id)}
              href="#"
              style={
                // We can access the query data here to show bold links for
                // ones that are cached
                queryClient.getQueryData(["post", post.id])
                  ? {
                      fontWeight: "bold",
                      color: "green",
                    }
                  : {}
              }
            >
              <h3>{post.title}</h3>
            </a>
            <p>{post.body}</p>
          </li>
        ))}

        <span style={{ marginRight: "5px" }}>Current Page: {page}</span>
        <button onClick={() => setPage((old) => Math.max(old - 1, 1))}>
          Previous
        </button>
        <button
          onClick={() => {
            setPage((old) =>
              Math.min(old + 1, MOCK_DATA_LIMIT / POST_LIMIT_IN_PAGE),
            );
          }}
        >
          Next
        </button>
      </ul>
    </div>
  );
};
