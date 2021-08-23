import { DateTime, Duration } from "luxon";
import {
  MIN_MEETING_LENGTH_MINS,
  AVG_MEETING_LENGTH_MINS,
  MEETING_NAMES,
  COLORS,
  NUM_EVENTS,
} from "./consts";

function randomInt(start = 0, end = 1) {
  return start + Math.floor(Math.random() * (end - start));
}

export function generateDates(start, end, increment) {
  let dates = [];
  let date = start;
  while (date < end) {
    dates.push(date);
    date = date.plus({ minutes: increment });
  }
  dates.push(date);
  return dates;
}

function generateEvent(startDate, endDate, increment) {
  const MINS_TO_MILLIS = 60000;
  const DURATION = endDate.diff(startDate);
  const start = DateTime.fromMillis(
    randomInt(
      startDate.toMillis(),
      endDate.toMillis() - increment * MINS_TO_MILLIS
    )
  );
  const lengthMins =
    Math.floor(Math.random() * AVG_MEETING_LENGTH_MINS * 2) +
    MIN_MEETING_LENGTH_MINS;
  const length = Duration.fromMillis(lengthMins * MINS_TO_MILLIS);
  return {
    start,
    startPct: (start.diff(startDate).toMillis() / DURATION.toMillis()) * 100,
    length,
    lengthPct: (length.toMillis() / DURATION.toMillis()) * 100,
    end: start.plus(length),
    name: MEETING_NAMES[randomInt(0, MEETING_NAMES.length)],
    color: COLORS[randomInt(0, COLORS.length)],
  };
}

function setWidths(events, columns) {
  for (let j = 0; j < columns.length; j++) {
    for (let k = 0; k < columns[j].length; k++) {
      events[columns[j][k]].widthPct = 100 / columns.length;
      events[columns[j][k]].leftPct = j * (100 / columns.length);
    }
  }
}

export function processEvents(events) {
  events.sort((a, b) => (a.start < b.start ? -1 : 1));
  let columns = [[0]];
  let maxDate = events[0].end;
  for (let i = 1; i < events.length; i++) {
    if (events[i].start > maxDate) {
      // event is after all existing all current events have finished, then set the widths of current events
      setWidths(events, columns);
      // reset the state back to a new column
      columns = [[i]];
      maxDate = events[i].end;
    } else {
      // either find first column the event can fit below or add a new column
      let added = false;
      for (let j = 0; j < columns.length; j++) {
        // if event can fit at bottom of a column then put it below
        if (events[columns[j][columns[j].length - 1]].end < events[i].start) {
          columns[j].push(i);
          added = true;
          break;
        }
      }
      // otherwise create a new column to the right
      if (!added) {
        columns.push([i]);
      }
      maxDate = maxDate > events[i].end ? maxDate : events[i].end;
    }
  }

  setWidths(events, columns);
  return events;
}

export function generateEvents(startDate, endDate, increment) {
  return Array(NUM_EVENTS)
    .fill()
    .map(() => generateEvent(startDate, endDate, increment));
}

export function formatDate(d) {
  return d.toFormat("t");
}
