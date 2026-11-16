import { incidentRules } from "../config/incidentRules.js";
import { ApiError } from "../utils/ApiError.js";

const incidentIds = Object.keys(incidentRules);

export function validateRequest(body) {
  if (!isPlainObject(body)) {
    throw ApiError.badRequest("Request body incorrect format");
  }
  const { answers, incidentType } = body;

  if (typeof incidentType !== "string" || !incidentIds.includes(incidentType)) {
    throw ApiError.badRequest("Please choose a supported incident type");
  }
  if (!isPlainObject(answers)) {
    throw ApiError.badRequest("Answers are missing/incorrect format");
  }

  const rules = incidentRules[incidentType];
  const questionIds = Object.keys(rules);
  for (const question of questionIds) {
    if (!Object.hasOwn(answers, question)) {
      throw ApiError.badRequest("Please answer all questions", question);
    }
  }

  const answerKeys = Object.keys(answers);
  for (const questionId of answerKeys) {
    if (!questionIds.includes(questionId)) {
      throw ApiError.badRequest(
        "Request contains unexpected answer, please try again.",
      );
    }
  }

  for (const id of questionIds) {
    const ans = answers[id];
    const allowed = rules[id];
    if (typeof ans !== "string" || !allowed.includes(ans)) {
      throw ApiError.badRequest(
        "Request contains unexpected answer for selected question",
        id,
      );
    }
  }
}

export function isPlainObject(value) {
  if (value === null || value === undefined) return false;
  if (typeof value !== "object") return false;
  if (Array.isArray(value)) return false;

  return true;
}

export function buildPayload(body) {
  // This function takes the validated request body and returns a new object consisting of the incident type and answers

  const {incidentType, answers} = body;
  const rules = incidentRules[incidentType];
  const questionIds = Object.keys(rules);

   const cleanAnswers = {};
   for(const qId of questionIds){
    cleanAnswers[qId] = answers[qId];
  }

  const cleanPayload = {incidentType, answers: cleanAnswers};
  return cleanPayload;
}
