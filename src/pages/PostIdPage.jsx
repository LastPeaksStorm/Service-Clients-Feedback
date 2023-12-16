import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  
  const [fetchPostById, isLoading, error] = useFetching(async id => {
    const respone = await PostService.getById(id);
    setPost(respone.data);
  })
  const [fetchComments, isComLoading, comError] = useFetching(async id => {
    const respone = await PostService.getCommentsById(id);
    setComments(respone.data);
  })
  
  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);
  
  
  return (
    <div style={{marginLeft: 15}}>
      <h1>This is post with ID: {params.id}</h1>
      {isLoading
        ? <Loader/>
        : <div>{post.id}. {post.title}</div>
      }
      <h1>
        Comments
      </h1>
      {isComLoading
        ? <Loader/>
        : <div>
          {comments.map(comm =>
            <div key={comm.id} style={{marginTop: 15}}>
              <h5>{comm.email}</h5>
              <div>{comm.body}</div>
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default PostIdPage;
