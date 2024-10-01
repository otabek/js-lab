import React from "react";
import { Post, Posts } from "./components";

const App = () => {
  const [postId, setPostId] = React.useState(-1);

  return (
    <div>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
    </div>
  );
};

export default App;
