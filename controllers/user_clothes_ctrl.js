const userClothesService = require("../services/user_clothes_service");
const { getUserBy } = require("../services/user_service");
const { getClothesbyID } = require("../services/clothes_service");

async function createUserClothes(req, res) {
  try {
    const { iduser, idcloth } = req.body;

    const user = await getUserBy("iduser", iduser);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    const clothes = await getClothesbyID(idcloth);
    if (!clothes) {
      res.status(404).json({ error: "Clothes not found" });
    }

    const existingUserClothes = await userClothesService.getUserClothes(
      iduser,
      idcloth
    );
    if (existingUserClothes) {
      res
        .status(409)
        .json({ error: "User-Clothes relationship already exists" });
    }

    const newUserClothes = await userClothesService.createUserClothes(
      iduser,
      idcloth
    );
    res.status(201).json(newUserClothes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function deleteUserClothes(req, res) {
  try {
    const { iduser, idcloth } = req.query;
    const existingUserClothes = await userClothesService.getUserClothes(
      iduser,
      idcloth
    );
    if (!existingUserClothes) {
      res.status(404).json({ error: "User-Clothes relationship not found" });
    }

    await userClothesService.deleteUserClothes(iduser, idcloth);
    res.json({
      message: "User-Clothes relationship deleted successfully",
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  createUserClothes,
  deleteUserClothes,
};
