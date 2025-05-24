const userStyleService = require("../services/user_style_service");
const { getUserBy } = require("../services/user_service");
const { getStyleById } = require("../services/style_service");

async function createUserStyle(req, res) {
  try {
    const { iduser, idstyle } = req.body;

    const user = await getUserBy("iduser", iduser);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const style = await getStyleById(idstyle);
    if (!style) {
      return res.status(404).json({ error: "Style not found" });
    }

    // Check if the user-style relationship already exists
    const existingUserStyle = await userStyleService.getUserStyle(
      iduser,
      idstyle
    );
    if (existingUserStyle) {
      return res
        .status(409)
        .json({ error: "User-Style relationship already exists" });
    }

    const newUserStyle = await userStyleService.createUserStyle(
      iduser,
      idstyle
    );
    res.status(201).json(newUserStyle);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function deleteUserStyle(req, res) {
  try {
    const { iduser, idstyle } = req.params;

    // Check if the user-style relationship exists
    const existingUserStyle = await userStyleService.getUserStyle(
      iduser,
      idstyle
    );
    if (!existingUserStyle) {
      return res
        .status(404)
        .json({ error: "User-Style relationship not found" });
    }

    await userStyleService.deleteUserStyle(iduser, idstyle);
    res.json({
      message: "User-Style relationship deleted successfully",
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  createUserStyle,
  deleteUserStyle,
};
