export const dangerRules = {
  "flat-tire": [
    { questionId: "safeToWait", values: ["no", "unsure"] },
    { questionId: "immediateDanger", values: ["yes", "unsure"] },
    {
      questionId: "vehicleLocation",
      values: ["main-road-highway", "not-stopped", "unsure"],
    },
    { questionId: "clearOfTraffic", values: ["no", "unsure"] },
  ],

  "minor-accident": [
    { questionId: "immediateDanger", values: ["yes", "unsure"] },
    { questionId: "safeLocation", values: ["no", "unsure"] },
    { questionId: "vehicleLocation", values: ["no", "unsure"] },
    { questionId: "vehicleCondition", values: ["no", "unsure"] },
    { questionId: "documentedIncident", values: ["unsafe"] },
  ],

  "dead-battery": [
    { questionId: "immediateDanger", values: ["yes", "unsure"] },
    { questionId: "safeLocation", values: ["no", "unsure"] },
    { questionId: "vehicleLocation", values: ["traffic", "other"] },
    { questionId: "batteryCondition", values: ["yes", "not-checked"] },
  ],

  "breakdown-warning-light": [
    { questionId: "immediateDanger", values: ["yes", "unsure"] },
    { questionId: "drivingStatus", values: ["yes"] },
    { questionId: "safeLocation", values: ["no", "unsure"] },
    { questionId: "seriousSymptoms", values: ["yes", "unsure"] },
    { questionId: "vehicleStatus", values: ["running-poorly"] },
    { questionId: "warningType", values: ["oil"] },
  ],

  "vehicle-break-in-or-theft": [
    { questionId: "immediateDanger", values: ["yes", "unsure"] },
    { questionId: "safeLocation", values: ["no", "unsure"] },
    { questionId: "documentedIncident", values: ["unsafe"] },
  ],
};

export function hasDangerNotice(incidentType, answers) {
  // holds the list of rules for the selected incident type
  const rules = dangerRules[incidentType];
  if (!rules) return false;

  // loop through rules here
  for (const rule of rules) {
    // for each rule, read the users user for that questionId
    const answer = answers?.[rule.questionId];
    if(rule.values.includes(answer)){
        return true;
    }
  }
  return false;
}
