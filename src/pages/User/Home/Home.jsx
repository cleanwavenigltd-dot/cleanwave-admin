import React from 'react';
import WasteCategory from './components/WasteCategory';
import RequestAgain from './components/RequestAgain';
import NearbyProductCard from './components/NearbyProductCard';

const Home = () => (
  <div className="w-full max-w-4xl mx-auto px-2 sm:px-6 py-4">
    {/* Waste Category */}
    <WasteCategory />
    {/* Request Again comes immediately after Waste Category */}
    <div className="mt-4 mb-6">
      <RequestAgain />
    </div>
    {/* Nearby Products */}
    <NearbyProductCard />
  </div>
);

export default Home;