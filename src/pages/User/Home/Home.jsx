import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../../services/authService';
import WasteCategory from './components/WasteCategory';
import RequestAgain from './components/RequestAgain';
import NearbyProductCard from './components/NearbyProductCard';
import WelcomeBusinessCard from './components/WelcomeBusinessCard';

const Home = () => {
  const token = useSelector((state) => state.auth.token);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (token) {
      getUserProfile(token).then(setProfile);
    }
  }, [token]);

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-6 py-4 flex flex-col items-start">
      {/* Welcome Business Card */}
      {profile && (
        <WelcomeBusinessCard
          name={profile.name}
          promo_points={profile.promo_points}
          can_claim_promo={profile.can_claim_promo}
        />
      )}
      {/* Waste Category */}
      <WasteCategory />
      {/* Request Again comes immediately after Waste Category */}
      <div className="mt-4 mb-6 w-full">
        <RequestAgain />
      </div>
      {/* Nearby Products */}
      <NearbyProductCard />
    </div>
  );
};

export default Home;