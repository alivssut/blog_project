import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate  } from 'react-router-dom';
const Register = () => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password1, setPassword1] = useState('');
  const [password1Error, setPassword1Error] = useState('');
  const [password2, setPassword2] = useState('');
  const [password2Error, setPassword2Error] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedGenderError, setSelectedGenderError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.append('username', username);
    bodyFormData.append('first_name', firstName);
    bodyFormData.append('last_name', lastName);
    bodyFormData.append('password1', password1);
    bodyFormData.append('password2', password2);
    bodyFormData.append('gender', selectedGender);
    bodyFormData.append('email', email);
    axios({
      method: "post",
      url: "http://localhost:8000/api/v1/auth/registration/",
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data"
      },
    })
      .then(function (response) {
        if (response.status === 201) {
          localStorage.setItem('token', response.data.key);
          navigate("/");
        }
      })
      .catch(function (error) {
        //handle error
        if (error.response.data.hasOwnProperty('username')) {
          setUsernameError(error.response.data.username.join(', '))
        } else {
          setUsernameError('')
        }
        if (error.response.data.hasOwnProperty('email')) {
          setEmailError(error.response.data.email.join(', '))
        } else {
          setEmailError('')
        }
        if (error.response.data.hasOwnProperty('first_name')) {
          setFirstNameError(error.response.data.first_name.join(', '))
        } else {
          setFirstNameError('')
        }
        if (error.response.data.hasOwnProperty('last_name')) {
          setLastNameError(error.response.data.last_name.join(', '))
        } else {
          setLastNameError('')
        }
        if (error.response.data.hasOwnProperty('gender')) {
          setSelectedGenderError(error.response.data.gender.join(', '))
        } else {
          setSelectedGenderError('')
        }
        if (error.response.data.hasOwnProperty('password1')) {
          setPassword1Error(error.response.data.password1.join(', '))
        } else {
          setPassword1Error('')
        }
        if (error.response.data.hasOwnProperty('password2')) {
          setPassword2Error(error.response.data.password2.join(', '))
        } else {
          setPassword2Error('')
        }
      });
  };
  const handleGenderSelectChange = (e) => {
    setSelectedGender(e.target.value);
  };
  return (
    <Container>
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={6}>
          <div className="register-form shadow-lg p-4">
            <h2 className="text-center">Register</h2>
            <Form onSubmit={handleRegister}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <p className='text-danger'>{usernameError}</p>
              </Form.Group>

              <div style={{ 'display': 'flex' }}>
                <Form.Group controlId="formFirstName" style={{ 'width': '50%' }}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <p className='text-danger'>{firstNameError}</p>
                </Form.Group>

                <Form.Group controlId="formLastName" style={{ 'width': '50%' }}>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <p className='text-danger'>{lastNameError}</p>
                </Form.Group>
              </div>


              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className='text-danger'>{emailError}</p>
              </Form.Group>

              <Form.Group controlId="formGender">
                <Form.Label>Gender</Form.Label>
                <Form.Select aria-label="Default select example" value={selectedGender} onChange={handleGenderSelectChange}>
                  <option>Select gender</option>
                  <option value="F">Female</option>
                  <option value="M">Male</option>
                </Form.Select>
                <p className='text-danger'>{selectedGenderError}</p>
              </Form.Group>

              <Form.Group controlId="formPassword1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                />
                <p className='text-danger'>{password1Error}</p>
              </Form.Group>

              <Form.Group controlId="formPassword2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password again"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
                <p className='text-danger'>{password2Error}</p>
              </Form.Group>

              <Button variant="primary" type="submit" block>
                Register
              </Button>
            </Form>

            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;