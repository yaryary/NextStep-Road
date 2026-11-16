import { isPlainObject } from "./validateRequest.js";

const validCategories = ["Safety", "Documentation", "Follow-up"];

const validPriority = ["urgent", "important", "helpful"];

export function isValidString(value) {
  if (typeof value !== "string") {
    return false;
  }

  const trimmedValue = value.trim();
  if (trimmedValue.length <= 0) {
    return false;
  }

  return true;
}

export function isValidPlan(plan) {
  if (!isPlainObject(plan)) {
    return false;
  }

  if (!isValidString(plan.title)) {
    return false;
  }
  if (!isValidString(plan.safetyNotice)) {
    return false;
  }
  if (!isValidString(plan.summary)) {
    return false;
  }
  if (!isValidString(plan.disclaimer)) {
    return false;
  }

  if (!Array.isArray(plan.checklist)) {
    return false;
  }
  if (plan.checklist.length <= 0) {
    return false;
  }

  const seenIds = new Set();

  for (const item of plan.checklist) {
    if (!isPlainObject(item)) {
      return false;
    }
    if (!isValidString(item.id)) {
      return false;
    }
    if (seenIds.has(item.id)) {
      return false;
    } else {
      seenIds.add(item.id);
    }
    if (!isValidString(item.task)) {
      return false;
    }
    if (!validCategories.includes(item.category)) {
      return false;
    }
    if (!validPriority.includes(item.priority)) {
      return false;
    }
  }

  return true;
}

/**
 * Which answers show a danger notice
 * 
 * flat-tire
 * - safeToWait - no unsure
 * - immediateDanger - yes unsure
 * - vehicleLocation - main-road-highway not-stopped unsure
 * - clearOfTraffic - no unsure
 * 
 * minor-accident
 * - immediateDanger - yes unsure
 * - safeLocation - no unsure
 * - vehicleLocation - no unsure
 * - vehicleCondition - no unsure
 * - documentedIncident - unsafe
 * 
 * 
 * dead-battery
 * - immediateDanger - yes unsure
 * - safeLocation - no unsure
 * - vehicleLocation - traffic other
 * - batteryCondition - yes not-checked
 *
 * breakdown-warning-light
 * - immediateDanger - yes unsure
 * - drivingStatus - yes
 * - safeLocation - no unsure
 * - seriousSymptoms - yes unsure
 * - vehicleStatus - running-poorly
 * - warningType - oil
 * 
 * 
 * vehicle-break-in-or-theft
 * - immediateDanger - yes unsure
 * - safeLocation - no unsure
 * - documentedIncident - unsafe
 * 
 */