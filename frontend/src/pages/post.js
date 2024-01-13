import React from 'react';
import { useState, useEffect } from "react";
import './../static/css/posts.css';
import PaginationComponent from '../components/pagination'
import axios from "axios";
import PostList from '../components/posts/postList';

const PostPage = () => {
  const [count, setCount] = useState([])
  const [posts, setPosts] = useState([])
  const search = window.location.search;
  const params = new URLSearchParams(search);

  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/posts?page=" + (params.get('page') == null ? 1 : params.get('page'))).then((response) => {
      if (response.status === 200) {
        setPosts(response.data.results)
        setCount(response.data.count)
      }
    }).catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <PostList posts={posts} />
      <PaginationComponent count={count} currentPage={params.get('page') == null ? 1 : params.get('page')} />
    </div>
  );
};

export default PostPage;