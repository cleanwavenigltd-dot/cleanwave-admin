import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../../services/marketplaceService';
import { addToCart } from '../../../redux/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import ProductCard from './components/ProductCard';

const bannerImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
];

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch products and extract categories
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const productData = await getProducts();
        setProducts(productData || []);
        setDisplayed(productData || []);
        // Extract unique categories from products
        const cats = Array.from(
          new Set((productData || []).map(p => (p.category || '').trim()))
        ).filter(Boolean);
        setCategories(['all', ...cats]);
      } catch {
        setProducts([]);
        setDisplayed([]);
        setCategories(['all']);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter products by category and search
  useEffect(() => {
    let filtered = [...products];
    if (activeCategory !== 'all') {
      filtered = filtered.filter(
        p => (p.category || '').trim().toLowerCase() === activeCategory.toLowerCase()
      );
    }
    if (search.trim()) {
      filtered = filtered.filter(
        p =>
          (p.name && p.name.toLowerCase().includes(search.toLowerCase())) ||
          (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
      );
    }
    setDisplayed(filtered);
  }, [activeCategory, search, products]);

  const handleCardClick = (id) => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    // Optionally show a toast here
  };

  // Show scroll indicator if there are more products than fit in the first row
  // (for mobile, grid-cols-2, so >2; for sm:grid-cols-3, so >3, etc.)
  const showScrollIndicator = displayed.length > 8;

  return (
    <div className="w-full min-h-screen bg-[#f8faf5] pb-8">
      {/* Banners */}
      <div className="w-full overflow-x-auto flex gap-3 py-4 px-2 sm:px-6 relative">
        {bannerImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Banner ${idx + 1}`}
            className="rounded-xl object-cover h-32 min-w-[80vw] sm:min-w-[350px] max-w-[500px] shadow"
            style={{ flex: '0 0 auto' }}
          />
        ))}
        {/* Banner scroll indicator */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:block">
          <span className="text-gray-400 text-2xl">&#8594;</span>
        </div>
      </div>

      {/* Search and Categories */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-2 sm:px-6 mt-2">
        {/* Search */}
        <div className="flex-1 flex items-center bg-white rounded-lg shadow px-3 py-2">
          <FiSearch className="text-[#8CA566] mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 outline-none bg-transparent text-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto mt-2 sm:mt-0 relative">
          {categories.map(cat => (
            <button
              key={cat}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                String(activeCategory).toLowerCase() === String(cat).toLowerCase()
                  ? 'bg-[#8CA566] text-white shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-[#e6f2d9]'
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
          {/* Category scroll indicator */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
            <span className="text-gray-400 text-lg">&#8594;</span>
          </div>
        </div>
      </div>

      {/* Product Cards */}
      <div className="px-2 sm:px-6 mt-6 relative">
        {loading ? (
          <div className="text-center text-[#8CA566] py-10">Loading...</div>
        ) : displayed.length === 0 ? (
          <div className="text-center text-gray-400 py-10">No products found</div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {displayed.map(item => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onClick={handleCardClick}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
            {/* Product grid scroll indicator (mobile only, if many products) */}
            {showScrollIndicator && (
              <div className="flex justify-center mt-4">
                <span className="text-gray-400 text-lg animate-bounce">&#8595; Scroll for more</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Marketplace;