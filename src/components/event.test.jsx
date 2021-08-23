import { render } from "@testing-library/react";
import { DateTime } from "luxon";
import Event from "./event";

test("renders an event", () => {
  const { getByTestId, getByText } = render(
    <Event
      event={{
        color: "blue",
        leftPct: 23,
        widthPct: 100,
        lengthPct: 20,
        start: DateTime.fromObject({ hour: 2, minute: 30 }),
        name: "Test",
      }}
    />
  );
  expect(getByTestId("event").style.background).toBe("blue");
  expect(getByTestId("event").style.left).toBe("23%");
  expect(getByTestId("event").style.width).toBe("100%");
  expect(getByText("02:30")).toBeTruthy();
  expect(getByText("Test")).toBeTruthy();
});
