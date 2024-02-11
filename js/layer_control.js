// Dependency: map.js must be loaded first - for basemaps[styleName].buildingColour


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
    Object.keys (datasets.layers).forEach (layerId => {
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
  Object.entries (datasets.layers).forEach (([layerId, layer]) => {
    let tileserverUrl = (settings.tileserverTempLocalOverrides[layerId] ? settings.tileserverTempLocalOverrides[layerId] : settings.tileserverUrl);
    datasets.layers[layerId].source.url = layer.source.url.replace ('%tileserverUrl', tileserverUrl)
  });
  
  // Add layers, and their sources, initially not visible when initialised
  Object.keys (datasets.layers).forEach (layerId => {
    const beforeId = (layerId == 'data_zones' ? 'roads 0 Guided Busway Casing' : 'placeholder_name');   // #!# Needs to be moved to definitions
    datasets.layers[layerId].layout = {visibility: 'none'};
    map.addLayer (datasets.layers[layerId], beforeId);
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
  createLegend (datasets.legends.rnet, layerColour, 'linecolourlegend');
  
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
    'none': datasets.lineColours.rnet.none,
    'flow': [
      'step', ['get', layerWidthField],
      ...datasets.lineColours.rnet.flow,
      '#FF00C5'
    ],
    'quietness': [
      'step', ['get', 'Quietness'],
      ...datasets.lineColours.rnet.quietness,
      '#000000'
    ],
    'gradient': [
      'step', ['get', 'Gradient'],
      ...datasets.lineColours.rnet.gradient,
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
  createLegend (datasets.legends.data_zones, fieldId, 'dzlegend');
  
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
  const style_col_selected = datasets.lineColours.data_zones.hasOwnProperty(layerId) ? layerId : '_';
  return datasets.lineColours.data_zones[style_col_selected];
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

