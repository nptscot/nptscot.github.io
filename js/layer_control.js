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
    'Quietness': [
      ['0-25',   '#882255'],
      ['25-50',  '#CC6677'],
      ['50-75',  '#44AA99'],
      ['75-100', '#117733'],
    ],
    'Gradient': [
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
      '#a50026', 1.1,
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
      '#fff7ec', 0.01,
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
  },
  
  placenameLayers: {
    'motorway junction numbers': {
      "id": "motorway junction numbers",
      "type": "symbol",
      "source": "placenames",
      "source-layer": "names",
      "minzoom": 13,
      "filter": ["match", ["get", "type"], ["Motorway Junctions"], true, false],
      "layout": {
        "text-field": ["to-string", ["get", "name"]],
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          13,
          11,
          16,
          16,
          22,
          30
        ],
        "text-font": ["Source Sans Pro Regular"]
      },
      "paint": {
        "text-color": "#000000",
        "text-halo-color": "#ffffff",
        "text-halo-width": 10
      }
    },
    'small settlement names': {
      "id": "small settlement names",
      "type": "symbol",
      "source": "placenames",
      "source-layer": "names",
      "minzoom": 5,
      "filter": ["match", ["get", "type"], ["Small Settlements"], true, false],
      "layout": {
        "text-field": ["to-string", ["get", "name"]],
        "text-size": ["interpolate", ["linear"], ["zoom"], 12, 9, 14, 11],
        "text-font": ["Source Sans Pro Regular"],
        "text-line-height": 1
      },
      "paint": {
        "text-color": "#000000",
        "text-halo-color": "#ffffff",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    'suburban area names': {
      "id": "suburban area names",
      "type": "symbol",
      "source": "placenames",
      "source-layer": "names",
      "minzoom": 10,
      "filter": ["match", ["get", "type"], ["Suburban Area"], true, false],
      "layout": {
        "text-field": ["to-string", ["get", "name"]],
        "text-size": ["interpolate", ["linear"], ["zoom"], 10, 10.5, 14, 14],
        "text-font": ["Source Sans Pro Regular"],
        "text-line-height": 1,
        "text-padding": ["interpolate", ["linear"], ["zoom"], 10, 10, 14, 2]
      },
      "paint": {
        "text-color": "#000000",
        "text-halo-color": "#ffffff",
        "text-halo-width": 2,
        "text-halo-blur": 1,
        "text-opacity": ["interpolate", ["linear"], ["zoom"], 10, 0.8, 14, 1]
      }
    },
    'village and hamlet names': {
      "id": "village and hamlet names",
      "type": "symbol",
      "source": "placenames",
      "source-layer": "names",
      "minzoom": 5,
      "filter": ["match", ["get", "type"], ["Village", "Hamlet"], true, false],
      "layout": {
        "text-field": ["to-string", ["get", "name"]],
        "text-size": ["interpolate", ["linear"], ["zoom"], 9, 9, 14, 15],
        "text-font": ["Source Sans Pro Regular"],
        "text-line-height": 1,
        "text-padding": 2
      },
      "paint": {
        "text-color": "#000000",
        "text-halo-color": "#ffffff",
        "text-halo-width": 2,
        "text-halo-blur": 1,
        "text-opacity": 1
      }
    },
    'town names': {
      "id": "town names",
      "type": "symbol",
      "source": "placenames",
      "source-layer": "names",
      "minzoom": 5,
      "filter": ["match", ["get", "type"], ["Town"], true, false],
      "layout": {
        "text-field": ["to-string", ["get", "name"]],
        "text-size": ["interpolate", ["linear"], ["zoom"], 7, 10, 14, 18],
        "text-font": ["Source Sans Pro Regular"],
        "text-line-height": 1,
        "text-padding": 2
      },
      "paint": {
        "text-color": "#000000",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
        "text-halo-blur": 1,
        "text-opacity": 1
      }
    },
    'city names': {
      "id": "city names",
      "type": "symbol",
      "source": "placenames",
      "source-layer": "names",
      "minzoom": 5,
      "filter": ["match", ["get", "type"], ["City"], true, false],
      "layout": {
        "text-field": ["to-string", ["get", "name"]],
        "text-size": ["interpolate", ["linear"], ["zoom"], 6, 10, 14, 20],
        "text-font": ["Source Sans Pro Regular"],
        "text-line-height": 1,
        "text-padding": 2,
        "text-letter-spacing": 0.05
      },
      "paint": {
        "text-color": "#000000",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
        "text-halo-blur": 1,
        "text-opacity": 1
      }
    },
    'national park names': {
      "id": "national park names",
      "type": "symbol",
      "source": "placenames",
      "source-layer": "names",
      "minzoom": 5,
      "filter": ["match", ["get", "type"], ["National Park"], true, false],
      "layout": {
        "text-field": ["to-string", ["get", "name"]],
        "text-size": ["interpolate", ["linear"], ["zoom"], 6, 8, 14, 15],
        "text-font": ["Source Sans Pro Regular"],
        "text-line-height": 1,
        "text-padding": 2,
        "text-letter-spacing": 0.06
      },
      "paint": {
        "text-color": "rgba(134, 134, 134, 1)",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
        "text-halo-blur": 1,
        "text-opacity": 0.8
      }
    },
    'capital city names': {
      "id": "capital city names",
      "type": "symbol",
      "source": "placenames",
      "source-layer": "names",
      "minzoom": 5,
      "filter": ["match", ["get", "type"], ["Capital"], true, false],
      "layout": {
        "text-field": ["to-string", ["get", "name"]],
        "text-size": ["interpolate", ["linear"], ["zoom"], 5, 10.5, 14, 22],
        "text-font": ["Source Sans Pro Regular"],
        "text-line-height": 1,
        "text-padding": 2,
        "text-letter-spacing": 0.1,
        "text-transform": "uppercase"
      },
      "paint": {
        "text-color": "#000000",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
        "text-halo-blur": 1,
        "text-opacity": 1
      }
    },
    'country names': {
      "id": "country names",
      "type": "symbol",
      "source": "placenames",
      "source-layer": "names",
      "minzoom": 5,
      "maxzoom": 10,
      "filter": ["match", ["get", "type"], ["Country"], true, false],
      "layout": {
        "text-field": ["to-string", ["get", "name"]],
        "text-size": ["interpolate", ["linear"], ["zoom"], 5, 18, 10, 35],
        "text-font": ["Source Sans Pro Regular"],
        "text-line-height": 1,
        "text-padding": 2,
        "text-letter-spacing": 0.3,
        "text-transform": "uppercase"
      },
      "paint": {
        "text-color": "#55595c",
        "text-halo-color": "#f1efec",
        "text-halo-width": 1,
        "text-halo-blur": 1,
        "text-opacity": 0.35
      }
    }
  }
};




function switch_style(){
  var styleName = displayRadioValue(document.getElementById("basemapform"));
  var styleCurrent = map.getStyle().name;
  if(styleCurrent != styleName){
    console.log("Restyling from " + styleCurrent +" to "+ styleName);
    map.setStyle('tiles/style_' + styleName + '.json');
  }
  
  map.once('idle', function() {
    // Add Data Sources
    addDataSources();

    // Reload layers
    toggleLayer('rnet'); // Start with the rnet on
    toggleLayer('data_zones');
    
    toggleLayer('schools');
    toggleLayer('wards');
    toggleLayer('holyrood');
    toggleLayer('scot_regions');
    toggleLayer('la');
    
    // Manage placenames
    placenames();
    
    // Sliders 
    quietnessSlider.noUiSlider.on('update', function(){
      toggleLayer('rnet');
    });
    gradientlider.noUiSlider.on('update', function(){
      toggleLayer('rnet');
    });
    cycleSlider.noUiSlider.on('update', function(){
      toggleLayer('rnet');
    });
    
    // Handle layer checkboxes
    document.querySelectorAll('.updatelayer').forEach((input) => {
      input.addEventListener('change', function(e) {
        layerId = e.target.id.replace (/checkbox$/, '');
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
      url += (attributes.path || sourceId);
    }
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
  
  // Add each layer, respecting the initial checkbox state
  Object.entries(definitions.placenameLayers).forEach(([layerId, layer]) => {
    var checkbox = document.getElementById('placenamescheckbox');
    layer.visibility = (checkbox.checked ? 'visible' : 'none');
    map.addLayer(layer);
  });  
  
  // Listen for checkbox changes
  document.getElementById('placenamescheckbox').addEventListener ('click', (e) => {
    var checkbox = document.getElementById('placenamescheckbox');
    Object.entries(definitions.placenameLayers).forEach(([layerId, layer]) => {
      map.setLayoutProperty(layerId, 'visibility', (checkbox.checked ? 'visible' : 'none'));
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


function switch_rnet() {  

  console.log("Updating rnet")

  // Remove layer if present
  if (map.getLayer('rnet')) {
    map.removeLayer('rnet');
  }
  
  var checkBox = document.getElementById('rnetcheckbox');
  var layerPurpose = document.getElementById("rnet_purpose_input").value;
  var layerScenario = document.getElementById("rnet_scenario_input").value;
  var layerColour = document.getElementById("rnet_colour_input").value;
  var layerType = document.getElementById("rnet_type_input").value;
  var sliderQuietness_min = Number(quietnessSlider.noUiSlider.get()[0]);
  var sliderQuietness_max = Number(quietnessSlider.noUiSlider.get()[1]);
  var sliderGradient_min = Number(gradientlider.noUiSlider.get()[0]);
  var sliderGradient_max = Number(gradientlider.noUiSlider.get()[1]);
  var sliderFlow_min = Number(cycleSlider.noUiSlider.get()[0]);
  var sliderFlow_max = Number(cycleSlider.noUiSlider.get()[1]);
  var simplifiedmode = document.getElementById('rnetsimplifiedcheckbox');
  
  if(sliderGradient_max == 10){
    sliderGradient_max = 35
  }

  // Width
  //var layerWidth = document.getElementById("rnet_width_input").value;
  // TODO: Add line width toggle, and link 
  
  var layerWidth2 = layerPurpose + "_" + layerType + "_" + layerScenario;
  
  // Update the Legend - Do this even if map layer is off
  createLegend (definitions.routeNetworkLegendColours, layerColour, 'linecolourlegend');
  
  // Update the map if enabled
  if (checkBox.checked === true) {
    
    // Make the parts of the style
    var style_head = {
      "id": "rnet",
      "type": "line",
      "source": (simplifiedmode.checked === true ? "rnet-simplified" : "rnet"),
      "source-layer": "rnet"
    };

    // Only filter cyclists if scenario set
      var style_filter = {
        'filter': ["all",
              ['<=', layerPurpose + "_" + layerType + "_" + layerScenario, sliderFlow_max],
              ['>=', layerPurpose + "_" + layerType + "_" + layerScenario, sliderFlow_min],
              ['<=', "Quietness", sliderQuietness_max],
              ['>=', "Quietness", sliderQuietness_min],
              ['<=', "Gradient", sliderGradient_max],
              ['>=', "Gradient", sliderGradient_min]
           ],
      };

    // Define line colour
    switch (layerColour) {
      case 'none':
        var style_line_colour = {
          "line-color": "#304ce7"
        };
        break;
      case 'Quietness':
        var style_line_colour = {
          "line-color": ["step", ["get", "Quietness"],
            "#882255", 25,
            "#CC6677", 50,
            "#44AA99", 75,
            "#117733", 101,
            "#000000"]
          
        };
        break;
      case 'Gradient':
        var style_line_colour = {
          "line-color": ["step", ["get", "Gradient"],
              "#59ee19", 3,
              "#37a009", 5,
              "#FFC300", 7,
              "#C70039", 10,
              "#581845", 100,
              "#000000"]
        };
        break;
      default:
        var style_line_colour = {
          "line-color": ["step", ["get", layerPurpose + "_" + layerType + "_" + layerScenario],
              "rgba(0,0,0,0)", 1,
              "#9C9C9C", 50,
              "#FFFF73", 100,
              "#AFFF00", 250,
              "#00FFFF", 500,
              "#30B0FF", 1000,
              "#2E5FFF", 2000,
              "#0000FF", 3000,
              "#FF00C5"],
        };
    };
    
    // Define Line Width
    // Implments the formula y = (3 / (1 + exp(-3*(x/1000 - 1.6))) + 0.3)
    // For working this out I deserve a ****ing medal
    var style_line_width = {
          "line-width": [
                "interpolate", 
                ["linear"], 
                ["zoom"],
                12, ["*", 2.1, ["+", 0.3, ["/", 3, ["+", 1, ["^", 2.718, ["-", 2.94, ["*", ["get", layerWidth2], 0.0021]]]]]]],
                14, ["*", 5.25,["+", 0.3, ["/", 3, ["+", 1, ["^", 2.718, ["-", 2.94, ["*", ["get", layerWidth2], 0.0021]]]]]]],
                15, ["*", 7.5, ["+", 0.3, ["/", 3, ["+", 1, ["^", 2.718, ["-", 2.94, ["*", ["get", layerWidth2], 0.0021]]]]]]],
                16, ["*", 18,  ["+", 0.3, ["/", 3, ["+", 1, ["^", 2.718, ["-", 2.94, ["*", ["get", layerWidth2], 0.0021]]]]]]],
                18, ["*", 52.5,["+", 0.3, ["/", 3, ["+", 1, ["^", 2.718, ["-", 2.94, ["*", ["get", layerWidth2], 0.0021]]]]]]],
            ],
        };
    
    var style_paint = {"paint" : {...style_line_colour, ...style_line_width}};
    var style_combined = {...style_head, ...style_filter, ...style_paint};
    map.addLayer(style_combined,'placeholder_name');
    
  }
}


function switch_data_zones() {
  
  var style_head_dy = {
      'id': 'dasymetric',
      'type': 'fill-extrusion',
      'source': 'dasymetric',
      'source-layer': 'dasymetric'
  };
  var style_head_dz = {
      'id': 'data_zones',
      'type': 'fill',
      'source': 'data_zones',
      'source-layer': 'data_zones'
  };
  var style_ex_dy = {
      'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              12,
              1,
              15,
              8
            ]
  };
  
  var dataZonesCheckBox = document.getElementById('data_zonescheckbox');
  var layerId = document.getElementById("data_zone_input").value;
  var daysymetricmode = document.getElementById('dasymetriccheckbox');
  
  // Update the Legend - Do this even if map layer is off
  createLegend (definitions.dzLegendColours, layerId, 'dzlegend');
  
  
  
  if (map.getLayer('data_zones')) map.removeLayer('data_zones');
  if (map.getLayer('dasymetric')) map.removeLayer('dasymetric');
  
  if (dataZonesCheckBox.checked === true) {
    
    // Determine the style column
    var style_col_selected = definitions.dzStyle_cols.hasOwnProperty(layerId) ? layerId : '_';
    var style_col = definitions.dzStyle_cols[style_col_selected];
    
    var fillExtrusionColor = (daysymetricmode.checked === true ? ['step', ['get', layerId ], ...style_col] : '#9c9898');
    var style_paint_dy = {'paint' : { 'fill-extrusion-color': fillExtrusionColor, ...style_ex_dy}};
    var style_combined_dy = {...style_head_dy, ...style_paint_dy};
    map.addLayer(style_combined_dy, 'roads 0 Guided Busway Casing');
    
    var fillopacity = (daysymetricmode.checked === true ? 0.1 : 0.8);
    var style_paint_dz = {'paint' : { 'fill-color': ['step', ['get', layerId ], ...style_col], 'fill-opacity': fillopacity,'fill-outline-color': '#000000'}};
    var style_combined_dz = {...style_head_dz, ...style_paint_dz};
    map.addLayer(style_combined_dz, 'roads 0 Guided Busway Casing');
  
  } else {  // dataZonesCheckBox not checked
    console.log("Data zones layer off");
    
    // put buildings on when layer is off
    
    const styleExtrusionColours = {
      'greyscale_nobuild': '#d1cfcf',
      'google_nobuild': '#f0eded',
      'dark_nobuild': '#000000',
      // No buildings on raster
    };
    var styleName = displayRadioValue(document.getElementById("basemapform"));
    if (styleExtrusionColours.hasOwnProperty (styleName)) {
      var fillExtrusionColor = styleExtrusionColours[styleName];
      var style_paint_dy = {'paint' : { 'fill-extrusion-color': fillExtrusionColor, ...style_ex_dy}};
      var style_combined_dy = {...style_head_dy, ...style_paint_dy};
      map.addLayer(style_combined_dy, 'roads 0 Guided Busway Casing');
    }
    
  }
}

// First load setup
map.on('load', function() {
  switch_style();
});
