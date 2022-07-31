const hbs = require("hbs");

hbs.registerPartials(__dirname + "/../views/partials");

hbs.registerHelper("prettyDate", (date) => date?.toLocaleDateString());

hbs.registerHelper("closingDate", (date) => {
    const closeDate = new Date(date);
    
    closeDate.setMonth(closeDate.getMonth() + 3);

    return closeDate.toLocaleDateString();
});