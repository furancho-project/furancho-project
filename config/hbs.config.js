const hbs = require("hbs");

hbs.registerPartials(__dirname + "/../views/partials");

hbs.registerHelper("prettyDate", (date) => date?.toLocaleDateString());


hbs.registerHelper("dateValue", (date) => date?.toLocaleDateString("en-CA"));

hbs.registerHelper("closingDate", (date) => {
    const closeDate = new Date(date);
    
    closeDate.setMonth(closeDate.getMonth() + 3);

    return closeDate.toLocaleDateString();
});

hbs.registerHelper("markers", function(furanchos, options) {
    const markers = furanchos.reduce((markers, furancho) => {
    if(furancho.location?.coordinates) {
        const [ lng, lat ] = furancho.location?.coordinates
        markers.push({ lng, lat, name: furancho.name, image: furancho.image, furanchoId: furancho.id })
    }
        return markers
    }, [])

    return new hbs.SafeString(`<script>const gMarkers = ${JSON.stringify(markers)}</script>`);
})

hbs.registerHelper("favouriteFurancho", function(currentUser, furancho, options) {
    if (currentUser.favourites.some((favourite) => favourite.furanchoId == furancho.id)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    } 
});

