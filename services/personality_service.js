const supabase = require("../supabaseClient");

// Lấy thông tin personality theo id
async function getPersonalityById(idpers) {
  const { data } = await supabase
    .from("personalities")
    .select("*")
    .eq("idpers", idpers)
    .single();
  return data;
}

// Lấy toàn bộ personalities
async function getPersonalities() {
  const { data } = await supabase.from("personalities").select("*");
  return data;
}

// Lấy danh sách ID style theo personality
async function getStyleIDsByPersonality(idpers) {
  const { data } = await supabase
    .from("pers_styles")
    .select("idstyle")
    .eq("idpers", idpers);

  return data.map((item) => item.idstyle);
}

async function getPersonalityByName(name) {
  const { data } = await supabase
    .from("personalities")
    .select("*")
    .eq("name", name)
    .single();
  return data;
}

module.exports = {
  getPersonalityById,
  getPersonalities,
  getStyleIDsByPersonality,
  getPersonalityByName,
};
