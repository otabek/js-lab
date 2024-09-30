import { usePost } from "../hooks";

export const Post = ({
    postId,
    setPostId
}: {
    postId: number;
    setPostId: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const { status, data: post, error, isFetching } = usePost(postId);

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
                    <h1>{post?.title}</h1>
                    <div>
                        <p>{post?.body}</p>
                    </div>
                    <div>{isFetching && "Background Updating..."}</div>
                </>
            )}
        </div>
    );
};
