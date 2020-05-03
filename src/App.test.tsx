import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders", () => {
  render(<App />);
});

test("dark mode", () => {
  const { getByTestId } = render(<App />);
  const darkmodeButton = getByTestId("darkmode-button");

  fireEvent.click(darkmodeButton);
});
