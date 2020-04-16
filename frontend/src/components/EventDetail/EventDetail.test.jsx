import React from "react";
import EventDetail from "./EventDetail";
import { render } from "enzyme";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn()
  }),
  useParams: () => ({
    eventId: "foo"
  })
}));

describe("EventDetail component", () => {
  it("renders without crashing", () => {
    render(<EventDetail />);
  });
});
