const { furanchos } = require("../../controllers");
function initGooglePlaces() {
  console.log("Places loaded");
  initPlacesSearchBar();
  initGMap();
}
function initGMap() {
  const mapContainer = document.querySelector(".g-map");
  if (mapContainer) {
    const center = { lat: 42.32364841895046, lng: -8.741814014873759 };
    const map = new google.maps.Map(mapContainer, {
      zoom: 11.1,
      center: center,
    });
    if (gMarkers) {
      gMarkers.forEach(({ name, lng, lat, furanchoId }) => {
        // function setInfoWindow(idx) {
        //   google.maps.event.addListener(mark, 'click', function(event) {
        //       var iwindow = new google.maps.InfoWindow();
        //       iwindow.setContent('<div><a href="' + furanchos.image + '" style="display:block;"><img src="' + adrsLength[idx].dataset.thumbnail + '" style="display:block;margin-bottom:10px;max-width:100%;"></a><h4>' + adrsLength[idx].dataset.address + '</h4><p>Bedrooms: ' + adrsLength[idx].dataset.bedroom + '<br />Bathrooms: ' + adrsLength[idx].dataset.bathroom + '<br /><span>' + adrsLength[idx].dataset.price + '</span></p></div>');
        //       iwindow.open(map, this);
        //   });
        // }
        const windowContent = '<div>' +
        '<p class="window-marker"><i class="fa-solid fa-wine-bottle fa-fw color-icon-detail"></i>' +
        name +
        '</p>' +
        '<span>&nbsp;</span>' +
        '<a class="window-marker-link" href="/furanchos/'+ furanchoId +'/detail">' + "Ver furancho</a> " +
        '</div>';
        const infowindow = new google.maps.InfoWindow({
          content: windowContent
        });
        const image = "https://res.cloudinary.com/dyl3cklgp/image/upload/v1659549980/furancho-project/phjt37yct3qisi0kgzfx.png";
        const marker = new google.maps.Marker({
          position: { lng, lat },
          map: map,
          icon: image,
          name,
        });
        marker.addListener("click", () => {
          infowindow.open({
            anchor: marker,
            map,
            shouldFocus: true,
          });
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
    google.maps.event.addListener(autocomplete, "place_changed", function () {
      var place = autocomplete.getPlace();
      console.log(place);
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      console.log(place, lat, lng);
      document.querySelector("[name='lat']").value = lat;
      document.querySelector("[name='lng']").value = lng;
    });
  }
}