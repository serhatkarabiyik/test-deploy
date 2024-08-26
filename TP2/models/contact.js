const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
