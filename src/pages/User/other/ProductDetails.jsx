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
  const [related, setRelated] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await getProducts();
        const found = products.find((p) => String(p.id) === String(id));
        setProduct(found || null);
        // Related products: same category, not this product
        if (found) {
          const relatedProducts = products.filter(
            (p) =>
              p.category &&
              found.category &&
              p.category.trim().toLowerCase() === found.category.trim().toLowerCase() &&
              String(p.id) !== String(found.id)
          );
          setRelated(relatedProducts.slice(0, 6)); // Show up to 6 related
        } else {
          setRelated([]);
        }
      } catch {
        setProduct(null);
        setRelated([]);
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
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow p-3 sm:p-6 mt-4 mb-8">
      <div className="flex flex-col lg:flex-row gap-6">
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
            className="rounded-xl w-full max-w-xs h-56 object-cover bg-[#f8faf5] border"
          />
        </div>
        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-lg font-bold text-[#222] mb-1">{product.name}</h1>
            <div className="text-[#8CA566] font-semibold text-base mb-2">
              ₦{product.price?.toLocaleString() || '0.00'}
            </div>
            <div className="mb-3">
              <span className="inline-block bg-[#e6f2d9] text-[#4C862D] text-xs px-3 py-1 rounded-full mr-2">
                {product.category}
              </span>
              <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                Stock: {product.stock_quantity}
              </span>
            </div>
            <p className="text-gray-700 text-xs mb-4">{product.description}</p>
          </div>
          <div className="flex gap-4 mt-2">
            {!added ? (
              <button
                className="flex items-center gap-2 bg-[#8CA566] hover:bg-[#6d8f3c] text-white font-semibold px-4 py-2 rounded-lg shadow transition text-xs"
                onClick={handleAddToCart}
              >
                <FiShoppingCart size={16} />
                Add to Cart
              </button>
            ) : (
              <button
                className="flex items-center gap-2 bg-[#8CA566] hover:bg-[#6d8f3c] text-white font-semibold px-4 py-2 rounded-lg shadow transition text-xs"
                onClick={handleProceedToCheckout}
              >
                <FiShoppingCart size={16} />
                Proceed to Checkout
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="text-base font-semibold text-[#8CA566] mb-3">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {related.map((item) => (
              <div
                key={item.id}
                className="bg-[#f8faf5] border border-[#e6f2d9] rounded-lg p-2 flex flex-col items-start cursor-pointer hover:shadow min-w-0"
                onClick={() => navigate(`/products/${item.id}`)}
              >
                <img
                  src={
                    item.image
                      ? item.image.startsWith('http')
                        ? item.image
                        : `https://cleanwave-backend-xetsd.ondigitalocean.app/${item.image}`
                      : placeholderImage
                  }
                  alt={item.name}
                  className="w-full h-20 object-cover rounded mb-1"
                />
                <div className="font-semibold text-xs text-[#222] truncate w-full">{item.name}</div>
                <div className="text-[11px] text-gray-500 w-full truncate">{item.description}</div>
                <div className="font-bold text-[#8CA566] mt-1 text-xs">₦{item.price || '0.00'}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;