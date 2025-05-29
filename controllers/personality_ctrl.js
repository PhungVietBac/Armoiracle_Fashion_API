const personalityService = require("../services/personality_service");
const styleService = require("../services/style_service");

// Lấy toàn bộ personalities
async function getPersonalities(req, res) {
  try {
    const personalities = await personalityService.getPersonalities();
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
      return res.status(404).json({ error: "Personality not found" });
    }
    res.json(personality);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// Lấy danh sách styles theo personality
async function getStylesByPersonality(req, res) {
  try {
    const { id } = req.params;
    const personality = await personalityService.getPersonalityById(id);
    if (!personality) {
      return res.status(404).json({ error: "Personality not found" });
    }

    const styleIDs = await personalityService.getStyleIDsByPersonality(id);
    if (styleIDs.length === 0) {
      return res
        .status(404)
        .json({ error: "No styles found for this personality" });
    }

    const styles = await Promise.all(
      styleIDs.map(async (idstyle) => {
        const style = await styleService.getStyleById(idstyle);
        return style;
      })
    );
    res.json(styles);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getStylesByPersonalityName(req, res) {
  try {
    const { name } = req.params;
    const personality = await personalityService.getPersonalityByName(name);
    if (!personality) {
      return res.status(404).json({ error: "Personality not found" });
    }

    const personalityId = personality.idpers;
    const styleIDs = await personalityService.getStyleIDsByPersonality(
      personalityId
    );
    if (styleIDs.length === 0) {
      return res
        .status(404)
        .json({ error: "No styles found for this personality" });
    }
    res.json(styleIDs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  getPersonalities,
  getPersonalityById,
  getStylesByPersonality,
  getStylesByPersonalityName,
};
