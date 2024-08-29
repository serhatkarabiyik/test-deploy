import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "../src/pages/HomePage";

describe("HomePage", () => {
  test("renders login and register links", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    expect(screen.getByTestId("login-register-header")).toBeInTheDocument();
    expect(screen.getByTestId("login-link")).toBeInTheDocument();
    expect(screen.getByTestId("register-link")).toBeInTheDocument();
  });
});
