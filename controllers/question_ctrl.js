const questionService = require("../services/question_service");
const answerService = require("../services/answer_service");

async function getQuestions(req, res) {
  try {
    const questions = await questionService.getQuestions();
    res.json(questions);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getAnswersByQuestion(req, res) {
  try {
    const { id } = req.params;
    const question = await questionService.getQuestionById(id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    const answerIds = await questionService.getAnswerIdsByQuestion(id);
    if (answerIds.length === 0) {
      return res.status(404).json({ error: "No answers found for this question" });
    }
    const answers = await Promise.all(
      answerIds.map(async (idanswer) => {
        const answer = await answerService.getAnswerById(idanswer);
        return answer;
      })
    );
    res.json(answers);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
module.exports = {
  getQuestions,
  getAnswersByQuestion,
};
