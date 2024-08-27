import React from "react";
import "../styles/contactItem.css";

const ContactItem = ({ contact, onEdit, onDelete }) => {
  return (
    <li className="contactItem">
      <div className="contactItemInfo">
        {contact.firstname} {contact.lastname} - {contact.email} -{" "}
        {contact.phone}
      </div>
      <div className="contactItemActions">
        <button className="contactItemButton" onClick={() => onEdit(contact)}>
          Modifier
        </button>
        <button
          className="contactItemButton"
          onClick={() => onDelete(contact._id)}
        >
          Supprimer
        </button>
      </div>
    </li>
  );
};

export default ContactItem;
