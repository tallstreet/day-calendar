import * as React from "react";
import { formatDate } from "../utils/utils";

export default function Event({ event }) {
  return (
    <div
      className="event"
      data-testid="event"
      style={{
        background: event.color,
        top: event.startPct + "%",
        height: event.lengthPct + "%",
        left: event.leftPct + "%",
        width: event.widthPct + "%",
      }}
    >
      <div className="time">{formatDate(event.start)}</div>
      <div className="name">{event.name}</div>
    </div>
  );
}
