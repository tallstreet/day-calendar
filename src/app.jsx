import React from "react";
import Calendar from "./pages/calendar";
import { generateEvents } from "./utils/utils";
import { START_DATE, END_DATE, INCREMENT_MINS } from "./utils/consts";

// Import and apply CSS stylesheet
import "./styles/styles.css";

export default function Home() {
  const events = generateEvents(START_DATE, END_DATE, INCREMENT_MINS);

  return (
    <div className="content">
      <Calendar
        start={START_DATE}
        end={END_DATE}
        incrementMins={INCREMENT_MINS}
        events={events}
      />
    </div>
  );
}
