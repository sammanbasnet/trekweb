const Package = require("../models/Package");

// Create a new package
exports.createPackage = async (req, res) => {
  try {
    const { title, description, location, price, duration, availableDates, category, itinerary } = req.body;
    const image = req.file ? req.file.filename : null;

    const newPackage = new Package({
      title,
      description,
      location,
      price,
      duration,
      image,
      availableDates: availableDates ? JSON.parse(availableDates).map(date => new Date(date)) : [],  // Convert to Date
      category,
      itinerary: itinerary ? itinerary.split("|") : [], // Split string input into an array
    });

    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    console.error('createPackage error:', error.stack || error);
    res.status(500).json({ error: error.message });
  }
};


// Get all packages
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    console.error('getAllPackages error:', error.stack || error);
    res.status(500).json({ error: error.message });
  }
};

// Get a single package by ID
exports.getPackageById = async (req, res) => {
  try {
    const packageData = await Package.findById(req.params.id);
    if (!packageData) return res.status(404).json({ message: "Package not found" });
    res.status(200).json(packageData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a package
exports.updatePackage = async (req, res) => {
  try {
    const { itinerary } = req.body;

    // If itinerary is provided as a string, convert it to an array
    if (itinerary) {
      req.body.itinerary = itinerary.split("|");
    }

    const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPackage) return res.status(404).json({ message: "Package not found" });
    res.status(200).json(updatedPackage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a package
exports.deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) return res.status(404).json({ message: "Package not found" });
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
