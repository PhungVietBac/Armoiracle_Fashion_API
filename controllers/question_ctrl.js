const questionService = require("../services/question_service");

async function getQuestions(req, res) {
  try {
    const questions = await questionService.getQuestions();
    res.json(questions);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  getQuestions,
};
