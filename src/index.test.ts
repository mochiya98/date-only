import { DateOnly } from ".";
import { assert } from "chai";
import { assertDateOnly } from "../test-utils";
import sinon, { SinonMock } from "sinon";

const timezoneOffset = new Date().getTimezoneOffset();

let dateOnlyMock: SinonMock;
let defaultParserMock: SinonMock;
before(function () {
  dateOnlyMock = sinon.mock(DateOnly);
  defaultParserMock = sinon.mock(DateOnly.Parser.defaultParser);
});
afterEach(function () {
  dateOnlyMock.restore();
  defaultParserMock.restore();
});

describe("DateOnly", function () {
  describe("DateOnly(copyFrom)", function () {
    it("normal", function () {
      const base = new DateOnly(2017, 5, 9);
      const cloned = new DateOnly(base);
      assertDateOnly(cloned, 2017, 5, 9);
    });
  });
  describe("DateOnly(date, useUTC)", function () {
    it("normal", function () {
      const date = new Date();
      const dummy = new DateOnly(2017, 5, 9);
      const stub = dateOnlyMock.expects("fromNativeDate").returns(dummy);
      const parsed = new DateOnly(date, true);
      assert.ok(stub.calledOnceWithExactly(date, true));
      assert.strictEqual(parsed, dummy);
    });
  });
  describe("DateOnly(dateText, format)", function () {
    it("normal", function () {
      const dateText = "2017-05-09";
      const format = "dummy-format";
      const dummy = new DateOnly(2017, 5, 9);
      const stub = dateOnlyMock.expects("fromText").returns(dummy);
      const parsed = new DateOnly(dateText, format);
      assert.ok(stub.calledOnceWithExactly(dateText, format));
      assert.strictEqual(parsed, dummy);
    });
  });
  describe("DateOnly(year, month, date)", function () {
    it("normal", function () {
      const parsed = new DateOnly(2017, 5, 9);
      assertDateOnly(parsed, 2017, 5, 9);
    });
  });

  describe("DateOnly.fromNativeDate(date, useUTC)", function () {
    const date = new Date(Date.UTC(2017, 4, 9) + timezoneOffset);
    it("DateOnly.fromNativeDate(date)", function () {
      const parsed = DateOnly.fromNativeDate(date);
      assertDateOnly(parsed, 2017, 5, timezoneOffset > 0 ? 8 : 9);
    });
    it("DateOnly.fromNativeDate(date, false)", function () {
      const parsed = DateOnly.fromNativeDate(date, false);
      assertDateOnly(parsed, 2017, 5, timezoneOffset > 0 ? 8 : 9);
    });
    it("DateOnly.fromNativeDate(date, true)", function () {
      const parsed = DateOnly.fromNativeDate(date, true);
      assertDateOnly(parsed, 2017, 5, timezoneOffset >= 0 ? 9 : 8);
    });
  });
  describe("DateOnly.fromText(dateText, format)", function () {
    it("without format", function () {
      const dateText = "2017-05-09";
      const dummy = new DateOnly(2017, 5, 9);
      const stub = defaultParserMock.expects("parse").returns(dummy);
      const parsed = DateOnly.fromText(dateText);
      assert.ok(stub.calledOnceWithExactly(dateText));
      assert.strictEqual(parsed, dummy);
    });
    it("with format", function () {
      const dateText = "2017-05-09";
      const format = "dummy-format";
      const dummy = new DateOnly(2017, 5, 9);
      const parseStub = sinon.stub().returns(dummy);
      const parserStub = dateOnlyMock
        .expects("Parser")
        .returns({ parse: parseStub });
      const parsed = DateOnly.fromText(dateText, format);
      assert.ok(parserStub.calledOnceWithExactly(format));
      assert.ok(parseStub.calledOnceWithExactly(dateText));
      assert.strictEqual(parsed, dummy);
    });
  });
  describe(".fromYmd()", function () {
    it("normal", function () {
      const parsed = DateOnly.fromYmd(2017, 5, 9);
      assertDateOnly(parsed, 2017, 5, 9);
    });
  });
  describe(".from()", function () {
    it("normal", function () {
      const parsed = DateOnly.from("2017-05-09!", "yyyy-mm-dd!");
      assertDateOnly(parsed, 2017, 5, 9);
    });
  });

  describe(".clone()", function () {
    it("normal", function () {
      const base = new DateOnly(2017, 5, 9);
      const cloned = base.clone();
      assert.notStrictEqual(base, cloned);
      assertDateOnly(base, 2017, 5, 9);
      assertDateOnly(cloned, 2017, 5, 9);
    });
  });

  describe(".getFullYear()", function () {
    it("normal", function () {
      const date = new DateOnly(2017, 5, 9);
      assert.strictEqual(date.getFullYear(), 2017);
    });
  });
  describe(".getYear()", function () {
    it("normal", function () {
      const date = new DateOnly(2017, 5, 9);
      assert.strictEqual(date.getYear(), 2017);
    });
  });
  describe(".getMonth()", function () {
    it("normal", function () {
      const date = new DateOnly(2017, 5, 9);
      assert.strictEqual(date.getMonth(), 4);
    });
  });
  describe(".getDate()", function () {
    it("normal", function () {
      const date = new DateOnly(2017, 5, 9);
      assert.strictEqual(date.getDate(), 9);
    });
  });
  describe(".getDay()", function () {
    it("normal", function () {
      const date = new DateOnly(2017, 5, 9);
      assert.strictEqual(date.getDay(), 2);
    });
  });

  describe(".getDisplayYear()", function () {
    it("normal", function () {
      const date = new DateOnly(2017, 5, 9);
      assert.strictEqual(date.getDisplayYear(), 2017);
    });
  });
  describe(".getDisplayMonth()", function () {
    it("normal", function () {
      const date = new DateOnly(2017, 5, 9);
      assert.strictEqual(date.getDisplayMonth(), 5);
    });
  });
  describe(".getDisplayDate()", function () {
    it("normal", function () {
      const date = new DateOnly(2017, 5, 9);
      assert.strictEqual(date.getDisplayDate(), 9);
    });
  });

  describe(".getDisplayYearText()", function () {
    it("normal", function () {
      const date = new DateOnly(2017, 5, 9);
      assert.strictEqual(date.getDisplayYearText(), "2017");
    });
    it("{ shortYear: true }", function () {
      const date = new DateOnly(2017, 5, 9);
      assert.strictEqual(date.getDisplayYearText({ shortYear: true }), "17");
    });
  });
  describe(".getDisplayMonthText()", function () {
    it("normal", function () {
      const date = new DateOnly(2017, 5, 9);
      assert.strictEqual(date.getDisplayMonthText(), "5");
    });
    it("{ padding: true }", function () {
      const date = new DateOnly(2017, 5, 9);
      assert.strictEqual(date.getDisplayMonthText({ padding: true }), "05");
    });
  });
  describe(".getDisplayDateText()", function () {
    it("normal", function () {
      const date = new DateOnly(2017, 5, 9);
      assert.strictEqual(date.getDisplayDateText(), "9");
    });
    it("{ padding: true }", function () {
      const date = new DateOnly(2017, 5, 9);
      assert.strictEqual(date.getDisplayDateText({ padding: true }), "09");
    });
  });

  describe(".year", function () {
    it("normal", function () {
      const date = new DateOnly(2017, 5, 9);
      assert.strictEqual(date.year, 2017);
    });
  });
  describe(".month", function () {
    it("normal", function () {
      const date = new DateOnly(2017, 5, 9);
      assert.strictEqual(date.month, 4);
    });
  });
  describe(".date", function () {
    it("normal", function () {
      const date = new DateOnly(2017, 5, 9);
      assert.strictEqual(date.date, 9);
    });
  });
  describe(".day", function () {
    it("normal", function () {
      const date = new DateOnly(2017, 5, 9);
      assert.strictEqual(date.day, 2);
    });
  });

  describe(".toISOString()", function () {
    it("normal", function () {
      const date = new DateOnly(2017, 5, 9);
      const result = date.toISOString();
      assert.strictEqual(result, "2017-05-09");
    });
  });
  describe(".toString()", function () {
    it("normal", function () {
      const date = new DateOnly(2017, 5, 9);
      const result = date.toString();
      assert.strictEqual(result, "2017-05-09");
    });
  });
  describe(".toJSON()", function () {
    it("normal", function () {
      const date = new DateOnly(2017, 5, 9);
      const result = date.toJSON();
      assert.strictEqual(result, "2017-05-09");
    });
  });
  describe(".toDate()", function () {
    it("normal", function () {
      const base = new DateOnly(2017, 5, 9);
      const result = base.toDate();
      assert.strictEqual(result.toISOString(), "2017-05-09T00:00:00.000Z");
      assert.notStrictEqual(base.nativeDate, result);
    });
  });

  describe(".add(days)", function () {
    it(".add(100)", function () {
      const base = new DateOnly(2017, 5, 9);
      const updated = base.add(100);
      assertDateOnly(base, 2017, 5, 9);
      assertDateOnly(updated, 2017, 8, 17);
      assert.notStrictEqual(base, updated);
    });
  });
  describe(".sub(days)", function () {
    it(".sub(100)", function () {
      const base = new DateOnly(2017, 5, 9);
      const updated = base.sub(100);
      assertDateOnly(base, 2017, 5, 9);
      assertDateOnly(updated, 2017, 1, 29);
      assert.notStrictEqual(base, updated);
    });
  });

  describe(".setFullYear(year)", function () {
    it(".setFullYear(2018)", function () {
      const base = new DateOnly(2017, 5, 9);
      const updated = base.setFullYear(2018);
      assertDateOnly(base, 2017, 5, 9);
      assertDateOnly(updated, 2018, 5, 9);
      assert.notStrictEqual(base, updated);
    });
  });
  describe(".setYear(year)", function () {
    it(".setYear(2018)", function () {
      const base = new DateOnly(2017, 5, 9);
      const updated = base.setYear(2018);
      assertDateOnly(base, 2017, 5, 9);
      assertDateOnly(updated, 2018, 5, 9);
      assert.notStrictEqual(base, updated);
    });
  });
  describe(".setMonth(month)", function () {
    it(".setMonth(2)", function () {
      const base = new DateOnly(2017, 5, 9);
      const updated = base.setMonth(2);
      assertDateOnly(base, 2017, 5, 9);
      assertDateOnly(updated, 2017, 3, 9);
      assert.notStrictEqual(base, updated);
    });
  });
  describe(".setDate(date)", function () {
    it(".setDate(14)", function () {
      const base = new DateOnly(2017, 5, 9);
      const updated = base.setDate(14);
      assertDateOnly(base, 2017, 5, 9);
      assertDateOnly(updated, 2017, 5, 14);
      assert.notStrictEqual(base, updated);
    });
  });
});
