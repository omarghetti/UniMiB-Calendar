import React from "react";
import { render } from "../../test-utils";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/user-event";
import Login from "./Login";

describe("Login component", () => {
  it("renders without crashing", () => {
    jest
      .spyOn(React, "useContext")
      .mockImplementation(context => ({ user: { isAuthenticated: true } }));

    render(<Login />);
  });
});
