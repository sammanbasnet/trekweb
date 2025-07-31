import React, { useState, useEffect } from "react";
import Footer from "../common/customer/Footer";
import Navbar from "../common/customer/Navbar";
import axios from "axios";

const Mybooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchBookings = async () => {
    try {
      console.log("fetchBookings function started");
      // Get current user's email from localStorage
      const userEmail = localStorage.getItem("userEmail");
      const sessionId = localStorage.getItem("sessionId");
      console.log("userEmail from localStorage:", userEmail);
      console.log("sessionId from localStorage:", sessionId);
      
      if (!userEmail) {
        console.log("No userEmail found, showing empty state");
        setBookings([]);
        setLoading(false);
        return;
      }
        
        // Fetch bookings for specific user email
        const response = await axios.get(`/api/v1/bookings/user/${encodeURIComponent(userEmail)}`);
        
        if (response.data.success) {
          const userBookings = response.data.data || [];
          console.log("User bookings fetched:", userBookings.length);
          console.log("User email:", userEmail);
          setBookings(userBookings);
        } else {
          setBookings([]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setBookings([]);
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
      case "cash-on-arrival":
        return "💵";
      default:
        return "💳";
    }
  };

  const formatPaymentMethod = (method) => {
    switch (method) {
      case "esewa":
        return "eSewa";
      case "cash-on-arrival":
        return "Cash on Arrival";
      default:
        return method;
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-6 py-24">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              My Bookings
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Track your upcoming adventures and booking status
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* User Guidance Message */}
          {!localStorage.getItem("userEmail") && (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8 shadow-xl">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">🏔️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Ready for Your First Adventure?
                  </h3>
                  <p className="text-gray-600 text-lg mb-6">
                    Start your journey by booking your first trek experience!
                  </p>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
                </div>
              </div>
            </div>
          )}



          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading your adventures...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <p className="text-red-700 text-center">{error}</p>
              </div>
            </div>
          )}

          {/* Bookings Grid */}
          {!loading && !error && bookings.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden max-w-md mx-auto"
                >
                  {/* Booking Header */}
                  <div className="relative h-48">
                    <img
                      src={`http://localhost:3000/uploads/${booking.packageId?.image}`}
                      alt={booking.packageId?.title || "Adventure Package"}
                      className="w-full h-full object-cover"
                      onLoad={(e) => {
                        console.log("Backend image loaded successfully:", e.target.src);
                      }}
                      onError={(e) => {
                        console.log("Backend image failed to load:", e.target.src);
                        console.log("Package image field:", booking.packageId?.image);
                        console.log("Full booking data:", booking);
                        // Show a fallback gradient if image fails
                        e.target.style.display = 'none';
                        const fallbackDiv = document.createElement('div');
                        fallbackDiv.className = 'w-full h-full bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 flex items-center justify-center';
                        fallbackDiv.innerHTML = '<span class="text-6xl">🏔️</span>';
                        e.target.parentNode.appendChild(fallbackDiv);
                      }}
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-green-100 text-green-800 border-green-200">
                        Confirmed
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-red-800 bg-opacity-5 rounded-lg p-3 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-white mb-1">
                          {booking.packageId?.title || "Adventure Package"}
                        </h2>
                        <p className="text-white text-sm">
                          Booking ID: {booking._id.slice(-8).toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="p-6">
                    {/* Date and People */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">🗓</span>
                        <span className="text-gray-700 font-medium">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">👥</span>
                        <span className="text-gray-700 font-medium">
                          {booking.tickets} {booking.tickets === 1 ? 'Person' : 'People'}
                        </span>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">👤</span>
                        <span className="text-gray-700">{booking.fullName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">📧</span>
                        <span className="text-gray-700">{booking.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">📞</span>
                        <span className="text-gray-700">{booking.phone}</span>
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600 font-medium">Payment Method</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getPaymentMethodIcon(booking.paymentMethod)}</span>
                          <span className="text-gray-700 font-medium">
                            {formatPaymentMethod(booking.paymentMethod)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 font-medium">Payment Status</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          booking.paymentStatus === "completed" 
                            ? "bg-green-100 text-green-800 border-green-200" 
                            : booking.paymentStatus === "pending"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : "bg-red-100 text-red-800 border-red-200"
                        }`}>
                          {booking.paymentStatus}
                        </span>
                      </div>
                    </div>

                    {/* Price and Location */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-red-600">
                          ₹{(booking.packageId?.price || 0) * booking.tickets}
                        </p>
                        <p className="text-sm text-gray-500">Total Amount</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {booking.pickupLocation || "No pickup location"}
                        </p>
                        <p className="text-xs text-gray-500">Pickup Location</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && bookings.length === 0 && localStorage.getItem("userEmail") && (
            <div className="max-w-2xl mx-auto text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🏔️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No Adventures Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start your journey by booking your first trek adventure!
              </p>
              <button 
                onClick={() => window.location.href = '/packages'}
                className="bg-gradient-to-r from-red-500 to-red-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-800 transition-all duration-300 transform hover:scale-105"
              >
                Explore Packages
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Mybooking;
