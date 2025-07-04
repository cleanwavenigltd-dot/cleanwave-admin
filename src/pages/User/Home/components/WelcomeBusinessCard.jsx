import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import giftAnimation from '../../../../assets/bonus-gift.json'; // Place your Lottie JSON here
import { FiGift } from 'react-icons/fi';

const WelcomeBusinessCard = ({ name, promo_points, can_claim_promo, loading = false }) => {
  const navigate = useNavigate();

  if (!can_claim_promo) return null;

  return (
    <div
      className="relative w-full max-w-xl mx-auto mt-6 rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F8FAFF 0%, #E6F0FF 100%)',
        boxShadow: '0 4px 24px 0 rgba(140, 165, 102, 0.08)',
        padding: 2,
      }}
    >
      {/* Pattern Dots */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#D6E4FF 1px, transparent 1px)',
          backgroundSize: '12px 12px',
          opacity: 0.4,
          zIndex: 0,
        }}
      />
      <div className="relative flex flex-row items-center bg-white/90 rounded-2xl p-4 sm:p-6 z-10">
        {/* Lottie Animation */}
        <div className="mr-4 flex-shrink-0">
          <div className="w-20 h-20">
            <Lottie animationData={giftAnimation} loop={true} />
          </div>
        </div>
        {/* Content */}
        <div className="flex-1">
          <div className="text-xs font-bold uppercase tracking-wide text-[#8CA566] mb-1">
            Welcome Bonus!
          </div>
          <div className="text-sm sm:text-base text-[#4A5568] mb-2">
            You've received{' '}
            <span className="text-[#8CA566] font-bold">{promo_points} points</span> as a welcome gift!
          </div>
          <button
            className="flex items-center gap-2 bg-[#8CA566] text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-[#6d8f3c] transition text-sm"
            onClick={() => navigate('/pickups')}
            disabled={loading}
            style={{ minWidth: 120 }}
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <FiGift size={18} />
                Claim Now
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBusinessCard;