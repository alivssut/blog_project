import React from 'react';
import { useState, useEffect } from "react";
import { Card, Container, Row, Col } from 'react-bootstrap';
import './PostPage.css';
import PaginationComponent from '../components/pagination'
import axios from "axios";

const PostPage = () => {
  const [posts, setPosts] = useState([])
  const [count, setCount] = useState([])
  const search = window.location.search;
  const params = new URLSearchParams(search); 
  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/posts?page="+(params.get('page') == null ? 1 : params.get('page') )).then((response) => {
      if (response.status === 200 ){
        console.log(response.data)
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
          <div className="post-container">
            {posts.map((post) => (
              <div key={post.id} className="post-item">
                <div className="post-image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="post-content">
                  <h3>{post.title}</h3>
                  <p>{post.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
    <PaginationComponent count={count} currentPage={params.get('page') == null ? 1 : params.get('page') }/>
    </div>
  );
};

export default PostPage;