import Timer from "../models/Timer.js";

export const submitReactionTime = async (req, res) => {
  try {
    const { user_id, time } = req.body;

    if (!user_id || !time) {
      return res.status(400).json({ message: "Element manquant" });
    }

    const timer = new Timer({ user_id, time });
    await timer.save();

    res.status(201).json({ message: "Success", timer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getReactionTimes = async (req, res) => {
  try {
    const { userId } = req.params;

    const reactionTimes = await Timer.find({ user_id: userId });

    if (reactionTimes.length === 0) {
      return res.status(404).json({ message: "No reaction times" });
    }

    res.status(200).json(reactionTimes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
