function initGooglePlaces() {
    console.log("Places loaded")
    initPlacesSearchBar()
    initGMap()

}

function initGMap() {
    const mapContainer = document.querySelector(".g-map")
        if(mapContainer) {
            const center = { lat: 42.32364841895046, lng: -8.741814014873759 }
            const map = new google.maps.Map(mapContainer, {
                zoom: 11.1,
                center: center,
              });  
        }

    const marker = new google.maps.Marker({
        position: { lat: 42.32364841895046, lng: -8.741814014873759 },
        map: map,
        });
    

}


function initPlacesSearchBar(){
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