import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'; 
import ProductListingPage from './components/ProductListingPage';
import ProductDetail from './components/ProductDetailsPage';
import AddProduct from './components/AddProductPage';
import NavigationBar from "./components/Navbar";
import EditProductPage from './components/EditProductPage'; 

function App() {

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/products/:productId/edit" element={<EditProductPage />} />

      </Routes>
      </>
  );
}
export default App
