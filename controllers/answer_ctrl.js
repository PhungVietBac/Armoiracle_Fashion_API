const answerService = require("../services/answer_service");

async function getAnswers(req, res) {
  try {
    const answers = await answerService.getAnswers();
    res.json(answers);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  getAnswers,
};
