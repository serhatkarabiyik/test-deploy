import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "./HomePage";

describe("HomePage", () => {
  test("renders HomePage component", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    expect(screen.getByText(/Contacts/i)).toBeInTheDocument();
  });

  test("renders New Contact button", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    expect(screen.getByText(/Nouveau contact/i)).toBeInTheDocument();
  });

  test("renders ContactList component", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    expect(screen.getByText(/Mock ContactList/i)).toBeInTheDocument();
  });
});
