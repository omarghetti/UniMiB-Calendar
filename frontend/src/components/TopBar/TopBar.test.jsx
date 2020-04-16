import { render } from "../../test-utils";
import React from "react";
import TopBar from "./TopBar";

describe("TopBar component", () => {
  it("renders without crashing", () => {
    jest
      .spyOn(React, "useContext")
      .mockImplementation(context => ({ user: { name: "foo", avatar: "" } }));

    render(<TopBar />);
  });
});
