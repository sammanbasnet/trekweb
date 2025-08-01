import React from "react";
import { Link } from "react-router-dom";

const PackageCard = ({ packageData }) => {
  // Construct the correct image URL
  const imageUrl = `http://localhost:3000/uploads/${packageData.image}`;
  
  // Debug: Log the image filename (commented out to reduce console spam)
  // console.log(`Package: ${packageData.title}, Image: ${packageData.image}, URL: ${imageUrl}`);

  const handleImageError = (e) => {
    console.error(`Failed to load image for ${packageData.title}: ${imageUrl}`);
    // Use a fallback image instead of hiding
    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23f3f4f6'/%3E%3Ctext x='200' y='100' font-family='Arial' font-size='16' fill='%236b7280' text-anchor='middle' dy='.3em'%3ENo Image Available%3C/text%3E%3C/svg%3E";
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <img 
        src={imageUrl} 
        alt={packageData.title} 
        className="w-full h-52 object-cover"
        onError={handleImageError}
      />
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
