const Achievement = require('../models/achievement.model');

// Create new achievement
exports.createAchievement = async (req, res) => {
  try {
    const { title, type, description, date, issuingAuthority, proofUrl, tags } = req.body;

    const achievement = new Achievement({
      student: req.user.id, // assuming middleware sets req.user
      title,
      type,
      description,
      date,
      issuingAuthority,
      proofUrl,
      tags
    });

    await achievement.save();
    res.status(201).json(achievement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating achievement' });
  }
};

// Get all achievements for logged-in student
exports.getMyAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({ student: req.user.id })
      .populate('verifier', 'name email')
      .sort({ createdAt: -1 });

    res.json(achievements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching achievements' });
  }
};

// Get a single achievement
exports.getAchievementById = async (req, res) => {
  try {
    const achievement = await Achievement.findOne({ _id: req.params.id, student: req.user.id })
      .populate('verifier', 'name email');

    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    res.json(achievement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching achievement' });
  }
};

// Update an achievement
exports.updateAchievement = async (req, res) => {
  try {
    const updated = await Achievement.findOneAndUpdate(
      { _id: req.params.id, student: req.user.id },
      { $set: req.body },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Achievement not found or unauthorized' });
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating achievement' });
  }
};

// Delete an achievement
exports.deleteAchievement = async (req, res) => {
  try {
    const deleted = await Achievement.findOneAndDelete({
      _id: req.params.id,
      student: req.user.id
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Achievement not found or unauthorized' });
    }

    res.json({ message: 'Achievement deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting achievement' });
  }
};
