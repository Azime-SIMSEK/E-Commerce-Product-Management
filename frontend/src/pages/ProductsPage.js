import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Düzenlenen ürün
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (error) {
        alert("Authorization error! Please log in again.");
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:3000/products",
        { name, price: parseFloat(price), description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProducts([...products, response.data]); // Listeyi günceller
      setName("");
      setPrice("");
      setDescription("");
      setShowAddModal(false); // Modalı kapatır
    } catch (error) {
      alert("An error occurred while adding the product! You might not have the necessary permissions.");
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setShowEditModal(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `http://localhost:3000/products/${selectedProduct.id}`,
        { name, price: parseFloat(price), description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProducts(products.map((p) => (p.id === selectedProduct.id ? response.data : p)));
      setShowEditModal(false); // Modalı kapat
    } catch (error) {
      alert("An error occurred while updating the product!");
    }
  };

  const handleDeleteProduct = async (id) => {
    const token = localStorage.getItem("token");

    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(products.filter((product) => product.id !== id)); // Listeyi günceller
    } catch (error) {
      alert("An error occurred while deleting the product!");
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      <button onClick={() => setShowAddModal(true)}>Add New Product</button>

      {/* Yeni Ürün Ekleme Modali */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Product</h3>
            <form onSubmit={handleAddProduct}>
              <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
              <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
              <button type="submit">Add Product</button>
              <button type="button" onClick={() => setShowAddModal(false)}>Close</button>
            </form>
          </div>
        </div>
      )}

      {/* Ürün Düzenleme Modali */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Product</h3>
            <form onSubmit={handleUpdateProduct}>
              <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
              <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
              <button type="submit">Update</button>
              <button type="button" onClick={() => setShowEditModal(false)}>Close</button>
            </form>
          </div>
        </div>
      )}

      {/* Ürünleri Tablo Olarak Listeleme */}
      {products.length === 0 ? (
        <p>No products available yet.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}₺</td>
                <td>{product.description}</td>
                <td>
                  <button onClick={() => handleEditClick(product)}>Edit</button>
                  <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}    
    </div>
  );
}

export default ProductsPage;
