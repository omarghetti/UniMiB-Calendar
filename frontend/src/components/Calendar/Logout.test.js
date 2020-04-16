import React from "react";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/user-event";
import { render } from "../../test-utils";
import { GoogleLogout } from "react-google-login";
import { shallow } from "enzyme";

describe("Logout Component", () => {
  const LogoutMock = jest.fn();
  const gLogout = shallow(
    <GoogleLogout
      clientId="645362289460-ulika5v4o1a96cpfibbv7q73vfoihnr2.apps.googleusercontent.com"
      onLogoutSuccess={LogoutMock}
    />
  );
  it("Should render correctly", () => {
    jest
      .spyOn(React, "useContext")
      .mockImplementation(() => ({ user: { isAuthenticated: true } }));
    render(
      <GoogleLogout clientId="645362289460-ulika5v4o1a96cpfibbv7q73vfoihnr2.apps.googleusercontent.com" />
    );
  });
  it("Should call onLogoutSuccess callback", () => {
    gLogout.simulate("click");
    expect(LogoutMock).toHaveBeenCalledTimes(0);
  });
});
