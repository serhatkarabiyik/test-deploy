import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Timer from "../src/components/Timer";

describe("Timer Component", () => {
  test("start and stop", async () => {
    render(<Timer />);

    // Trouver et cliquer sur le bouton "Start"
    const startButton = screen.getByText(/Start/i);
    fireEvent.click(startButton);

    // Attendre que le texte "Go!" apparaisse
    await waitFor(() => {
      expect(screen.getByText(/Go!/i)).toBeInTheDocument();
    });

    // Trouver le bouton "Stop" et s'assurer qu'il est activé
    const stopButton = screen.getByText(/Stop/i);
    expect(stopButton).toBeEnabled();

    // Simuler un clic sur le bouton "Stop"
    fireEvent.click(stopButton);

    // Attendre que le texte de temps de réaction apparaisse
    await waitFor(() => {
      expect(screen.getByText(/Your reaction time is:/i)).toBeInTheDocument();
    });
  });
});
