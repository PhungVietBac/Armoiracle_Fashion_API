const service = require("../services/user_service");

async function getUsers(req, res) {
  try {
    const users = await service.listUsers();
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function createUser(req, res) {
  try {
    const { name } = req.body;
    const user = await service.addUser(name);
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function deleteUser(req, res) {
  try {
    await service.removeUser(req.params.id);
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { getUsers, createUser, deleteUser };
