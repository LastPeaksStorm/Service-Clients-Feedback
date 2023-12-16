import React, {useEffect, useRef, useState} from 'react';
import {usePosts} from "../hooks/usePosts";
import {getPagesCount} from "../utils/pages";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import PostFilter from "../components/PostFilter";
import PostForm from "../components/UI/PostForm";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostList from "../components/UI/PostList";
import Loader from "../components/UI/Loader/Loader";
import Pagintation from "../components/UI/pagination/Pagination";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";


function Posts() {
  const [posts, setPosts] = useState([]);
  
  const [filter, setFilter] = useState({sortOption: '', query: ''});
  const [modal, setModal] = useState(false);
  const searchedAndSortedPosts = usePosts(posts, filter.sortOption, filter.query);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();
  
  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPagesCount(totalCount, limit));
  })
  
  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  })
  
  
  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);
  
  const addPost = post => {
    setPosts([...posts, post]);
  }
  
  const removePost = post => {
    setPosts(posts.filter(curr => curr.id !== post.id));
  }
  
  const changePage = page => {
    setPage(page);
  }
  
  return (
    <div className="App">
      <MyButton style={{marginTop: 20}} onClick={() => setModal(true)}>
        New Post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm addPost={addPost}/>
      </MyModal>
      
      <hr style={{margin: '15px 0'}}/>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue={'Number of posts on the page'}
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'Show all'}
        ]}
      />
      {postError &&
        <h1 style={{textAlign: "center"}}>
          An error ocurred ${postError}
        </h1>
      }
      {isPostsLoading
        ?
        <div style={{marginTop: 50, display: 'flex', justifyContent: 'center'}}>
          <Loader/>
        </div>
        :
        <div>
          <PostList removePost={removePost} posts={searchedAndSortedPosts} title='Lorem posts'/>
          <div ref={lastElement}></div>
        </div>
      }
    </div>
  )
}

export default Posts;
