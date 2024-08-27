const Contact = require("../models/contact");

const createContact = async (req, res) => {
  try {
    const { firstname, lastname, email, phone } = req.body;

    const newContact = new Contact({
      firstname,
      lastname,
      email,
      phone,
    });

    const savedContact = await newContact.save();

    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateContactById = async (req, res) => {
  try {
    const { firstname, lastname, email, phone } = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        firstname,
        lastname,
        email,
        phone,
      },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteContactById = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContactById,
  deleteContactById,
};
