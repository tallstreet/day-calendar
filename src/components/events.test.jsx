import { render } from "@testing-library/react";
import { DateTime } from "luxon";
import Events from "./events";

test("renders all events", () => {
  const { getAllByTestId } = render(
    <Events
      events={[
        {
          color: "blue",
          leftPct: 23,
          widthPct: 100,
          lengthPct: 20,
          start: DateTime.fromObject({ hour: 2, minute: 30 }),
          name: "Test",
        },
        {
          color: "blue",
          leftPct: 23,
          widthPct: 100,
          lengthPct: 20,
          start: DateTime.fromObject({ hour: 2, minute: 30 }),
          name: "Test2",
        },
      ]}
    />
  );
  expect(getAllByTestId("event").length).toBe(2);
});
