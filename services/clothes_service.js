const { get } = require("../routes/user_route");
const supabase = require("../supabaseClient");
const { v4: uuidv4 } = require("uuid");

//Nay la post nha
async function createClothes(clothes) {
    let idcloth = "";
    while (!idcloth || await getClothesbyID(idcloth)) {
        idcloth = `CL${uuidv4().slice(0, 4)}`;
    }

    const db_clothes = {
        idcloth,
        ...clothes,
    }

  const { data } = await supabase
    .from("clothes")
    .insert(db_clothes)
    .select();
  return data[0];
}

//Nay la get nha
async function getAllClothes() {
  const { data } = await supabase.from("clothes").select("*");
  return data;
}

async function getStyleIdsByClothes(idcloth) {
  const { data } = await supabase
    .from("clothes_styles")
    .select("idstyle")
    .eq("idcloth", idcloth);
  return data.map((item) => item.idstyle); 
}
async function getClothesbyID(id) {
  const { data } = await supabase
    .from("clothes")
    .select("*")
    .eq("idcloth", id)
    .single();
  return data;
}

async function getClothesBy(field, value) {
  const { data } = await supabase
    .from("clothes")
    .select("*")
    .eq(field, value);
  return data;
}

module.exports = {
  getAllClothes,
  createClothes,
  getClothesBy,
  getClothesbyID,
  getStyleIdsByClothes,
};
