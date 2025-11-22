import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Alert, Modal, Spinner, Stack } from "react-bootstrap";

const EditProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true); // Fetch loading
  const [saving, setSaving] = useState(false);  // Save loading
  const [deleteLoading, setDeleteLoading] = useState(false); // Delete loading
  const [error, setError] = useState("");       // API error messages
  const [success, setSuccess] = useState("");   // Success message
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch existing product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setFormData({
          title: res.data.title || "",
          price: res.data.price?.toString() || "",
          description: res.data.description || "",
          category: res.data.category || "",
          image: res.data.image || "",
        });
      } catch (err) {
        setError("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price), // Convert price to number
      };
      await axios.put(`https://fakestoreapi.com/products/${productId}`, payload);
      setSuccess("Product updated successfully!");

      //Redirect to Product listing page after successful edit
      // Wait 2 seconds before redirect
      setTimeout(() => {
        navigate("/products");
      }, 2000); // 2000ms = 2 seconds
    } catch (err) {
      setError("Failed to update product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Handle product deletion
  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`https://fakestoreapi.com/products/${productId}`);
      alert("Product deleted successfully.");
      navigate("/products"); // Redirect after delete
    } catch (err) {
      alert("Failed to delete product.");
    } finally {
      setDeleteLoading(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <p className="mt-2">Loading product...</p>
      </Container>
    );
  }

  if (!formData) {
    return <Container className="mt-5"><Alert variant="danger">{error || "Product not found."}</Alert></Container>;
  }

  return (
    <Container style={{ maxWidth: "600px", marginTop: "30px" }}>
      <h2>Edit Product</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product title"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price ($)</Form.Label>
          <Form.Control
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
            step="0.01"
            min="0"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter product category"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
        </Form.Group>

        <Stack direction="horizontal" gap={2} className="mb-3 flex-wrap">
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? (
              <>
                <Spinner as="span" animation="border" size="sm" /> Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>

          <Button
            variant="danger"
            onClick={() => setShowDeleteModal(true)}
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <>
                <Spinner as="span" animation="border" size="sm" /> Deleting...
              </>
            ) : (
              "Delete Product"
            )}
          </Button>
        </Stack>
      </Form>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={deleteLoading}
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EditProductPage;
