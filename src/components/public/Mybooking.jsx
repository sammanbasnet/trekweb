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

        setBookings(response.data);
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
                  src={booking.package.imageUrl || "https://via.placeholder.com/150"}
                  alt={booking.package.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-grow">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {booking.package.name}
                  </h2>
                  <p className="text-gray-600">
                    Booking ID: {booking._id}
                  </p>
                  <p className="text-gray-600">
                    Date: {new Date(booking.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    Amount: ₹{booking.totalPrice.toLocaleString()}
                  </p>
                  <p className="text-gray-600">
                    Tickets: {booking.participants}
                  </p>
                  <p
                    className={`text-lg font-bold ${getStatusColor(
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
