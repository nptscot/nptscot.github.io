// Setup Map
var map = new maplibregl.Map({
container: 'map',
style: 'tiles/style_' + displayRadioValue(document.getElementById("basemapform")) + '.json',
//style: 'tiles/style_fastload.json',
center: [-3.1382,55.9533],
zoom: 8,
maxZoom: 19,
minZoom: 6,
maxPitch: 85,
hash: true,
antialias: true
});

// Layer Control
function addHomeButton(map) {
  class HomeButton {
    onAdd(map) {
      const div = document.createElement("div");
      div.className = "maplibregl-ctrl maplibregl-ctrl-group";
      div.innerHTML = `<button>
        <svg focusable="false" viewBox="0 0 55 55" aria-hidden="true" style="font-size: 10px;"><title>Change base map</title><path d="M45.297,21.946l9.656-5.517L27.477,0.825L0,16.429l9.656,5.517L0,27.429l9.656,5.517L0,38.429l27.477,15.698l27.476-15.698 l-9.656-5.483l9.656-5.517L45.297,21.946z M27.477,3.125l23.435,13.309l-23.435,13.39L4.041,16.434L27.477,3.125z M11.675,23.099 l15.802,9.028l15.802-9.028l7.633,4.335l-23.435,13.39L4.041,27.434L11.675,23.099z M50.912,38.434l-23.435,13.39L4.041,38.434 l7.634-4.335l15.802,9.028l15.802-9.028L50.912,38.434z"></path></svg>
        </button>`;
      div.addEventListener("contextmenu", (e) => e.preventDefault());
      div.addEventListener("click", () => showbasemapcontrol());

      return div;
    }
  }
  const homeButton = new HomeButton();
  map.addControl(homeButton, "top-left");
}

// Geocoding API
var geocoder_api = {
  forwardGeocode: async (config) => {
    const features = [];
    try {
      let request =
        'https://nominatim.openstreetmap.org/search?q=' +
        config.query +
        '&format=geojson&polygon_geojson=1&addressdetails=1&countrycodes=gb';
      const response = await fetch(request);
      const geojson = await response.json();
      for (let feature of geojson.features) {
        let center = [
          feature.bbox[0] +
          (feature.bbox[2] - feature.bbox[0]) / 2,
          feature.bbox[1] +
          (feature.bbox[3] - feature.bbox[1]) / 2
        ];
        let point = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: center
          },
          place_name: feature.properties.display_name,
          properties: feature.properties,
          text: feature.properties.display_name,
          place_type: ['place'],
          center: center
        };
        features.push(point);
      }
    } catch (e) {
      console.error(`Failed to forwardGeocode with error: ${e}`);
    }

    return {
      features: features
    };
  }
};

// pmtiles
let protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles",protocol.tile);

map.on('load', function() {

// Add Controls to the Map
map.addControl(
  new MaplibreGeocoder(geocoder_api, {
    maplibregl: maplibregl,
    collapsed: true
  }), 'top-left'
);

map.addControl(new maplibregl.NavigationControl(), 'top-left');

map.addControl(
new maplibregl.TerrainControl({source: 'terrainSource',exaggeration: 1.25})
,'top-left');

map.addControl(new maplibregl.GeolocateControl({
positionOptions: {enableHighAccuracy: true},
trackUserLocation: true})
,'top-left');

map.addControl(new maplibregl.FullscreenControl(), 'top-left');

map.addControl(new maplibregl.AttributionControl({
  compact: true,
  customAttribution: 'Contains OS data © Crown copyright 2021, Satelite map © ESRI 2023, © OpenStreetMap contributors'
}), 'bottom-right');

map.addControl(new maplibregl.ScaleControl({
  maxWidth: 80,
  unit: 'metric'
}),'bottom-left');

addHomeButton(map);

// Setup other part of the website
showrighbox(true); // Show the accordion hide the button 
document.getElementById("rnet_accordion").click();

switch_style();
//addDataSources();
//map.once('idle',switch_style());
    

});





