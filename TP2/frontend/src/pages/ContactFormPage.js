import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/contactFormPage.css";

const ContactFormPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      const fetchContact = async () => {
        try {
          const response = await axios.get(`/api/contacts/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error("Error", error);
        }
      };

      fetchContact();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await axios.put(`/api/contacts/${id}`, formData);
      } else {
        await axios.post(`/api/contacts`, formData);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="contactFormPage">
      <div className="contactFormPageContainer">
        <h1 className="contactFormPageTitle">
          {isEdit ? "Modifier le contact" : "Créer un contact"}
        </h1>
        <form className="contactFormPageForm" onSubmit={handleSubmit}>
          <div>
            <label>Prénom</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Nom</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Téléphone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <button type="submit">{isEdit ? "Enregistrer" : "Créer"}</button>
        </form>
      </div>
    </div>
  );
};

export default ContactFormPage;
