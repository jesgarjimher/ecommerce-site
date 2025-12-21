import { Container, Nav, Navbar } from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom"

function Header() {

    return(

        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto navbar_wrapper">
                        <Link to="/addproduct">Add Product</Link>
                        <Link to="/updateproduct">Update Product</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </Nav>
                </Container>
            </Navbar>
        
        </div>
    )
}

export default Header