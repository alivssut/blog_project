import React from 'react';
import { useState, useEffect } from "react";
import './../static/css/posts.css';
import PaginationComponent from '../components/pagination'
import axios from "axios";
import PostList from '../components/posts/postList';

const PostPage = () => {
  const [count, setCount] = useState([])
  const search = window.location.search;
  const params = new URLSearchParams(search);

  function postCountHandler(count) {
    setCount(count)
  }

  return (
    <div>
      <PostList page={(params.get('page') == null ? 1 : params.get('page'))} countHandler={postCountHandler} />
      <PaginationComponent count={count} currentPage={params.get('page') == null ? 1 : params.get('page')} />
    </div>
  );
};

export default PostPage;