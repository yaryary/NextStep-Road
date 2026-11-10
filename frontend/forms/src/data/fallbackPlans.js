const DISCLAIMER =
  "This is a general safety and organization checklist, not a repair guide or professional advice. NextStep Road can't see your surroundings, judge whether your vehicle is safe to drive, or confirm what help or coverage you have. Follow instructions from emergency responders and qualified assistance providers.";

function createChecklist() {
  const checklist = [];
  const add = (category, task, priority) =>
    checklist.push({
      id: `step-${checklist.length + 1}`,
      category,
      task,
      priority,
    });
  return { checklist, add };
}

function buildFlatTirePlan(answers = {}) {
  const {
    immediateDanger,
    safeToWait,
    vehicleLocation,
    clearOfTraffic,
    helpStatus,
    tireEquipment,
  } = answers;

  const notStopped = vehicleLocation === "not-stopped";
  const onBusyRoad = vehicleLocation === "main-road-highway";
  const trafficRisk = clearOfTraffic === "no" || clearOfTraffic === "unsure";
  const waitingUnsafe = safeToWait === "no" || safeToWait === "unsure";
  const inDanger =
    immediateDanger === "yes" ||
    immediateDanger === "unsure" ||
    safeToWait === "no" ||
    safeToWait === "unsure" ||
    clearOfTraffic === "no" ||
    clearOfTraffic === "unsure";
  const fullySafe =
    !inDanger &&
    !notStopped &&
    safeToWait === "yes" &&
    clearOfTraffic === "yes" &&
    immediateDanger === "no";

  const { checklist, add } = createChecklist();

  // Safety
  if (inDanger) {
    add(
      "Safety",
      "Call 911 now if anyone is hurt, you feel threatened, or your vehicle is in or next to moving traffic. Tell them where you are and that you are in an unsafe spot.",
      "urgent",
    );
  }

  if (notStopped) {
    add(
      "Safety",
      "Do not use this app while driving. Slow down gradually and pull out of moving traffic when it is safe. A shoulder, parking lot, or gas station is better than stopping in a lane.",
      "urgent",
    );
  }

  add(
    "Safety",
    notStopped
      ? "Turn on your hazard lights while you slow down, so other drivers can see something is wrong."
      : "Turn on your hazard lights so other drivers know your vehicle is stopped.",
    "urgent",
  );

  if (!notStopped) {
    if (trafficRisk || waitingUnsafe || onBusyRoad) {
      add(
        "Safety",
        "Stay buckled inside with your passengers unless staying in the vehicle feels more dangerous. If you must get out, exit away from traffic and stand well away from the road. Do not walk around the vehicle or inspect the tire.",
        "urgent",
      );
    } else {
      add(
        "Safety",
        "Put the vehicle in Park and set the parking brake. Wait inside or well away from traffic. Stay out of any lane or driveway where other vehicles could pass.",
        "urgent",
      );
    }
  }

  if (!fullySafe) {
    add(
      "Safety",
      "Don't try to change the tire here. A roadside tire change next to traffic is risky. Wait for help until you are in a calm, flat spot clear of traffic.",
      "urgent",
    );
  }

  // Location
  add(
    "Documentation",
    onBusyRoad
      ? "Write down the road name, direction of travel, and the nearest exit or mile marker. Highway helpers need these details to find you."
      : "Note the street or road name, an address, or a nearby landmark so you can tell a helper where you are. Don't walk toward traffic to find this.",
    "important",
  );

  // Help
  if (helpStatus === "on-the-way") {
    add(
      "Safety",
      "Keep your phone charged and nearby. Watch for updates from the person or service coming to help, and check that they are who you expect before you open the door or leave the vehicle.",
      "important",
    );
  } else if (helpStatus === "need-help") {
    add(
      "Safety",
      "If you can't contact anyone, ask a trusted person nearby to call for you. You can also call 911 if you are in an unsafe spot. If you are on campus, campus safety may be able to send someone.",
      "important",
    );
  } else {
    add(
      "Safety",
      "Contact roadside assistance, campus safety, or a trusted person and tell them you have a flat tire, where you are, and whether you are near moving traffic.",
      "important",
    );
  }

  // Equipment
  if (tireEquipment === "spare") {
    add(
      "Documentation",
      "Tell your helper you believe you have a spare tire. Let them check its condition and handle the swap. You don't need to unload the trunk yourself.",
      "important",
    );
  } else if (tireEquipment === "repair-kit") {
    add(
      "Documentation",
      "Tell your helper you have a tire repair kit. A kit may not work on every kind of damage, so let them decide whether it is suitable.",
      "important",
    );
  } else if (tireEquipment === "none") {
    add(
      "Documentation",
      "Tell your helper you don't have a spare or repair kit, so they can plan for a tow or other options.",
      "important",
    );
  } else {
    add(
      "Documentation",
      "Tell your helper you aren't sure whether you have a spare or repair kit. Don't leave a safe spot just to check.",
      "important",
    );
  }

  // Documentation (only when it is safe)
  if (fullySafe) {
    add(
      "Documentation",
      "If it feels safe, take a photo of the tire and your surroundings and save the time and place. This is optional and only for your own records.",
      "helpful",
    );
  }

  // Follow-up
  if (tireEquipment === "spare") {
    add(
      "Follow-up",
      "After the spare is on, ask the helper how far and how fast you can drive on it. Plan to have the damaged tire looked at by a tire shop soon.",
      "helpful",
    );
  } else {
    add(
      "Follow-up",
      "Ask the helper about next steps, such as a tow or a tire shop. Ask about costs before you agree, since coverage depends on your plan.",
      "helpful",
    );
  }

  return {
    title: "Flat Tire: Your Next Steps",
    safetyNotice: inDanger
      ? "You may be in an unsafe spot. If anyone is hurt or you are near moving traffic, call 911 first. Everything else can wait."
      : notStopped
        ? "Do not use this app while driving. Stop in a safe place first, then come back to this checklist."
        : "You seem to be in a safe spot, but stay alert to traffic and your surroundings while you wait.",
    summary:
      "A general checklist for your flat tire. It focuses on staying safe, telling someone where you are, and getting help, not on fixing the tire yourself.",
    checklist,
    disclaimer: DISCLAIMER,
  };
}

function buildMinorAccidentPlan(answers = {}) {
  const {
    immediateDanger,
    safeLocation,
    vehicleLocation,
    otherParty,
    documentedIncident,
    vehicleCondition,
  } = answers;

  const inDanger =
    immediateDanger === "yes" ||
    immediateDanger === "unsure" ||
    safeLocation === "no" ||
    safeLocation === "unsure" ||
    vehicleLocation === "no" ||
    vehicleLocation === "unsure";
  const inTraffic = vehicleLocation === "no" || vehicleLocation === "unsure";
  const othersInvolved = otherParty && otherParty !== "no";
  const { checklist, add } = createChecklist();

  if (inDanger) {
    add(
      "Safety",
      "Call 911 now if anyone may be hurt, you feel threatened, or your vehicle is blocking or close to moving traffic. Tell them where you are.",
      "urgent",
    );
  }

  add(
    "Safety",
    inTraffic
      ? "If it is safe and the vehicle can move, move it out of traffic. If it can't move or you aren't sure, stay inside with your seat belt on and keep your hazard lights on until help arrives."
      : "Turn on your hazard lights and stay somewhere safe, away from moving traffic.",
    "urgent",
  );

  if (othersInvolved) {
    add(
      "Safety",
      "Check that the other people involved are safe. Keep calm, and don't argue about who caused the accident or accept blame at the scene.",
      "urgent",
    );
    add(
      "Documentation",
      "If it is safe, exchange only what is needed: names, contact details, and insurance information. Don't share more than that.",
      "important",
    );
  }

  if (otherParty === "property" || otherParty === "both") {
    add(
      "Documentation",
      "If you hit someone's property, such as a parked car, fence, or sign, find the owner if you can, or leave your contact details in a safe way. Check local rules about reporting.",
      "important",
    );
  }

  add(
    "Safety",
    "Consider calling the police or campus security to report the accident, especially if there is injury, major damage, or another driver involved. They can tell you how to get a report.",
    "important",
  );

  if (documentedIncident === "yes") {
    add(
      "Documentation",
      "Keep your photos and notes together in one place so they are ready when you contact your insurance company.",
      "helpful",
    );
  } else if (documentedIncident === "unsafe") {
    add(
      "Documentation",
      "Skip photos for now. Your safety comes first. Once you are somewhere safe, write down what you remember: time, place, what happened, and who was involved.",
      "important",
    );
  } else {
    add(
      "Documentation",
      "Only if it is safe, take photos of the damage, the vehicles, and the surroundings. Then write down the time, place, and what happened while it is fresh.",
      "important",
    );
  }

  if (vehicleCondition === "yes") {
    add(
      "Follow-up",
      "Even if the vehicle seems drivable, watch for new noises, warning lights, or handling changes. Consider having it checked.",
      "helpful",
    );
  } else {
    add(
      "Follow-up",
      "If you aren't sure the vehicle is safe to drive, don't drive it. Ask a tow service or roadside assistance for help.",
      "important",
    );
  }

  add(
    "Follow-up",
    "Contact your insurance company to ask how to report the accident and what they need from you. Don't assume what your policy covers.",
    "helpful",
  );

  return {
    title: "Minor Accident: Your Next Steps",
    safetyNotice: inDanger
      ? "Someone may be hurt or you may be in an unsafe spot. Call 911 first. Everything else can wait."
      : "You seem to be safe, but stay alert to traffic and your surroundings.",
    summary:
      "A general checklist for the time right after a minor accident. It covers safety, what to document, and who to contact. It doesn't decide who was at fault.",
    checklist,
    disclaimer: DISCLAIMER,
  };
}

function buildDeadBatteryPlan(answers = {}) {
  const {
    immediateDanger,
    safeLocation,
    vehicleLocation,
    startingProblem,
    batteryCondition,
    helpAvailable,
  } = answers;

  const nearTraffic = vehicleLocation === "traffic";
  const batteryConcern = batteryCondition === "yes";
  const inDanger =
    immediateDanger === "yes" ||
    immediateDanger === "unsure" ||
    safeLocation === "no" ||
    safeLocation === "unsure" ||
    nearTraffic ||
    batteryConcern;
  const { checklist, add } = createChecklist();

  if (inDanger) {
    add(
      "Safety",
      "Call 911 if anyone is hurt, you feel threatened, you see smoke or a strong burning smell, or your vehicle is in or near moving traffic.",
      "urgent",
    );
  }

  if (nearTraffic || vehicleLocation === "roadside") {
    add(
      "Safety",
      "Turn on your hazard lights. Stay buckled inside, or move well away from traffic if staying inside feels less safe. Don't stand between your vehicle and the road.",
      "urgent",
    );
  } else {
    add(
      "Safety",
      "Turn on your hazard lights if they work, and wait somewhere safe. A parking lot or driveway is usually calmer, but still watch for other vehicles.",
      "important",
    );
  }

  if (batteryConcern) {
    add(
      "Safety",
      "You noticed battery damage, leaking, or a strong smell. Keep away from the battery, don't try to jump-start the vehicle, and ask a professional for help.",
      "urgent",
    );
  } else if (batteryCondition === "not-checked") {
    add(
      "Safety",
      "Don't check the battery or open the hood if it isn't safe. A professional can look at it when they arrive.",
      "important",
    );
  }

  if (startingProblem === "cranks") {
    add(
      "Documentation",
      "Tell your helper that the engine turns over but doesn't start. That can mean a different problem than a dead battery, so don't assume the cause.",
      "important",
    );
  } else if (startingProblem === "clicks") {
    add(
      "Documentation",
      "Tell your helper the vehicle clicks but doesn't start, and mention anything you left on, like lights.",
      "important",
    );
  } else if (startingProblem === "no-response") {
    add(
      "Documentation",
      "Tell your helper that nothing happens when you try to start the vehicle, and mention anything you left on, like lights.",
      "important",
    );
  } else {
    add(
      "Documentation",
      "Describe what happened when you tried to start the vehicle, even if you aren't sure what it means.",
      "important",
    );
  }

  if (helpAvailable === "roadside") {
    add(
      "Safety",
      "Contact your roadside assistance provider and tell them where you are and whether you are near traffic.",
      "important",
    );
  } else if (helpAvailable === "trusted-person") {
    add(
      "Safety",
      "Call the person who can help. Tell them where you are. Ask them to wait for a professional if a jump-start would be unsafe.",
      "important",
    );
  } else if (helpAvailable === "both") {
    add(
      "Safety",
      "Start with roadside assistance for the safest option, and let your trusted person know where you are.",
      "important",
    );
  } else {
    add(
      "Safety",
      "If you don't know who to call, ask someone nearby for help, or contact campus safety if you are on campus. Call 911 if you feel unsafe.",
      "important",
    );
  }

  add(
    "Documentation",
    "Note the street or address, a landmark, or a mile marker so you can tell a helper where you are.",
    "important",
  );

  add(
    "Follow-up",
    batteryConcern
      ? "Ask a professional to look at the battery before anyone tries to start the vehicle. Costs and coverage depend on your plan, so ask before you agree."
      : "After the vehicle starts, ask the helper whether to drive it right away or get the battery tested. Costs and coverage depend on your plan, so ask before you agree.",
    "helpful",
  );

  return {
    title: "Dead Battery: Your Next Steps",
    safetyNotice: inDanger
      ? "There may be a safety concern. Call 911 if anyone is in danger, then get professional help."
      : "You seem to be in a safe spot. Stay alert while you wait for help.",
    summary:
      "A general checklist for a vehicle that won't start. It focuses on staying safe and getting help, and it doesn't diagnose the problem.",
    checklist,
    disclaimer: DISCLAIMER,
  };
}

function buildBreakdownPlan(answers = {}) {
  const {
    immediateDanger,
    drivingStatus,
    safeLocation,
    warningType,
    seriousSymptoms,
    vehicleStatus,
  } = answers;

  const stillDriving = drivingStatus === "yes";
  const symptoms = seriousSymptoms === "yes" || seriousSymptoms === "unsure";
  const poorRunning =
    vehicleStatus === "running-poorly" || vehicleStatus === "stopped";
  const inDanger =
    immediateDanger === "yes" ||
    immediateDanger === "unsure" ||
    safeLocation === "no" ||
    safeLocation === "unsure" ||
    seriousSymptoms === "yes" ||
    seriousSymptoms === "unsure";
  const { checklist, add } = createChecklist();

  if (inDanger) {
    add(
      "Safety",
      "Call 911 if anyone is hurt, you see smoke or flames, or your vehicle is in or near moving traffic. Get yourself and any passengers away from the vehicle if it feels unsafe.",
      "urgent",
    );
  }

  if (stillDriving) {
    add(
      "Safety",
      "Do not use this app while driving. Turn on your hazard lights, slow down gradually, and pull out of moving traffic when it is safe. Then turn the vehicle off.",
      "urgent",
    );
  } else {
    add(
      "Safety",
      "Keep your hazard lights on. Stay buckled inside, or move well away from traffic if staying inside feels less safe.",
      "urgent",
    );
  }
  if (symptoms) {
    add(
      "Safety",
      "You noticed smoke, steam, a leak, or a strong smell, or aren't sure. Stay away from the engine area and don't keep driving. Ask a professional or tow service for help.",
      "urgent",
    );
  }

  if (warningType === "temperature") {
    add(
      "Safety",
      "Don't open the hood or radiator cap while the engine is hot, because steam or hot fluid can cause burns. Turn the vehicle off and let a professional look at it.",
      "urgent",
    );
  } else if (warningType === "oil") {
    add(
      "Safety",
      "An oil pressure warning can be serious. Avoid driving the vehicle further, and ask a professional or tow service what to do.",
      "urgent",
    );
  } else if (warningType === "engine") {
    add(
      "Safety",
      "A check-engine light can mean many things. If the vehicle runs normally and there are no other symptoms, a professional can check it soon. If it flashes or the vehicle runs badly, stop driving.",
      "important",
    );
  } else {
    add(
      "Safety",
      "Look up the warning in your owner's manual only if you are safely stopped. If you aren't sure what it means, treat it as a reason to ask a professional.",
      "important",
    );
  }

  if (vehicleStatus === "running") {
    add(
      "Follow-up",
      "The vehicle is running normally, but the warning is still a reason to have it checked soon. Ask a professional whether it is safe to keep driving.",
      "important",
    );
  } else if (poorRunning) {
    add(
      "Follow-up",
      "Because the vehicle is running poorly or won't restart, don't keep trying or driving it. Contact roadside assistance, campus safety, or a trusted person to arrange a tow or ride.",
      "important",
    );
  } else {
    add(
      "Follow-up",
      "You haven't restarted the vehicle. If you do, watch for the warning to return. If you aren't sure it is safe, ask a professional first.",
      "helpful",
    );
  }

  add(
    "Documentation",
    "Note the street or address, a landmark, or a mile marker so you can tell a helper where you are.",
    "important",
  );

  add(
    "Documentation",
    "Write down which warning appeared, when it began, and what the vehicle was doing. If it is safe, take a photo of the dashboard. This helps a mechanic.",
    "helpful",
  );

  return {
    title: "Breakdown or Warning Light: Your Next Steps",
    safetyNotice: inDanger
      ? "There may be a safety concern. Call 911 if anyone is in danger, then get professional help."
      : stillDriving
        ? "Do not use this app while driving. Stop in a safe place first."
        : "You seem to be in a safe spot. Stay alert while you decide on help.",
    summary:
      "A general checklist for a warning light or breakdown. It focuses on staying safe and getting help, and it doesn't diagnose the problem.",
    checklist,
    disclaimer: DISCLAIMER,
  };
}

function buildBreakInPlan(answers = {}) {
  const {
    immediateDanger,
    safeLocation,
    incidentStatus,
    authoritiesContacted,
    documentedIncident,
    importantItems,
  } = answers;
  

  const inDanger =
    immediateDanger === "yes" ||
    immediateDanger === "unsure" ||
    safeLocation === "no" ||
    safeLocation === "unsure";
  const stolen = incidentStatus === "stolen";
  const { checklist, add } = createChecklist();

  if (inDanger) {
    add(
      "Safety",
      "Call 911 if anyone is hurt or threatened, or you feel unsafe. Move to a safe, well-lit place with other people, and leave the vehicle alone.",
      "urgent",
    );
  }

  if (!stolen) {
    add(
      "Safety",
      "If someone may still be nearby, don't approach the vehicle or confront anyone. Wait somewhere safe for help.",
      "urgent",
    );
  }

  if (authoritiesContacted === "yes") {
    add(
      "Documentation",
      "Keep the report number, the officer's name, and the time you called somewhere you can find them.",
      "important",
    );
  } else if (authoritiesContacted === "no") {
    add(
      "Safety",
      "Contact local police or campus security to report it. If you aren't in danger, a non-emergency line is usually fine. Ask how to get a copy of the report.",
      "important",
    );
  } else {
    add(
      "Safety",
      "If you aren't sure who to contact, try campus security if you are on campus, or the local police non-emergency line. Call 911 if you are in danger.",
      "important",
    );
  }

  if (stolen) {
    add(
      "Documentation",
      "Before you call, check that you remember where you parked, and whether it might have been towed. Then report the theft and give the make, model, color, and plate number to the police.",
      "important",
    );
  } else {
    add(
      "Documentation",
      "Don't touch or clean anything inside the vehicle until you are told it is okay. This can help if the police want to look at it.",
      "important",
    );
  }

  if (documentedIncident === "yes") {
    add(
      "Documentation",
      "Keep your photos and notes together in one place so they are ready for your report and insurer.",
      "helpful",
    );
  } else if (documentedIncident === "unsafe") {
    add(
      "Documentation",
      "Skip photos for now. Once you are somewhere safe, write down the time, place, and what you noticed.",
      "important",
    );
  } else {
    add(
      "Documentation",
      "If it is safe, take photos of the vehicle, any damage, and the area. List what is missing. Write down the time and place.",
      "important",
    );
  }

  if (importantItems === "yes" || importantItems === "unsure") {
    add(
      "Safety",
      "If keys, ID, or payment cards were taken or might have been, act quickly. Contact your bank or card issuer, and think about changing locks or digital key access. Be careful with your ID and personal accounts.",
      "urgent",
    );
  }

  add(
    "Follow-up",
    "Contact your insurance company to ask how to report this and what they need. Don't assume what your policy covers.",
    "helpful",
  );

  if (!stolen) {
    add(
      "Follow-up",
      "Before you drive, check that the vehicle is safe to use. A broken window or lock can be a hazard. Ask a professional if you aren't sure.",
      "helpful",
    );
  }

  return {
    title: stolen
      ? "Vehicle Theft: Your Next Steps"
      : "Vehicle Break-In or Theft: Your Next Steps",
    safetyNotice: inDanger
      ? "You may be in an unsafe spot. Call 911 first and stay away from the vehicle."
      : "Your safety matters more than your belongings. Don't confront anyone.",
    summary:
      "A general checklist for a break-in or theft. It covers safety, reporting, documenting, and protecting important items. It doesn't decide what happened.",
    checklist,
    disclaimer: DISCLAIMER,
  };
}

export const fallbackPlans = {
  "flat-tire": buildFlatTirePlan,
  "minor-accident": buildMinorAccidentPlan,
  "dead-battery": buildDeadBatteryPlan,
  "breakdown-warning-light": buildBreakdownPlan,
  "vehicle-break-in-or-theft": buildBreakInPlan,
};

export function getFallbackPlan(incidentType, answers) {
  const build = fallbackPlans[incidentType];
  return build ? build(answers) : null;
}
