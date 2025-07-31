import axios from "axios";
import React, { useEffect, useState } from "react";

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch packages from API
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/v1/package/");
      setPackages(res.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
    setLoading(false);
  };

  // Delete package
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/v1/package/${id}`);
      setPackages(packages.filter((pkg) => pkg._id !== id)); // Update state after deletion
      setMessage("Package deleted successfully!");
    } catch (error) {
      setMessage("Error deleting package. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Manage Packages</h2>
      {message && <p className="text-red-600">{message}</p>}
      {loading ? (
        <p>Loading packages...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Image</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Duration</th>
              <th className="border p-2">Available Dates</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Itinerary</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {packages.length > 0 ? (
              packages.map((pkg) => (
                <tr key={pkg._id} className="border">
                  <td className="border p-2">
                    <img src={`http://localhost:3000/uploads/${pkg.image}`} alt={pkg.title} className="w-20 h-20 object-cover" />
                  </td>
                  <td className="border p-2">{pkg.title}</td>
                  <td className="border p-2">{pkg.location}</td>
                  <td className="border p-2">Rs. {pkg.price}</td>
                  <td className="border p-2">{pkg.duration}</td>
                  <td className="border p-2">{pkg.availableDates.join(", ")}</td>
                  <td className="border p-2">{pkg.category}</td>
                  <td className="border p-2 max-w-xs truncate">{pkg.description}</td>
                  <td className="border p-2">
                    <ul className="list-disc list-inside">
                      {pkg.itinerary.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="border p-2">
                    <button onClick={() => handleDelete(pkg._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center p-4">No packages found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManagePackages;
