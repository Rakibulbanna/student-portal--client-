import { useContext } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setLoggedInUser();
  };

  return (
    <Navbar expand="lg" className="bg-secondary p-2 text-white bg-opacity-50 rounded-3">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Student Portal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          {loggedInUser ? (<Nav.Link>Phone Number : {loggedInUser?.mobileNumber}</Nav.Link>):("")}
            <Nav.Link as={Link} to="/dashboard">
              dashboard
            </Nav.Link>

            {loggedInUser ? (
              <Nav.Link as={Link} to="/transaction">
                Transaction
              </Nav.Link>
            ) : (
              ""
            )}
            {!loggedInUser ? (
              <Button as={Link} to="/login">
                Login
              </Button>
            ) : (
              <Button onClick={() => handleSignOut()}>Logout</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
