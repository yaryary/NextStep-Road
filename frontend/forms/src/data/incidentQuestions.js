export const incidentQuestions = {
  "flat-tire": [
    {
      id: "immediateDanger",
      label: "Is anyone hurt or in immediate danger?",
      options: [
        { value: "no", label: "No" },
        { value: "yes", label: "Yes" },
        { value: "unsure", label: "Not sure" },
      ],
    },
    {
      id: "safeToWait",
      label: "Are you and any passengers somewhere safe to wait right now?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "unsure", label: "Not sure" },
      ],
    },
    {
      id: "vehicleLocation",
      label: "Where is the vehicle stopped?",
      options: [
        { value: "off-road", label: "Parking lot or off-road area" },
        { value: "residential-street", label: "Residential street" },
        { value: "main-road-highway", label: "Main road or highway" },
        { value: "not-stopped", label: "Not stopped yet" },
        { value: "unsure", label: "Not sure" },
      ],
    },
    {
      id: "clearOfTraffic",
      label: "Is the vehicle clear of moving traffic?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "unsure", label: "Not sure" },
      ],
    },
    {
      id: "helpStatus",
      label: "Have you contacted someone for help?",
      options: [
        { value: "on-the-way", label: "Help is on the way" },
        { value: "can-contact", label: "No, but I can contact help" },
        { value: "need-help", label: "No, and I need help contacting someone" },
      ],
    },
    {
      id: "tireEquipment",
      label: "Do you have a usable spare tire or tire repair kit?",
      options: [
        { value: "spare", label: "Yes, a spare" },
        { value: "repair-kit", label: "Yes, a repair kit" },
        { value: "none", label: "No" },
        { value: "unsure", label: "Not sure" },
      ],
    },
  ],
  "minor-accident": [
    {
      id: "immediateDanger",
      label: "Is anyone hurt or in immediate danger?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "unsure", label: "Not sure" },
      ],
    },
    {
      id: "safeLocation",
      label: "Are you and any passengers somewhere safe right now?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "unsure", label: "Not sure" },
      ],
    },
    {
      id: "vehicleLocation",
      label: "Is your vehicle out of moving traffic?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "unsure", label: "Not sure" },
      ],
    },
    {
      id: "otherParty",
      label: "Was another driver or someone's property involved?",
      options: [
        { value: "another-driver", label: "Yes, another driver" },
        { value: "property", label: "Yes, someone's property" },
        { value: "both", label: "Both" },
        { value: "no", label: "No" },
        { value: "unsure", label: "Not sure" },
      ],
    },
    {
      id: "documentedIncident",
      label: "Have you documented the damage and accident details?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "partly", label: "Some, but not everything" },
        { value: "no", label: "Not yet" },
        { value: "unsafe", label: "I can't do that safely right now" },
      ],
    },
    {
      id: "vehicleCondition",
      label: "Does your vehicle seem safe to drive?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "unsure", label: "Not sure" },
      ],
    },
  ],
  "dead-battery": [
    {
      id: "immediateDanger",
      label: "Is anyone hurt or in immediate danger?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "unsure", label: "Not sure" },
      ],
    },
    {
      id: "safeLocation",
      label: "Are you and any passengers somewhere safe to wait?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "unsure", label: "Not sure" },
      ],
    },
    {
      id: "vehicleLocation",
      label: "Where is the vehicle?",
      options: [
        { value: "parking-area", label: "In a parking lot or driveway" },
        { value: "roadside", label: "On the roadside, away from traffic" },
        { value: "traffic", label: "In or close to moving traffic" },
        { value: "other", label: "Somewhere else or not sure" },
      ],
    },
    {
      id: "startingProblem",
      label: "What happens when you try to start the vehicle?",
      options: [
        { value: "no-response", label: "Nothing happens" },
        { value: "clicks", label: "It clicks but does not start" },
        { value: "cranks", label: "The engine turns over but does not start" },
        { value: "unsure", label: "Not sure" },
      ],
    },
    {
      id: "batteryCondition",
      label:
        "Do you notice battery damage, leaking, or a strong unusual smell?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        {
          value: "not-checked",
          label: "I haven't checked, or it isn't safe to check",
        },
      ],
    },
    {
      id: "helpAvailable",
      label: "What help is available to you right now?",
      options: [
        { value: "roadside", label: "Roadside assistance" },
        { value: "trusted-person", label: "Someone I can call" },
        { value: "both", label: "Both" },
        { value: "none", label: "Neither or not sure" },
      ],
    },
  ],

  "breakdown-warning-light": [
    {
      id: "immediateDanger",
      label: "Is anyone hurt or in immediate danger?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "unsure", label: "Not sure" },
      ],
    },
    {
      id: "drivingStatus",
      label: "Are you still driving?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No, I'm stopped" },
      ],
    },
    {
      id: "safeLocation",
      label:
        "Are you and any passengers somewhere safe, away from moving traffic?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "unsure", label: "Not sure" },
      ],
    },
    {
      id: "warningType",
      label: "What warning or problem did you notice?",
      options: [
        {
          value: "temperature",
          label: "High temperature or overheating warning",
        },
        { value: "oil", label: "Oil pressure warning" },
        { value: "engine", label: "Check-engine light" },
        { value: "other", label: "Another warning or not sure" },
      ],
    },
    {
      id: "seriousSymptoms",
      label: "Do you notice smoke, steam, leaking fluid, or a strong smell?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "unsure", label: "Not sure" },
      ],
    },
    {
      id: "vehicleStatus",
      label: "What is the vehicle doing now?",
      options: [
        { value: "running", label: "Running normally" },
        { value: "running-poorly", label: "Running poorly or losing power" },
        { value: "stopped", label: "Stopped and won't restart" },
        { value: "off", label: "Turned off; I haven't tried restarting" },
      ],
    },
  ],

  "vehicle-break-in-or-theft": [
    {
      id: "immediateDanger",
      label: "Is anyone hurt, threatened, or in immediate danger?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "unsure", label: "Not sure" },
      ],
    },
    {
      id: "safeLocation",
      label: "Are you somewhere safe right now?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "unsure", label: "Not sure" },
      ],
    },
    {
      id: "incidentStatus",
      label: "What happened to the vehicle?",
      options: [
        {
          value: "break-in",
          label: "The vehicle is here, but it was broken into",
        },
        {
          value: "stolen",
          label: "The vehicle is missing and may have been stolen",
        },
        {
          value: "attempted-theft",
          label: "The vehicle is here, but someone may have tried to steal it",
        },
        { value: "unsure", label: "I'm not sure yet" },
      ],
    },
    {
      id: "authoritiesContacted",
      label: "Have you contacted local police or campus security?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "Not yet" },
        { value: "unsure", label: "I'm not sure who to contact" },
      ],
    },
    {
      id: "documentedIncident",
      label: "Have you documented what happened, if it was safe to do so?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "partly", label: "Some details, but not everything" },
        { value: "no", label: "Not yet" },
        { value: "unsafe", label: "It isn't safe to do that right now" },
      ],
    },
    {
      id: "importantItems",
      label:
        "Were keys, identification, or payment cards taken or possibly exposed?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "unsure", label: "Not sure" },
      ],
    },
  ],
};
