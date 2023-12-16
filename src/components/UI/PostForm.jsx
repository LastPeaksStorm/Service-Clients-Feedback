import React, {useState} from 'react';
import MyInput from "./input/MyInput";
import MyButton from "./button/MyButton";

const PostForm = ({addPost}, ...props) => {
  const [post, setPost] = useState({title: '', body: ''});
  
  const addNewPost = e => {
    e.preventDefault();
    let newPost = {
      id: Date.now(),
      ...post
    }
    addPost(newPost);
    setPost({title: '', body: ''});
  }
  
  return (
    <form onSubmit={addNewPost}>
      <MyInput type='text'
               placeholder='Post name'
               value={post.title}
               onChange={e => setPost({...post, title: e.target.value})}/>
      <MyInput type='text'
               placeholder='Post description'
               value={post.body}
               onChange={e => setPost({...post, body: e.target.value})}/>
      
      <MyButton style={{margin: '10px 0 0'}} type='submit'>Create a post</MyButton>
    </form>
  );
};

export default PostForm;
