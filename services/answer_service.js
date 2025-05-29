const supabase = require("../supabaseClient");
const styleService = require("./style_service");

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

async function getPersonalityIdsByAnswer(idans) {
  const styleIDs = await getStyleIdsByAnswer(idans);
  const personalityIDs = await Promise.all(
    styleIDs.map(async (idstyle) => {
      const personalities = await styleService.getPersonalitiesByStyle(idstyle);
      return personalities;
    })
  );

  const uniquePersonalityIDs = [...new Set(personalityIDs.flat())];
  return uniquePersonalityIDs;
}

module.exports = {
  getAnswers,
  getAnswerById,
  getStyleIdsByAnswer,
  getPersonalityIdsByAnswer,
};
