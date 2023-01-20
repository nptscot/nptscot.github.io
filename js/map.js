// Setup Map
var map = new maplibregl.Map({
container: 'map',
style: 'tiles/style.json' ,
center: [-3.1382,55.9533],
zoom: 8,
maxZoom: 19,
minZoom: 4,
hash: true
});

// Geocoding API
var geocoder_api = {
  forwardGeocode: async (config) => {
    const features = [];
    try {
      let request = 'https://nominatim.openstreetmap.org/search?q=' +
      config.query + '&format=geojson&polygon_geojson=1&addressdetails=1&countrycodes=gb';
    const response = await fetch(request);
    const geojson = await response.json();
    for (let feature of geojson.features) {
      let center = [feature.bbox[0] + (feature.bbox[2] - feature.bbox[0]) / 2,
        feature.bbox[1] + (feature.bbox[3] - feature.bbox[1]) / 2];
      let point = {type: 'Feature',geometry: {type: 'Point',coordinates: center},
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
  maplibregl: maplibregl
  })
);

map.on('load', function() {

// Add Controls to the Map
map.addControl(new maplibregl.NavigationControl(), 'top-left');

map.addControl(new maplibregl.AttributionControl({
  customAttribution: 'Contains OS data © Crown copyright 2021'
}));

map.addControl(new maplibregl.GeolocateControl({
positionOptions: {enableHighAccuracy: true},trackUserLocation: true})
,'top-left');

map.addControl(
new maplibregl.TerrainControl({source: 'terrainSource',exaggeration: 1.5})
,'top-left');

map.addControl(new maplibregl.ScaleControl({
  maxWidth: 80,
  unit: 'metric'
}),'bottom-right');

// Add Data Sources
map.addSource('rnet', {
	'type': 'vector',
	'tiles': [
	'https://www.wisemover.co.uk/tiles/rnet2/{z}/{x}/{y}.pbf'
	],
	'minzoom': 6,
	'maxzoom': 11
});

map.addSource('routes', {
	'type': 'vector',
	'tiles': [
	'https://www.wisemover.co.uk/tiles/routes/{z}/{x}/{y}.pbf'
	],
	'minzoom': 6,
	'maxzoom': 11
});

map.addSource('zones', {
	'type': 'vector',
	'tiles': [
	'https://www.wisemover.co.uk/tiles/zones/{z}/{x}/{y}.pbf'
	],
	'minzoom': 6,
	'maxzoom': 12
});

map.addSource('terrainSource', {
  'type': 'raster-dem',
  'tiles': ["https://www.carbon.place/rastertiles/demwebp/{z}/{x}/{y}.webp"],
  'tileSize': 512,
  'minzoom': 0,
	'maxzoom': 9
});

map.addSource('hillshadeSource', {
  'type': 'raster-dem',
  'tiles': ["https://www.carbon.place/rastertiles/demwebp/{z}/{x}/{y}.webp"],
  'tileSize': 512,
  'minzoom': 0,
	'maxzoom': 9
});

map.addLayer(
{
'id': 'hillshading',
'source': 'hillshadeSource',
'type': 'hillshade'
},
'sea'
);

// Setup other part of the website
showrighbox(true); // Show the accordion hide the button 
show_rnet_legend(true); // Show the legend hide the button 
toggleLayer('rnet') // Start with the rnet on
toggleLayer('routes') // Start with the rnet on
toggleLayer('zones') // Start with the rnet on

});



