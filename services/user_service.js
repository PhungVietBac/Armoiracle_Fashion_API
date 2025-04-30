const repo = require("../repositories/user_repo");

async function listUsers() {
  const { data, error } = await repo.getAllUsers();
  if (error) throw new Error(error.message);
  return data;
}

async function addUser(name) {
  const { data, error } = await repo.createUser(name);
  if (error) throw new Error(error.message);
  return data[0];
}

async function removeUser(id) {
  const { error } = await repo.deleteUserById(id);
  if (error) throw new Error(error.message);
}

module.exports = { listUsers, addUser, removeUser };
