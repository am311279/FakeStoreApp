import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProductListingPage.css'; // <-- Add this for hover styles

function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(`Failed to fetch products: ${error.message}`);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-5">Loading products...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col className="text-center">
          <h1 className="display-5 fw-bold mb-3">Product Listing</h1>
        </Col>
      </Row>

      <Row className="g-4">
        {products.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 shadow-sm product-card">

              <div className="image-wrapper">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
              </div>

              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold product-title">
                  {product.title.length > 40
                    ? product.title.substring(0, 40) + "..."
                    : product.title}
                </Card.Title>

                <Card.Text className="text-success fw-semibold">
                  ${product.price}
                </Card.Text>

                <Button
                  as={Link}
                  to={`/products/${product.id}`}
                  variant="primary"
                  className="mt-auto w-100"
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductListingPage;
