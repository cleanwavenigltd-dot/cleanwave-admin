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

  // Billing info state
  const [billing, setBilling] = useState({
    billing_name: '',
    billing_address: '',
    billing_phone: '',
    billing_email: '',
  });
  const [billingTouched, setBillingTouched] = useState({});
  const [billingError, setBillingError] = useState('');

  // Local state for quantity adjustment
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.product_id || item.id] = item.quantity || 1;
      return acc;
    }, {})
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price * (quantities[item.product_id || item.id] || 1)),
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

  // Billing input handlers
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBilling((prev) => ({ ...prev, [name]: value }));
    setBillingTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validateBilling = () => {
    if (!billing.billing_name.trim()) return 'Full name is required.';
    if (!billing.billing_address.trim()) return 'Address is required.';
    if (!billing.billing_phone.trim()) return 'Phone number is required.';
    if (!/^\+?\d{10,16}$/.test(billing.billing_phone.trim())) return 'Enter a valid phone number.';
    if (!billing.billing_email.trim()) return 'Email is required.';
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(billing.billing_email.trim())) return 'Enter a valid email address.';
    return '';
  };

  const handlePlaceOrder = async () => {
    if (!cartItems.length) return;
    const errorMsg = validateBilling();
    setBillingError(errorMsg);
    if (errorMsg) return;

    setLoading(true);
    try {
      const products = cartItems.map(item => ({
        product_id: item.product_id || item.id,
        quantity: quantities[item.product_id || item.id] || 1,
      }));

      // Create the complete order data object
      const orderData = {
        products,  // This is the array of products
        billing_name: billing.billing_name,
        billing_address: billing.billing_address,
        billing_phone: billing.billing_phone,
        billing_email: billing.billing_email,
      };

      await placeOrder(orderData, token);  // Send the complete object

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
                  <tr key={item.product_id || item.id} className="border-b last:border-b-0">
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
                          onClick={() => handleQuantityChange(item.product_id || item.id, -1)}
                          disabled={quantities[item.product_id || item.id] <= 1 || loading}
                          aria-label="Decrease quantity"
                        >
                          <FiMinus />
                        </button>
                        <span className="w-6 text-center text-xs sm:text-sm">{quantities[item.product_id || item.id]}</span>
                        <button
                          type="button"
                          className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 text-xs flex items-center justify-center"
                          onClick={() => handleQuantityChange(item.product_id || item.id, 1, item.stock_quantity)}
                          disabled={loading || (item.stock_quantity && quantities[item.product_id || item.id] >= item.stock_quantity)}
                          aria-label="Increase quantity"
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </td>
                    <td className="text-right text-xs sm:text-sm">
                      ₦{(item.price * (quantities[item.product_id || item.id] || 1)).toLocaleString()}
                    </td>
                    <td className="text-right">
                      <button
                        className="text-red-500 hover:text-red-700 text-base"
                        onClick={() => handleRemove(item.product_id || item.id)}
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
          {/* Billing Info */}
          <div className="mb-4 mt-6">
            <h2 className="text-base sm:text-lg font-semibold text-[#8CA566] mb-2">Billing Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-gray-700" htmlFor="billing_name">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="billing_name"
                  name="billing_name"
                  className={`w-full border rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#8CA566] ${billingTouched.billing_name && !billing.billing_name ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="Enter your full name"
                  value={billing.billing_name}
                  onChange={handleBillingChange}
                  onBlur={() => setBillingTouched(prev => ({ ...prev, billing_name: true }))}
                  disabled={loading}
                  autoComplete="name"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-gray-700" htmlFor="billing_phone">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="billing_phone"
                  name="billing_phone"
                  className={`w-full border rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#8CA566] ${billingTouched.billing_phone && !billing.billing_phone ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="e.g. +2348012345678"
                  value={billing.billing_phone}
                  onChange={handleBillingChange}
                  onBlur={() => setBillingTouched(prev => ({ ...prev, billing_phone: true }))}
                  disabled={loading}
                  autoComplete="tel"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold mb-1 text-gray-700" htmlFor="billing_address">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="billing_address"
                  name="billing_address"
                  className={`w-full border rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#8CA566] ${billingTouched.billing_address && !billing.billing_address ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="Enter your address"
                  value={billing.billing_address}
                  onChange={handleBillingChange}
                  onBlur={() => setBillingTouched(prev => ({ ...prev, billing_address: true }))}
                  disabled={loading}
                  autoComplete="street-address"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold mb-1 text-gray-700" htmlFor="billing_email">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="billing_email"
                  name="billing_email"
                  className={`w-full border rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#8CA566] ${billingTouched.billing_email && !billing.billing_email ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="Enter your email"
                  value={billing.billing_email}
                  onChange={handleBillingChange}
                  onBlur={() => setBillingTouched(prev => ({ ...prev, billing_email: true }))}
                  disabled={loading}
                  autoComplete="email"
                  required
                />
              </div>
            </div>
            {billingError && (
              <div className="text-xs text-red-500 mt-2">{billingError}</div>
            )}
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