import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, removeFromCart } from '../../../../redux/cart/cartSlice';
import { placeOrder } from '../../../../services/orderService';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FiTrash2, FiMinus, FiPlus, FiShoppingCart, FiCheckCircle } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Local state for quantity adjustment
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.id] = item.quantity || 1;
      return acc;
    }, {})
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price * (quantities[item.id] || 1)),
    0
  );
  const shippingFee = subtotal > 0 ? 1500 : 0;
  const grandTotal = subtotal + shippingFee;

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.info('Item removed from cart');
  };

  const handleQuantityChange = (id, delta, stock) => {
    setQuantities((prev) => {
      const newQty = Math.max(1, Math.min((prev[id] || 1) + delta, stock || 99));
      return { ...prev, [id]: newQty };
    });
  };

  const handlePlaceOrder = async () => {
    if (!cartItems.length) return;
    setLoading(true);
    try {
      const products = cartItems.map(item => ({
        product_id: item.id,
        quantity: quantities[item.id] || 1,
      }));

      await placeOrder(products, token);

      toast.success('Order placed successfully!');
      dispatch(clearCart());
      setTimeout(() => navigate('/marketplace/orders'), 1200);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
        'Failed to place order. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow p-2 sm:p-4 mt-4 mb-12">
      <ToastContainer position="top-center" />
      <h1 className="text-[1rem] sm:text-lg font-bold mb-4 text-[#222] flex items-center gap-2">
        <FiShoppingCart className="inline-block text-[#8CA566] text-[1.1rem] sm:text-xl" />
        Checkout
      </h1>
      {cartItems.length === 0 ? (
        <div className="text-gray-500 py-12 text-xs sm:text-sm">
          Your cart is empty.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full mb-4 min-w-[340px]">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-1 text-xs sm:text-sm">Product</th>
                  <th className="text-center py-1 text-xs sm:text-sm">Qty</th>
                  <th className="text-right py-1 text-xs sm:text-sm">Price</th>
                  <th className="text-right py-1"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id} className="border-b last:border-b-0">
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            item.image
                              ? item.image.startsWith('http')
                                ? item.image
                                : `https://cleanwave-backend-xetsd.ondigitalocean.app/${item.image}`
                              : 'https://via.placeholder.com/40x40?text=No+Image'
                          }
                          alt={item.name}
                          className="w-8 h-8 object-cover rounded"
                        />
                        <span className="font-semibold text-xs sm:text-sm">{item.name}</span>
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 text-xs flex items-center justify-center"
                          onClick={() => handleQuantityChange(item.id, -1)}
                          disabled={quantities[item.id] <= 1 || loading}
                          aria-label="Decrease quantity"
                        >
                          <FiMinus />
                        </button>
                        <span className="w-6 text-center text-xs sm:text-sm">{quantities[item.id]}</span>
                        <button
                          type="button"
                          className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 text-xs flex items-center justify-center"
                          onClick={() => handleQuantityChange(item.id, 1, item.stock_quantity)}
                          disabled={loading || (item.stock_quantity && quantities[item.id] >= item.stock_quantity)}
                          aria-label="Increase quantity"
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </td>
                    <td className="text-right text-xs sm:text-sm">
                      ₦{(item.price * (quantities[item.id] || 1)).toLocaleString()}
                    </td>
                    <td className="text-right">
                      <button
                        className="text-red-500 hover:text-red-700 text-base"
                        onClick={() => handleRemove(item.id)}
                        disabled={loading}
                        aria-label="Remove item"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Totals - always left aligned */}
          <div className="mb-2">
            <div className="flex justify-between items-center text-[10px] sm:text-sm mb-2">
              <span className="font-semibold">Subtotal:</span>
              <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-xs sm:text-sm mb-2">
              <span className="font-semibold">Shipping Fee:</span>
              <span className="font-semibold">₦{shippingFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-xs sm:text-sm mb-3">
              <span className="font-bold flex items-center gap-1">
                <FiCheckCircle className="text-[#8CA566]" />
                Grand Total:
              </span>
              <span className="font-bold text-[#8CA566]">₦{grandTotal.toLocaleString()}</span>
            </div>
          </div>
          <button
            className="w-full bg-[#8CA566] hover:bg-[#6d8f3c] text-white font-semibold py-2 rounded-lg shadow transition text-xs sm:text-sm flex items-center justify-center"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? (
              <>
                <FiShoppingCart className="mr-2 animate-spin" /> Placing Order...
              </>
            ) : (
              <>
                <FiCheckCircle className="mr-2" /> Place Order
              </>
            )}
          </button>
          <div className="mt-4 text-[10px] sm:text-xs text-gray-500 text-left">
            By placing your order, you agree to our{' '}
            <a href="/terms" className="underline text-[#8CA566]">Terms of Service</a> and{' '}
            <a href="/privacy" className="underline text-[#8CA566]">Privacy Policy</a>.
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;