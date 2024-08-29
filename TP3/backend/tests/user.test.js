import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import User from "../src/models/User.js";
import { registerUser, loginUser } from "../src/controllers/userController.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (let key in collections) {
    await collections[key].deleteMany();
  }
});

describe("User Controller", () => {
  it("Register", async () => {
    const req = {
      body: {
        email: "test@example.com",
        password: "123456",
        role: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        token: expect.any(String),
      })
    );
  });

  it("Not register", async () => {
    const existingUser = new User({
      email: "test@example.com",
      password: "123456",
      role: 1,
    });
    await existingUser.save();

    const req = {
      body: {
        email: "test@example.com",
        password: "123456",
        role: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "User exist",
      })
    );
  });

  it("Login", async () => {
    const user = new User({
      email: "test@example.com",
      password: "123456",
      role: 1,
    });
    await user.save();

    const req = {
      body: {
        email: "test@example.com",
        password: "123456",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        token: expect.any(String),
      })
    );
  });

  it("Not login mdp incorrect", async () => {
    const user = new User({
      email: "test@example.com",
      password: "123456",
      role: 1,
    });
    await user.save();

    const req = {
      body: {
        email: "test@example.com",
        password: "wrongpassword",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Invalid",
      })
    );
  });
});
