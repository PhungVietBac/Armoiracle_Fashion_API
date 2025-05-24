const supabase = require("../supabaseClient");

async function getAnswers() {
  const { data } = await supabase.from("answers").select("*");
  return data;
}

async function getAnswerById(id) {
  const { data } = await supabase
    .from("answers")
    .select("*")
    .eq("idans", id)
    .single();
  return data;
}
async function getStyleIdsByAnswer(idans) {
  const { data } = await supabase
    .from("ans_styles")
    .select("idstyle")
    .eq("idans", idans);
  return data.map((item) => item.idstyle);
}

module.exports = {
  getAnswers,
  getAnswerById,
  getStyleIdsByAnswer,
};
