const answerService = require("../services/answer_service");
const styleService = require("../services/style_service");
const personalityService = require("../services/personality_service");

async function getAnswers(req, res) {
  try {
    const answers = await answerService.getAnswers();
    res.json(answers);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getStylesByAnswer(req, res) {
  try {
    const { id } = req.params;
    const answer = await answerService.getAnswerById(id);
    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }
    const styleIds = await answerService.getStyleIdsByAnswer(id);
    if (styleIds.length === 0) {
      return res.status(404).json({ error: "No styles found for this answer" });
    }
    const styles = await Promise.all(
      styleIds.map(async (idstyle) => {
        const style = await styleService.getStyleById(idstyle);
        return style;
      })
    );
    res.json(styles);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getPersonalityIdsByAnswer(req, res) {
  try {
    const { id } = req.params;
    const answer = await answerService.getAnswerById(id);
    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }
    const personalityIds = await answerService.getPersonalityIdsByAnswer(id);
    if (personalityIds.length === 0) {
      return res
        .status(404)
        .json({ error: "No personalities found for this answer" });
    }
    const personalities = await Promise.all(
      personalityIds.map(async (idpers) => {
        const personality = await personalityService.getPersonalityById(idpers);
        return personality;
      })
    );
    res.json(personalities);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
module.exports = {
  getAnswers,
  getStylesByAnswer,
  getPersonalityIdsByAnswer,
};
