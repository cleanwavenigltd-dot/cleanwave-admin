import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Table from '../../../components/ui/Table';
import Modal from '../../../components/ui/Modal';
import FloatingInput from '../../../components/ui/FloatingInput';
import Button from '../../../components/ui/Button';
import { User, Mail, Phone, MapPin, Store, CheckCircle } from 'lucide-react';
import { getVendors, registerVendor } from '../../../services/vendorService';

const VendorsTable = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    store_name: '',
    store_address: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Get the token from Redux
  const token = useSelector((state) => state.auth.token);

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone' },
    { label: 'Store Name', key: 'store_name' },
    { label: 'Store Address', key: 'store_address' },
    { label: 'Created At', key: 'created_at' },
  ];

  const icons = {
    name: <User size={16} />,
    email: <Mail size={16} />,
    phone: <Phone size={16} />,
    store_name: <Store size={16} />,
    store_address: <MapPin size={16} />,
  };

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const vendors = await getVendors(token);
        setData(vendors);
      } catch (error) {
        console.error('Failed to fetch vendors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddVendor = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await registerVendor(formData, token); // Use the token from Redux
      setSuccess(true);

      // Refresh the vendor list
      const vendors = await getVendors(token);
      setData(vendors);

      setTimeout(() => {
        setSuccess(false);
        setIsModalOpen(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          address: '',
          store_name: '',
          store_address: '',
        });
      }, 2000);
    } catch (error) {
      console.error('Failed to add vendor:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Add Vendor Button */}
      <div className="flex justify-end mt-12 mb-4">
        <Button onClick={() => setIsModalOpen(true)} className="px-4 py-2">
          Add Vendor
        </Button>
      </div>

      {/* Table */}
      <Table columns={columns} data={data} loading={loading} icons={icons} rowsPerPage={5} />

      {/* Add Vendor Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {success ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <CheckCircle className="text-green-500" size={48} />
            <p className="text-lg font-semibold text-gray-700">Vendor added successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleAddVendor} className="space-y-4">
            <h2 className="text-lg font-bold mb-4">Add Vendor</h2>
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
            <FloatingInput
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            <FloatingInput
              label="Store Name"
              name="store_name"
              value={formData.store_name}
              onChange={handleInputChange}
            />
            <FloatingInput
              label="Store Address"
              name="store_address"
              value={formData.store_address}
              onChange={handleInputChange}
            />
            <Button type="submit" isActive={!isSubmitting} isLoading={isSubmitting}>
              Add Vendor
            </Button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default VendorsTable;