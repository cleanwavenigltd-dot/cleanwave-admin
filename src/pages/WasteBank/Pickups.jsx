// import React from "react";

// const Pickups = () => {
//   return <h1>"Hello Pickups</h1>;
// };
// export default Pickups;
import React, { useState } from "react";

const wasteCategories = [
  { id: 1, name: "Plastic" },
  { id: 2, name: "Metal" },
  { id: 3, name: "Glass" },
  { id: 4, name: "Organic" },
  { id: 5, name: "Paper" },
];

const Pickups = () => {
  const [form, setForm] = useState({
    category: "",
    weight: "",
    priority: "Normal",
    note: "",
  });

  const [requests, setRequests] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.category || !form.weight) {
      alert("Please select a waste category and enter weight.");
      return;
    }

    const newRequest = {
      id: requests.length + 1,
      ...form,
      status: "Pending",
      date: new Date().toLocaleString(),
    };

    setRequests([...requests, newRequest]);
    alert("✅ Pickup requested successfully!");
    setForm({ category: "", weight: "", priority: "Normal", note: "" });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow space-y-8">
      <h2 className="text-2xl font-bold text-primary text-center">
        Request Waste Pickup
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Waste Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Waste Category
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
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

        {/* Waste Weight */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Total Weight (kg)
          </label>
          <input
            type="number"
            placeholder="Enter weight"
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Pickup Priority
          </label>
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="Normal">Normal</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Additional Note (optional)
          </label>
          <textarea
            placeholder="Any additional details about this pickup?"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            rows="3"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded font-semibold hover:bg-green-700 transition"
        >
          Request Pickup
        </button>
      </form>

      {/* Display Pending Requests */}
      {requests.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-3 text-gray-800">
            Recent Pickup Requests
          </h3>
          <table className="w-full border rounded-lg shadow text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Category</th>
                <th className="p-3">Weight</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-3">{r.category}</td>
                  <td className="p-3">{r.weight} kg</td>
                  <td
                    className={`p-3 font-semibold ${
                      r.priority === "Urgent"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {r.priority}
                  </td>
                  <td className="p-3 text-yellow-600">{r.status}</td>
                  <td className="p-3">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Pickups;
