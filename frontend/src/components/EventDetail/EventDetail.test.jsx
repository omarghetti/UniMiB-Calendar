import { MemoryRouter } from "react-router-dom";
import React from "react";
import EventDetail from "./EventDetail";
import { render } from "enzyme";

jest.mock("axios");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn()
  }),
  useParams: () => ({
    eventId: "foo"
  })
}));

jest.mock("axios");

describe("EventDetail component", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <EventDetail />
      </MemoryRouter>
    );
  });
});
