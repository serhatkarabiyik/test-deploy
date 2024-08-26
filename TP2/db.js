const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(uri, options);
    console.log("Connecter à MONGODB");
  } catch (err) {
    console.error("Erreur lors de la connexion MONGODB", err);
    process.exit(1);
  }
};

module.exports = connectDB;
