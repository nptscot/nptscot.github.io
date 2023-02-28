// Setup Map
var map = new maplibregl.Map({
container: 'map',
style: 'tiles/style_' + displayRadioValue(document.getElementById("basemapform")) + '.json' ,
center: [-3.1382,55.9533],
zoom: 8,
maxZoom: 19,
minZoom: 6,
maxPitch: 85,
hash: true,
antialias: true
});

//var hoveredStateId = null;

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
map.addControl(
  new MaplibreGeocoder(geocoder_api, {
    maplibregl: maplibregl,
    collapsed: true
  }),'top-left'
);


// pmtiles
let protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles",protocol.tile);

map.on('load', function() {

// Add Controls to the Map
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
}), 'bottom-left');

map.addControl(new maplibregl.ScaleControl({
  maxWidth: 80,
  unit: 'metric'
}),'bottom-left');




// When the user moves their mouse over the state-fill layer, we'll update the
// feature state for the feature under the mouse.
/*
map.on('mousemove', 'data_zones', function (e) {
  console.log(hoveredStateId);
  if (e.features.length > 0) {
    if (hoveredStateId) {
      map.setFeatureState(
        { sourceLayer: 'data_zones_boarder', source: 'data_zones', id: hoveredStateId },
        { hover: false }
      );
    }
    hoveredStateId = e.features[0].id;
    console.log(e.features[0]);
    map.setFeatureState(
      { sourceLayer: 'data_zones_boarder', source: 'data_zones', id: hoveredStateId },
      { hover: true }
    );
  }
});
 
// When the mouse leaves the state-fill layer, update the feature state of the
// previously hovered feature.
map.on('mouseleave', 'data_zones', function () {
  if (hoveredStateId) {
    map.setFeatureState(
      { source: 'states', id: hoveredStateId },
      { hover: false }
    );
  }
  hoveredStateId = null;
});

*/



// Setup other part of the website
showrighbox(true); // Show the accordion hide the button 
switch_style();
addDataSources();

});



