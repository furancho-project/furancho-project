require("dotenv").config()


const express = require("express");
const createError = require("http-errors")
const app = express();

app.set("views", __dirname + "/views")
app.set("view engine", "hbs")

//app.use(logger("dev"))
app.use(express.static(`${__dirname}/public`))
app.use(express.urlencoded({ extended: false }))

require("./config/db.config")
require("./config/hbs.config")

app.use((req, res, next) => {
    res.locals.googleApiKey = process.env.GOOGLE_API_KEY;
    res.locals.query = req.query //hace que la info de la query de los GET quede disponible en un subobjeto que se llama query para todas las vistas
    next();
})

const { session, loadUser } = require("./config/session.config")
app.use(session)
app.use(loadUser)

const router = require('./config/routes.config');
app.use('/', router);

app.use((req, res, next) => {
    next(createError(404, "Page not found"));
});

app.use((error, req, res, next) => {
    console.error(error);
    const message = error.message;
    const metadata = app.get("env") === "development" ? error : {};
    const status = error.status || 500;
    res.status(status).render(`errors/500`, { message, metadata });
});

const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`App ready! Listening on port ${port}`))