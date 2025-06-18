import React, { useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../redux/cart/cartSlice';
import { getProducts } from '../../../../services/marketplaceService';
import { useNavigate } from 'react-router-dom';

const placeholderImage = "https://via.placeholder.com/150x120?text=No+Image";

const NearbyProductCard = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getProducts();
        setProducts(productData || []);
      } catch {
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    // Optionally show a toast here
  };

  const handleCardClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="w-full">
      <div className="font-bold text-[#8CA566] mb-3">Recent Products</div>
      {products.length === 0 ? (
        <div className="text-gray-400 text-center py-8">No products available</div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {products.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col items-start bg-[#f8faf5] border border-[#e6f2d9] rounded-xl p-3 transition hover:shadow-md cursor-pointer"
              onClick={() => handleCardClick(item.id)}
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
                className="w-full h-28 object-cover rounded-lg mb-2"
              />
              <div className="w-full">
                <div className="font-semibold text-sm text-[#222] truncate">{item.name || 'No Name'}</div>
                <div className="text-xs text-gray-500 truncate">{item.description || 'No Description'}</div>
                <div className="font-bold text-[#8CA566] mt-2 text-sm">₦{item.price || '0.00'}</div>
              </div>
              <button
                className="absolute top-3 right-3 bg-[#8CA566] p-2 rounded-full shadow hover:bg-[#6d8f3c] transition"
                onClick={e => {
                  e.stopPropagation();
                  handleAddToCart(item);
                }}
                title="Add to cart"
              >
                <FiShoppingCart size={18} color="#fff" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NearbyProductCard;