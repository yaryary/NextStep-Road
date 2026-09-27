import { assets } from "../assets/assets";

export const incidentTypes = [
  {
    id: "flat-tire",
    title: "Flat tire",
    description: "Need roadside help or a spare tire.",
    icon: assets.flat_tire_icon,
  },
  {
    id: "minor-accident",
    title: "Minor accident",
    description: "Need help after a low-impact collision.",
    icon: assets.accident_icon,
  },
  {
    id: "dead-battery",
    title: "Dead battery",
    description: "Need a jump-start or battery assistance.",
    icon: assets.battery_icon,
  },
  {
    id: "breakdown-warning-light",
    title: "Breakdown or warning light",
    description: "Your vehicle stopped or a warning light came on.",
    icon: assets.light_icon,
  },
  {
    id: "vehicle-break-in-or-theft",
    title: "Vehicle break-in or theft",
    description: "Your vehicle was damaged, broken into, or stolen.",
    icon: assets.theft_icon,
  },

];