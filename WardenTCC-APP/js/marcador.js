navigator.geolocation.getCurrentPosition(function(position) {
  let x= position.coords.latitude;
  let y = position.coords.longitude;
  StartMap(x, y);
});

function StartMap(x, y){
  var map = L.map('map').setView([x, y], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var searchControl = L.esri.Geocoding.geosearch({
      position: 'topright',
      placeholder: 'Enter an address or place e.g. 1 York St',
      useMapBounds: false,
      providers: [L.esri.Geocoding.arcgisOnlineProvider({
        apikey: "AAPKe45910f1480c42699d61c04f6f8a1952o3tBhNtvK0c_UeUNPLVjkmhoU4tj8lfcG6wvmogW4qQBrD8XYKwI1NhgWG9aiBib", // replace with your api key - https://developers.arcgis.com
        nearby: {
          lat: -33.8688,
          lng: 151.2093
        }
      })]
    }).addTo(map);

    var results = L.layerGroup().addTo(map);

    searchControl.on('results', function (data) {
      results.clearLayers();
      for (var i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
        var latitude = data.results[i].latlng.lat;
        var longitude = data.results[i].latlng.lng;
        document.getElementById("lat").value = latitude;
        document.getElementById("lon").value = longitude;
      }
  });
}