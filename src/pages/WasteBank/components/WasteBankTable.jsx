// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import Table from "../../../components/ui/Table";
// import Modal from "../../../components/ui/Modal";
// import FloatingInput from "../../../components/ui/FloatingInput";
// import Button from "../../../components/ui/Button";
// import { User, Mail, Phone, CheckCircle } from "lucide-react";
// import {
//   getWaste_bank,
//   registerWaste_bank,
// } from "../../../services/waste_bankService";

// const WasteBankTable = () => {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);

//   // Get the token from Redux
//   const token = useSelector((state) => state.auth.token);

//   const columns = [
//     { label: "ID", key: "id" },
//     { label: "Name", key: "name" },
//     { label: "Email", key: "email" },
//     { label: "Phone", key: "phone" },
//     { label: "Status", key: "status" },
//     { label: "Verification Status", key: "verification_status" },
//   ];

//   const icons = {
//     name: <User size={16} />,
//     email: <Mail size={16} />,
//     phone: <Phone size={16} />,
//     status: <CheckCircle className="text-green-500" size={16} />,
//     verification_status: <CheckCircle className="text-green-500" size={16} />,
//   };

//   useEffect(() => {
//     const fetchWaste_banks = async () => {
//       try {
//         const waste_bank = await getWaste_bank();
//         const enrichedWaste_bank = waste_bank.map((agent) => ({
//           ...agent,
//           status: "Active",
//           verification_status: "Verified",
//         }));
//         setData(enrichedWaste_bank);
//       } catch (error) {
//         console.error("Failed to fetch agents:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWaste_banks();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddWaste_bank = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       await registerWaste_bank(formData, token); // Use the token from Redux
//       setSuccess(true);

//       // Refresh the agent list
//       const waste_bank = await getWaste_bank();
//       const enrichedWaste_bank = waste_bank.map((agent) => ({
//         ...agent,
//         status: "Active",
//         verification_status: "Verified",
//       }));
//       setData(enrichedWaste_bank);

//       setTimeout(() => {
//         setSuccess(false);
//         setIsModalOpen(false);
//         setFormData({ name: "", email: "", phone: "", password: "" });
//       }, 2000);
//     } catch (error) {
//       console.error("Failed to add agent:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       {/* Add Agent Button */}
//       <div className="flex justify-end mt-12 mb-4">
//         <Button onClick={() => setIsModalOpen(true)} className="px-4 py-2">
//           Add Waste-Bank
//         </Button>
//       </div>

//       {/* Table */}
//       <Table
//         columns={columns}
//         data={data}
//         loading={loading}
//         icons={icons}
//         rowsPerPage={5}
//       />

//       {/* Add Agent Modal */}
//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         {success ? (
//           <div className="flex flex-col items-center justify-center space-y-4">
//             <CheckCircle className="text-green-500" size={48} />
//             <p className="text-lg font-semibold text-gray-700">
//               Waste-bank added successfully!
//             </p>
//           </div>
//         ) : (
//           <form onSubmit={handleAddWaste_bank} className="space-y-4">
//             <h2 className="text-lg font-bold mb-4">Add Waste-Bank</h2>
//             <FloatingInput
//               label="Name"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//             />
//             <FloatingInput
//               label="Email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//             />
//             <FloatingInput
//               label="Phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//             />
//             <FloatingInput
//               label="Password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleInputChange}
//             />
//             <Button
//               type="submit"
//               isActive={!isSubmitting}
//               isLoading={isSubmitting}
//             >
//               Add Waste-Bank
//             </Button>
//           </form>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default WasteBankTable;
// import FloatingInput from "../../../components/ui/FloatingInput";
// import { FiSearch } from "react-icons/fi";
// import Button from "../../../components/ui/Button";
// const WasteBankTable = () => {
//   return (
//     <form className="flex flex-col gap-y-6 bg-white p-6 rounded-lg shadow-md">
//       <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-2 sm:px-6 mt-2">
//         <div className="flex-1 flex items-center bg-white rounded-lg shadow px-3 py-2">
//           <FiSearch className="text-[#8CA566] mr-2" />
//           <input
//             type="text"
//             placeholder="Search agents"
//             className="flex-1 outline-none bg-transparent text-sm"
//             // value={search}
//             // onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//         {/* Search
//               // <div className="flex-1 flex items-center bg-white rounded-lg shadow px-3 py-2">
//                 <FiSearch className="text-[#8CA566] mr-2" />
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   className="flex-1 outline-none bg-transparent text-sm"
//                   value={search}
//                   onChange={e => setSearch(e.target.value)}
//                 /> */}
//       </div>
//       <FloatingInput label="search for agent" name="search" />
//       <Button
//         type="submit"
//         isActive="nn"
//         className="w-full bg-[#8CA566] text-white hover:bg-[#779254] transition"
//       >
//         Search
//       </Button>
//     </form>
//   );
// };

// export default WasteBankTable;
import React, { useState } from "react";

const agentsList = [
  { id: 1, name: "Amir Sani" },
  { id: 2, name: "Aisha Bello" },
  { id: 3, name: "John Musa" },
  { id: 4, name: "Fatima Ali" },
];

const wasteCategories = [
  { id: 1, name: "Plastic" },
  { id: 2, name: "Metal" },
  { id: 3, name: "Glass" },
  { id: 4, name: "Organic" },
  { id: 5, name: "Paper" },
];

const WasteBankTable = () => {
  const [form, setForm] = useState({
    agent: "",
    wasteCategory: "",
    weight: "",
  });
  const [filteredAgents, setFilteredAgents] = useState(agentsList);
  const [searchTerm, setSearchTerm] = useState("");
  const [records, setRecords] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredAgents(
      agentsList.filter((agent) => agent.name.toLowerCase().includes(term))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.agent || !form.wasteCategory || !form.weight) {
      alert("All fields are required!");
      return;
    }

    const newRecord = {
      id: records.length + 1,
      ...form,
      date: new Date().toLocaleString(),
    };

    setRecords([...records, newRecord]);
    alert("✅ Waste recorded successfully!");
    setForm({ agent: "", wasteCategory: "", weight: "" });
    setSearchTerm("");
  };

  return (
    <div className=" mt-[100px] max-w-3xl mx-auto bg-white p-8 rounded-xl shadow space-y-8">
      <h2 className="text-2xl font-bold text-primary text-center">
        Record Waste Collection
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 🔍 Search & Select Agent */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Search Agent
          </label>
          <input
            type="text"
            placeholder="Type agent name..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <div className="mt-2 max-h-32 overflow-y-auto border rounded bg-gray-50">
            {filteredAgents.map((agent) => (
              <div
                key={agent.id}
                onClick={() => {
                  setForm({ ...form, agent: agent.name });
                  setSearchTerm(agent.name);
                  setFilteredAgents(agentsList);
                }}
                className={`px-3 py-2 cursor-pointer hover:bg-primary hover:text-white ${
                  form.agent === agent.name ? "bg-primary text-white" : ""
                }`}
              >
                {agent.name}
              </div>
            ))}
          </div>
        </div>

        {/* 🗑 Waste Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Waste Category
          </label>
          <select
            value={form.wasteCategory}
            onChange={(e) =>
              setForm({ ...form, wasteCategory: e.target.value })
            }
            className="w-full p-3 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="">Select category</option>
            {wasteCategories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* ⚖️ Waste Weight */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Weight (kg)
          </label>
          <input
            type="number"
            placeholder="Enter weight (e.g., 12)"
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* 💾 Submit */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded font-semibold hover:bg-green-700 transition"
        >
          Save Record
        </button>
      </form>

      {/* 📋 Waste Records Table */}
      {records.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mt-8 mb-3 text-gray-800">
            Recent Waste Records
          </h3>
          <div className="w-full max-h-40 overflow-y-scroll mb-[100px]">
          <table className="w-full border rounded-lg shadow text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Agent</th>
                <th className="p-3">Category</th>
                <th className="p-3">Weight</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-3">{r.agent}</td>
                  <td className="p-3">{r.wasteCategory}</td>
                  <td className="p-3">{r.weight} kg</td>
                  <td className="p-3">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default WasteBankTable;

