import * as React from "react";
import { formatDate } from "../utils/utils";

export default function Calendar({ dates }) {
  return (
    <table>
      <tbody>
        {dates.map((d) => (
          <tr key={formatDate(d)}>
            <td data-testid="time">{formatDate(d)}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
