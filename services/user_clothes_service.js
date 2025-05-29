const supabase = require("../supabaseClient");

async function createUserClothes(iduser, idcloth) {
  const { data } = await supabase
    .from("user_clothes")
    .insert({ iduser, idcloth })
    .select();
  return data[0];
}

async function deleteUserClothes(iduser, idcloth) {
  await supabase
    .from("user_clothes")
    .delete()
    .eq("iduser", iduser)
    .eq("idcloth", idcloth);
}

async function getUserClothes(iduser, idcloth) {
  const { data } = await supabase
    .from("user_clothes")
    .select("*")
    .eq("iduser", iduser)
    .eq("idcloth", idcloth)
    .single();
  return data;
}

module.exports = {
  createUserClothes,
  deleteUserClothes,
  getUserClothes,
};
