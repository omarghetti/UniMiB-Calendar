import React from "react";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

function MockTheme({ children }) {
  const theme = createMuiTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

const AllTheProviders = () => {
  return (
    <MockTheme>
      <MemoryRouter />
    </MockTheme>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
