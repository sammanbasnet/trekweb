import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaTrash } from "react-icons/fa";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      console.log("Fetching payments...");
      const response = await axios.get("/api/v1/payments");
      console.log("Payments response:", response.data);
      if (response.data.success) {
        setPayments(response.data.data || []);
      } else {
        console.error("Failed to fetch payments");
        setPayments([]);
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefund = async (paymentId) => {
    try {
      await axios.put(`/api/v1/payments/${paymentId}`, {
        status: "refunded"
      });
      alert("Payment refunded successfully!");
      fetchPayments(); // Refresh the list
    } catch (error) {
      console.error("Error refunding payment:", error);
      alert("Failed to refund payment");
    }
  };

  const createTestPayment = async () => {
    try {
      console.log("Starting test payment creation...");
      
      // First, get a real booking ID
      const bookingsResponse = await axios.get("/api/v1/bookings");
      console.log("Bookings response:", bookingsResponse.data);
      const bookings = bookingsResponse.data.data || [];
      
      if (bookings.length === 0) {
        alert("No bookings found. Please create a booking first.");
        return;
      }
      
      const firstBooking = bookings[0];
      console.log("Using booking ID:", firstBooking._id);
      
      const testPayment = {
        bookingId: firstBooking._id,
        amount: 2000,
        method: "esewa",
        status: "completed",
        date: new Date()
      };
      
      console.log("Sending test payment data:", testPayment);
      const response = await axios.post("/api/v1/payments", testPayment);
      console.log("Test payment created:", response.data);
      
      // Wait a moment then fetch payments
      setTimeout(() => {
        fetchPayments();
      }, 1000);
      
    } catch (error) {
      console.error("Error creating test payment:", error);
      console.error("Error details:", error.response?.data);
      alert("Failed to create test payment: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Payments</h2>
        <button
          onClick={createTestPayment}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Create Test Payment
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading payments...</p>
        </div>
      )}

      {/* Payments Table */}
      {!loading && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">User</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Booking ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Payment Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No payments found (Total payments: {payments.length})
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment._id} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {payment.bookingId?.fullName || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {payment.bookingId?._id?.slice(-6) || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      ₹{payment.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          payment.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : payment.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : payment.status === "refunded"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <button
                        className="text-blue-600 hover:text-blue-800 mr-2"
                        onClick={() => alert(`View payment details for ${payment.bookingId?._id?.slice(-6)}`)}
                      >
                        <FaEye />
                      </button>
                      {payment.status !== "refunded" && (
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleRefund(payment._id)}
                        >
                          <FaTrash />
                        </button>
                      )}
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

export default Payments;
