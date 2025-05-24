const clothesStyleService = require("../services/clothes_style_service");
const { getClothesbyID } = require("../services/clothes_service");
const { getStyleById } = require("../services/style_service");

async function createClothesStyle(req, res) {
  try {
    const { idcloth, idstyle } = req.body;
    
    const clothes = await getClothesbyID(idcloth);
    if (!clothes) {
      return res.status(404).json({ error: "Clothes not found" });
    }
    
    const style = await getStyleById(idstyle);
    if (!style) {
      return res.status(404).json({ error: "Style not found" });
    }

    // Check if the clothes-style relationship already exists
    const existingClothesStyle = await clothesStyleService.getClothesStyle(
      idcloth,
      idstyle
    );
    if (existingClothesStyle) {
      return res
        .status(409)
        .json({ error: "Clothes-Style relationship already exists" });
    }

    const newClothesStyle = await clothesStyleService.createClothesStyle(
      idcloth,
      idstyle
    );
    res.status(201).json(newClothesStyle);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function deleteClothesStyle(req, res) {
  try {
    const { idcloth, idstyle } = req.query;

    // Check if the clothes-style relationship exists
    const existingClothesStyle = await clothesStyleService.getClothesStyle(
      idcloth,
      idstyle
    );
    if (!existingClothesStyle) {
      return res
        .status(404)
        .json({ error: "Clothes-Style relationship not found" });
    }

    await clothesStyleService.deleteClothesStyle(idcloth, idstyle);
    res.json({
      message: "Clothes-Style relationship deleted successfully",
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  createClothesStyle,
  deleteClothesStyle,
};
