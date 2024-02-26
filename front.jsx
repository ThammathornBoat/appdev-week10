// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/products', newProduct);
      fetchProducts();
      setNewProduct({ name: '', price: 0 });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h1>Product Management System</h1>
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - ${product.price}
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={newProduct.name} onChange={handleChange} placeholder="Product Name" required />
        <input type="number" name="price" value={newProduct.price} onChange={handleChange} placeholder="Price" required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default App;
