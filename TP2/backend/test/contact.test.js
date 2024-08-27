const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Contact = require("../models/contact");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Contact Model Test", () => {
  // Test pour un Contact valide
  it("Contact valid", async () => {
    const contact = new Contact({
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
      phone: "0000000000",
    });

    const savedContact = await contact.save();
    expect(savedContact._id).toBeDefined();
    expect(savedContact.firstname).toBe("John");
    expect(savedContact.lastname).toBe("Doe");
    expect(savedContact.email).toBe("john.doe@example.com");
    expect(savedContact.phone).toBe("0000000000");
  });

  // Test pour le champ firstname manquant
  it("Firstname manquant", async () => {
    const contact = new Contact({
      lastname: "Doe",
      email: "john.doe@example.com",
    });

    try {
      await contact.save();
    } catch (err) {
      expect(err.errors.firstname).toBeDefined();
      expect(err.errors.firstname.kind).toBe("required");
    }
  });

  // Test pour le champ lastname manquant
  it("Lastname manquant", async () => {
    const contact = new Contact({
      firstname: "John",
      email: "john.doe@example.com",
    });

    try {
      await contact.save();
    } catch (err) {
      expect(err.errors.lastname).toBeDefined();
      expect(err.errors.lastname.kind).toBe("required");
    }
  });

  // Test pour un email invalide
  it("Email invalid", async () => {
    const contact = new Contact({
      firstname: "John",
      lastname: "Doe",
      email: "invalid-email",
    });

    try {
      await contact.save();
    } catch (err) {
      expect(err.errors.email).toBeDefined();
      expect(err.errors.email.kind).toBe("user defined");
    }
  });
});
