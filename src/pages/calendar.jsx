import * as React from "react";
import { useMemo } from "react";
import { processEvents, generateDates } from "../utils/utils";
import Calendar from "../components/calendar";
import Events from "../components/events";

export default function CalendarPage({
  events,
  start,
  end,
  incrementMins
}) {
  useMemo(() => {
    processEvents(events);
  }, [events]);

  const dates = useMemo(() => {
    return generateDates(start, end, incrementMins);
  }, [start, end, incrementMins]);

  return (
    <div className="calendar">
      <Calendar dates={dates} />
      <Events events={events} />
    </div>
  );
}
