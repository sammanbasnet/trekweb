import axios from "axios";
import React, { useState } from "react";

const AddPackages = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    duration: "",
    availableDates: [""], // Array for multiple date selections
    category: "Adventure",
    image: null,
    itinerary: [""], // Itinerary starts with one empty entry
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeArrayField = (field, index) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
  
    const formDataToSend = new FormData();
  
    Object.keys(formData).forEach((key) => {
      if (key === "availableDates") {
        // Convert date strings to actual Date objects
        formDataToSend.append(key, JSON.stringify(formData[key].map(date => new Date(date))));
      } else if (key === "itinerary") {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
  
    try {
      await axios.post("http://localhost:3000/api/v1/package", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Package added successfully!");
      setFormData({
        title: "",
        description: "",
        location: "",
        price: "",
        duration: "",
        availableDates: [""],
        category: "Adventure",
        image: null,
        itinerary: [""],
      });
    } catch (error) {
      setError("Error adding package. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Package</h2>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required className="p-2 border rounded" />
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required className="p-2 border rounded" />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required className="p-2 border rounded" />
        <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration (e.g., 5 Days, 4 Nights)" required className="p-2 border rounded" />
        <select name="category" value={formData.category} onChange={handleChange} className="p-2 border rounded">
          <option value="Adventure">Adventure</option>
          <option value="Luxury">Luxury</option>
          <option value="Budget">Budget</option>
        </select>
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="p-2 border rounded col-span-2"></textarea>
        <input type="file" name="image" onChange={handleFileChange} required className="p-2 border rounded col-span-2" />

        {/* Available Dates Fields */}
        <div className="col-span-2">
          <h3 className="text-lg font-semibold mb-2">📅 Available Dates</h3>
          {formData.availableDates.map((date, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="date"
                value={date}
                onChange={(e) => handleArrayChange("availableDates", index, e.target.value)}
                className="p-2 border rounded flex-grow"
              />
              {formData.availableDates.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField("availableDates", index)}
                  className="text-white px-2 py-1 rounded"
                >
                  ❌
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("availableDates")}
            className="bg-gray-500 text-white px-2 py-1 rounded"
          >
            ➕ Add Date
          </button>
        </div>

        {/* Itinerary Fields */}
        <div className="col-span-2">
          <h3 className="text-lg font-semibold mb-2">📌 Itinerary</h3>
          {formData.itinerary.map((point, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={point}
                onChange={(e) => handleArrayChange("itinerary", index, e.target.value)}
                placeholder={`Day ${index + 1} Activity`}
                className="p-2 border rounded flex-grow"
              />
              {formData.itinerary.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField("itinerary", index)}
                  className="text-white px-2 py-1 rounded"
                >
                  ❌
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("itinerary")}
            className="bg-gray-500 text-white px-2 py-1 rounded"
          >
            ➕ Add Itinerary
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Add Package
        </button>
      </form>
    </div>
  );
};

export default AddPackages;
