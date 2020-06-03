import React from "react";
import Calendar from "./Calendar";
import { mount } from "enzyme";
import axiosMock from "axios";
import { MemoryRouter } from "react-router-dom";
import { waitFor } from "@testing-library/dom";
import { MockTheme } from "../../test-utils";

jest.mock("axios");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn()
  })
}));

describe("Calendar component", () => {
  it("renders without crashing", () => {
    mount(
      <MemoryRouter>
        <MockTheme>
          <Calendar />
        </MockTheme>
      </MemoryRouter>
    );
  });

  it("should fetch events", async () => {
    const url = "/api/events";
    const events = [{ title: "foo", type: "GENERIC_MEETING" }];
    const resp = { data: events };
    axiosMock.get.mockResolvedValueOnce(resp);

    mount(
      <MemoryRouter>
        <MockTheme>
          <Calendar />
        </MockTheme>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(axiosMock.get).toHaveBeenCalled();
      expect(axiosMock.get).toHaveBeenCalledWith(url);
    });
  });
});
