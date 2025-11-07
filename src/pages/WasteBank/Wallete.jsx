import React, { useState } from "react";

const Wallet = () => {
  const [balance, setBalance] = useState(12500);
  const [activeTab, setActiveTab] = useState("summary");
  const [transactions, setTransactions] = useState([
    { id: 1, type: "Deposit", amount: 5000, date: "2025-10-01" },
    { id: 2, type: "Airtime Purchase", amount: -2000, date: "2025-10-05" },
    { id: 3, type: "Waste Credit", amount: 3500, date: "2025-10-08" },
  ]);
  const [form, setForm] = useState({
    serviceType: "airtime",
    network: "",
    phone: "",
    amount: "",
  });

  const handlePurchase = (e) => {
    e.preventDefault();
    const { serviceType, network, phone, amount } = form;
    if (!network || !phone || !amount) {
      alert("All fields are required!");
      return;
    }
    if (parseFloat(amount) > balance) {
      alert("Insufficient balance!");
      return;
    }

    const newBalance = balance - parseFloat(amount);
    setBalance(newBalance);
    const newTx = {
      id: transactions.length + 1,
      type: `${serviceType === "data" ? "Data" : "Airtime"} Purchase`,
      amount: -amount,
      date: new Date().toISOString().split("T")[0],
    };
    setTransactions([newTx, ...transactions]);
    setForm({ serviceType: "airtime", network: "", phone: "", amount: "" });
    alert(`✅ ${serviceType === "data" ? "Data" : "Airtime"} purchase successful!`);
  };

  return (
    <div className=" bg-gray-50">
      {/* Mobile Header Balance Card */}
      <div className="mt-[100px] bg-gradient-to-r from-green-700 to-green-500 text-white text-center py-10 shadow-lg rounded-b-1xl">
        <p className="text-sm uppercase tracking-wide opacity-90">
          Wallet Balance
        </p>
        <h1 className="text-4xl font-extrabold mt-2">
          ₦{balance.toLocaleString()}
        </h1>
        <p className="text-xs mt-2 opacity-80">
          Keep recycling, keep earning ♻️
        </p>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Tabs */}
        <div className="flex justify-around border-b">
          {["summary", "purchase", "transactions"].map((tab) => (
            <button
              key={tab}
              className={`py-3 px-4 font-semibold ${
                activeTab === tab
                  ? "text-green-700 border-b-4 border-green-700"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "summary"
                ? "Wallet Summary"
                : tab === "purchase"
                ? "Buy Airtime / Data"
                : "Transactions"}
            </button>
          ))}
        </div>

        {/* Wallet Summary */}
        {activeTab === "summary" && (
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Welcome to your Waste Bank wallet. You can use your balance to buy
              airtime, data, or withdraw to your bank account.
            </p>
            <button className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition">
              Withdraw Funds
            </button>
          </div>
        )}

        {/* Buy Airtime or Data */}
        {activeTab === "purchase" && (
          <form onSubmit={handlePurchase} className="pb-28 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Type
              </label>
              <select
                value={form.serviceType}
                onChange={(e) =>
                  setForm({ ...form, serviceType: e.target.value })
                }
                className="w-full p-3 border rounded focus:ring-2 focus:ring-green-700 focus:outline-none"
              >
                <option value="airtime">Airtime</option>
                <option value="data">Data</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Network Provider
              </label>
              <select
                value={form.network}
                onChange={(e) => setForm({ ...form, network: e.target.value })}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-green-700 focus:outline-none"
              >
                <option value="">Select network</option>
                <option value="MTN">MTN</option>
                <option value="Airtel">Airtel</option>
                <option value="GLO">GLO</option>
                <option value="9mobile">9mobile</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter recipient number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-green-700 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Amount (₦)
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-green-700 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 rounded font-semibold hover:bg-green-800 transition"
            >
              Buy {form.serviceType === "data" ? "Data" : "Airtime"}
            </button>
          </form>
        )}

        {/* Transaction History */}
        {activeTab === "transactions" && (
          <div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              Transaction History
            </h3>
            <table className="w-full border rounded-lg shadow text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3">Type</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-t">
                    <td className="p-3">{tx.type}</td>
                    <td
                      className={`p-3 ${
                        tx.amount > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {tx.amount > 0 ? "+" : "-"}₦
                      {Math.abs(tx.amount).toLocaleString()}
                    </td>
                    <td className="p-3">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
