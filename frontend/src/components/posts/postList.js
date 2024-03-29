import React from 'react';
import { useState, useEffect } from "react";
import { Card, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { Link } from "react-router-dom";

export default function PostList(props) {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <div className="posts-container">
              {props.posts.map((post) => {
                const date = new Date(post.updated)
                const formattedDate = date.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })
                return (
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
    </div>
  );
}
