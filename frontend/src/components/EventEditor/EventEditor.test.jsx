import { render } from "enzyme";
import React from "react";
import EventEditor from "./EventEditor";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn()
  })
}));

describe("EventDetail component", () => {
  it("renders without crashing", () => {
    render(<EventEditor />);
  });
});
