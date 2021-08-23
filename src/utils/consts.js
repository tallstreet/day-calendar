import { DateTime } from "luxon";

export const START_HOUR = 9;
export const END_HOUR = 21;
export const INCREMENT_MINS = 15;
export const START_DATE = DateTime.fromObject({ hour: START_HOUR });
export const END_DATE = DateTime.fromObject({ hour: END_HOUR });
export const MIN_MEETING_LENGTH_MINS = 15;
export const AVG_MEETING_LENGTH_MINS = 60;
export const NUM_EVENTS = 10;
export const MEETING_NAMES = [
  "Round Table",
  "Conference Callers",
  "Confident Conference",
  "Meeting Of The Minds",
  "Meet Me In The Middle",
  "Centre Of It All",
  "Mind Meld",
  "Meet Me Here",
  "Pontification Station",
  "Decision Accelerator",
  "Pressure Cooker",
  "Bored Room",
  "Visionary Vista Facilitated Learning Space",
  "Crown Down",
  "Prefrontal Engagement",
  "Cranium Focus",
  "Noodlin’ Space",
  "Noggin Chamber",
  "Learning Loft",
  "Indoctrination Location",
  "Mind Expansion Mansion",
  "Germination Potential",
  "ABC Room"
];
export const COLORS = [
  "#003f5c",
  "#2f4b7c",
  "#665191",
  "#a05195",
  "#d45087",
  "#f95d6a",
  "#ff7c43",
  "#ffa600"
];
