function initGooglePlaces() {
    console.log("Places loaded");
    initPlacesSearchBar();
    initGMap();
}

function initGMap() {
    const mapContainer = document.querySelector(".g-map");
    if (mapContainer) {
        const center = { lat: 42.4336, lng: -8.64805 }
        const map = new google.maps.Map(mapContainer, {
            zoom: 9,
            center: center,
        });

        if (gMarkers) {
            gMarkers.forEach(({ title, lng, lat }) => {
                const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                const marker = new google.maps.Marker({
                    position: { lng, lat },
                    map: map,
                    title,
                    icon: image
                });

            });
        }
    }
}

function initPlacesSearchBar() {

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