import React from "react";
import { InfinitePosts, Post } from "./components";

const App = () => {
  const [postId, setPostId] = React.useState(-1);

  return (
    <div>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <InfinitePosts setPostId={setPostId} />
      )}
    </div>
  );
};

export default App;
