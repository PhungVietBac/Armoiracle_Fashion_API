const { v4: uuidv4 } = require("uuid");
const supabase = require("../supabaseClient");

async function listStyles() {
  const { data } = await supabase.from("styles").select("*");
  return data;
}

async function getStyleById(id) {
  const { data } = await supabase
    .from("styles")
    .select("*")
    .eq("idstyle", id)
    .single();
  return data;
}

async function getStyleByName(name) {
  const { data } = await supabase
    .from("styles")
    .select("*")
    .eq("style", name)
    .single();
  return data;
}

async function createStyle(style) {
  let idstyle = "";
  while (!idstyle || (await getStyleById(idstyle))) {
    idstyle = `S${uuidv4().slice(0, 5)}`;
  }

  const { data } = await supabase
    .from("styles")
    .insert({ idstyle, style })
    .select();
  return data;
}

async function getClothesIdsByStyle(idstyle) {
  const { data } = await supabase
    .from("clothes_styles")
    .select("idcloth")
    .eq("idstyle", idstyle);
  return data.map((item) => item.idcloth);
}

async function getPersonalitiesByStyle(idstyle) {
  const { data } = await supabase
    .from("pers_styles")
    .select("idpers")
    .eq("idstyle", idstyle);
  return data.map((item) => item.idpers);
}

module.exports = {
  listStyles,
  getStyleById,
  createStyle,
  getStyleByName,
  getClothesIdsByStyle,
  getPersonalitiesByStyle,
};
