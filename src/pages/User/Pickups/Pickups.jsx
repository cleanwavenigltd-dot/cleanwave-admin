import React, { useEffect, useState } from 'react';
import { FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import AgentCard from './components/AgentCard';
import { getAgents } from '../../../services/pickupService';
import { useSelector } from 'react-redux';

const illustration = 'https://cdn-icons-png.flaticon.com/512/2910/2910791.png';

const Pickups = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await getAgents(token);
        const agentsArray =
          res?.agents ? res.agents :
          res?.data?.agents ? res.data.agents :
          Array.isArray(res) ? res : [];
        setAgents(agentsArray.slice(0, 10));
      } catch (err) {
        setAgents([]);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchAgents();
  }, [token]);

  return (
    <div className="w-full min-h-screen bg-[#f8faf5] pb-8 relative">
      {/* Only History Icon Top Right */}
      <button
        className="absolute top-4 right-4 bg-[#e6f2d9] rounded-full p-2 hover:bg-[#d2e6b8] transition z-20"
        onClick={() => navigate('/pickups/history')}
        title="My Pickups"
      >
        <FiClock size={22} className="text-[#8CA566]" />
      </button>

      {/* Illustration and Description */}
      <div className="flex flex-col items-center px-4 mt-8">
        <img
          src={illustration}
          alt="Pickup Illustration"
          className="w-full max-w-xs h-40 object-contain mb-2"
        />
        <div className="font-bold text-base sm:text-lg text-[#4C862D] mt-2">Schedule a Pickup</div>
        <div className="text-xs sm:text-sm text-gray-500 text-center mt-1 mb-2 max-w-md">
          Choose a nearby recycling agent and book a pickup right at your doorstep.
        </div>
      </div>

      {/* Section Header */}
      <div className="flex items-center px-4 mt-6 mb-2">
        <div className="font-semibold text-sm sm:text-base text-[#222] mr-2">Nearby Agents</div>
        <div className="flex-1 h-px bg-[#E0E0E0]" />
      </div>

      {/* Agents List - Scrollable Grid */}
      <div className="px-2 sm:px-4 max-w-lg mx-auto h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#e6f2d9] scrollbar-track-[#f8faf5]">
        {loading ? (
          <div className="text-center text-gray-400 text-xs py-8">Loading agents...</div>
        ) : agents.length === 0 ? (
          <div className="text-center text-gray-400 text-xs py-8">No agents found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {agents.map(agent => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onClick={() => navigate('/request-pickup', { state: { agent } })}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pickups;