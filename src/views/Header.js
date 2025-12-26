import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import {React, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom"

function Header() {

    let user = JSON.parse(localStorage.getItem("user-info"));
    const navigate = useNavigate();

   
    function logout() {
        localStorage.clear();
        navigate("/login");
     }
    
    
    return(

        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto navbar_wrapper">
                        {
                            localStorage.getItem("user-info") ?
                            <>
                                <Link to="/addproduct">Add Product</Link>
                                <Link to="/updateproduct">Update Product</Link>
                            </>
                            :
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </>
                             
                        }
                        
                        
                        
                    </Nav> 
                    { localStorage.getItem("user-info") ?
                        <Nav>
                            <NavDropdown title={user && user.name}>
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        :
                        null
                    }
                    
                </Container>
            </Navbar>
        
        </div>
    )
}

export default Header