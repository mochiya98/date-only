import { escapeRegExp } from "./utils";
import { DateOnly } from ".";

class DefaultDateParser {
  parse(text: string): DateOnly {
    const match =
      text.match(/(\d{4}|\d{2})[-/](\d{1,2})[-/](\d{1,2})/) ||
      text.match(/(\d{4}|\d{2})(\d{2})(\d{2})/);
    if (!match) {
      throw new Error("ParseError");
    }
    const [, yearText, monthText, dateText] = match;
    let year = parseInt(yearText);
    if (year < 100) year += 2000;
    const month = parseInt(monthText);
    const date = parseInt(dateText);
    return new DateOnly(year, month, date);
  }
}

export class CustomDateParser {
  format: string;
  pattern: RegExp;
  patternInfo: { yearIdx: number; monthIdx: number; dateIdx: number } = {
    yearIdx: -1,
    monthIdx: -1,
    dateIdx: -1,
  };
  constructor(format: string) {
    const pattern = new RegExp(
      escapeRegExp(format)
        .replace(/y{4}/i, "([0-9]{4})")
        .replace(/y{2}/i, "([0-9]{2})")
        .replace(/m{1,2}/i, "([0-9]{1,2})")
        .replace(/d{1,2}/i, "([0-9]{1,2})")
    );
    this.format = format;
    this.pattern = pattern;
    const ymdChunks = format.match(/y{4}|y{2}|m{1,2}|d{1,2}/gi);
    if (!ymdChunks || ymdChunks.length !== 3) {
      throw new Error("InvalidDateFormat");
    }
    ymdChunks.forEach((c, i) => {
      switch (c[0].toLowerCase()) {
        case "y":
          this.patternInfo.yearIdx = i + 1;
          break;
        case "m":
          this.patternInfo.monthIdx = i + 1;
          break;
        case "d":
          this.patternInfo.dateIdx = i + 1;
          break;
      }
    });
  }
  parse(text: string): DateOnly {
    const { yearIdx, monthIdx, dateIdx } = this.patternInfo;
    const match = text.match(this.pattern);
    if (!match) {
      throw new Error("ParseError");
    }
    let year = parseInt(match[yearIdx]);
    if (year < 100) year += 2000;
    const month = parseInt(match[monthIdx]);
    const date = parseInt(match[dateIdx]);
    return new DateOnly(year, month, date);
  }
  static defaultParser = new DefaultDateParser();
}
