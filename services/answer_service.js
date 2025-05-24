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

module.exports = {
  getAnswers,
  getAnswerById,
};
