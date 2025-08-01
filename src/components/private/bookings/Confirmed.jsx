import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const Confirmed = () => {
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfirmedBookings();
  }, []);

  const fetchConfirmedBookings = async () => {
    try {
      const response = await axios.get("/api/v1/bookings");
      const allBookings = response.data.data || [];
      const confirmed = allBookings.filter(booking => booking.status === "confirmed");
      setConfirmedBookings(confirmed);
    } catch (error) {
      console.error("Error fetching confirmed bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      await axios.put(`/api/v1/bookings/${bookingId}/status`, {
        status: "cancelled"
      });
      alert("Booking cancelled successfully!");
      fetchConfirmedBookings(); // Refresh the list
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Confirmed Bookings</h2>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading confirmed bookings...</p>
        </div>
      )}

      {/* Confirmed Bookings Table */}
      {!loading && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">User</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Package</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Booking Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {confirmedBookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No confirmed bookings found
                  </td>
                </tr>
              ) : (
                confirmedBookings.map((booking) => (
                  <tr key={booking._id} className="border-b hover:bg-gray-100">
                    {/* Image Column */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <img 
                        src={`http://localhost:3000/uploads/${booking.packageId?.image}`}
                        alt={booking.packageId?.title} 
                        className="w-24 h-16 object-cover rounded-md" 
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/100x60?text=Package";
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{booking.fullName}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{booking.packageId?.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <button
                        className="text-blue-600 hover:text-blue-800 mr-2 font-semibold"
                        onClick={() => alert(`View booking details for ${booking.fullName}`)}
                      >
                        View
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 font-semibold"
                        onClick={() => handleCancel(booking._id)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Confirmed;
