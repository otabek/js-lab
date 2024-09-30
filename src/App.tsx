import { useState } from "react";
import { Post, Posts } from "./components";

export function App() {
    const [postId, setPostId] = useState(-1);

    return (
        <div>
            {postId > -1 ? (
                <Post postId={postId} setPostId={setPostId} />
            ) : (
                <Posts setPostId={setPostId} />
            )}
        </div>
    );
}
