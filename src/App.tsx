import React, { useState } from "react";
import {
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { fetchMockPosts, fetchPaginatedPosts, getPostById } from "./data";

// Component to display a single post
const Post = ({
  postId,
  setPostId,
}: {
  postId: number;
  setPostId: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { status, data, error, isFetching } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });

  return (
    <div>
      <div>
        <a onClick={() => setPostId(-1)} href="#">
          Back
        </a>
      </div>
      {!postId || status === "pending" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <h1>{data?.title}</h1>
          <div>
            <p>{data?.body}</p>
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </>
      )}
    </div>
  );
};

// Component for paginated posts
const PaginatedPosts = ({
  setPostId,
}: {
  setPostId: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [page, setPage] = useState(1);

  const {
    data: posts,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchMockPosts(page, 5), // Fetch 5 posts per page
    placeholderData: [], // Provides a placeholder for data until new data is fetched
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts</div>;

  return (
    <div>
      <h1>Paginated Posts</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <a onClick={() => setPostId(post.id)} href="#">
              <h3>{post.title}</h3>
            </a>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>

      <div>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1 || isFetching}
        >
          Previous Page
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={isFetching}
        >
          Next Page
        </button>
      </div>

      {isFetching && <span>Loading...</span>}
    </div>
  );
};

// Component for infinite scrolling posts
const InfinitePosts = ({
  setPostId,
}: {
  setPostId: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => fetchPaginatedPosts(pageParam, 5), // Fetch 5 posts per page
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 5 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1, // This is the initialPageParam that was missing
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts</div>;

  return (
    <div>
      <h1>Infinite Scroll Posts</h1>
      <ul>
        {data?.pages.map((page) =>
          page.map((post: any) => (
            <li key={post.id}>
              <a onClick={() => setPostId(post.id)} href="#">
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
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "No more posts"}
        </button>
      </div>
    </div>
  );
};

// Main App component
const App = () => {
  const [postId, setPostId] = useState(-1);
  const [isInfiniteScroll, setIsInfiniteScroll] = useState(true); // Toggle between pagination and infinite scroll

  return (
    <div>
      <button onClick={() => setIsInfiniteScroll(!isInfiniteScroll)}>
        Toggle to {isInfiniteScroll ? "Paginated" : "Infinite Scroll"} Mode
      </button>

      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : isInfiniteScroll ? (
        <InfinitePosts setPostId={setPostId} />
      ) : (
        <PaginatedPosts setPostId={setPostId} />
      )}
    </div>
  );
};

export default App;
