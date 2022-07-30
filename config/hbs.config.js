const hbs = require("hbs");

hbs.registerPartials(__dirname + "/../views/partials");

hbs.registerHelper("prettyDate", (date) => date?.toLocaleDateString());

hbs.registerHelper("closingDate", (date) => {
    const d = new Date(date);
    
    d.setMonth(date.getMonth() + 3);

    return d.toLocaleDateString();
});