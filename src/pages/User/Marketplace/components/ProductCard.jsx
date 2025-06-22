import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';

const placeholderImage = "https://via.placeholder.com/150x120?text=No+Image";

const ProductCard = ({ product, onClick, onAddToCart }) => (
  <div
    className="relative flex flex-col items-start bg-[#f8faf5] border border-[#e6f2d9] rounded-xl p-3 transition hover:shadow-md cursor-pointer"
    onClick={() => onClick(product.id)}
  >
    <img
      src={
        product.image
          ? product.image.startsWith('http')
            ? product.image
            : `https://cleanwave-backend-xetsd.ondigitalocean.app/${product.image}`
          : placeholderImage
      }
      alt={product.name}
      className="w-full h-28 object-cover rounded-lg mb-2"
    />
    <div className="w-full">
      <div className="font-semibold text-sm text-[#222] truncate">{product.name || 'No Name'}</div>
      <div className="text-xs text-gray-500 truncate">{product.description || 'No Description'}</div>
      <div className="font-bold text-[#8CA566] mt-2 text-sm">₦{product.price || '0.00'}</div>
    </div>
    <button
      className="absolute top-3 right-3 bg-[#8CA566] p-2 rounded-full shadow hover:bg-[#6d8f3c] transition"
      onClick={e => {
        e.stopPropagation();
        onAddToCart(product);
      }}
      title="Add to cart"
    >
      <FiShoppingCart size={18} color="#fff" />
    </button>
  </div>
);

export default ProductCard;