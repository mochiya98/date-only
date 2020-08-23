import { DateOnly } from "../src";
import { assert } from "chai";

export function assertDateOnly(
  dateonly: DateOnly,
  year: number,
  month: number,
  date: number
): void {
  assert.strictEqual(dateonly.getDisplayYear(), year, "Year");
  assert.strictEqual(dateonly.getDisplayMonth(), month, "Month");
  assert.strictEqual(dateonly.getDisplayDate(), date, "Date");
}
