import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../components/common/customer/Footer";
import Navbar from "../../components/common/customer/Navbar";
import ItineraryDisplay from "../../components/common/customer/ItineraryDisplay";

const Checkout = () => {
  const { id } = useParams(); // Get package ID from URL
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    tickets: 1,
    pickupLocation: "",
    paymentMethod: "esewa",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showEsewaGateway, setShowEsewaGateway] = useState(false);
  const [esewaData, setEsewaData] = useState({
    phone: "",
    pin: "",
    step: "phone", // phone, pin, success
  });

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/package/${id}`);
        setPackageData(res.data);
      } catch (err) {
        setError("Failed to load package details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEsewaChange = (e) => {
    setEsewaData({ ...esewaData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    if (formData.paymentMethod === "esewa") {
      setShowEsewaGateway(true);
    } else {
      // Cash on delivery flow
      setIsProcessingPayment(true);
      try {
        alert("Cash on delivery selected. Payment will be collected upon delivery.");
        
        const bookingData = {
          packageId: id,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          tickets: formData.tickets,
          pickupLocation: formData.pickupLocation,
          paymentMethod: formData.paymentMethod,
          paymentStatus: "pending",
        };

        const response = await axios.post("/api/v1/bookings", bookingData);
        
        if (response.data.success) {
          alert("Booking Successful! 🚀\nYou will receive a confirmation email shortly.");
          navigate("/mybooking");
        } else {
          alert("Booking failed. Please try again.");
        }
      } catch (error) {
        console.error("Booking Error:", error);
        alert("Booking failed. Please try again.");
      } finally {
        setIsProcessingPayment(false);
      }
    }
  };

  const handleEsewaPhoneSubmit = async () => {
    if (!esewaData.phone || esewaData.phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    
    // Simulate sending PIN request
    setEsewaData({ ...esewaData, step: "pin" });
  };

  const handleEsewaPinSubmit = async () => {
    if (!esewaData.pin || esewaData.pin.length !== 4) {
      alert("Please enter a valid 4-digit PIN.");
      return;
    }

    // Simulate PIN verification
    setEsewaData({ ...esewaData, step: "success" });
    
    // Wait a moment then process the booking
    setTimeout(async () => {
      try {
        const bookingData = {
          packageId: id,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          tickets: formData.tickets,
          pickupLocation: formData.pickupLocation,
          paymentMethod: formData.paymentMethod,
          paymentStatus: "completed",
        };

        const response = await axios.post("/api/v1/bookings", bookingData);
        
        if (response.data.success) {
          alert("eSewa Payment Successful! 🎉\nBooking confirmed!");
          setShowEsewaGateway(false);
          navigate("/mybooking");
        } else {
          alert("Booking failed. Please try again.");
        }
      } catch (error) {
        console.error("Payment/Booking Error:", error);
        alert("Payment or booking failed. Please try again.");
      }
    }, 2000);
  };

  const closeEsewaGateway = () => {
    setShowEsewaGateway(false);
    setEsewaData({ phone: "", pin: "", step: "phone" });
  };

  if (loading) return <p className="text-center py-10 text-lg">Loading checkout details...</p>;
  if (error) return <p className="text-center text-red-600 py-10">{error}</p>;

  if (!packageData) return <p className="text-center text-red-600 py-10">Package not found.</p>;

  const totalAmount = packageData.price * formData.tickets;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">🛒 Checkout</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Package Summary */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">📌 Booking Summary</h3>
            <div className="flex flex-col items-center">
              <img 
                src={`http://localhost:3000/uploads/${packageData?.image}`} 
                alt={packageData?.title} 
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <div className="mt-4 w-full">
                <h4 className="text-xl font-semibold text-gray-700">{packageData.title}</h4>
                <p className="text-gray-500">{packageData.duration}</p>
                <p className="text-gray-800 font-bold mt-2 text-lg">₹{packageData.price} / person</p>
                <p className="text-gray-600 mt-2">{packageData.description}</p>

                {/* Price Summary */}
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-700 mb-2">💰 Price Summary</h5>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Price per person:</span>
                      <span>₹{packageData.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Number of people:</span>
                      <span>{formData.tickets}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Amount:</span>
                      <span>₹{totalAmount}</span>
                    </div>
                  </div>
                </div>

                {/* Available Dates */}
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-gray-700">📅 Available Dates</h4>
                  <ul className="text-gray-500">
                    {packageData.availableDates.map((date, index) => (
                      <li key={index}>🗓 {new Date(date).toDateString()}</li>
                    ))}
                  </ul>
                </div>

                {/* Itinerary Section */}
                <div className="mt-6">
                  <ItineraryDisplay itinerary={packageData.itinerary} title="Trip Itinerary" showDayNumbers={true} />
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">📝 Enter Details</h3>
            <form className="space-y-4">
              <div className="mt-6">
                <label className="block text-gray-800 font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-400"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-800 font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-400"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-800 font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-400"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-800 font-semibold mb-2">Number of People *</label>
                <input
                  type="number"
                  name="tickets"
                  placeholder="Number of people"
                  value={formData.tickets}
                  min="1"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-400"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-800 font-semibold mb-2">Pickup Location</label>
                <input
                  type="text"
                  name="pickupLocation"
                  placeholder="Enter pickup location (optional)"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-400"
                />
              </div>

              {/* Payment Method Selection */}
              <div className="mt-6">
                <label className="block text-gray-800 font-semibold mb-3">💳 Payment Method *</label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="esewa"
                      checked={formData.paymentMethod === "esewa"}
                      onChange={handleChange}
                      className="text-red-600 focus:ring-red-500"
                    />
                    <div className="flex items-center space-x-2">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Esewa_logo.webp/1200px-Esewa_logo.webp.png" 
                        alt="eSewa" 
                        className="w-16 h-10 object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'inline';
                        }}
                      />
                      <span className="text-green-600 text-xl hidden">💚</span>
                      <span className="text-sm text-gray-500">(Pay online now)</span>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash-on-delivery"
                      checked={formData.paymentMethod === "cash-on-delivery"}
                      onChange={handleChange}
                      className="text-red-600 focus:ring-red-500"
                    />
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600 text-xl">💵</span>
                      <span className="font-medium">Cash on Delivery</span>
                      <span className="text-sm text-gray-500">(Pay when you arrive)</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Payment Button */}
              <button
                type="button"
                onClick={handlePayment}
                disabled={isProcessingPayment}
                className={`w-full py-3 rounded-lg text-lg font-semibold transition duration-300 ${
                  isProcessingPayment
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-800 text-white hover:bg-red-700"
                }`}
              >
                {isProcessingPayment ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Payment...
                  </span>
                ) : (
                  `Complete Payment - ₹${totalAmount}`
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* eSewa Gateway Modal */}
      {showEsewaGateway && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md">
            {/* eSewa Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Esewa_logo.webp/1200px-Esewa_logo.webp.png" 
                  alt="eSewa" 
                  className="w-16 h-10 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-16 h-10 bg-green-600 rounded-lg flex items-center justify-center hidden">
                  <span className="text-white font-bold text-lg">eSewa</span>
                </div>
              </div>
              <button
                onClick={closeEsewaGateway}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Payment Details */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Amount:</span>
                <span className="font-bold text-lg">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Package:</span>
                <span className="text-sm text-gray-700">{packageData.title}</span>
              </div>
            </div>

            {/* Phone Number Step */}
            {esewaData.step === "phone" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Enter your eSewa mobile number</h3>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter 10-digit mobile number"
                  value={esewaData.phone}
                  onChange={handleEsewaChange}
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-400 mb-4"
                  maxLength="10"
                />
                <button
                  onClick={handleEsewaPhoneSubmit}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
                >
                  Confirm Number
                </button>
              </div>
            )}

            {/* PIN Step */}
            {esewaData.step === "pin" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Enter your eSewa PIN</h3>
                <input
                  type="password"
                  name="pin"
                  placeholder="Enter 4-digit PIN"
                  value={esewaData.pin}
                  onChange={handleEsewaChange}
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-400 mb-4"
                  maxLength="4"
                />
                <button
                  onClick={handleEsewaPinSubmit}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
                >
                  Verify & Pay
                </button>
              </div>
            )}

            {/* Success Step */}
            {esewaData.step === "success" && (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl">✓</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Payment Successful!</h3>
                <p className="text-gray-600">Processing your booking...</p>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Checkout;
