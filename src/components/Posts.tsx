import { useState } from "react";
import {
    useQueryClient,
    useQuery,
    useMutation
} from "@tanstack/react-query";
import { createMockPost, fetchMockPosts } from "../data";

export function Posts({
    setPostId
}: {
    setPostId: React.Dispatch<React.SetStateAction<number>>;
}) {
    const queryClient = useQueryClient();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const {
        data: posts,
        isLoading,
        isError
    } = useQuery({ queryKey: ["posts"], queryFn: fetchMockPosts });

    const mutation = useMutation({
        mutationFn: createMockPost,
        onSuccess: () => {
            // Invalidate and refetch the posts query after a successful mutation
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        }
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        mutation.mutate({
            title,
            body,
            userId: 1,
            id: Date.now()
        });
        setTitle("");
        setBody("");
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading posts</div>;

    return (
        <div>
            <h1>Posts</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Post Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Post Body"
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
                                // We can access the query data here to show
                                // bold links for ones that are cached
                                queryClient.getQueryData(["post", post.id])
                                    ? {
                                          fontWeight: "bold",
                                          color: "green"
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
        </div>
    );
}
