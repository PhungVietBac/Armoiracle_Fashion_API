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

async function getAnswerIdsByQuestion(id) {
  const { data } = await supabase
    .from("group_ans_quests")
    .select("idans")
    .eq("idques", id);
  return data.map((item) => item.idans);
}

module.exports = {
  getQuestions,
  getQuestionById,
  getAnswerIdsByQuestion,
};
