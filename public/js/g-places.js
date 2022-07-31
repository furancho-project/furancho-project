function initGooglePlaces() {
    console.log("Places loaded")

    const input = document.querySelector(".g-places-finder");
    if (input) {
        const options = {
            componentRestrictions: { country: "es" },
            fields: ["address_components", "geometry", "icon", "name"],
            strictBounds: false,
        };
        const autocomplete = new google.maps.places.Autocomplete(input, options);
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var place = autocomplete.getPlace();
            console.log(place);
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            console.log(place, lat, lng)
    
            document.querySelector("[name='lat']").value = lat;
            document.querySelector("[name='lng']").value = lng;
        });
    }    
}