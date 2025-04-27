import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Table from '../../../components/ui/Table';
import Modal from '../../../components/ui/Modal';
import FloatingInput from '../../../components/ui/FloatingInput';
import Button from '../../../components/ui/Button';
import { User, Mail, Phone, CheckCircle } from 'lucide-react';
import { getAgents, registerAgent } from '../../../services/agentService';

const AgentsTable = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Get the token from Redux
  const token = useSelector((state) => state.auth.token);

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone' },
    { label: 'Status', key: 'status' },
    { label: 'Verification Status', key: 'verification_status' },
  ];

  const icons = {
    name: <User size={16} />,
    email: <Mail size={16} />,
    phone: <Phone size={16} />,
    status: <CheckCircle className="text-green-500" size={16} />,
    verification_status: <CheckCircle className="text-green-500" size={16} />,
  };

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const agents = await getAgents();
        const enrichedAgents = agents.map((agent) => ({
          ...agent,
          status: 'Active',
          verification_status: 'Verified',
        }));
        setData(enrichedAgents);
      } catch (error) {
        console.error('Failed to fetch agents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAgent = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await registerAgent(formData, token); // Use the token from Redux
      setSuccess(true);

      // Refresh the agent list
      const agents = await getAgents();
      const enrichedAgents = agents.map((agent) => ({
        ...agent,
        status: 'Active',
        verification_status: 'Verified',
      }));
      setData(enrichedAgents);

      setTimeout(() => {
        setSuccess(false);
        setIsModalOpen(false);
        setFormData({ name: '', email: '', phone: '', password: '' });
      }, 2000);
    } catch (error) {
      console.error('Failed to add agent:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Add Agent Button */}
      <div className="flex justify-end mt-12 mb-4">
        <Button onClick={() => setIsModalOpen(true)} className="px-4 py-2">
          Add Agent
        </Button>
      </div>

      {/* Table */}
      <Table columns={columns} data={data} loading={loading} icons={icons} rowsPerPage={5} />

      {/* Add Agent Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {success ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <CheckCircle className="text-green-500" size={48} />
            <p className="text-lg font-semibold text-gray-700">Agent added successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleAddAgent} className="space-y-4">
            <h2 className="text-lg font-bold mb-4">Add Agent</h2>
            <FloatingInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <FloatingInput
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <FloatingInput
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <FloatingInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Button type="submit" isActive={!isSubmitting} isLoading={isSubmitting}>
              Add Agent
            </Button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default AgentsTable;