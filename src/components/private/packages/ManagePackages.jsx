import axios from "axios";
import React, { useEffect, useState } from "react";

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingPackage, setEditingPackage] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    location: "",
    price: "",
    duration: "",
    description: "",
    category: "",
    availableDates: [],
    itinerary: []
  });

  // Fetch packages from API
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/v1/package/");
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
      await axios.delete(`/api/v1/package/${id}`);
      setPackages(packages.filter((pkg) => pkg._id !== id));
      setMessage("Package deleted successfully!");
    } catch (error) {
      setMessage("Error deleting package. Please try again.");
    }
  };

  // Open edit modal
  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setEditForm({
      title: pkg.title || "",
      location: pkg.location || "",
      price: pkg.price || "",
      duration: pkg.duration || "",
      description: pkg.description || "",
      category: pkg.category || "",
      availableDates: pkg.availableDates || [],
      itinerary: pkg.itinerary || []
    });
    setShowEditModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle itinerary changes
  const handleItineraryChange = (index, value) => {
    const newItinerary = [...editForm.itinerary];
    newItinerary[index] = value;
    setEditForm(prev => ({
      ...prev,
      itinerary: newItinerary
    }));
  };

  // Add new itinerary item
  const addItineraryItem = () => {
    setEditForm(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, ""]
    }));
  };

  // Remove itinerary item
  const removeItineraryItem = (index) => {
    const newItinerary = editForm.itinerary.filter((_, i) => i !== index);
    setEditForm(prev => ({
      ...prev,
      itinerary: newItinerary
    }));
  };

  // Handle available dates changes
  const handleAvailableDatesChange = (e) => {
    const dates = e.target.value.split(",").map(date => date.trim());
    setEditForm(prev => ({
      ...prev,
      availableDates: dates
    }));
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("/api/v1/package/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      // Update the package with new image in the database
      const updatedPackage = { ...editingPackage, image: response.data.image };
      
      // Save the updated package to the database
      await axios.put(`/api/v1/package/${editingPackage._id}`, updatedPackage);
      
      // Update the local state
      setEditingPackage(updatedPackage);
      
      // Also update the packages list to show the new image immediately
      setPackages(packages.map(pkg => 
        pkg._id === editingPackage._id 
          ? { ...pkg, image: response.data.image }
          : pkg
      ));
      
      alert("Image uploaded and saved successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again.");
    }
  };

  // Save edited package
  const handleSaveEdit = async () => {
    try {
      const updatedPackage = {
        title: editForm.title,
        location: editForm.location,
        price: editForm.price,
        duration: editForm.duration,
        description: editForm.description,
        category: editForm.category,
        availableDates: editForm.availableDates,
        itinerary: editForm.itinerary,
        _id: editingPackage._id
      };

      await axios.put(`/api/v1/package/${editingPackage._id}`, updatedPackage);
      
      // Update the packages list
      setPackages(packages.map(pkg => 
        pkg._id === editingPackage._id 
          ? { ...pkg, ...updatedPackage }
          : pkg
      ));

      setShowEditModal(false);
      setEditingPackage(null);
      setMessage("Package updated successfully!");
    } catch (error) {
      console.error("Error updating package:", error);
      setMessage("Error updating package. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Manage Packages</h2>
      {message && <p className="text-red-600 mb-4">{message}</p>}
      
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
                  <td className="border p-2">{pkg.availableDates?.join(", ")}</td>
                  <td className="border p-2">{pkg.category}</td>
                  <td className="border p-2 max-w-xs truncate">{pkg.description}</td>
                  <td className="border p-2">
                    <ul className="list-disc list-inside">
                      {pkg.itinerary?.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="border p-2">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(pkg)} 
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(pkg._id)} 
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
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

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Edit Package</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={editForm.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={editForm.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={editForm.duration}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={editForm.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Available Dates (comma-separated)</label>
                <input
                  type="text"
                  value={editForm.availableDates.join(", ")}
                  onChange={handleAvailableDatesChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Itinerary</label>
              {editForm.itinerary.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleItineraryChange(index, e.target.value)}
                    className="flex-1 p-2 border rounded"
                    placeholder={`Day ${index + 1}`}
                  />
                  <button
                    onClick={() => removeItineraryItem(index)}
                    className="bg-red-500 text-white px-3 py-2 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={addItineraryItem}
                className="bg-green-500 text-white px-3 py-2 rounded"
              >
                Add Day
              </button>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Update Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 border rounded"
              />
              {editingPackage && (
                <img 
                  src={`http://localhost:3000/uploads/${editingPackage.image}`} 
                  alt="Current" 
                  className="w-20 h-20 object-cover mt-2"
                />
              )}
            </div>
            
            <div className="flex gap-2 mt-6">
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePackages;
