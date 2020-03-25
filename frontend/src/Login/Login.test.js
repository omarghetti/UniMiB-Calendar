import React from "react";
import { Login } from "./Login";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/user-event";

test("Login Renders", () => {
  render(<Login />);
});
