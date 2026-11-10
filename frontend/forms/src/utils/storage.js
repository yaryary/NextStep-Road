const SAVED_KEYS = [
  "nextStepSession",
  "nextStepChecks",
  "nextStepAnswers",
  "nextStepIndex",
  "nextStepPrivacy",
  "nextStepIncident",
  "nextStepNotes",
];

export function clearSavedPlan() {
  SAVED_KEYS.forEach((key) => localStorage.removeItem(key));
}