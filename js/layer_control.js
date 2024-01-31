const settings = {
  tileserverUrl: 'https://nptscot.blob.core.windows.net/pmtiles/',
  tileserverTempLocal: false,  // Temporarily set to true to switch to localUrl cases below
}

const definitions = {
  
  // #!# Cases with path have inconsistent naming which would be good to align, then remove 'path' support
  sources: [
    ['rnet', {dateBased: '2023-12-17', localUrl: 'utilitytrips/'}],
    ['rnet-simplified', {path: 'rnet_simplified', dateBased: '2023-12-17'}],
    ['dasymetric', {dateBased: '2023-12-17'}],
    ['data_zones', {dateBased: '2023-12-17'}],
    ['schools', {dateBased: '2023-12-17'}],
    ['wards'],
    ['holyrood'],
    ['scot_regions'],
    ['la'],
    ['cohesivenetwork', {localUrl: 'cohesivenetwork/'}],
    // #!# Placenames should be treated like a basemap - it's not a data layer as such
    ['placenames', {path: 'oszoom_names'}],
  ],
  
  otherLayers: {
    schools: {
      'id': 'schools',
      'type': 'circle',
      'source': 'schools',
      'source-layer': 'schools',
      'paint': {
        "circle-color": [
          'match',
          ['get', 'SchoolType'],
          'Primary','#313695',
          'Secondary','#a50026',
          /* other */ '#43f22c'
        ],
        // make circles larger as the user zooms
        'circle-radius': {
          'base': 5,
          'stops': [
            [8, 6],
            [22, 180]
          ]
        },
      } 
    },
    wards: {
      'id': 'wards',
      'type': 'line',
      'source': 'wards',
      'source-layer': 'wards',
      'paint': {
        'line-color': 'rgba(32, 107, 7, 1)',
        'line-width': 2
      }
    },
    holyrood: {
      'id': 'holyrood',
      'type': 'line',
      'source': 'holyrood',
      'source-layer': 'holyrood',
      'paint': {
        'line-color': 'rgba(83, 123, 252, 1)',
        'line-width': 2
      }
    },
    scot_regions: {
      'id': 'scot_regions',
      'type': 'line',
      'source': 'scot_regions',
      'source-layer': 'scot_regions',
      'paint': {
        'line-color': 'rgba(186, 177, 6, 1)',
        'line-width': 2
      }
    },
    la: {
      'id': 'la',
      'type': 'line',
      'source': 'la',
      'source-layer': 'la',
      'paint': {
        'line-color': 'rgba(107, 7, 7, 1)',
        'line-width': 2
      } 
    },
    cohesivenetwork: {
      'id': 'cohesivenetwork',
      'type': 'line',
      'source': 'cohesivenetwork',
      'source-layer': 'example_cohesive',	// #!# Needs fixing to 'cohesivenetwork'
      'paint': {
        'line-color': [
          'match',
          ['get', 'group'],
          1, '#1230b4',
          2, '#894cf7',
          3, '#f07984',
          4, '#fff551',
          /* other */ 'gray'
          ],
        'line-width': 2
      }
    }
  },
  
  buildingColours: {
    'greyscale_nobuild': '#d1cfcf',   // "OS Greyscale"
    "satellite": false,               // "Satellite" - No buildings
    'opencyclemap': false,            // "OpenCycleMap" - No buildings
    'google_nobuild': '#f0eded',      // "Outdoors"
    'dark_nobuild': '#000000',        // "Dark"
  },
  
  routeNetworkLegendColours: {
    'none': [
      ['&nbsp;', '#304ce7']
    ],
    'flow': [
      ['1',      '#9C9C9C'],
      ['50',     '#FFFF73'],
      ['100',    '#AFFF00'],
      ['250',    '#00FFFF'],
      ['500',    '#30B0FF'],
      ['1000',   '#2E5FFF'],
      ['2000',   '#0000FF'],
      ['3000+',  '#FF00C5'],
    ],
    'quietness': [
      ['0-25',   '#882255'],
      ['25-50',  '#CC6677'],
      ['50-75',  '#44AA99'],
      ['75-100', '#117733'],
    ],
    'gradient': [
      ['0-3',    '#59ee19'],
      ['3-5',    '#37a009'],
      ['5-7',    '#FFC300'],
      ['7-10',   '#C70039'],
      ['10+',    '#581845'],
    ]
  },
  
  dzLegendColours: {
    'SIMD2020v2_Decile': [
      ['1st', '#a50026'],
      ['2nd', '#d73027'],
      ['3rd', '#f46d43'],
      ['4th', '#fdae61'],
      ['5th', '#fee090'],
      ['6th', '#e0f3f8'],
      ['7th', '#abd9e9'],
      ['8th', '#74add1'],
      ['9th', '#4575b4'],
      ['10th', '#313695'],
    ],
    'population_density': [
      ['10', '#edf8fb'],
      ['50', '#bfd3e6'],
      ['100', '#9ebcda'],
      ['150', '#8c96c6'],
      ['200', '#8856a7'],
      ['600', '#810f7c'],
    ],
    'broadband': [
      ['0%', '#fff7ec'],
      ['2%', '#fee8c8'],
      ['5%', '#fdd49e'],
      ['10%', '#fdbb84'],
      ['50%', '#d7301f'],
      ['100%', '#7f0000'],
    ],
    'pcycle': [
      ['0-1', '#A50026'],
      ['2-3', '#D73027'],
      ['4-6', '#F46D43'],
      ['7-9', '#FDAE61'],
      ['10-14', '#FEE090'],
      ['15-19', '#ffffbf'],
      ['20-24', '#C6DBEF'],
      ['25-29', '#ABD9E9'],
      ['30-39', '#74ADD1'],
      ['40', '#4575B4'],
    ],
    'pcycle_go_dutch': [    // Actually same as pcycle
      ['0-1', '#A50026'],
      ['2-3', '#D73027'],
      ['4-6', '#F46D43'],
      ['7-9', '#FDAE61'],
      ['10-14', '#FEE090'],
      ['15-19', '#ffffbf'],
      ['20-24', '#C6DBEF'],
      ['25-29', '#ABD9E9'],
      ['30-39', '#74ADD1'],
      ['40', '#4575B4'],
    ],
    '_': [  // Default; is time in minutes
      ['3', '#053061'],
      ['5', '#2166ac'],
      ['7', '#4393c3'],
      ['10', '#92c5de'],
      ['15', '#f7f7f7'],
      ['30', '#f4a582'],
      ['60', '#b2182b'],
      ['200', '#67001f'],
    ],
  },
  
  // #!# These are presumably restatements of dzLegendColours
  dzStyle_cols: {
    'SIMD2020v2_Decile': [
      '#a50026', 1.1,       // #!# This block is basically enums rather than ranges, so current fudge of .1 is to avoid off-by-one errors
      '#d73027', 2.1,
      '#f46d43', 3.1,
      '#fdae61', 4.1,
      '#fee090', 5.1,
      '#e0f3f8', 6.1,
      '#abd9e9', 7.1,
      '#74add1', 8.1,
      '#4575b4', 9.1,
      '#313695', 10.1,
      '#000000'
    ],
    'population_density': [
      '#edf8fb', 10,
      '#bfd3e6', 50,
      '#9ebcda', 100,
      '#8c96c6', 150,
      '#8856a7', 200,
      '#810f7c', 600,
      '#000000'
    ],
    'broadband': [
      '#fff7ec', 0.01,    // #!# Currently zero is used for voids - data should be changed to use known constant e.g. -9999
      '#fee8c8', 2,
      '#fdd49e', 5,
      '#fdbb84', 10,
      '#d7301f', 50,
      '#7f0000', 100,
      '#000000'
    ],
    'pcycle': [
      '#A50026', 2,
      '#D73027', 4,
      '#F46D43', 7,
      '#FDAE61', 10,
      '#FEE090', 15,
      '#ffffbf', 20,
      '#C6DBEF', 25,
      '#ABD9E9', 30,
      '#74ADD1', 40,
      '#4575B4', 100,
      '#000000'
    ],
    'pcycle_go_dutch': [
      '#A50026', 2,
      '#D73027', 4,
      '#F46D43', 7,
      '#FDAE61', 10,
      '#FEE090', 15,
      '#ffffbf', 20,
      '#C6DBEF', 25,
      '#ABD9E9', 30,
      '#74ADD1', 40,
      '#4575B4', 100,
      '#000000'
    ],
    '_': [    // Default
      '#053061', 3,
      '#2166ac', 5,
      '#4393c3', 7,
      '#92c5de', 10,
      '#f7f7f7', 15,
      '#f4a582', 30,
      '#b2182b', 60,
      '#67001f', 200,
      '#000000'
    ]
  }
};




function switch_style(){
  
  var styleName = getBasemapStyle ();
  var styleCurrent = map.getStyle().name;
  if(styleCurrent != styleName){
    console.log("Restyling from " + styleCurrent +" to "+ styleName);
    map.setStyle('tiles/style_' + styleName + '.json');
  }
  
  map.once('idle', function() {
    // Add data sources
    addDataSources();

    // Reload layers
    toggleLayer('rnet'); // Start with the rnet on
    toggleLayer('data_zones');
    
    // Other layers
    Object.keys (definitions.otherLayers).forEach (layerId => {
      toggleLayer(layerId);
    });
    
    // Manage placenames
    placenames();
    
    // Handle layer change controls, each marked with the updatelayer class
    document.querySelectorAll('.updatelayer').forEach((input) => {
      input.addEventListener('change', function(e) {
        layerId = e.target.id;
        // #!# The input IDs should be standardised, to replace this list of regexp matches
        layerId = layerId.replace (/simplifiedcheckbox$/, '');  // Simplification checkbox, e.g. rnetsimplifiedcheckboxn => rnet
        layerId = layerId.replace (/checkbox$/, '');            // Checkboxes, e.g. data_zonescheckbox => data_zones
        layerId = layerId.replace (/_checkbox_.+$/, '');         // Checkboxes, e.g. data_zones_checkbox_dasymetric => data_zones
        layerId = layerId.replace (/_slider-.+$/, '');          // Slider hidden inputs, e.g. rnet_slider-quietness => rnet
        layerId = layerId.replace (/_selector$/, '');           // Dropdowns, e.g. data_zones_selector => data_zones   #!# Should be input, but currently data_zones_input would clash with rnet_*_input on next line
        layerId = layerId.replace (/_[^_]+_input$/, '');        // Dropdowns, e.g. rnet_purpose_input => rnet
        toggleLayer(layerId);
      });
    });
    
  });
}


function addDataSources () {
  console.log("Adding sources");
  
  // Add sources
  definitions.sources.forEach (source => {
    const [sourceId, attributes = {}] = source;
    
    // Construct the URL
    let url = 'pmtiles://';
    if (settings.tileserverTempLocal && attributes.localUrl) {
      url += attributes.localUrl;
    } else {
      url += settings.tileserverUrl;
    }
    url += (attributes.path || sourceId);
    url += (attributes.dateBased ? '-' + attributes.dateBased : '');
    url += '.pmtiles';
    
    // Add the source, if it does not already exist
    if (!map.getSource(sourceId)){
      map.addSource(sourceId, {
        'type': 'vector',
        'url': url,
      });
    }
  });
}


// Function to manage display of placenames
function placenames () {
  
  // Load the style definition
  // #!# The .json file is currently not a complete style definition, e.g. with version number etc.
  fetch('/tiles/partial-style_oszoom_names.json')
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


function toggleLayer(layerName) {
  
  console.log("Toggling layer " + layerName)

  // Handle data zones layer
  if (layerName == 'data_zones'){
    switch_data_zones();
    return;
  }
  
  // Handle rnet layer
  if (layerName == 'rnet') {
    switch_rnet();
    return;
  }
  
  // Handle other layers (if the requested layer is defined)
  if (definitions.otherLayers[layerName]) {
    switch_otherLayer (layerName);
    return;
  }
  
  // Unknown layer
  console.log('Unknown layer selected');
}


// Function to manage switching of simple layers
function switch_otherLayer (layerName)
{
  // Get checkbox
  const visible = document.getElementById(layerName.concat('checkbox')).checked;
  
  // Add the layer (if not already present), respecting the initial checkbox state
  if (!map.getLayer(layerName)) {
    definitions.otherLayers[layerName].visibility = (visible ? 'visible' : 'none');
    map.addLayer(definitions.otherLayers[layerName], 'placeholder_name');
  }
  
  // Set the visibility, based on the checkbox value
  map.setLayoutProperty(layerName, 'visibility', (visible ? 'visible' : 'none'));
}


function createLegend (legendColours, selected, selector)
{
  // Create the legend HTML
  // #!# Should be a list, not nested divs
  let legendHtml = '<div class="l_r">';
  selected = (legendColours.hasOwnProperty (selected) ? selected : '_');
  legendColours[selected].forEach(legendColour => {
    legendHtml += `<div class="lb"><span style="background-color: ${legendColour[1]}"></span>${legendColour[0]}</div>`;
  })
  legendHtml += '</div>';
  
  // Set the legend
  document.getElementById(selector).innerHTML = legendHtml;
}


// Function to determine layer width field
// #!# Need to merge with popup.js: ncycleField ()
function getLayerWidthField ()
{
  const layerPurpose = document.getElementById('rnet_purpose_input').value;
  const layerType = document.getElementById('rnet_type_input').value;
  const layerScenario = document.getElementById('rnet_scenario_input').value;
  const layerWidthField = layerPurpose + '_' + layerType + '_' + layerScenario;
  return layerWidthField;
}


function switch_rnet() {  
  
  console.log("Updating rnet")
  
  // Initialise each layer variant, if they do not exist
  const layerVariants = ['rnet', 'rnet-simplified'];
  layerVariants.forEach (layerId => {
    if (!map.getLayer (layerId)) {
      map.addLayer ({
        'id': layerId,
        'source': layerId,
        'source-layer': 'rnet',
        'type': 'line',
        'layout': {
          'visibility': 'none'
        },
      }, 'placeholder_name');
    }
  });
  
  // Determine layer visibility
  const layerEnabled = document.getElementById('rnetcheckbox').checked;
  const simplifiedMode = document.getElementById('rnetsimplifiedcheckbox').checked;

  // Layer colour
  var layerColour = document.getElementById("rnet_colour_input").value;
  
  // Update the Legend - Do this even if map layer is off
  createLegend (definitions.routeNetworkLegendColours, layerColour, 'linecolourlegend');
  
  // Update the map if enabled
  if (layerEnabled) {
    
    // Determine the layer width field
    const layerWidthField = getLayerWidthField ();
    
    // Parse route network sliders to be used as filters
    const sliders = {};
    document.querySelectorAll ("input[id^='rnet_slider-']").forEach (slider => {
      const sliderId = slider.id.replace ('rnet_slider-', '');
      const sliderValue = slider.value.split ('-');
      sliders[sliderId] = {
        min: Number (sliderValue[0]),
        max: Number (sliderValue[1])
      };
    });
    
    // Only filter cyclists if scenario set
    var filter = ['all',
      ['>=', layerWidthField, sliders.cycle.min],
      ['<=', layerWidthField, sliders.cycle.max],
      ['>=', "Quietness", sliders.quietness.min],
      ['<=', "Quietness", sliders.quietness.max],
      ['>=', "Gradient", sliders.gradient.min],
      ['<=', "Gradient", sliders.gradient.max]
    ];
    
    // Define line colour
    var line_colours = {
      'none': "#304ce7",
      'flow': [
        "step", ["get", layerWidthField],
        "rgba(0,0,0,0)", 1,
        "#9C9C9C", 50,
        "#FFFF73", 100,
        "#AFFF00", 250,
        "#00FFFF", 500,
        "#30B0FF", 1000,
        "#2E5FFF", 2000,
        "#0000FF", 3000,
        "#FF00C5"
      ],
      'quietness': [
        "step", ["get", "Quietness"],
        "#882255", 25,
        "#CC6677", 50,
        "#44AA99", 75,
        "#117733", 101,
        "#000000"
      ],
      'gradient': [
        "step", ["get", "Gradient"],
        "#59ee19", 3,
        "#37a009", 5,
        "#FFC300", 7,
        "#C70039", 10,
        "#581845", 100,
        "#000000"
      ]
    };
    
    // Define line width
    // Implements the formula y = (3 / (1 + exp(-3*(x/1000 - 1.6))) + 0.3)
    // This code was hard to work out!
    var line_width = [
      "interpolate",
      ["linear"],
      ["zoom"],
      12, ["*", 2.1, ["+", 0.3, ["/", 3, ["+", 1, ["^", 2.718, ["-", 2.94, ["*", ["get", layerWidthField], 0.0021]]]]]]],
      14, ["*", 5.25,["+", 0.3, ["/", 3, ["+", 1, ["^", 2.718, ["-", 2.94, ["*", ["get", layerWidthField], 0.0021]]]]]]],
      15, ["*", 7.5, ["+", 0.3, ["/", 3, ["+", 1, ["^", 2.718, ["-", 2.94, ["*", ["get", layerWidthField], 0.0021]]]]]]],
      16, ["*", 18,  ["+", 0.3, ["/", 3, ["+", 1, ["^", 2.718, ["-", 2.94, ["*", ["get", layerWidthField], 0.0021]]]]]]],
      18, ["*", 52.5,["+", 0.3, ["/", 3, ["+", 1, ["^", 2.718, ["-", 2.94, ["*", ["get", layerWidthField], 0.0021]]]]]]],
    ];
    
    // Set the filter
    const layerId = (simplifiedMode ? 'rnet-simplified' : 'rnet');
    map.setFilter (layerId, filter);
    
    // Set paint properties
    map.setPaintProperty (layerId, "line-color", line_colours[layerColour]);
    map.setPaintProperty (layerId, "line-width", line_width);
  }
  
  // Toggle layer visibility
  map.setLayoutProperty ('rnet',            'visibility', (layerEnabled && !simplifiedMode ? 'visible' : 'none'));
  map.setLayoutProperty ('rnet-simplified', 'visibility', (layerEnabled &&  simplifiedMode ? 'visible' : 'none'));
}


// Function to determine the style column
function getStyleColumn (layerId)
{
  const style_col_selected = definitions.dzStyle_cols.hasOwnProperty(layerId) ? layerId : '_';
  return definitions.dzStyle_cols[style_col_selected];
}


// Data zones
function switch_data_zones()
{
  // Create buildings layer
  buildingsLayer ();
  
  // Update the legend (even if map layer is off)
  var layerId = document.getElementById('data_zones_selector').value;
  createLegend (definitions.dzLegendColours, layerId, 'dzlegend');
  
  // Initialise data zones polygons layer
  if (!map.getLayer ('data_zones')) {
    map.addLayer ({
      'id': 'data_zones',
      'type': 'fill',
      'source': 'data_zones',
      'source-layer': 'data_zones',
      'layout': {
        'visibility': 'none'
      },
      'paint': {
        'fill-color': '#9c9898',
        'fill-opacity': 0.8,
        'fill-outline-color': '#000000'
      }
    }, 'roads 0 Guided Busway Casing');
  }
  
  // Get UI state
  var daysymetricMode = document.getElementById('data_zones_checkbox_dasymetric').checked;
  var dataZones = document.getElementById('data_zonescheckbox').checked;
  
  // Set paint properties
  map.setPaintProperty ('data_zones', 'fill-color', ['step', ['get', layerId], ...getStyleColumn (layerId)]);
  map.setPaintProperty ('data_zones', 'fill-opacity', (daysymetricMode ? 0.1 : 0.8));   // Very faded out in daysymetric mode, as the buildings are coloured
  
  // Set visibility
  map.setLayoutProperty ('data_zones', 'visibility', (dataZones ? 'visible' : 'none'));
}


// Function to handle buildings layer
function buildingsLayer ()
{
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
  
  // Function to determine the buildings colour
  function getBuildingsColour ()
  {
    // If datazones is off, buildings shown, if vector style, as static colour appropriate to the basemap
    if (!document.getElementById('data_zonescheckbox').checked) {
      const styleName = getBasemapStyle ();
      return definitions.buildingColours[styleName];
    }
    
    // If dasymetric mode, use a colour set based on the layer
    if (document.getElementById('data_zones_checkbox_dasymetric').checked) {
      const layerId = document.getElementById('data_zones_selector').value;
      console.log (layerId);
      return ['step',
        ['get', layerId],
        ...getStyleColumn (layerId)
      ];
    }
    
    // Default to gray
    return '#9c9898';
  }
  
  // Set building colour
  const buildingColour = getBuildingsColour ();
  map.setPaintProperty ('dasymetric', 'fill-extrusion-color', (buildingColour || '#9c9898'));
  
  // Set visibility
  map.setLayoutProperty ('dasymetric', 'visibility', (buildingColour ? 'visible' : 'none'));
}


// First load setup
map.on('load', function() {
  switch_style();
});
