import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactFormPage from "./pages/ContactFormPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactFormPage />} />
        <Route path="/contact/:id" element={<ContactFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
