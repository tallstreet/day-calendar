import * as React from "react";
import Event from "./event";

export default function Events({ events }) {
  return (
    <div className="events">
      {events.map((event) => (
        <Event
          data-testid="event"
          key={event.name + event.startPct}
          event={event}
        />
      ))}
    </div>
  );
}
