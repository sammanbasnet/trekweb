const Booking = require("../models/Booking");

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json({ success: true, message: "Booking successful!", booking: savedBooking });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create booking" });
  }
};

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("packageId");
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch bookings" });
  }
};

// Get a single booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("packageId");
    if (!booking) return res.status(404).json({ success: false, error: "Booking not found" });
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch booking" });
  }
};

// Cancel a booking
const cancelBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );
    if (!updatedBooking) return res.status(404).json({ success: false, error: "Booking not found" });
    res.status(200).json({ success: true, message: "Booking cancelled", booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to cancel booking" });
  }
};

// Get bookings by user email
const getBookingsByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const bookings = await Booking.find({ email }).populate("packageId");
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch user bookings" });
  }
};

// Update booking status (approve/cancel)
const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("packageId");
    
    if (!updatedBooking) {
      return res.status(404).json({ success: false, error: "Booking not found" });
    }
    
    res.status(200).json({ 
      success: true, 
      message: `Booking ${status} successfully`, 
      booking: updatedBooking 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update booking status" });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  cancelBooking,
  getBookingsByEmail,
  updateBookingStatus,
};
