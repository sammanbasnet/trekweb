import React, { useState, useEffect } from "react";
import Footer from "../common/customer/Footer";
import Navbar from "../common/customer/Navbar";
import axios from "axios";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
          setError("You must be logged in to see your bookings.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `/api/v1/bookings/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookings(response.data.data || response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch bookings. Please try again later.");
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "esewa":
        return "💚";
      case "cash-on-delivery":
        return "💵";
      default:
        return "💳";
    }
  };

  const formatPaymentMethod = (method) => {
    switch (method) {
      case "esewa":
        return "eSewa";
      case "cash-on-delivery":
        return "Cash on Delivery";
      default:
        return method;
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          My Bookings
        </h1>
        <p className="text-lg text-center text-gray-600 mb-12">
          Track your upcoming trips and booking status.
        </p>

        <div className="flex flex-col items-center space-y-6">
          {loading ? (
            <p className="text-gray-800">Loading your bookings...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking._id}
                className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg flex items-start space-x-6"
              >
                <img
                  src={`http://localhost:3000/uploads/${booking.packageId?.image}`}
                  alt={booking.packageId?.title || "Package"}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-grow">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {booking.packageId?.title || "Package"}
                  </h2>
                  <p className="text-gray-600">
                    Booking ID: {booking._id}
                  </p>
                  <p className="text-gray-600">
                    Booked on: {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    Full Name: {booking.fullName}
                  </p>
                  <p className="text-gray-600">
                    Email: {booking.email}
                  </p>
                  <p className="text-gray-600">
                    Phone: {booking.phone}
                  </p>
                  <p className="text-gray-600">
                    Number of People: {booking.tickets}
                  </p>
                  <p className="text-gray-600">
                    Total Amount: ₹{(booking.packageId?.price || 0) * booking.tickets}
                  </p>
                  <p className="text-gray-600">
                    Pickup Location: {booking.pickupLocation || "Not specified"}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-lg">{getPaymentMethodIcon(booking.paymentMethod)}</span>
                    <span className="text-gray-600">
                      Payment: {formatPaymentMethod(booking.paymentMethod)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      booking.paymentStatus === "completed" 
                        ? "bg-green-100 text-green-800" 
                        : booking.paymentStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {booking.paymentStatus}
                    </span>
                  </div>
                  <p
                    className={`text-lg font-bold mt-2 ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    Status: {booking.status}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-800 text-center">
              You have no bookings yet.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyBooking;
