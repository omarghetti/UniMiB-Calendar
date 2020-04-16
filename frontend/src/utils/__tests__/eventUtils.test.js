import {
  getFormattedPropertyValue,
  getFormattedPropertyValues,
  getFormattedTimeInterval
} from "../eventUtils";

describe("eventUtils", () => {
  describe("getFormattedTimeInterval", () => {
    it("should return full date if allDay is false", () => {
      const event = {
        start: "2020-04-20T10:00:00.215Z",
        end: "2020-04-21T11:00:00.215Z",
        allDay: false
      };

      expect(getFormattedTimeInterval(event)).toEqual(
        "Apr 20, 2020, 12:00 PM - Apr 21, 2020, 1:00 PM"
      );
    });

    it("should return date without time if allDay is true (single day)", () => {
      const event = {
        start: "2020-04-20T10:00:00.215Z",
        end: "2020-04-20T11:00:00.215Z",
        allDay: true
      };

      expect(getFormattedTimeInterval(event)).toEqual("April 20, 2020");
    });

    it("should return date without time if allDay is true (multiple days)", () => {
      const event = {
        start: "2020-04-20T10:00:00.215Z",
        end: "2020-04-22T11:00:00.215Z",
        allDay: true
      };

      expect(getFormattedTimeInterval(event)).toEqual(
        "April 20, 2020 - April 22, 2020"
      );
    });
  });

  describe("getFormattedPropertyValue", () => {
    it("should return the input value if it is not empty", () => {
      expect(getFormattedPropertyValue("foo", "empty")).toEqual("foo");
    });

    it("should return the placeholder value if the input value is empty", () => {
      expect(getFormattedPropertyValue("", "empty")).toEqual("empty");
    });
  });

  describe("getFormattedPropertyValues", () => {
    it("should return the list of input values if the list is not empty", () => {
      expect(getFormattedPropertyValues(["foo, bar"], "empty")).toEqual(
        "foo, bar"
      );
    });

    it("should return the placeholder value if the input list is empty", () => {
      expect(getFormattedPropertyValues([], "empty")).toEqual("empty");
    });
  });
});
