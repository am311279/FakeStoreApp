import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './HomePage.css';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
      <Container className="py-5">
        <Row className="mb-5">
          <Col lg={12} className="text-center">
            <h1 className="display-4 fw-bold mb-3">Welcome to FakeStore!</h1>
            <p className="lead text-muted">
              Your one-stop shop for managing products effortlessly.
              This app will allow users to view, create, update, and delete products
            </p>
          </Col>
        </Row>

        <Row className="g-4 mb-5 justify-content-center">
          <Col lg={12} className="text-center">
            <Card className="h-100 shadow-sm border-0 card-hover">
              <Card.Body className="text-center">
                <div className="icon-circle mb-3"></div>
                <Card.Title className="fw-bold">Product Management</Card.Title>
                <Card.Text>Browse or add products to the store</Card.Text>

                {/* Buttons side by side */}
                <div className="d-flex justify-content-center gap-3 mt-3">
                  <Button as={Link} to="/products" variant="primary">
                    Explore
                  </Button>

                  <Button as={Link} to="/add-product" variant="success">
                    Add New Product
                  </Button>
                </div>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
}

export default HomePage;
