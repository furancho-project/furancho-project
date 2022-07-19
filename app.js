const express = require("express");
const app = express();

app.set("view", __dirname + "/views")
app.set("view engine", "hbs")
//app.use(logger("dev"))
app.use(express.static(`${__dirname}/public`))
app.use(express.urlencoded({ extended: false }))

require("./config/db.config")
require("./config/hbs.config")

const port = 3000;

app.listen(port, () => console.log(`App ready! Listening on port ${port}`))