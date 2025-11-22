import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const NavigationBar = () => {
  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      className="fixed-top w-100"   // Full width + stuck to top
    >
      <Container fluid>              {/* Full-width container */}
        {/* Brand */}
        <Navbar.Brand as={Link} to="/">
          🛒 FakeStore
        </Navbar.Brand>

        {/* Hamburger toggle for mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/products">
              Products
            </Nav.Link>

            <Nav.Link as={NavLink} to="/add-product">
              Add Product
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
