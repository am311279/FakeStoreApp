import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Image, Stack } from 'react-bootstrap';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Delete product
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setDeleteLoading(true);
    try {
      await axios.delete(`https://fakestoreapi.com/products/${productId}`);
      alert('Product deleted successfully.');
      navigate("/products"); // redirect after deletion
    } catch (err) {
      alert('Failed to delete product.');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Dummy cart handler
  const handleAddToCart = () => {
    alert('Product added to cart!');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container style={{ maxWidth: "600px", marginTop: "30px" }}>
      <Image
        src={product.image}
        alt={product.title}
        fluid
        rounded
        className="mb-3"
      />

      <h2>{product.title}</h2>
      <p><strong>Category:</strong> {product.category}</p>
      <p>{product.description}</p>
      <h3>${product.price}</h3>

      {/* Buttons */}
      <Stack direction="horizontal" gap={2} className="mt-3">
        <Button variant="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>

        <Button
          as={Link}
          to={`/products/${productId}/edit`}
          variant="warning"
        >
          Edit Product
        </Button>

        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={deleteLoading}
        >
          {deleteLoading ? "Deleting..." : "Delete Product"}
        </Button>
      </Stack>
    </Container>
  );
};

export default ProductDetail;

