import React from 'react';
import PostItem from "./PostItem"
import {TransitionGroup, CSSTransition} from "react-transition-group";

const PostList = ({posts, title, removePost}) => {
  if (!posts.length) {
    return (
      <h1 style={{textAlign: 'center'}}>
        No posts, try and add some!
      </h1>
    )}
  
  return (
    <div>
      <h1 style={{textAlign: "center"}}>
        {title}
      </h1>
      <TransitionGroup>
        {posts.map((post, index) =>
          <CSSTransition
            key={post.id}
            timeout={200}
            classNames="post"
          >
            <PostItem removePost={removePost} post={post}/>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

export default PostList;

