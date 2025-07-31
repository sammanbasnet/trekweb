import React from "react";
import { Link } from "react-router-dom";

const PackageCard = ({ packageData }) => {
  // Construct the correct image URL
  const imageUrl = `http://localhost:3000/uploads/${packageData.image}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <img src={imageUrl} alt={packageData.title} className="w-full h-52 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{packageData.title}</h3>
        <p className="text-gray-600 mt-2 line-clamp-2">{packageData.description}</p>
        <p className="text-gray-700 mt-2 font-medium">
          📍 {packageData.location}
        </p>
        <p className="text-gray-700 mt-1">🕒 {packageData.duration}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-red-800 font-bold text-lg">₹{packageData.price}</span>
          <Link to={`/packages/${packageData._id}`} className="bg-red-800 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
