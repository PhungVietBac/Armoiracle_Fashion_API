const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const supabase = require("../supabaseClient");
const styleService = require("../services/style_service");

async function listUsers() {
  const { data } = await supabase.from("users").select("*");
  return data;
}

async function getUserBy(field, value) {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq(field, value)
    .single();
  return data;
}

async function getUsersBy(field, value) {
  const { data } = await supabase.from("users").select("*").eq(field, value);
  return data;
}

function getZodiacIndex(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;

  const zodiacRanges = [
    { from: [12, 22], to: [1, 19] }, // 1 - Ma Kết
    { from: [1, 20], to: [2, 18] }, // 2 - Bảo Bình
    { from: [2, 19], to: [3, 20] }, // 3 - Song Ngư
    { from: [3, 21], to: [4, 19] }, // 4 - Bạch Dương
    { from: [4, 20], to: [5, 20] }, // 5 - Kim Ngưu
    { from: [5, 21], to: [6, 20] }, // 6 - Song Tử
    { from: [6, 21], to: [7, 22] }, // 7 - Cự Giải
    { from: [7, 23], to: [8, 22] }, // 8 - Sư Tử
    { from: [8, 23], to: [9, 22] }, // 9 - Xử Nữ
    { from: [9, 23], to: [10, 22] }, // 10 - Thiên Bình
    { from: [10, 23], to: [11, 21] }, // 11 - Bọ Cạp
    { from: [11, 22], to: [12, 21] }, // 12 - Nhân Mã
  ];

  for (let i = 0; i < zodiacRanges.length; i++) {
    const { from, to } = zodiacRanges[i];
    const [fromMonth, fromDay] = from;
    const [toMonth, toDay] = to;

    if (
      (month === fromMonth && day >= fromDay) ||
      (month === toMonth && day <= toDay)
    ) {
      return i + 1;
    }
  }

  return 0; // Không xác định
}

async function addUser(userCreate) {
  let iduser = "";
  while (!iduser || (await getUserBy("iduser", iduser))) {
    iduser = `US${uuidv4().slice(0, 4)}`;
  }

  const db_user = {
    iduser,
    zodiac: getZodiacIndex(userCreate["birthday"]),
    theme: 0,
    ...userCreate,
    password: await bcrypt.hash(userCreate["password"], saltRounds),
  };

  const { data } = await supabase.from("users").insert(db_user).select();
  return data[0];
}

const deleteOldAvatar = async (url) => {
  if (!url) return;

  const { pathName } = new URL(url);
  const fileName = pathName.split("/").pop();

  await supabase.storage.from("avatars").remove([fileName]);
};

const uploadAvatar = async (file) => {
  const fileName = `${uuidv4()}_${file.originalname}`;
  const buffer = file.buffer;

  await supabase.storage.from("avatars").upload(fileName, buffer, {
    contentType: file.mimetype,
    upsert: true,
    cacheControl: "3600",
  });

  const { data: publicData } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  return publicData.publicUrl;
};

async function updateAvatar(id, avatarUrl) {
  const { data } = await supabase
    .from("users")
    .update({ avatar: avatarUrl })
    .eq("iduser", id)
    .select();
  return data[0];
}

async function updateUser(id, userUpdate) {
  const { data } = await supabase
    .from("users")
    .update(userUpdate)
    .eq("iduser", id)
    .select();
  return data[0];
}

async function removeUser(id) {
  await supabase.from("users").delete().eq("iduser", id);
}

async function getStyleIdsByUser(iduser) {
  const { data } = await supabase
    .from("user_styles")
    .select("idstyle")
    .eq("iduser", iduser);

  return data.map((item) => item.idstyle);
}

async function getRecommendClothesIdsByUser(iduser) {
  const styleIds = await getStyleIdsByUser(iduser);
  console.log(styleIds);
  const clothesIds = await Promise.all(
    styleIds.map(async (styleId) => {
      const allClothes = await styleService.getClothesIdsByStyle(styleId);
      return allClothes;
    })
  );

  const uniqueClothesIds = [...new Set(clothesIds.flat())];
  return uniqueClothesIds;
}

async function getClothesIdsByUser(iduser) {
  const { data } = await supabase
    .from("user_clothes")
    .select("idcloth")
    .eq("iduser", iduser);

  return data.map((item) => item.idcloth);
}

module.exports = {
  listUsers,
  addUser,
  removeUser,
  updateUser,
  getUserBy,
  getUsersBy,
  updateAvatar,
  deleteOldAvatar,
  uploadAvatar,
  getStyleIdsByUser,
  getClothesIdsByUser,
  getRecommendClothesIdsByUser,
};
