export const incidentRules = {
  "flat-tire": {
    safeToWait: ["yes", "no", "unsure"],
    immediateDanger: ["yes", "no", "unsure"],
    vehicleLocation: [
      "off-road",
      "residential-street",
      "main-road-highway",
      "not-stopped",
      "unsure",
    ],
    clearOfTraffic: ["yes", "no", "unsure"],
    helpStatus: ["on-the-way", "can-contact", "need-help"],
    tireEquipment: ["spare", "repair-kit", "none", "unsure"],
  },

  "minor-accident": {
    immediateDanger: ["yes", "no", "unsure"],
    safeLocation: ["yes", "no", "unsure"],
    vehicleLocation: ["yes", "no", "unsure"],
    otherParty: ["another-driver", "property", "both", "no", "unsure"],
    documentedIncident: ["yes", "partly", "no", "unsafe"],
    vehicleCondition: ["yes", "no", "unsure"],
  },

  "dead-battery": {
    immediateDanger: ["yes", "no", "unsure"],
    safeLocation: ["yes", "no", "unsure"],
    vehicleLocation: ["parking-area", "roadside", "traffic", "other"],
    startingProblem: ["no-response", "clicks", "cranks", "unsure"],
    batteryCondition: ["yes", "no", "not-checked"],
    helpAvailable: ["roadside", "trusted-person", "both", "none"],
  },

  "breakdown-warning-light": {
    immediateDanger: ["yes", "no", "unsure"],
    drivingStatus: ["yes", "no"],
    safeLocation: ["yes", "no", "unsure"],
    warningType: ["temperature", "oil", "engine", "other"],
    seriousSymptoms: ["yes", "no", "unsure"],
    vehicleStatus: ["running", "running-poorly", "stopped", "off"],
  },

  "vehicle-break-in-or-theft": {
    immediateDanger: ["yes", "no", "unsure"],
    safeLocation: ["yes", "no", "unsure"],
    incidentStatus: ["break-in", "stolen", "attempted-theft", "unsure"],
    authoritiesContacted: ["yes", "no", "unsure"],
    documentedIncident: ["yes", "partly", "no", "unsafe"],
    importantItems: ["yes", "no", "unsure"],
  },
};
