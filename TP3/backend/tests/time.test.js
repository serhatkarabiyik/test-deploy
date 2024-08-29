import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Timer from "../src/models/Timer.js";
import User from "../src/models/User.js";
import {
  submitReactionTime,
  getReactionTimes,
} from "../src/controllers/timerController.js";

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

describe("Timer Controller", () => {
  let user;

  beforeEach(async () => {
    user = new User({
      email: "timeruser@example.com",
      password: "123456",
      role: 1,
    });
    await user.save();
  });

  it("Submit reaction time", async () => {
    const req = {
      body: {
        user_id: user._id.toString(),
        time: 250,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await submitReactionTime(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Success",
        timer: expect.any(Object),
      })
    );

    const timers = await Timer.find({ user_id: user._id });
    expect(timers.length).toBe(1);
    expect(timers[0].time).toBe(250);
  });

  it("Retrive reaction time", async () => {
    await Timer.create({ user_id: user._id, time: 300 });
    await Timer.create({ user_id: user._id, time: 350 });

    const req = {
      params: {
        userId: user._id.toString(),
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getReactionTimes(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    expect(res.json.mock.calls[0][0].length).toBe(2);
    expect(res.json.mock.calls[0][0][0]).toHaveProperty("time");
  });

  it("404 if not retrive reaction time", async () => {
    const req = {
      params: {
        userId: user._id.toString(),
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getReactionTimes(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "No reaction times",
      })
    );
  });
});
