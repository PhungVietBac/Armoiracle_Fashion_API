const styleService = require("../services/style_service");
const clothesService = require("../services/clothes_service");

async function getStyles(req, res) {
  try {
    const styles = await styleService.listStyles();
    res.json(styles);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getStyleById(req, res) {
  try {
    const { id } = req.params;
    const style = await styleService.getStyleById(id);
    if (!style) {
      return res.status(404).json({ error: "Style not found" });
    }
    res.json(style);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function createStyle(req, res) {
  try {
    const { style } = req.body;

    if (await styleService.getStyleByName(style)) {
      return res.status(409).json({ error: "Style already exists" });
    }

    const newStyle = await styleService.createStyle(style);
    res.status(201).json(newStyle);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getStyleByName(req, res) {
  try {
    const { name } = req.params;
    const style = await styleService.getStyleByName(name);
    if (!style) {
      return res.status(404).json({ error: "Style not found" });
    }
    res.json(style);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getAllClothesByStyle(req, res) {
  try {
    const { id } = req.params;
    const style = await styleService.getStyleById(id);
    if (!style) {
      return res.status(404).json({ error: "Style not found" });
    }

    const clothesIds = await styleService.getClothesIdsByStyle(id);
    if (clothesIds.length === 0) {
      return res.status(404).json({ error: "No clothes found for this style" });
    }

    const clothes = await Promise.all(
      clothesIds.map(async (clothId) => {
        const cloth = await clothesService.getClothesbyID(clothId);
        return cloth;
      })
    );

    res.json(clothes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  getStyles,
  getStyleById,
  createStyle,
  getStyleByName,
  getAllClothesByStyle,
};
