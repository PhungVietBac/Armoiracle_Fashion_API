const personalityService = require('../services/personality_service');

// Lấy toàn bộ personalities
async function getAllPersonalities(req, res) {
  try {
    const personalities = await personalityService.getAllPersonalities();
    res.json(personalities);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// Lấy thông tin một personality theo ID
async function getPersonalityById(req, res) {
  try {
    const { id } = req.params;
    const personality = await personalityService.getPersonalityById(id);
    if (!personality) {
      return res.status(404).json({ error: 'Personality not found' });
    }
    res.json(personality);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// Lấy danh sách styles theo personality ID
async function getStylesByPersonalityId(req, res) {
  try {
    const { id } = req.params;
    const styles = await personalityService.getStylesByPersonalityId(id);
    res.json(styles);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// Lấy toàn bộ styles
async function getAllStyles(req, res) {
  try {
    const styles = await personalityService.getAllStyles();
    res.json(styles);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  getAllPersonalities,
  getPersonalityById,
  getStylesByPersonalityId,
  getAllStyles
};
