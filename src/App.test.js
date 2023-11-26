import { render, screen } from "@testing-library/react";
import App from "./App";

it("shall render the Little Lemon text", () => {
  render(<App />);
  const linkElements = screen.getAllByText(/Little Lemon/i);
  expect(linkElements.length).toBeGreaterThan(0);
});
