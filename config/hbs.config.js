const hbs = require("hbs");

hbs.registerPartials(__dirname + "/../views/partials");

hbs.registerHelper("prettyDate", (date) => date?.toLocaleDateString());

hbs.registerHelper("closingDate", (date) => {
    const closeDate = new Date(date);
    
    closeDate.setMonth(closeDate.getMonth() + 3);

    return closeDate.toLocaleDateString();
});



hbs.registerHelper("markers", function(furanchos, options) {
    const markers = furanchos.reduce((markers, furancho) => {
    if(furancho.location?.coordinates) {
        const [ lng, lat ] = furancho.location?.coordinates
        markers.push({ lng, lat, title: furancho.name })
    }
        return markers
    }, [])

    return new hbs.SafeString(`<script>const gMarkers = ${JSON.stringify(markers)}</script>`);
})

