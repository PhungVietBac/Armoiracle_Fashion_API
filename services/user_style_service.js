const supabase = require("../supabaseClient");

async function createUserStyle(iduser, idstyle) {
  const { data } = await supabase
    .from("user_styles")
    .insert({ iduser, idstyle })
    .select();
  return data[0];
}

async function deleteUserStyle(iduser, idstyle) {
  await supabase
    .from("user_styles")
    .delete()
    .eq("iduser", iduser)
    .eq("idstyle", idstyle);
}

async function getUserStyle(iduser, idstyle) {
  const { data } = await supabase
    .from("user_styles")
    .select("*")
    .eq("iduser", iduser)
    .eq("idstyle", idstyle)
    .single();
  return data;
}

module.exports = {
  createUserStyle,
  deleteUserStyle,
  getUserStyle,
};
