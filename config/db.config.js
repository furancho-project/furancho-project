const mongoose = require("mongoose")

mongoose
  .connect("mongodb://localhost/furancho-project")
  .then(() => console.info("connected DB"))
  .catch((error) => console.error("error DB", error));