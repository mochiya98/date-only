import { assertDateOnly } from "../test-utils";
import { DateOnly } from ".";
import { assert } from "chai";

describe("DateOnly.Parser", function () {
  describe(".parse(dateText)", function () {
    const cases: (
      | {
          format: string;
          src: string;
          toBe: [number, number, number];
          throwsParseError: false;
        }
      | {
          format: string;
          src: string;
          toBe: null;
          throwsParseError: true;
        }
    )[] = [
      {
        format: "yyyy-mm-dd",
        src: "2017-6-9",
        toBe: [2017, 6, 9],
        throwsParseError: false,
      },
      {
        format: "yyyy-mm-dd",
        src: "2017-06-09",
        toBe: [2017, 6, 9],
        throwsParseError: false,
      },
      {
        format: "yyyy-mm-dd",
        src: "2017-12-25",
        toBe: [2017, 12, 25],
        throwsParseError: false,
      },
      {
        format: "YYYY-MM-DD",
        src: "2017-12-25",
        toBe: [2017, 12, 25],
        throwsParseError: false,
      },
      {
        format: "yyyy/m/d",
        src: "2017/6/9",
        toBe: [2017, 6, 9],
        throwsParseError: false,
      },
      {
        format: "yy/mm/dd",
        src: "17/12/25",
        toBe: [2017, 12, 25],
        throwsParseError: false,
      },
      {
        format: "mm-dd-yyyy",
        src: "12-25-2017",
        toBe: [2017, 12, 25],
        throwsParseError: false,
      },
      {
        format: "dd-mm-yyyy",
        src: "25-12-2017",
        toBe: [2017, 12, 25],
        throwsParseError: false,
      },
      {
        format: "yyyy-mm-dd",
        src: "foo2017-12-25bar",
        toBe: [2017, 12, 25],
        throwsParseError: false,
      },
      {
        format: "yyyy-mm-dd",
        src: "invalid-text",
        toBe: null,
        throwsParseError: true,
      },
    ];
    const maxFormatLength = cases.reduce(
      (prev, { format }) => Math.max(prev, format.length),
      0
    );
    const formatPadding = " ".repeat(maxFormatLength);
    for (const { format, src, toBe, throwsParseError } of cases) {
      it(
        (format + formatPadding).slice(0, maxFormatLength) + " : " + src,
        function () {
          if (throwsParseError) {
            assert.throws(
              () => new DateOnly.Parser(format).parse(src),
              "ParseError"
            );
          } else {
            assertDateOnly(new DateOnly.Parser(format).parse(src), ...toBe!);
          }
        }
      );
    }
    it("invalid format", function () {
      assert.throws(() => new DateOnly.Parser("hhhh"), "InvalidDateFormat");
      assert.throws(
        () => new DateOnly.Parser("invalid-format"),
        "InvalidDateFormat"
      );
      assert.throws(
        () => new DateOnly.Parser("yyyymmddyyyy"),
        "InvalidDateFormat"
      );
    });
  });
});

describe("DateOnly.Parser.defaultParser", function () {
  describe(".parse(dateText)", function () {
    const cases: (
      | {
          src: string;
          toBe: [number, number, number];
          throwsParseError: false;
        }
      | {
          src: string;
          toBe: null;
          throwsParseError: true;
        }
    )[] = [
      {
        src: "2017-6-9",
        toBe: [2017, 6, 9],
        throwsParseError: false,
      },
      {
        src: "2017-06-09",
        toBe: [2017, 6, 9],
        throwsParseError: false,
      },
      {
        src: "2017-12-25",
        toBe: [2017, 12, 25],
        throwsParseError: false,
      },
      {
        src: "2017-12-25",
        toBe: [2017, 12, 25],
        throwsParseError: false,
      },
      {
        src: "2017/6/9",
        toBe: [2017, 6, 9],
        throwsParseError: false,
      },
      {
        src: "17/12/25",
        toBe: [2017, 12, 25],
        throwsParseError: false,
      },
      {
        src: "foo2017-12-25bar",
        toBe: [2017, 12, 25],
        throwsParseError: false,
      },
      {
        src: "20170609",
        toBe: [2017, 6, 9],
        throwsParseError: false,
      },
      {
        src: "170609",
        toBe: [2017, 6, 9],
        throwsParseError: false,
      },
      {
        src: "invalid-text",
        toBe: null,
        throwsParseError: true,
      },
    ];
    for (const { src, toBe, throwsParseError } of cases) {
      it(src, function () {
        if (throwsParseError) {
          assert.throws(
            () => DateOnly.Parser.defaultParser.parse(src),
            "ParseError"
          );
        } else {
          assertDateOnly(DateOnly.Parser.defaultParser.parse(src), ...toBe!);
        }
      });
    }
  });
});
