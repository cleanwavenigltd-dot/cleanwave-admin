import React, { useEffect, useState } from 'react';
import Table from '../../../../components/ui/Table';
import Modal from '../../../../components/ui/Modal';
import FloatingInput from '../../../../components/ui/FloatingInput';
import Button from '../../../../components/ui/Button';
import { getVendorProducts, addProduct, deleteProduct } from '../../../../services/marketplaceService';
import { PlusCircle, Tag, ClipboardList, DollarSign, Layers, Archive, Trash2 } from 'lucide-react';

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    category: '',
    stock_quantity: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
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
    actions: '', // Add this line
  }))
);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

const handleAddProduct = async () => {
  if (!formData.name || !formData.price || !formData.stock_quantity) {
    alert('Name, price, and stock quantity are required.');
    return;
  }

  const token = localStorage.getItem('token');
  try {
    const productData = new FormData();
    productData.append('name', String(formData.name));
    productData.append('description', String(formData.description || ''));
    productData.append('price', String(formData.price));
    productData.append('category', String(formData.category || ''));
    productData.append('stock_quantity', String(formData.stock_quantity));
    if (formData.image) {
      productData.append('image', formData.image);
    }

    await addProduct(productData, token);
    alert('Product added successfully!');
    setIsModalOpen(false);
    setFormData({
      name: '',
      description: '',
      price: '',
      image: null,
      category: '',
      stock_quantity: '',
    });
    fetchProducts();
  } catch (error) {
    alert(error?.response?.data?.message || 'Failed to add product.');
  }
};

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

const handleDelete = async (productId) => {
  if (window.confirm('Are you sure you want to delete this product?')) {
    try {
      const token = localStorage.getItem('token');
      console.log('Deleting product:', productId, 'with token:', token); // Debug
      await deleteProduct(productId, token);
      fetchProducts();
    } catch (error) {
      alert(error?.response?.data?.message || 'Failed to delete product.');
    }
  }
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
  actions={[
    {
      label: <Trash2 size={16} />,
      className: "text-red-600 hover:bg-red-50",
      onClick: (row) => handleDelete(row.id),
    },
  ]}
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg"
            />
          </div>
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