const supabase = require("../supabaseClient");

async function getQuestions() {
  const { data } = await supabase.from("questions").select("*");
  return data;
}

async function getQuestionById(id) {
  const { data } = await supabase
    .from("questions")
    .select("*")
    .eq("idques", id)
    .single();
  return data;
}

module.exports = {
  getQuestions,
  getQuestionById,
};
