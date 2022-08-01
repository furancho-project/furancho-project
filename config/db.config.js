const mongoose = require("mongoose")

const MONGODB_URI = process.env.MONGODB_URI 

mongoose
  .connect(MONGODB_URI)
  .then(() => console.info("connected DB"))
  .catch((error) => console.error("error DB", error));