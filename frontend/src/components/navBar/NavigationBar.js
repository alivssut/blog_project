import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useEffect, useState } from 'react';
import axios from "axios";

function NavigationBar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {

    axios({
      method: "get",
      url: "http://localhost:8000/api/v1/categories/",
      headers: {
        "Content-Type": "multipart/form-data"
      },
    }).then((response) => {
      const data = response.data;
      setCategories(data.results.map(item => [{ "id": item.id, "name": item.name, "slug": item.slug}]))
    }).catch((error) => {
    });
  }, []);


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/posts/">posts</Nav.Link>
            <NavDropdown title="categories" id="navbarScrollingDropdown">
              {categories.map((category, index) => (
                <NavDropdown.Item href={'/category/' + category[0].slug}>{category[0].name}</NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;