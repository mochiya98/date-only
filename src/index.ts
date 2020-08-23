import { CustomDateParser } from "./parser";

export class DateOnly {
  //@ts-ignore
  nativeDate: Date;
  static Parser = CustomDateParser;

  constructor(copyFrom: DateOnly);
  constructor(date: Date, useUTC?: boolean);
  constructor(dateText: string, format?: string);
  constructor(year: number, month: number, day: number);
  constructor(...argv: unknown[]) {
    if (argv[0] instanceof DateOnly) {
      this.nativeDate = new Date(argv[0].nativeDate.getTime());
      return;
    }
    if (argv[0] instanceof Date) {
      const [date, useUTC] = argv as [Date, boolean | undefined];
      return DateOnly.fromNativeDate(date, useUTC);
    }
    if (typeof argv[0] === "string") {
      const [dateText, format] = argv as [string, string | undefined];
      return DateOnly.fromText(dateText, format);
    }
    const [year, month, date] = argv as number[];
    this.nativeDate = new Date(Date.UTC(year, month - 1, date));
  }

  static fromNativeDate(date: Date, useUTC = false): DateOnly {
    if (useUTC) {
      return new DateOnly(
        date.getUTCFullYear(),
        date.getUTCMonth() + 1,
        date.getUTCDate()
      );
    } else {
      return new DateOnly(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      );
    }
  }
  static fromText(dateText: string, format?: string): DateOnly {
    if (format) {
      return new DateOnly.Parser(format).parse(dateText);
    }
    return DateOnly.Parser.defaultParser.parse(dateText);
  }
  static fromYmd(year: number, month: number, day: number): DateOnly {
    return new DateOnly(year, month, day);
  }
  static from(...argv: unknown[]): DateOnly {
    //@ts-ignore
    return new DateOnly(...argv);
  }

  clone(): DateOnly {
    return new DateOnly(this);
  }

  getFullYear(): number {
    return this.getYear();
  }
  getYear(): number {
    return this.nativeDate.getUTCFullYear();
  }
  getMonth(): number {
    return this.nativeDate.getUTCMonth();
  }
  getDate(): number {
    return this.nativeDate.getUTCDate();
  }
  getDay(): number {
    return this.nativeDate.getUTCDay();
  }

  getDisplayYear(): number {
    return this.getYear();
  }
  getDisplayMonth(): number {
    return this.getMonth() + 1;
  }
  getDisplayDate(): number {
    return this.getDate();
  }
  getDisplayYearText({
    shortYear = false,
  }: { shortYear?: boolean } = {}): string {
    let text = this.getYear().toString();
    if (shortYear) text = text.slice(-2);
    return text;
  }
  getDisplayMonthText({ padding = false }: { padding?: boolean } = {}): string {
    let text = (this.getMonth() + 1).toString();
    if (padding) text = ("0" + text).slice(-2);
    return text;
  }
  getDisplayDateText({ padding = false }: { padding?: boolean } = {}): string {
    let text = this.getDate().toString();
    if (padding) text = ("0" + text).slice(-2);
    return text;
  }

  get year(): number {
    return this.getYear();
  }
  get month(): number {
    return this.getMonth();
  }
  get date(): number {
    return this.getDate();
  }
  get day(): number {
    return this.getDay();
  }

  toISOString(): string {
    return this.nativeDate.toISOString().slice(0, 10);
  }
  toString(): string {
    return this.toISOString();
  }
  toJSON(): string {
    return this.toISOString();
  }
  toDate(): Date {
    return this.clone().nativeDate;
  }

  add(days: number): DateOnly {
    return this.setDate(this.getDate() + days);
  }
  sub(days: number): DateOnly {
    return this.setDate(this.getDate() - days);
  }
  setFullYear(year: number): DateOnly {
    return this.setYear(year);
  }
  setYear(year: number): DateOnly {
    const next = this.clone();
    next.nativeDate.setUTCFullYear(year);
    return next;
  }
  setMonth(month: number): DateOnly {
    const next = this.clone();
    next.nativeDate.setUTCMonth(month);
    return next;
  }
  setDate(date: number): DateOnly {
    const next = this.clone();
    next.nativeDate.setUTCDate(date);
    return next;
  }
}
