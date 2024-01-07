import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate  } from 'react-router-dom';
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = {
      'email': email,
      'username': username,
      'password': password,
    };
    const headers = {
      headers:{
        'Accept': 'application/json',
        'content-type':'application/json',
      }
    };
    axios.post("http://localhost:8000/api/v1/auth/login/", userData, headers).then((response) => {
      if (response.status === 200 ){
        localStorage.setItem('token', response.data.key);
        navigate("/");
      }
    }).catch((error) => {
      console.log(error)
      setError(error.message)
    });

  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={6}>
          <div className="login-form shadow-lg p-4">
            <h2 className="text-center">Login</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" block>
                Login
              </Button>
            </Form>

            <p className="text-center mt-3">
              Don't have an account? <Link to="/register">Register</Link>
            </p>

            <p className="text-center mt-3 text-danger">
              {error}
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;