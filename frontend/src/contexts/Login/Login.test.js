import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/user-event";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";

test("Login Renders", () => {
  render(<Login />, { wrapper: MemoryRouter });
});
