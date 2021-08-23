import { generateDates, generateEvents, processEvents } from "./utils";
import { DateTime, Duration } from "luxon";

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

test("generate times betwen start and end time inclusively", () => {
  const start = DateTime.fromObject({ hours: 1 });
  const end = DateTime.fromObject({ hours: 2 });
  const dates = generateDates(start, end, 15);

  expect(dates[0]).toEqual(start);
  expect(dates[dates.length - 1]).toEqual(end);
  expect(dates.length).toBe(5);
});

test("generates random events", () => {
  const start = DateTime.fromObject({ hours: 1 });
  const end = DateTime.fromObject({ hours: 5 });
  const events = generateEvents(start, end, 15);

  const expectedEvent = {
    color: "#d45087",
    end: DateTime.fromObject({ hours: 4, minutes: 7, seconds: 30 }),
    length: Duration.fromObject({ milliseconds: 4500000 }),
    lengthPct: 31.25,
    name: "Bored Room",
    start: DateTime.fromObject({ hours: 2, minutes: 52, seconds: 30 }),
    startPct: 46.875,
  };

  expect(events.length).toEqual(10);
  expect(events[0]).toEqual(expectedEvent);
  expect(events[1]).toEqual(expectedEvent);
});

test("processes a list of events to set width and left of each event to display side by side when at same time", () => {
  const events = [
    {
      start: DateTime.fromObject({ hours: 1 }),
      end: DateTime.fromObject({ hours: 2 }),
    },
    {
      start: DateTime.fromObject({ hours: 1 }),
      end: DateTime.fromObject({ hours: 2 }),
    },
  ];
  processEvents(events);

  expect(events.length).toEqual(2);
  expect(events[0].leftPct).toEqual(0);
  expect(events[0].widthPct).toEqual(50);
  expect(events[1].leftPct).toEqual(50);
  expect(events[1].widthPct).toEqual(50);
});

test("processes a list of events to set width and left of each event to display side by side when overlapping", () => {
  const events = [
    {
      start: DateTime.fromObject({ hours: 1 }),
      end: DateTime.fromObject({ hours: 2 }),
    },
    {
      start: DateTime.fromObject({ hours: 1, minutes: 30 }),
      end: DateTime.fromObject({ hours: 2, minutes: 30 }),
    },
  ];
  processEvents(events);

  expect(events.length).toEqual(2);
  expect(events[0].leftPct).toEqual(0);
  expect(events[0].widthPct).toEqual(50);
  expect(events[1].leftPct).toEqual(50);
  expect(events[1].widthPct).toEqual(50);
});

test("processes a list of events to set width and left of each event as wide as possible and to display side by side when overlapping", () => {
  const events = [
    {
      start: DateTime.fromObject({ hours: 1 }),
      end: DateTime.fromObject({ hours: 2 }),
    },
    {
      start: DateTime.fromObject({ hours: 1, minutes: 30 }),
      end: DateTime.fromObject({ hours: 2, minutes: 30 }),
    },
    {
      start: DateTime.fromObject({ hours: 2 }),
      end: DateTime.fromObject({ hours: 2, minutes: 30 }),
    },
    {
      start: DateTime.fromObject({ hours: 2, minute: 0 }),
      end: DateTime.fromObject({ hours: 2, minutes: 30 }),
    },
    {
      start: DateTime.fromObject({ hours: 2, minute: 1 }),
      end: DateTime.fromObject({ hours: 2, minutes: 30 }),
    },
  ];
  processEvents(events);

  expect(events.length).toEqual(5);
  expect(events[0].leftPct).toEqual(0);
  expect(events[0].widthPct).toEqual(25);
  expect(events[1].leftPct).toEqual(25);
  expect(events[1].widthPct).toEqual(25);
  expect(events[2].leftPct).toEqual(50);
  expect(events[2].widthPct).toEqual(25);
  expect(events[3].leftPct).toEqual(75);
  expect(events[3].widthPct).toEqual(25);
  expect(events[4].leftPct).toEqual(0);
  expect(events[4].widthPct).toEqual(25);
});
