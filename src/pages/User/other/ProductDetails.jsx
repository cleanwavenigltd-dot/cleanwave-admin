import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/cart/cartSlice';
import { getProducts } from '../../../services/marketplaceService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const placeholderImage = "https://via.placeholder.com/400x300?text=No+Image";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await getProducts();
        const found = products.find((p) => String(p.id) === String(id));
        setProduct(found || null);
      } catch {
        setProduct(null);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      setAdded(true);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleProceedToCheckout = () => {
    navigate('/marketplace/cart');
  };

  if (!product) {
    return (
      <div className="w-full flex justify-center items-center min-h-[60vh]">
        <div className="text-gray-400 text-lg">Product not found.</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow p-4 sm:p-8 mt-4 mb-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <div className="flex-shrink-0 w-full lg:w-1/2 flex justify-center items-center">
          <img
            src={
              product.image
                ? product.image.startsWith('http')
                  ? product.image
                  : `https://cleanwave-backend-xetsd.ondigitalocean.app/${product.image}`
                : placeholderImage
            }
            alt={product.name}
            className="rounded-xl w-full max-w-xs h-64 object-cover bg-[#f8faf5] border"
          />
        </div>
        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#222] mb-2">{product.name}</h1>
            <div className="text-[#8CA566] font-semibold text-lg mb-4">
              ₦{product.price?.toLocaleString() || '0.00'}
            </div>
            <div className="mb-4">
              <span className="inline-block bg-[#e6f2d9] text-[#4C862D] text-xs px-3 py-1 rounded-full mr-2">
                {product.category}
              </span>
              <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                Stock: {product.stock_quantity}
              </span>
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <table className="w-full text-sm mb-6">
              <tbody>
                <tr>
                  <td className="py-2 font-semibold text-gray-500">Product ID:</td>
                  <td className="py-2">{product.id}</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-gray-500">Category:</td>
                  <td className="py-2">{product.category}</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-gray-500">Vendor ID:</td>
                  <td className="py-2">{product.vendor_id}</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-gray-500">Created At:</td>
                  <td className="py-2">{new Date(product.created_at).toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-gray-500">Last Updated:</td>
                  <td className="py-2">{new Date(product.updated_at).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex gap-4 mt-4">
            {!added ? (
              <button
                className="flex items-center gap-2 bg-[#8CA566] hover:bg-[#6d8f3c] text-white font-semibold px-6 py-3 rounded-lg shadow transition"
                onClick={handleAddToCart}
              >
                <FiShoppingCart size={20} />
                Add to Cart
              </button>
            ) : (
              <button
                className="flex items-center gap-2 bg-[#8CA566] hover:bg-[#6d8f3c] text-white font-semibold px-6 py-3 rounded-lg shadow transition"
                onClick={handleProceedToCheckout}
              >
                <FiShoppingCart size={20} />
                Proceed to Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;