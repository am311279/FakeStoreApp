import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // Handle form field change
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  // Submit (POST) new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const response = await axios.post(
        "https://fakestoreapi.com/products",
        product
      );

      console.log("Product Created:", response.data);
      setSuccess("Product created successfully!");

      // Clear form
      setProduct({
        title: "",
        price: "",
        description: "",
        category: ""
      });
      //Redirect to Product listing page after successful edit
      // Wait 2 seconds before redirect
      setTimeout(() => {
        navigate("/");
      }, 2000); // 2000ms = 2 seconds
    } catch (error) {
      console.error("Error creating product:", error);
      setSuccess("Failed to create product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ maxWidth: "600px", marginTop: "30px" }}>
      <h2>Add New Product</h2>

      {success && (
        <Alert
          variant={success.includes("Failed") ? "danger" : "success"}
          className="mt-3"
        >
          {success}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group className="mb-3">
          <Form.Label>Product Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter product title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price ($)</Form.Label>
          <Form.Control
            type="number"
            name="price"
            placeholder="Enter price"
            value={product.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            placeholder="Enter product description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            placeholder="Enter product category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Product"}
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
