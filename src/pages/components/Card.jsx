import React from "react";

const Card = ({ label, value }) => (
  <div className="bg-white p-5 rounded-lg shadow text-center">
    <h3 className="text-gray-500">{label}</h3>
    <p className="text-2xl font-bold text-primary mt-2">{value}</p>
  </div>
);

export default Card;
