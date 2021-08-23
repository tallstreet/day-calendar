import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DateTime } from "luxon";
import Calendar from "./calendar";

test("renders an calendar", () => {
  const { getAllByTestId, getByText } = render(
    <Calendar
      dates={[
        DateTime.fromObject({ hours: 1 }),
        DateTime.fromObject({ hours: 2 }),
      ]}
    />
  );
  const times = getAllByTestId("time");
  expect(times.length).toBe(2);
  expect(times[0]).toHaveTextContent("01:00");
  expect(times[1]).toHaveTextContent("02:00");
});
