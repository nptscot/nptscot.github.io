
// Basemap styles
const basemaps = {
  'greyscale_nobuild': {
    title: 'OS greyscale',
    default: true,
    buildingColour: '#d1cfcf'
  },
  'satellite': {
    title: 'Satellite',
    buildingColour: false   // No buildings
  },
  'opencyclemap': {
    title: 'OpenCycleMap',
    buildingColour: false   // No buildings
  },
  'google_nobuild': {
    title: 'Outdoors',
    buildingColour: '#f0eded'
  },
  'dark_nobuild': {
    title: 'Dark',
    buildingColour: '#000000'
  },
};



// Setup map, and obtain the handle
map = createMap ();



// Generate layer switcher HTML
function layerSwitcherHtml ()
{
  // Create each switcher button
  const options = [];
  Object.entries (basemaps).forEach (([id, basemap]) => {
    let option  = `<input type="radio" name="basemap" id="${id}-basemap" value="${id}"` + (basemap.default ? ' checked="checked"' : '') + ' />';
    option += `<label for="${id}-basemap"><img src="images/basemaps/${id}.png" title="${basemap.title}" /></label>`;
    options.push (option);
  });
  
  // Insert radiobuttons into form
  document.getElementById ('basemapform').innerHTML = options.join (' ');
}



// Function to get the currently-checked basemap style
function getBasemapStyle ()
{
  return document.querySelector('#basemapform input:checked').value;
}


// Function to set up the map UI and controls
function createMap ()
{
  // Create the layer switcher
  layerSwitcherHtml ();
  
  // Main map setup
  var map = new maplibregl.Map({
    container: 'map',
    style: 'tiles/style_' + getBasemapStyle () + '.json',
    center: [-3.1382,55.9533],
    zoom: 8,
    maxZoom: 19,
    minZoom: 6,
    maxPitch: 85,
    hash: true,
    antialias: document.getElementById('antialiascheckbox').checked
  });

  // pmtiles
  let protocol = new pmtiles.Protocol();
  maplibregl.addProtocol('pmtiles', protocol.tile);

  // Add geocoder control; see: https://github.com/maplibre/maplibre-gl-geocoder
  map.addControl(new MaplibreGeocoder(
    geocoderApi(), {
      maplibregl: maplibregl,
      collapsed: true
    }
  ), 'top-left');

  // Add +/- buttons
  map.addControl(new maplibregl.NavigationControl(), 'top-left');

  // Add terrain control
  map.addControl(new maplibregl.TerrainControl({
    source: 'terrainSource',
    exaggeration: 1.25
  }), 'top-left');
  
  // Add buildings; note that the style/colouring may be subsequently altered by data layers
  addBuildings (map);
  document.getElementById ('basemapform').addEventListener ('change', function (e) {
    addBuildings (map);
  });
  
  // Add geolocation control
  map.addControl(new maplibregl.GeolocateControl({
    positionOptions: {enableHighAccuracy: true},
    trackUserLocation: true
  }), 'top-left');

  // Add full-screen control
  map.addControl(new maplibregl.FullscreenControl(), 'top-left');

  // Add basemap change control
  class BasemapButton {
    onAdd(map) {
      const div = document.createElement('div');
      div.className = 'maplibregl-ctrl maplibregl-ctrl-group';
      div.innerHTML = '<button aria-label="Change basemap"><img src="/images/basemap.svg" title="Change basemap" /></button>';
      div.addEventListener('contextmenu', (e) => e.preventDefault());
      div.addEventListener('click', function () {
        var box = document.getElementById('basemapcontrol');
        box.style.display = (window.getComputedStyle(box).display == 'none' ? 'block' : 'none');
      });
      return div;
    }
  }
  map.addControl(new BasemapButton(), 'top-left');

  // Add scale
  map.addControl(new maplibregl.ScaleControl({
    maxWidth: 80,
    unit: 'metric'
  }), 'bottom-left');

  // Add attribution
  map.addControl(new maplibregl.AttributionControl({
    compact: true,
    customAttribution: 'Contains OS data © Crown copyright 2021, Satelite map © ESRI 2023, © OpenStreetMap contributors'
  }), 'bottom-right');
  
  // Add placenames support
  map.once('idle', function () {
    placenames (map);
  });

  // Antialias reload
  document.getElementById ('antialiascheckbox').addEventListener ('click', function () {
    location.reload();
  });
  
  // Return the map
  return map;
}


// Function to add the buildings layer
function addBuildings (map)
{
  // When ready
  map.once ('idle', function () {
    
    // Add the source
    if (!map.getSource ('dasymetric')) {
      map.addSource('dasymetric', {
        'type': 'vector',
        // #!# Parameterise base server URL
        'url': 'pmtiles://https://nptscot.blob.core.windows.net/pmtiles/dasymetric-2023-12-17.pmtiles',
      });
    }
    
    // Initialise the layer
    if (!map.getLayer ('dasymetric')) {
      map.addLayer ({
        'id': 'dasymetric',
        'type': 'fill-extrusion',
        'source': 'dasymetric',
        'source-layer': 'dasymetric',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
          'fill-extrusion-color': '#9c9898',  // Default gray
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            12, 1,
            15, 8
          ]
        }
      }, 'roads 0 Guided Busway Casing');
    }
  });
}


// Geocoding API implementation
function geocoderApi ()
{
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
  
  return geocoder_api;
}


// Function to manage display of placenames
function placenames (map)
{
  // Add the source
  map.addSource ('placenames', {
    'type': 'vector',
    // #!# Parameterise base server URL
    'url': 'pmtiles://https://nptscot.blob.core.windows.net/pmtiles/oszoom_names.pmtiles',
  });
  
  // Load the style definition
  // #!# The .json file is currently not a complete style definition, e.g. with version number etc.
  fetch ('/tiles/partial-style_oszoom_names.json')
    .then (function (response) {return response.json ();})
    .then (function (placenameLayers) {
      
      // Add each layer, respecting the initial checkbox state
      Object.entries(placenameLayers).forEach(([layerId, layer]) => {
        var checkbox = document.getElementById('placenamescheckbox');
        layer.visibility = (checkbox.checked ? 'visible' : 'none');
        map.addLayer(layer);
      });
      
      // Listen for checkbox changes
      document.getElementById('placenamescheckbox').addEventListener ('click', (e) => {
        var checkbox = document.getElementById('placenamescheckbox');
        Object.entries(placenameLayers).forEach(([layerId, layer]) => {
          map.setLayoutProperty(layerId, 'visibility', (checkbox.checked ? 'visible' : 'none'));
        });
      });
    });
}


