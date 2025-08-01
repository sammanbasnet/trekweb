import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const Pending = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingBookings();
  }, []);

  const fetchPendingBookings = async () => {
    try {
      const response = await axios.get("/api/v1/bookings");
      const allBookings = response.data.data || [];
      const pending = allBookings.filter(booking => booking.status === "pending");
      setPendingBookings(pending);
    } catch (error) {
      console.error("Error fetching pending bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (bookingId) => {
    try {
      await axios.put(`/api/v1/bookings/${bookingId}/status`, {
        status: "confirmed"
      });
      alert("Booking approved successfully!");
      fetchPendingBookings(); // Refresh the list
    } catch (error) {
      console.error("Error approving booking:", error);
      alert("Failed to approve booking");
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      await axios.put(`/api/v1/bookings/${bookingId}/status`, {
        status: "cancelled"
      });
      alert("Booking cancelled successfully!");
      fetchPendingBookings(); // Refresh the list
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Pending Bookings</h2>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading pending bookings...</p>
        </div>
      )}

      {/* Pending Bookings Table */}
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
              {pendingBookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No pending bookings found
                  </td>
                </tr>
              ) : (
                pendingBookings.map((booking) => (
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
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <button
                        className="text-green-600 hover:text-green-800 mr-2 font-semibold"
                        onClick={() => handleApprove(booking._id)}
                      >
                        Approve
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

export default Pending;
