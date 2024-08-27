import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ContactItem from "./ContactItem";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`/api/contacts`);
      setContacts(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const editContact = (contact) => {
    navigate(`/contact/${contact._id}`);
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div>
      <h1>Listes des contacts</h1>
      {contacts.map((contact) => (
        <ContactItem
          key={contact._id}
          contact={contact}
          onEdit={editContact}
          onDelete={deleteContact}
        />
      ))}
    </div>
  );
};

export default ContactList;
