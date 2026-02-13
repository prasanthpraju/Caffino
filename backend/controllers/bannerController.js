const Banner = require("../models/Banner");

// Create Banner
exports.createBanner = async (req, res) => {
  try {
    const { title, bannerCategory, bannerSubCategory, sectionType, mediaType, resource } = req.body;

    // Validation
    if (!title || !bannerCategory || !resource) {
      return res.status(400).json({ message: "Title, Category and Media are required." });
    }

    const newBanner = new Banner({
      title,
      bannerCategory,
      bannerSubCategory,
      sectionType,
      mediaType,
      resource
    });

    await newBanner.save();
    res.status(201).json(newBanner);
  } catch (error) {
    console.error("Create Banner Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get All Banners
exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};