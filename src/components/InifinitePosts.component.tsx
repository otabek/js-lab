import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createMockPost, fetchMockPosts } from "../data";
import { useInView } from "react-intersection-observer";

export const InfinitePosts = ({
  setPostId,
}: {
  setPostId: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const queryClient = useQueryClient();
  const { ref, inView } = useInView();
  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: fetchMockPosts,
      initialPageParam: 0,
      getNextPageParam: (page) => page.nextPage,
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

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

  if (status == "pending") return <div>Loading...</div>;
  if (status == "error") return <div>{error.message}</div>;

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
        </ul>
      ))}
      <div ref={ref} style={{ height: "50px", textAlign: "center" }}>
        {isFetchingNextPage && "Loading..."}
      </div>
    </div>
  );
};
