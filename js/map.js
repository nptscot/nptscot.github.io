// Setup Map

// Anti Alias Check
function switch_antialias(){
  location.reload()
};

var antialias = document.getElementById('antialiascheckbox').checked;
console.log('Antialias is ' + antialias);

// Check Basemap Choice
function displayRadioValue(ele) {
  for(i = 0; i < ele.length; i++) {
      if(ele[i].checked){
        return ele[i].value;
      }
  }
}


// Main map setup
var map = new maplibregl.Map({
  container: 'map',
  style: 'tiles/style_' + displayRadioValue(document.getElementById("basemapform")) + '.json',
  center: [-3.1382,55.9533],
  zoom: 8,
  maxZoom: 19,
  minZoom: 6,
  maxPitch: 85,
  hash: true,
  antialias: antialias
});

// Setup other part of the website
showrighbox(true); // Show the accordion hide the button 
document.getElementById("rnet_accordion").click();

// Layer Control
function addHomeButton(map) {
  class HomeButton {
    onAdd(map) {
      const div = document.createElement("div");
      div.className = "maplibregl-ctrl maplibregl-ctrl-group";
      div.innerHTML = `<button aria-label="Change basemap">
        <img src="/images/basemap.svg" title="Change basemap" />
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
      let request = 'https://nominatim.openstreetmap.org/search?q=' + config.query + '&format=geojson&polygon_geojson=1&addressdetails=1&countrycodes=gb';
      const response = await fetch(request);
      const geojson = await response.json();
      for (let feature of geojson.features) {
        let center = [
          feature.bbox[0] + (feature.bbox[2] - feature.bbox[0]) / 2,
          feature.bbox[1] + (feature.bbox[3] - feature.bbox[1]) / 2
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

// Add Controls to the Map
map.addControl(
  new MaplibreGeocoder(geocoder_api, {
    maplibregl: maplibregl,
    collapsed: true
  }), 'top-left'
);

map.addControl(new maplibregl.NavigationControl(), 'top-left');

map.addControl(
new maplibregl.TerrainControl({
  source: 'terrainSource',
  exaggeration: 1.25
}), 'top-left');

map.addControl(new maplibregl.GeolocateControl({
  positionOptions: {enableHighAccuracy: true},
  trackUserLocation: true
}), 'top-left');

map.addControl(new maplibregl.FullscreenControl(), 'top-left');

map.addControl(new maplibregl.AttributionControl({
  compact: true,
  customAttribution: 'Contains OS data © Crown copyright 2021, Satelite map © ESRI 2023, © OpenStreetMap contributors'
}), 'bottom-right');

map.addControl(new maplibregl.ScaleControl({
  maxWidth: 80,
  unit: 'metric'
}), 'bottom-left');

addHomeButton(map);


