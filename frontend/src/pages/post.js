import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './PostPage.css';
import PaginationComponent from '../components/pagination'


const PostPage = () => {
  const posts = [
    {
      id: 1,
      title: 'Post 1',
      description: 'This is the description of post 1.',
      imageUrl: 'https://example.com/image1.jpg',
    },
    {
      id: 2,
      title: 'Post 2',
      description: 'This is the description of post 2.',
      imageUrl: 'https://example.com/image2.jpg',
    },
    {
      id: 3,
      title: 'Post 3',
      description: 'This is the description of post 3 klfnjkdb hjgbhdbff dklj njkgbdj kgfbjkgbjh dbhjgbhj bdfgdkjn kbg jkdbgkbkdb kgbjkdjbgkdbgb dkbg kdbgfkb dkgfbkdbfgkbdkgbkdbgkskbgkd kgbh.',
      imageUrl: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    },
  ];

  return (
    <div>
    <Container>
      <Row>
        <Col>
          <div className="post-container">
            {posts.map((post) => (
              <div key={post.id} className="post-item">
                <div className="post-image">
                  <img src={post.imageUrl} alt={post.title} />
                </div>
                <div className="post-content">
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
    <PaginationComponent/>
    </div>
  );
};

export default PostPage;