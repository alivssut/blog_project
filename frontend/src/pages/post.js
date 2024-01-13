import React from 'react';
import { useState, useEffect } from "react";
import './../static/css/posts.css';
import PaginationComponent from '../components/pagination'
import axios from "axios";
import PostList from '../components/posts/postList';
import { useNavigate  } from 'react-router-dom';

const PostPage = () => {
  const [count, setCount] = useState([])
  const [posts, setPosts] = useState([])
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/posts?page=" + (params.get('page') == null ? 1 : params.get('page'))).then((response) => {
      if (response.status === 200) {
        setPosts(response.data.results)
        setCount(response.data.count)
      }
    }).catch((error) => console.log(error));
  }, []);

  const handlePageChange = (page) => {
    navigate("/posts?page=" + page);
    setCurrentPage(page);
    navigate(0);
  };

  return (
    <div>
      <PostList posts={posts} />
      <PaginationComponent count={count} currentPage={params.get('page') == null ? 1 : params.get('page')} handlePageChange={handlePageChange} contentPerPage={5} />
    </div>
  );
};

export default PostPage;