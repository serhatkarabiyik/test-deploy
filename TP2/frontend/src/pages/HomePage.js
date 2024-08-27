import React from "react";
import { Link } from "react-router-dom";
import ContactList from "../components/ContactList";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="homePage">
      <h1 className="homePageTitle">Contacts</h1>
      <Link to="/contact" className="homePageButton">
        Nouveau contact
      </Link>
      <ContactList />
    </div>
  );
};

export default HomePage;
