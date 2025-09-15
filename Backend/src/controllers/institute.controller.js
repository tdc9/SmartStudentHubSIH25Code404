const Institute = require("../models/institute.model");

// ✅ Create new institute
exports.createInstitute = async (req, res) => {
  try {
    const institute = new Institute(req.body);
    await institute.save();
    res.status(201).json({ success: true, institute });
  } catch (err) {
    console.error("❌ Error creating institute:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get all institutes
exports.getInstitutes = async (req, res) => {
  try {
    const institutes = await Institute.find()
      .populate("faculties", "name email role")
      .populate("students", "name email role")
      .populate("achievements");
    res.json({ success: true, institutes });
  } catch (err) {
    console.error("❌ Error fetching institutes:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get a single institute by ID
exports.getInstituteById = async (req, res) => {
  try {
    const institute = await Institute.findById(req.params.id)
      .populate("faculties", "name email role")
      .populate("students", "name email role")
      .populate("achievements");

    if (!institute) {
      return res.status(404).json({ success: false, message: "Institute not found" });
    }

    res.json({ success: true, institute });
  } catch (err) {
    console.error("❌ Error fetching institute:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Update institute
exports.updateInstitute = async (req, res) => {
  try {
    const institute = await Institute.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!institute) {
      return res.status(404).json({ success: false, message: "Institute not found" });
    }
    res.json({ success: true, institute });
  } catch (err) {
    console.error("❌ Error updating institute:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Delete institute
exports.deleteInstitute = async (req, res) => {
  try {
    const institute = await Institute.findByIdAndDelete(req.params.id);
    if (!institute) {
      return res.status(404).json({ success: false, message: "Institute not found" });
    }
    res.json({ success: true, message: "Institute deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting institute:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
