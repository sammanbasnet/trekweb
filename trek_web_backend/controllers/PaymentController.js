const Payment = require('../models/Payment')
const findAll = async (req, res) => {
    try {
        console.log("Fetching payments...");
        
        // First try without populate to see if basic query works
        const payments = await Payment.find();
        console.log("Raw payments:", payments);
        
        // If we have payments, try to populate them
        if (payments.length > 0) {
            const populatedPayments = await Payment.find().populate("bookingId");
            console.log("Populated payments:", populatedPayments);
            res.status(200).json({ success: true, data: populatedPayments || [] });
        } else {
            console.log("No payments found");
            res.status(200).json({ success: true, data: [] });
        }
    } catch (e) {
        console.error("Error fetching payments:", e);
        res.status(500).json({ success: false, error: e.message });
    }
}
const save = async (req, res) => {
    try {
        console.log("Creating payment with data:", req.body);
        const { amount, method, status, date, bookingId } = req.body;
        
        const payment = new Payment({
            amount,
            method,
            status,
            date,
            bookingId
        });
        
        await payment.save();
        console.log("Payment created successfully:", payment);
        res.status(201).json({ success: true, data: payment });
    } catch (e) {
        console.error("Error creating payment:", e);
        res.status(500).json({ success: false, error: e.message });
    }
}
const findById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        res.status(200).json(payment)
    } catch (e) {
        res.json(e)

    }


}
const deleteById = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        res.status(200).json("data Deleted")
    } catch (e) {
        res.json(e)

    }


}
const update = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(payment)
    } catch (e) {
        res.json(e)

    }


}

module.exports = {
    findAll,
    save,
    findById,
    deleteById,
    update

}