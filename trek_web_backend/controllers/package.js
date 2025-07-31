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
    const { itinerary, availableDates } = req.body;
    
    // Prepare update data
    const updateData = { ...req.body };
    
    // Handle itinerary - if it's already an array, use it; if it's a string, split it
    if (itinerary) {
      if (Array.isArray(itinerary)) {
        updateData.itinerary = itinerary;
      } else if (typeof itinerary === 'string') {
        updateData.itinerary = itinerary.split("|");
      }
    }
    
    // Handle availableDates - if it's already an array, use it; if it's a string, parse it
    if (availableDates) {
      if (Array.isArray(availableDates)) {
        updateData.availableDates = availableDates.map(date => new Date(date));
      } else if (typeof availableDates === 'string') {
        updateData.availableDates = availableDates.split(",").map(date => new Date(date.trim()));
      }
    }

    const updatedPackage = await Package.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedPackage) return res.status(404).json({ message: "Package not found" });
    res.status(200).json(updatedPackage);
  } catch (error) {
    console.error('updatePackage error:', error.stack || error);
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

// Upload image for package
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const image = req.file.filename;
    res.status(200).json({ 
      message: "Image uploaded successfully",
      image: image 
    });
  } catch (error) {
    console.error('uploadImage error:', error.stack || error);
    res.status(500).json({ error: error.message });
  }
};
