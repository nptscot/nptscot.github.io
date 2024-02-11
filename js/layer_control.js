// Dependency: map.js must be loaded first - for basemaps[styleName].buildingColour


const definitions = {
  
  layers: {
    
    rnet: {
      'id': 'rnet',
      'source': {
        'type': 'vector',
        'url': 'pmtiles://%tileserverUrl/rnet-2023-12-17.pmtiles',
      },
      'source-layer': 'rnet',
      'type': 'line',
    },
    
    'rnet-simplified': {
      'id': 'rnet-simplified',
      'source': {
        'type': 'vector',
        'url': 'pmtiles://%tileserverUrl/rnet_simplified-2023-12-17.pmtiles',   // #!# Inconsistent path - needs fixing
      },
      'source-layer': 'rnet',
      'type': 'line',
    },
    
    data_zones: {
      'id': 'data_zones',
      'type': 'fill',
      'source': {
        'type': 'vector',
        'url': 'pmtiles://%tileserverUrl/data_zones-2023-12-17.pmtiles',
      },
      'source-layer': 'data_zones',
      'paint': {
        'fill-color': '#9c9898',
        'fill-opacity': 0.8,
        'fill-outline-color': '#000000'
      }
    },
    
    schools: {
      'id': 'schools',
      'type': 'circle',
      'source': {
        'type': 'vector',
        'url': 'pmtiles://%tileserverUrl/schools-2023-12-17.pmtiles',
      },
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
      'source': {
        'type': 'vector',
        'url': 'pmtiles://%tileserverUrl/wards.pmtiles',
      },
      'source-layer': 'wards',
      'paint': {
        'line-color': 'rgba(32, 107, 7, 1)',
        'line-width': 2
      }
    },
    
    holyrood: {
      'id': 'holyrood',
      'type': 'line',
      'source': {
        'type': 'vector',
        'url': 'pmtiles://%tileserverUrl/holyrood.pmtiles',
      },
      'source-layer': 'holyrood',
      'paint': {
        'line-color': 'rgba(83, 123, 252, 1)',
        'line-width': 2
      }
    },
    
    scot_regions: {
      'id': 'scot_regions',
      'type': 'line',
      'source': {
        'type': 'vector',
        'url': 'pmtiles://%tileserverUrl/scot_regions.pmtiles',
      },
      'source-layer': 'scot_regions',
      'paint': {
        'line-color': 'rgba(186, 177, 6, 1)',
        'line-width': 2
      }
    },
    
    la: {
      'id': 'la',
      'type': 'line',
      'source': {
        'type': 'vector',
        'url': 'pmtiles://%tileserverUrl/la.pmtiles',
      },
      'source-layer': 'la',
      'paint': {
        'line-color': 'rgba(107, 7, 7, 1)',
        'line-width': 2
      } 
    },
    
    cohesivenetwork: {
      'id': 'cohesivenetwork',
      'type': 'line',
      'source': {
        'type': 'vector',
        'url': 'pmtiles://%tileserverUrl/cohesivenetwork.pmtiles',
      },
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
  
  routeNetwork_cols: {
    none: '#304ce7',
    flow: [
      'rgba(0,0,0,0)', 1,
      '#9C9C9C', 50,
      '#FFFF73', 100,
      '#AFFF00', 250,
      '#00FFFF', 500,
      '#30B0FF', 1000,
      '#2E5FFF', 2000,
      '#0000FF', 3000
    ],
    quietness: [
      '#882255', 25,
      '#CC6677', 50,
      '#44AA99', 75,
      '#117733', 101
    ],
    gradient: [
      '#59ee19', 3,
      '#37a009', 5,
      '#FFC300', 7,
      '#C70039', 10,
      '#581845', 100
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




manageLayers ();


// Function to manage layers
function manageLayers ()
{
  // Add layers when the map is ready (including after a basemap change)
  document.addEventListener ('@map/ready', function () {
    
    // Initialise datasets (sources and layers)
    initialiseDatasets ();
    
    // Add handler for proxy checkboxes - the combination of the enabled and simplified checkboxes set the 'real' layer checkboxes
    rnetCheckboxProxying ();

    // Set initial state for all layers
    Object.keys (definitions.layers).forEach (layerId => {
      toggleLayer(layerId);
    });
    
    // Handle layer change controls, each marked with the updatelayer class
    document.querySelectorAll('.updatelayer').forEach((input) => {
      input.addEventListener('change', function(e) {
        layerId = e.target.id;
        // #!# The input IDs should be standardised, to replace this list of regexp matches
        layerId = layerId.replace (/checkbox$/, '');            // Checkboxes, e.g. data_zonescheckbox => data_zones
        layerId = layerId.replace (/_checkbox_.+$/, '');        // Checkboxes, e.g. data_zones_checkbox_dasymetric => data_zones
        layerId = layerId.replace (/_slider-.+$/, '');          // Slider hidden inputs, e.g. rnet_slider-quietness => rnet
        layerId = layerId.replace (/_selector$/, '');           // Dropdowns, e.g. data_zones_selector => data_zones   #!# Should be input, but currently data_zones_input would clash with rnet_*_input on next line
        layerId = layerId.replace (/_[^_]+_input$/, '');        // Dropdowns, e.g. rnet_purpose_input => rnet
        toggleLayer(layerId);
        // #!# Workaround, pending adapting layerId to be a list of affected layers
        if (layerId == 'rnet') {
          toggleLayer('rnet-simplified');
        }
      });
    });
  });
}


// Function to initialise datasets (sources and layers)
function initialiseDatasets ()
{
  // console.log ('Initialising sources and layers');
  
  // Replace tileserver URL placeholder in layer definitions
  Object.entries (definitions.layers).forEach (([layerId, layer]) => {
    let tileserverUrl = (settings.tileserverTempLocalOverrides[layerId] ? settings.tileserverTempLocalOverrides[layerId] : settings.tileserverUrl);
    definitions.layers[layerId].source.url = layer.source.url.replace ('%tileserverUrl', tileserverUrl)
  });
  
  // Add layers, and their sources, initially not visible when initialised
  Object.keys (definitions.layers).forEach (layerId => {
    const beforeId = (layerId == 'data_zones' ? 'roads 0 Guided Busway Casing' : 'placeholder_name');   // #!# Needs to be moved to definitions
    definitions.layers[layerId].layout = {visibility: 'none'};
    map.addLayer (definitions.layers[layerId], beforeId);
  });
}


// Function to handle rnet checkbox proxying
function rnetCheckboxProxying ()
{
  // Define a function to calculate the real checkbox values based on the enabled/simplified boxes
  setRnetCheckboxes = function ()
  {
    const layerEnabled = document.getElementById ('rnetcheckboxproxy').checked;
    const simplifiedMode = document.getElementById ('rnet-simplifiedcheckboxproxy').checked;
    document.getElementById ('rnetcheckbox').checked = (layerEnabled && !simplifiedMode);
    document.getElementById ('rnetcheckbox').dispatchEvent (new Event ('change'));
    document.getElementById ('rnet-simplifiedcheckbox').checked = (layerEnabled && simplifiedMode);
    document.getElementById ('rnet-simplifiedcheckbox').dispatchEvent (new Event ('change'));
  }
  
  // Set initial state
  setRnetCheckboxes ();
  
  // Change state
  document.querySelectorAll ('.rnetproxy').forEach ((input) => {
    input.addEventListener('change', function(e) {
      setRnetCheckboxes ();
    });
  });
}



function toggleLayer(layerName)
{
  //console.log ('Toggling layer ' + layerName);
  
  // Check for a dynamic styling function, if any, as layerName + 'Styling', e.g. rnetStyling
  const stylingFunction = layerName.replace ('-', '_') + 'Styling';    // NB hyphens not legal in function names
  if (typeof window[stylingFunction] === 'function') {
    window[stylingFunction] (layerName);
  }
  
  // Set the visibility of the layer, based on the checkbox value
  const isVisible = document.getElementById (layerName + 'checkbox').checked;
  map.setLayoutProperty (layerName, 'visibility', (isVisible ? 'visible' : 'none'));
}


// Rnet styling
function rnetStyling (layerName) {
  handleRnet (layerName);
}


// Rnet simplified styling
function rnet_simplifiedStyling (layerName) {
  handleRnet (layerName);
}


function handleRnet (layerId)
{
  // Update the Legend - Do this even if map layer is off
  var layerColour = document.getElementById ('rnet_colour_input').value;
  createLegend (definitions.routeNetworkLegendColours, layerColour, 'linecolourlegend');
  
  // No special handling needed if not visible
  if (!document.getElementById(layerId + 'checkbox').checked) {return;}
    
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
    'none': definitions.routeNetwork_cols.none,
    'flow': [
      'step', ['get', layerWidthField],
      ...definitions.routeNetwork_cols.flow,
      '#FF00C5'
    ],
    'quietness': [
      'step', ['get', 'Quietness'],
      ...definitions.routeNetwork_cols.quietness,
      '#000000'
    ],
    'gradient': [
      'step', ['get', 'Gradient'],
      ...definitions.routeNetwork_cols.gradient,
      '#000000'
    ]
  };
  
  // Define line width
  // Implements the formula y = (3 / (1 + exp(-3*(x/1000 - 1.6))) + 0.3)
  // This code was hard to work out!
  var line_width = [
    'interpolate',
    ['linear'],
    ['zoom'],
    12, ['*', 2.1,  ['+', 0.3, ['/', 3, ['+', 1, ['^', 2.718, ['-', 2.94, ['*', ['get', layerWidthField], 0.0021]]]]]]],
    14, ['*', 5.25, ['+', 0.3, ['/', 3, ['+', 1, ['^', 2.718, ['-', 2.94, ['*', ['get', layerWidthField], 0.0021]]]]]]],
    15, ['*', 7.5,  ['+', 0.3, ['/', 3, ['+', 1, ['^', 2.718, ['-', 2.94, ['*', ['get', layerWidthField], 0.0021]]]]]]],
    16, ['*', 18,   ['+', 0.3, ['/', 3, ['+', 1, ['^', 2.718, ['-', 2.94, ['*', ['get', layerWidthField], 0.0021]]]]]]],
    18, ['*', 52.5, ['+', 0.3, ['/', 3, ['+', 1, ['^', 2.718, ['-', 2.94, ['*', ['get', layerWidthField], 0.0021]]]]]]],
  ];
  
  // Set the filter
  map.setFilter (layerId, filter);
  
  // Set paint properties
  map.setPaintProperty (layerId, 'line-color', line_colours[layerColour]);
  map.setPaintProperty (layerId, 'line-width', line_width);
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


// Data zones styling (including buildings styling)
function data_zonesStyling (layerName)
{
  // Update the legend (even if map layer is off)
  const fieldId = document.getElementById ('data_zones_selector').value;
  createLegend (definitions.dzLegendColours, fieldId, 'dzlegend');
  
  // Get UI state
  const daysymetricMode = document.getElementById ('data_zones_checkbox_dasymetric').checked;
  
  // Set paint properties
  map.setPaintProperty ('data_zones', 'fill-color', ['step', ['get', fieldId], ...getStyleColumn (fieldId)]);
  map.setPaintProperty ('data_zones', 'fill-opacity', (daysymetricMode ? 0.1 : 0.8));   // Very faded-out in daysymetric mode, as the buildings are coloured
  
  // Set buildings layer colour/visibility
  const buildingColour = getBuildingsColour ();
  map.setPaintProperty ('dasymetric', 'fill-extrusion-color', (buildingColour || '#9c9898'));
  map.setLayoutProperty ('dasymetric', 'visibility', (buildingColour ? 'visible' : 'none'));
}


// Function to determine the buildings colour
function getBuildingsColour ()
{
  // If datazones is off, buildings shown, if vector style, as static colour appropriate to the basemap
  if (!document.getElementById('data_zonescheckbox').checked) {
    const styleName = getBasemapStyle ();
    return settings.basemapStyles[styleName].buildingColour;
  }
  
  // If dasymetric mode, use a colour set based on the layer
  if (document.getElementById('data_zones_checkbox_dasymetric').checked) {
    const layerId = document.getElementById('data_zones_selector').value;
    return ['step',
      ['get', layerId],
      ...getStyleColumn (layerId)
    ];
  }
  
  // Default to gray
  return '#9c9898';
}


// Function to determine the style column
function getStyleColumn (layerId)
{
  const style_col_selected = definitions.dzStyle_cols.hasOwnProperty(layerId) ? layerId : '_';
  return definitions.dzStyle_cols[style_col_selected];
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

