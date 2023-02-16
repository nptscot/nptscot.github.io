function toggleLayer(layerName) {
  var checkBox = document.getElementById(layerName.concat('checkbox'));
  // If the checkbox is checked add the layer to the map
  if (checkBox.checked === true) {
    switch (layerName) {
      case 'rnet':
        switch_rnet();
        break;
      case 'routes':
        switch_routes();
        break;
      case 'zones':
        switch_zones();
        break;
      case 'data_zones':
        switch_data_zones();
        break;
      default:
        console.log('unknown layer selected');
    }
  } else {
    if (map.getLayer(layerName)) map.removeLayer(layerName);
  }
}

function toggleraster(layerName) {
  var checkBox = document.getElementById(layerName.concat('checkbox'));
  // If the checkbox is checked add the layer to the map
  if (checkBox.checked === true) {
    switch (layerName) {
      case 'satellite':
        if (map.getLayer('satellite')) map.removeLayer('satellite');
        map.addLayer({
          'id': 'satellite',
          'type': 'raster',
          'source': 'satellite',
        }, 'roads 0 Local Road'
        );
        
        break;
      default:
        console.log('unknown layer selected');
    }
  } else {
    if (map.getLayer(layerName)) map.removeLayer(layerName);
  }
}



function switch_rnet() {
  var checkBox = document.getElementById('rnetcheckbox');
  var layerId = document.getElementById("rnet_scenario_input").value;
  var layerType = document.getElementById("rnet_type_input").value;
  var sliderFlow = Number(document.getElementById("slide_flow").value);
  var sliderQuietness = Number(document.getElementById("slide_quietness").value);
  var sliderGradient = Number(document.getElementById("slide_gradient").value);
  
  // Width
  var layerWidth = document.getElementById("rnet_width_input").value;
  var a = 1;
  var b = 1;
  switch(layerWidth){
    case 'Quietness':
      a = 0.01;
      break;
    case 'Gradient':
      a = 0.2;
      break;
    case 'none':
      break;
    default:
     a = 0.05;
     b = 0.5;
     layerWidth = layerType + "_" + layerWidth;
  }
  console.log(a);
  console.log(layerWidth);
  
  if (checkBox.checked === true) {
    if (map.getLayer('rnet')) map.removeLayer('rnet');
    switch (layerId) {
      case 'none':
        
        if(layerWidth == 'none'){
          map.addLayer({
          'id': 'rnet',
          'type': 'line',
          'source': 'rnet',
          'source-layer': 'rnet',
          'filter': ["all",
              ['<=', "Quietness", sliderQuietness],
              ['<=', "Gradient", sliderGradient]
           ],
          'paint': {
            'line-color': "#304ce7",
            "line-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              12, 2.1,
              14, 5.25,
              15, 7.5,
              16, 18,
              18, 52.5,
              22, 150
            ],
          }
        });
        } else {
          
          map.addLayer({
          'id': 'rnet',
          'type': 'line',
          'source': 'rnet',
          'source-layer': 'rnet',
          'filter': ["all",
              ['<=', "Quietness", sliderQuietness],
              ['<=', "Gradient", sliderGradient]
           ],
          'paint': {
            'line-color': "#304ce7",
            'line-width': [
                'interpolate', 
                ['linear'], 
                ['zoom'],
                12, ["*", 2.1 , a, ["^", ["+", 1, ["get", layerWidth]], b]],
                14, ["*", 5.25, a, ["^", ["+", 1, ["get", layerWidth]], b]],
                15, ["*", 7.5 , a, ["^", ["+", 1, ["get", layerWidth]], b]],
                16, ["*", 18  , a, ["^", ["+", 1, ["get", layerWidth]], b]],
                18, ["*", 52.5, a, ["^", ["+", 1, ["get", layerWidth]], b]], 
                22, ["*", 150 , a, ["^", ["+", 1, ["get", layerWidth]], b]]
            ],
          }
        });
        
          
        }
        
        
        document.getElementById("rnetlegend").innerHTML = `<button onclick="show_rnet_legend(false)" style="float:right" aria-label="Hide legend"><i class="fas fa-times"></i></button>`;
    	  
        break;
      case 'Quietness':
        
        if(layerWidth == 'none'){
          map.addLayer({
          'id': 'rnet',
          'type': 'line',
          'source': 'rnet',
          'source-layer': 'rnet',
          'filter': ["all",
              ['<=', "Quietness", sliderQuietness],
              ['<=', "Gradient", sliderGradient]
           ],
          'paint': {
            'line-color': ["step", ["get", layerId],
              "#882255", 25,
              "#CC6677", 50,
              "#44AA99", 75,
              "#117733", 101,
              "#000000"],
            "line-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              12, 2.1,
              14, 5.25,
              15, 7.5,
              16, 18,
              18, 52.5,
              22, 150
            ],
          }
        });
        } else {
          
          map.addLayer({
          'id': 'rnet',
          'type': 'line',
          'source': 'rnet',
          'source-layer': 'rnet',
          'filter': ["all",
              ['<=', "Quietness", sliderQuietness],
              ['<=', "Gradient", sliderGradient]
           ],
          'paint': {
            'line-color': ["step", ["get", layerId],
              "#882255", 25,
              "#CC6677", 50,
              "#44AA99", 75,
              "#117733", 101,
              "#000000"],
            'line-width': [
                'interpolate', 
                ['linear'], 
                ['zoom'],
                12, ["*", 2.1 , a, ["^", ["+", 1, ["get", layerWidth]], b]],
                14, ["*", 5.25, a, ["^", ["+", 1, ["get", layerWidth]], b]],
                15, ["*", 7.5 , a, ["^", ["+", 1, ["get", layerWidth]], b]],
                16, ["*", 18  , a, ["^", ["+", 1, ["get", layerWidth]], b]],
                18, ["*", 52.5, a, ["^", ["+", 1, ["get", layerWidth]], b]], 
                22, ["*", 150 , a, ["^", ["+", 1, ["get", layerWidth]], b]]
            ],
          }
        });
        
          
        }
        
        
        document.getElementById("rnetlegend").innerHTML = `<button onclick="show_rnet_legend(false)" style="float:right" aria-label="Hide legend"><i class="fas fa-times"></i></button>
        <h4>Quietness</h4>
        <div><span style="background-color: #882255;" class="legenddot"></span>0-25</div>
    	  <div><span style="background-color: #CC6677;" class="legenddot"></span>25-50</div>
    	  <div><span style="background-color: #44AA99;" class="legenddot"></span>50-75</div>
    	  <div><span style="background-color: #117733;" class="legenddot"></span>75-100</div>`;
    	  
        break;
      case 'Gradient':
        
        
        if(layerWidth == 'none'){
          
          map.addLayer({
          'id': 'rnet',
          'type': 'line',
          'source': 'rnet',
          'source-layer': 'rnet',
                    'filter': ["all",
                        ['<=', "Quietness", sliderQuietness],
                        ['<=', "Gradient", sliderGradient]
                     ],
          'paint': {
            'line-color': ["step", ["get", layerId],
              "#59ee19", 3,
              "#37a009", 5,
              "#FFC300", 7,
              "#C70039", 10,
              "#581845", 100,
              "#000000"],
            "line-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              12, 2.1,
              14, 5.25,
              15, 7.5,
              16, 18,
              18, 52.5,
              22, 150
            ],
          }
        });
        
        } else {
          
          map.addLayer({
          'id': 'rnet',
          'type': 'line',
          'source': 'rnet',
          'source-layer': 'rnet',
                    'filter': ["all",
                        ['<=', "Quietness", sliderQuietness],
                        ['<=', "Gradient", sliderGradient]
                     ],
          'paint': {
            'line-color': ["step", ["get", layerId],
              "#59ee19", 3,
              "#37a009", 5,
              "#FFC300", 7,
              "#C70039", 10,
              "#581845", 100,
              "#000000"],
            'line-width': [
                'interpolate', 
                ['linear'], 
                ['zoom'],
                12, ["*", 2.1 , a, ["^", ["+", 1, ["get", layerWidth]], b]],
                14, ["*", 5.25, a, ["^", ["+", 1, ["get", layerWidth]], b]],
                15, ["*", 7.5 , a, ["^", ["+", 1, ["get", layerWidth]], b]],
                16, ["*", 18  , a, ["^", ["+", 1, ["get", layerWidth]], b]],
                18, ["*", 52.5, a, ["^", ["+", 1, ["get", layerWidth]], b]], 
                22, ["*", 150 , a, ["^", ["+", 1, ["get", layerWidth]], b]]
            ],
          }
        });
          
        }
        
        document.getElementById("rnetlegend").innerHTML = `<button onclick="show_rnet_legend(false)" style="float:right" aria-label="Hide legend"><i class="fas fa-times"></i></button>
        <h4>Gradient</h4>
        <div><span style="background-color: #59ee19;" class="legenddot"></span>0-3</div>
    	  <div><span style="background-color: #37a009;" class="legenddot"></span>3-5</div>
    	  <div><span style="background-color: #FFC300;" class="legenddot"></span>5-7</div>
    	  <div><span style="background-color: #C70039;" class="legenddot"></span>7-10</div>
    	  <div><span style="background-color: #581845;" class="legenddot"></span>10+</div>`;
        
        break;
      default:
      
        if(layerWidth == 'none'){
          map.addLayer({
          'id': 'rnet',
          'type': 'line',
          'source': 'rnet',
          'source-layer': 'rnet',
          'filter': ["all",
                        ['>=', layerType + "_" + layerId, sliderFlow],
                        ['<=', "Quietness", sliderQuietness],
                        ['<=', "Gradient", sliderGradient]
                     ],
          'paint': {
            'line-color': ["step", ["get", layerType + "_" + layerId],
              "rgba(0,0,0,0)", 1,
              "#9C9C9C", 10,
              "#FFFF73", 50,
              "#AFFF00", 100,
              "#00FFFF", 250,
              "#30B0FF", 500,
              "#2E5FFF", 1000,
              "#0000FF", 2000,
              "#FF00C5"],
            "line-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              12, 2.1,
              14, 5.25,
              15, 7.5,
              16, 18,
              18, 52.5,
              22, 150
            ],
          }
        });
        } else {
          map.addLayer({
          'id': 'rnet',
          'type': 'line',
          'source': 'rnet',
          'source-layer': 'rnet',
          'filter': ["all",
                        ['>=', layerType + "_" + layerId, sliderFlow],
                        ['<=', "Quietness", sliderQuietness],
                        ['<=', "Gradient", sliderGradient]
                     ],
          'paint': {
            'line-color': ["step", ["get", layerType + "_" + layerId],
              "rgba(0,0,0,0)", 1,
              "#9C9C9C", 10,
              "#FFFF73", 50,
              "#AFFF00", 100,
              "#00FFFF", 250,
              "#30B0FF", 500,
              "#2E5FFF", 1000,
              "#0000FF", 2000,
              "#FF00C5"],
            'line-width': [
                'interpolate', 
                ['linear'], 
                ['zoom'],
                12, ["*", 2.1 , a, ["^", ["+", 1, ["get", layerWidth]], b]],
                14, ["*", 5.25, a, ["^", ["+", 1, ["get", layerWidth]], b]],
                15, ["*", 7.5 , a, ["^", ["+", 1, ["get", layerWidth]], b]],
                16, ["*", 18  , a, ["^", ["+", 1, ["get", layerWidth]], b]],
                18, ["*", 52.5, a, ["^", ["+", 1, ["get", layerWidth]], b]], 
                22, ["*", 150 , a, ["^", ["+", 1, ["get", layerWidth]], b]]
            ],
          }
        });
        }
      
        document.getElementById("rnetlegend").innerHTML = `<button onclick="show_rnet_legend(false)" style="float:right" aria-label="Hide legend"><i class="fas fa-times"></i></button>
        <h4>Number of Cyclists</h4>
        <div><span style="background-color: #9C9C9C;" class="legenddot"></span>1-9</div>
    	  <div><span style="background-color: #FFFF73;" class="legenddot"></span>10-49</div>
    	  <div><span style="background-color: #AFFF00;" class="legenddot"></span>50-99</div>
    	  <div><span style="background-color: #00FFFF;" class="legenddot"></span>100-249</div>
    	  <div><span style="background-color: #30B0FF;" class="legenddot"></span>250-499</div>
    	  <div><span style="background-color: #2E5FFF;" class="legenddot"></span>500-999</div>
    	  <div><span style="background-color: #0000FF;" class="legenddot"></span>1000-1999</div>
    	  <div><span style="background-color: #FF00C5;" class="legenddot"></span>2000+</div>`;
    
    }

    
  } else {
    document.getElementById("rnetlegend").innerHTML = ``;
    if (map.getLayer("rnet")) map.removeLayer("rnet");
  }
}

/*
function switch_routes() {
  var checkBox = document.getElementById('routescheckbox');
  var layerId = document.getElementById("routes_input").value;
  if (checkBox.checked === true) {
    if (map.getLayer('routes')) map.removeLayer('routes');
    map.addLayer({
      'id': 'routes',
      'type': 'line',
      'source': 'routes',
      'source-layer': 'routes',
      'paint': {
        'line-color': ["step", ["get", layerId],
          "rgba(0,0,0,0)", 1,
          "rgba(156,156,156,0.8)", 10,
          "rgba(255,255,115,0.8)", 50,
          "rgba(175,255,0,0.8)", 100,
          "rgba(0,255,255,0.8)", 250,
          "rgba(48,176,255,0.8)", 500,
          "rgba(46,95,255,0.8)", 1000,
          "rgba(0,0,255,0.8)", 2000,
          "rgba(255,0,197,0.8)"],
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          12, 2.1,
          14, 5.25,
          15, 7.5,
          16, 18,
          18, 52.5,
          22, 150
        ],
      }
    });

  } else {
    if (map.getLayer("routes")) map.removeLayer("routes");
  }
}
*/

function switch_zones() {
  var checkBox = document.getElementById('zonescheckbox');
  var zend = document.getElementById("zones_end_input").value;
  var zpurpose = document.getElementById("zones_purpose_input").value;
  var ztype = document.getElementById("zones_type_input").value;
  var zscenario = document.getElementById("zones_scenario_input").value;
  var layerId = zend + "_" + zscenario + "_" + ztype + "_" + zpurpose
  
  if (checkBox.checked === true) {
    if (map.getLayer('zones')) map.removeLayer('zones');
    switch (zscenario) {
      case 'quietness_mean':
        map.addLayer({
          'id': 'zones',
          'type': 'fill',
          'source': 'zones',
          'source-layer': 'zones',
          'paint': {
            'fill-color': ["step", ["get", layerId ],
              "#882255", 25,
              "#CC6677", 50,
              "#44AA99", 75,
              "#117733", 101,
              "#000000"],
            'fill-opacity': 0.7,
            'fill-outline-color': 'rgba(0, 0, 0, 0.2)'
          }
        }, 'roads 0 Guided Busway Casing'
        );
        
    	  
        break;
      case 'hilliness_mean':
        map.addLayer({
          'id': 'zones',
          'type': 'fill',
          'source': 'zones',
          'source-layer': 'zones',
          'paint': {
            'fill-color': ["step", ["get", layerId ],
             "#feebe2", 0,
              "#fcc5c0", 2,
              "#fa9fb5", 4,
              "#f768a1", 6,
              "#dd3497", 8,
              "#ae017e", 10,
              "#7a0177", 100,
              "#000000"],
            'fill-opacity': 0.7,
            'fill-outline-color': 'rgba(0, 0, 0, 0.2)'
          }
        }, 'roads 0 Guided Busway Casing'
        );
        
        break;
      default:
      
        map.addLayer({
          'id': 'zones',
          'type': 'fill',
          'source': 'zones',
          'source-layer': 'zones',
          'paint': {
            'fill-color': ["step", ["get", layerId ],
             "#A50026", 0,
              "#D73027", 2,
              "#F46D43", 4,
              "#FDAE61", 7,
              "#FEE090", 10,
              "#ffffbf", 15,
              "#C6DBEF", 20,
              "#ABD9E9", 25,
              "#74ADD1", 30,
              "#4575B4", 40,
              "#000000"],
            'fill-opacity': 0.7,
            'fill-outline-color': 'rgba(0, 0, 0, 0.2)'
          }
        }, 'roads 0 Guided Busway Casing'
        );
      }
    } else {
    if (map.getLayer("zones")) map.removeLayer("zones");
  }
}


function switch_data_zones() {
  var checkBox = document.getElementById('data_zonescheckbox');
  var layerId = document.getElementById("data_zone_input").value;
  
  if (checkBox.checked === true) {
    if (map.getLayer('data_zones')) map.removeLayer('data_zones');
    switch (layerId) {
      case 'SIMD2020v2_Decile':
        map.addLayer({
          'id': 'data_zones',
          'type': 'fill',
          'source': 'data_zones',
          'source-layer': 'data_zones',
          'paint': {
            'fill-color': ["step", ["get", layerId ],
              "#a50026", 1.1,
              "#d73027", 2.1,
              "#f46d43", 3.1,
              "#fdae61", 4.1,
              "#fee090", 5.1,
              "#e0f3f8", 6.1,
              "#abd9e9", 7.1,
              "#74add1", 8.1,
              "#4575b4", 9.1,
              "#313695", 10.1,
              "#000000"],
            'fill-opacity': 0.7,
            'fill-outline-color': 'rgba(0, 0, 0, 0.2)'
          }
        }, 'roads 0 Guided Busway Casing'
        );
        
    	  
        break;
      case 'Total_population':
        map.addLayer({
          'id': 'data_zones',
          'type': 'fill',
          'source': 'data_zones',
          'source-layer': 'data_zones',
          'paint': {
            'fill-color': ["step", ["get", layerId ],
             "#edf8fb", 500,
              "#bfd3e6", 600,
              "#9ebcda", 700,
              "#8c96c6", 800,
              "#8856a7", 900,
              "#810f7c", 4000,
              "#000000"],
            'fill-opacity': 0.7,
            'fill-outline-color': 'rgba(0, 0, 0, 0.2)'
          }
        }, 'roads 0 Guided Busway Casing'
        );
        
        break;
      case 'broadband':
        map.addLayer({
          'id': 'data_zones',
          'type': 'fill',
          'source': 'data_zones',
          'source-layer': 'data_zones',
          'paint': {
            'fill-color': ["step", ["get", layerId ],
             "#fff7ec", 0,
              "#fee8c8", 2,
              "#fdd49e", 5,
              "#fdbb84", 10,
              "#d7301f", 50,
              "#7f0000", 100,
              "#000000"],
            'fill-opacity': 0.7,
            'fill-outline-color': 'rgba(0, 0, 0, 0.2)'
          }
        }, 'roads 0 Guided Busway Casing'
        );
        
        break;
      default:
        map.addLayer({
          'id': 'data_zones',
          'type': 'fill',
          'source': 'data_zones',
          'source-layer': 'data_zones',
          'paint': {
            'fill-color': ["step", ["get", layerId ],
             "#053061", 3,
              "#2166ac", 5,
              "#4393c3", 7,
              "#92c5de", 10,
              "#f7f7f7", 15,
              "#f4a582", 30,
              "#b2182b", 60,
              "#67001f", 200,
              "#000000"],
            'fill-opacity': 0.7,
            'fill-outline-color': 'rgba(0, 0, 0, 0.2)'
          }
        }, 'roads 0 Guided Busway Casing'
        );
      }
    } else {
    if (map.getLayer("data_zones")) map.removeLayer("data_zones");
  }
}