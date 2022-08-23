function initGooglePlaces() {
  console.log("Places loaded");
  initPlacesSearchBar();
  initGMap();
};

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

        const windowContent = '<div>' +

          '<p class="window-marker"><i class="fa-solid fa-wine-bottle fa-fw color-icon-detail"></i>' +
          name +
          '</p>' +
          '<span>&nbsp;</span>' +
          '<a class="window-marker-link" href="/furanchos/' + furanchoId + '/detail">' + "Ver furancho</a> " +
          '</div>';

        const infowindow = new google.maps.InfoWindow({
          content: windowContent
        });

        const image = "https://res.cloudinary.com/dyl3cklgp/image/upload/v1661192281/furancho-project/b7tqvasrpipdnkkcgq87.png";

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
};

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
};