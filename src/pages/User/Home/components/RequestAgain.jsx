import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { getAgents } from '../../../../services/agentService';
import { useSelector } from 'react-redux';

const ITEM_SIZE = 56;

// Dummy fallback for debugging


const RequestAgain = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [agents, setAgents] = useState([]);

useEffect(() => {
  const fetchAgents = async () => {
    try {
      const res = await getAgents(token);
      // Add this line to see the actual structure
      console.log('API response:', res);

      // Try these options to get the agents array:
      const agentsArray =
        res?.agents ? res.agents :
        res?.data?.agents ? res.data.agents :
        Array.isArray(res) ? res : [];

      if (agentsArray.length > 0) {
        const recentAgents = agentsArray.slice(-5).reverse();
        setAgents(recentAgents);
      } else {
        setAgents([]);
      }
    } catch (err) {
      setAgents([]);
    }
  };
  fetchAgents();
}, [token]);

  const handlePress = (item) => {
    if (item.type === 'add') {
      navigate('/request-pickup');
    } else {
      navigate('/request-pickup', { state: { agent: item } });
    }
  };

  // Compose data: add "add" button first, then agents
  const data = [{ id: 'new', type: 'add' }, ...agents.map(agent => ({ ...agent, type: 'agent' }))];

  return (
    <div className="w-full px-2 sm:px-4">
      <div className="font-bold text-[#8CA566] mb-3">Request Again</div>
      <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
        {data.map((item) =>
          item.type === 'add' ? (
            <button
              key={item.id}
              onClick={() => handlePress(item)}
              className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-dashed border-[#8CA566] bg-transparent text-[#8CA566] text-2xl"
              style={{ minWidth: ITEM_SIZE, minHeight: ITEM_SIZE }}
            >
              <FiPlus />
            </button>
          ) : (
            <button
              key={item.id}
              onClick={() => handlePress(item)}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-[#8CA566] text-white font-bold text-lg"
              style={{ minWidth: ITEM_SIZE, minHeight: ITEM_SIZE }}
              title={item.name}
            >
              {item.name ? item.name.charAt(0).toUpperCase() : '?'}
            </button>
          )
        )}
      </div>
      <style>{`
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default RequestAgain;