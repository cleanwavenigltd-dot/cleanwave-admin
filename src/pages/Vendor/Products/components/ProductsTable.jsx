import React, { useEffect, useState } from 'react';
import Table from '../../../../components/ui/Table';
import Modal from '../../../../components/ui/Modal';
import FloatingInput from '../../../../components/ui/FloatingInput';
import Button from '../../../../components/ui/Button';
import { getVendorProducts, addProduct } from '../../../../services/marketplaceService';
import { PlusCircle, Tag, ClipboardList, DollarSign, Layers, Archive } from 'lucide-react';

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpinn.ai%2Fproduct%2Fimage-generator-1000%2F&psig=AOvVaw29tLsEzE2imesTd9M3LQkb&ust=1747412747849000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMjUxPTxpY0DFQAAAAAdAAAAABAE',
    category: '',
    stock_quantity: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getVendorProducts(token);
        setProducts(
          data.map((product) => ({
            id: product.id,
            name: product.name,
            category: product.category,
            price: `₦${product.price.toLocaleString()}`,
            stock_quantity: product.stock_quantity,
          }))
        );
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    const token = localStorage.getItem('token');
    try {
      const newProduct = {
        ...formData,
        price: parseFloat(formData.price), // Ensure price is a number
        stock_quantity: parseInt(formData.stock_quantity, 10), // Ensure stock_quantity is a number
      };

      await addProduct(token, newProduct);
      alert('Product added successfully!');
      setIsModalOpen(false);

      // Refresh the product list
      const updatedProducts = await getVendorProducts(token);
      setProducts(
        updatedProducts.map((product) => ({
          id: product.id,
          name: product.name,
          category: product.category,
          price: `₦${product.price.toLocaleString()}`,
          stock_quantity: product.stock_quantity,
        }))
      );
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const columns = [
    { key: 'id', label: 'ID', icon: <Tag size={16} /> },
    { key: 'name', label: 'Name', icon: <ClipboardList size={16} /> },
    { key: 'category', label: 'Category', icon: <Layers size={16} /> },
    { key: 'price', label: 'Price', icon: <DollarSign size={16} /> },
    { key: 'stock_quantity', label: 'Stock', icon: <Archive size={16} /> },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Products</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#8CA566] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#4C862D] transition"
        >
          <PlusCircle size={16} />
          Add Product
        </button>
      </div>
      <Table
        columns={columns}
        data={products}
        loading={loading}
        rowsPerPage={5}
        icons={columns.reduce((acc, col) => {
          acc[col.key] = col.icon;
          return acc;
        }, {})}
      />

      {/* Modal for Adding Product */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Add Product</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddProduct();
          }}
        >
          <FloatingInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <FloatingInput
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <FloatingInput
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
          />
          <FloatingInput
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
          <FloatingInput
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />
          <FloatingInput
            label="Stock Quantity"
            name="stock_quantity"
            type="number"
            value={formData.stock_quantity}
            onChange={handleInputChange}
          />
          <div className="flex justify-end gap-4 mt-4">
            <Button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-300 text-gray-700 hover:bg-gray-400"
            >
              Cancel
            </Button>
            <Button type="submit" isActive={true}>
              Add Product
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProductsTable;