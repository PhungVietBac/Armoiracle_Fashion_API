const userService = require("../services/user_service");
const styleService = require("../services/style_service");
const bcrypt = require("bcrypt");

async function getUsers(req, res) {
  try {
    const users = await userService.listUsers();
    users.forEach((user) => {
      delete user.password;
    });
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getUserBy(req, res) {
  try {
    const { field } = req.params;
    if (!["iduser", "username", "email", "phone"].includes(field)) {
      return res.status(400).json({ error: "Invalid field" });
    }

    const { value } = req.query;
    const user = await userService.getUserBy(field, value);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    delete user.password;
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getUsersBy(req, res) {
  try {
    const { field } = req.params;
    if (!["gender", "zodiac", "weight", "height"].includes(field)) {
      return res.status(400).json({ error: "Invalid field" });
    }

    const { value } = req.query;

    if (field === "gender") {
      if (!["0", "1", "2"].includes(value)) {
        return res.status(400).json({ error: "Invalid gender value" });
      }
    } else if (field === "zodiac") {
      if (
        ![
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ].includes(value)
      ) {
        return res.status(400).json({ error: "Invalid zodiac value" });
      }
    } else if (field === "weight") {
      if (/^[0-9]+$/.test(value) === false) {
        return res.status(400).json({ error: "Invalid weight value" });
      }
    } else if (field === "height") {
      if (/^[0-9]+$/.test(value) === false) {
        return res.status(400).json({ error: "Invalid height value" });
      }
    }

    const users = await userService.getUsersBy(field, value);

    if (users.length === 0) {
      return res.status(404).json({ error: "Users not found" });
    }

    users.forEach((user) => {
      delete user.password;
    });

    res.json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function createUser(req, res) {
  try {
    const userCreate = req.body;

    const [emailExists, usernameExists, phoneExists] = await Promise.all([
      userService.getUserBy("email", userCreate.email),
      userService.getUserBy("username", userCreate.username),
      userService.getUserBy("phone", userCreate.phone),
    ]);

    if (emailExists)
      return res.status(409).json({ error: "Email already exists" });
    if (usernameExists)
      return res.status(409).json({ error: "Username already exists" });
    if (phoneExists)
      return res.status(409).json({ error: "Phone number already exists" });

    const user = await userService.addUser(userCreate);
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function updateAvatar(req, res) {
  const { id } = req.params;
  const file = req.file;

  try {
    let user = await userService.getUserBy("iduser", id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await userService.deleteOldAvatar(user.avatar);
    const avatarUrl = await userService.uploadAvatar(file);
    user = await userService.updateAvatar(id, avatarUrl);

    res.json({ message: "Avatar updated", avatar: avatarUrl, user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  const userUpdate = req.body;

  try {
    let user = await userService.getUserBy("iduser", id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user = await userService.getUserBy("email", userUpdate["email"]);
    if (user && user.iduser !== id) {
      return res.status(409).json({ error: "Email already exists" });
    }

    user = await userService.getUserBy("username", userUpdate["username"]);
    if (user && user.iduser !== id) {
      return res.status(409).json({ error: "Username already exists" });
    }

    user = await userService.getUserBy("phone", userUpdate["phone"]);
    if (user && user.iduser !== id) {
      return res.status(409).json({ error: "Phone number already exists" });
    }

    const updatedUser = await userService.updateUser(id, userUpdate);
    res.json(updatedUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    const user = await userService.getUserBy("iduser", id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await userService.removeUser(id);

    res.json({ message: "User deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getStylesByUser(req, res) {
  const { id } = req.params;

  try {
    const user = await userService.getUserBy("iduser", id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const styleIds = await userService.getStyleIdsByUser(id);
    if (styleIds.length === 0) {
      return res.status(404).json({ error: "User has no styles" });
    }

    const styles = await Promise.all(
      styleIds.map(async (idstyle) => {
        const style = await styleService.getStyleById(idstyle);
        return style;
      })
    );

    res.json(styles);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function logIn(req, res) {
  const { username, password } = req.body;
  try {
    const user = await userService.getUserBy("username", username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    delete user.password;

    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  getUsers,
  createUser,
  getUserBy,
  getUsersBy,
  updateUser,
  updateAvatar,
  deleteUser,
  getStylesByUser,
  logIn,
};
