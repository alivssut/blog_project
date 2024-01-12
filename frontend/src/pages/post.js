import React from 'react';
import { useState, useEffect } from "react";
import { Card, Container, Row, Col } from 'react-bootstrap';
import './../static/css/posts.css';
import PaginationComponent from '../components/pagination'
import axios from "axios";
import { Link } from "react-router-dom";

const PostPage = () => {
  const [posts, setPosts] = useState([])
  const [count, setCount] = useState([])
  const search = window.location.search;
  const params = new URLSearchParams(search);
  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/posts?page=" + (params.get('page') == null ? 1 : params.get('page'))).then((response) => {
      if (response.status === 200) {
        setCount(response.data.count)
        setPosts(response.data.results)
      }
    }).catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <div className="posts-container">
              {posts.map((post) => {
                  const date = new Date(post.updated)
                  const formattedDate = date.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })
                return(
                  <div key={post.id} className="posts-item">
                  <Link to={'/posts/' + post.id} className='posts-link'>
                    <div className="posts-image">
                      <img src={post.image} alt={post.title} />
                    </div>
                  </Link>
                  <div className="posts-content">
                  <Link to={'/posts/' + post.id} className='posts-link'>
                    <h3>{post.title}</h3>
                    <p>{formattedDate}</p>
                    </Link>
                    <p className='posts-summary'>{post.summary}</p>
                  </div>
                </div>
                )
              })}
            </div>
          </Col>
        </Row>
      </Container>
      <PaginationComponent count={count} currentPage={params.get('page') == null ? 1 : params.get('page')} />
    </div>
  );
};

export default PostPage;