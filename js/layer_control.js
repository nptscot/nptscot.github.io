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
      case 'la':
        map.addLayer({
            'id': 'la',
            'type': 'line',
            'source': 'la',
            'source-layer': 'la',
            'paint': {
              'line-color': 'rgba(107, 7, 7, 1)',
              'line-width': 2
            }
        });
        break;
      case 'wards':
        map.addLayer({
            'id': 'wards',
            'type': 'line',
            'source': 'wards',
            'source-layer': 'wards',
            'paint': {
              'line-color': 'rgba(32, 107, 7, 1)',
              'line-width': 2
            }
        });
        break;
      case 'westminster':
        map.addLayer({
            'id': 'westminster',
            'type': 'line',
            'source': 'westminster',
            'source-layer': 'westminster',
            'paint': {
              'line-color': 'rgba(7, 54, 107, 1)',
              'line-width': 2
            }
        });
        break;
      case 'holyrood':
        map.addLayer({
            'id': 'holyrood',
            'type': 'line',
            'source': 'holyrood',
            'source-layer': 'holyrood',
            'paint': {
              'line-color': 'rgba(83, 123, 252, 1)',
              'line-width': 2
            }
        });
        break;
      default:
        console.log('unknown layer selected');
    }
  } else {
    if (map.getLayer(layerName)) map.removeLayer(layerName);
    if (layerName === 'data_zones'){
      if (map.getLayer('dasymetric')) map.removeLayer('dasymetric');
    }
  }
}

function displayRadioValue(ele) {
  for(i = 0; i < ele.length; i++) {
      if(ele[i].checked){
        return ele[i].value;
      }
  }
}


function toggleraster() {
  var layerid = displayRadioValue(document.getElementById("basemapform"));

  if (map.getLayer("satellite")) map.removeLayer("satellite");
  if (map.getLayer("opencyclemap")) map.removeLayer("opencyclemap");
  //console.log(layerid)
  // Switch basemap
  switch (layerid) {
    case 'satellite':
      map.addLayer({
        'id': 'satellite',
        'type': 'raster',
        'source': 'satellite',
      }, 'roads 0 Local Road'
      );
      
      break;
    case 'opencyclemap':
      map.addLayer({
        'id': 'opencyclemap',
        'type': 'raster',
        'source': 'opencyclemap',
      }, 'roads 0 Local Road'
      );
      
      break;
    default:
      // Do noting
  }
}



function switch_rnet() {
  var checkBox = document.getElementById('rnetcheckbox');
  var layerId = document.getElementById("rnet_scenario_input").value;
  var layerType = document.getElementById("rnet_type_input").value;
  //var sliderFlow = Number(document.getElementById("slide_flow").value);
  //var sliderQuietness = Number(document.getElementById("slide_quietness").value);
  //var sliderGradient = Number(document.getElementById("slide_gradient").value);
  var sliderQuietness_min = Number(quietnessSlider.noUiSlider.get()[0]);
  var sliderQuietness_max = Number(quietnessSlider.noUiSlider.get()[1]);
  var sliderGradient_min = Number(gradientlider.noUiSlider.get()[0]);
  var sliderGradient_max = Number(gradientlider.noUiSlider.get()[1]);
  var sliderFlow_min = Number(cycleSlider.noUiSlider.get()[0]);
  var sliderFlow_max = Number(cycleSlider.noUiSlider.get()[1]);

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
  
  // Update the Legend - Do this even if map layer is off
  switch(layerId) {
    case 'none':
      cycleSlider.noUiSlider.disable();
      document.getElementById("linecolourlegend").innerHTML = `<div class="l_r">
        <div class="lb"><span style="background-color: #304ce7"></span>&nbsp</div>
      	</div>`;
      break;
    case 'Quietness':
      cycleSlider.noUiSlider.disable();
      document.getElementById("linecolourlegend").innerHTML = `<div class="l_r">
        <div class="lb"><span style="background-color: #882255"></span>0-25</div>
        <div class="lb"><span style="background-color: #CC6677"></span>25-50</div>
        <div class="lb"><span style="background-color: #44AA99"></span>50-75</div>
        <div class="lb"><span style="background-color: #117733"></span>75-100</div>
      	</div>`;
      break;
    case 'Gradient':
        cycleSlider.noUiSlider.disable();
        document.getElementById("linecolourlegend").innerHTML = `<div class="l_r">
        <div class="lb"><span style="background-color: #59ee19"></span>0-3</div>
        <div class="lb"><span style="background-color: #37a009"></span>3-5</div>
        <div class="lb"><span style="background-color: #FFC300"></span>5-7</div>
        <div class="lb"><span style="background-color: #C70039"></span>7-10</div>
        <div class="lb"><span style="background-color: #581845"></span>10+</div>
      	</div>`;
      break;
    default:
      cycleSlider.noUiSlider.enable();
      document.getElementById("linecolourlegend").innerHTML = `<div class="l_r">
        <div class="lb"><span style="background-color: #9C9C9C"></span>1</div>
        <div class="lb"><span style="background-color: #FFFF73"></span>10</div>
        <div class="lb"><span style="background-color: #AFFF00"></span>50</div>
        <div class="lb"><span style="background-color: #00FFFF"></span>100</div>
        <div class="lb"><span style="background-color: #30B0FF"></span>250</div>
        <div class="lb"><span style="background-color: #2E5FFF"></span>500</div>
        <div class="lb"><span style="background-color: #0000FF"></span>1000</div>
        <div class="lb"><span style="background-color: #FF00C5"></span>2000+</div>
      	</div>`;
  }
  
  // Update the map if enabled
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
              ['<=', "Quietness", sliderQuietness_max],
              ['>=', "Quietness", sliderQuietness_min],
              ['<=', "Gradient", sliderGradient_max],
              ['>=', "Gradient", sliderGradient_min]
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
              ['<=', "Quietness", sliderQuietness_max],
              ['>=', "Quietness", sliderQuietness_min],
              ['<=', "Gradient", sliderGradient_max],
              ['>=', "Gradient", sliderGradient_min]
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
        
       
        break;
      case 'Quietness':
        if(layerWidth == 'none'){
          map.addLayer({
          'id': 'rnet',
          'type': 'line',
          'source': 'rnet',
          'source-layer': 'rnet',
          'filter': ["all",
              ['<=', "Quietness", sliderQuietness_max],
              ['>=', "Quietness", sliderQuietness_min],
              ['<=', "Gradient", sliderGradient_max],
              ['>=', "Gradient", sliderGradient_min]
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
              ['<=', "Quietness", sliderQuietness_max],
              ['>=', "Quietness", sliderQuietness_min],
              ['<=', "Gradient", sliderGradient_max],
              ['>=', "Gradient", sliderGradient_min]
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
        
        break;
      case 'Gradient':
        
        if(layerWidth == 'none'){
          
          map.addLayer({
          'id': 'rnet',
          'type': 'line',
          'source': 'rnet',
          'source-layer': 'rnet',
          'filter': ["all",
              ['<=', "Quietness", sliderQuietness_max],
              ['>=', "Quietness", sliderQuietness_min],
              ['<=', "Gradient", sliderGradient_max],
              ['>=', "Gradient", sliderGradient_min]
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
              ['<=', "Quietness", sliderQuietness_max],
              ['>=', "Quietness", sliderQuietness_min],
              ['<=', "Gradient", sliderGradient_max],
              ['>=', "Gradient", sliderGradient_min]
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

        break;
      default:
        if(layerWidth == 'none'){
          map.addLayer({
          'id': 'rnet',
          'type': 'line',
          'source': 'rnet',
          'source-layer': 'rnet',
          'filter': ["all",
              ['<=', layerType + "_" + layerId, sliderFlow_max],
              ['>=', layerType + "_" + layerId, sliderFlow_min],
              ['<=', "Quietness", sliderQuietness_max],
              ['>=', "Quietness", sliderQuietness_min],
              ['<=', "Gradient", sliderGradient_max],
              ['>=', "Gradient", sliderGradient_min]
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
              ['<=', layerType + "_" + layerId, sliderFlow_max],
              ['>=', layerType + "_" + layerId, sliderFlow_min],
              ['<=', "Quietness", sliderQuietness_max],
              ['>=', "Quietness", sliderQuietness_min],
              ['<=', "Gradient", sliderGradient_max],
              ['>=', "Gradient", sliderGradient_min]
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
      
    }

    
  } else {
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
  
  console.log("func");
  // Update the Legend - Do this even if map layer is off
  switch(layerId) {
    case 'SIMD2020v2_Decile':
      cycleSlider.noUiSlider.disable();
      document.getElementById("dzlegend").innerHTML = `<div class="l_r">
        <div class="lb"><span style="background-color: #a50026"></span>1st</div>
        <div class="lb"><span style="background-color: #d73027"></span>2nd</div>
        <div class="lb"><span style="background-color: #f46d43"></span>3rd</div>
        <div class="lb"><span style="background-color: #fdae61"></span>4th</div>
        <div class="lb"><span style="background-color: #fee090"></span>5th</div>
        <div class="lb"><span style="background-color: #e0f3f8"></span>6th</div>
        <div class="lb"><span style="background-color: #abd9e9"></span>7th</div>
        <div class="lb"><span style="background-color: #74add1"></span>8th</div>
        <div class="lb"><span style="background-color: #4575b4"></span>9th</div>
        <div class="lb"><span style="background-color: #313695"></span>10th</div>
      	</div>`;
      break;
    case 'Total_population':
      cycleSlider.noUiSlider.disable();
      document.getElementById("dzlegend").innerHTML = `<div class="l_r">
        <div class="lb"><span style="background-color: #edf8fb"></span>500</div>
        <div class="lb"><span style="background-color: #bfd3e6"></span>600</div>
        <div class="lb"><span style="background-color: #9ebcda"></span>700</div>
        <div class="lb"><span style="background-color: #8c96c6"></span>800</div>
        <div class="lb"><span style="background-color: #8856a7"></span>900</div>
        <div class="lb"><span style="background-color: #810f7c"></span>4000</div>
      	</div>`;
      break;
    case 'broadband':
        cycleSlider.noUiSlider.disable();
        document.getElementById("dzlegend").innerHTML = `<div class="l_r">
        <div class="lb"><span style="background-color: #fff7ec"></span>0%</div>
        <div class="lb"><span style="background-color: #fee8c8"></span>2%</div>
        <div class="lb"><span style="background-color: #fdd49e"></span>5%</div>
        <div class="lb"><span style="background-color: #fdbb84"></span>10%</div>
        <div class="lb"><span style="background-color: #d7301f"></span>50%</div>
        <div class="lb"><span style="background-color: #7f0000"></span>100%</div>
      	</div>`;
      break;
    default:
      cycleSlider.noUiSlider.enable();
      document.getElementById("dzlegend").innerHTML = `<div class="l_r">
        <div class="lb"><span style="background-color: #053061"></span>3</div>
        <div class="lb"><span style="background-color: #2166ac"></span>5</div>
        <div class="lb"><span style="background-color: #4393c3"></span>7</div>
        <div class="lb"><span style="background-color: #92c5de"></span>10</div>
        <div class="lb"><span style="background-color: #f7f7f7"></span>15</div>
        <div class="lb"><span style="background-color: #f4a582"></span>30</div>
        <div class="lb"><span style="background-color: #b2182b"></span>60</div>
        <div class="lb"><span style="background-color: #67001f"></span>200</div>
      	</div>`;

  }
  
  if (checkBox.checked === true) {
    if (map.getLayer('data_zones')) map.removeLayer('data_zones');
    if (map.getLayer('dasymetric')) map.removeLayer('dasymetric');
    
    switch (layerId) {
      case 'SIMD2020v2_Decile':
        map.addLayer({
          'id': 'dasymetric',
          'type': 'fill-extrusion',
          'source': 'dasymetric',
          'source-layer': 'dasymetric',
          'paint': {
            'fill-extrusion-color': ['step', ['get', layerId ],
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
              '#000000'],
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              12,
              1,
              15,
              8
            ]
          }
        }, 'roads 0 Guided Busway Casing'
        );
        
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
            'fill-opacity': 0.1,
            'fill-outline-color': '#000000'
          }
        }, 'roads 0 Guided Busway Casing'
        );
        
    	  
        break;
      case 'Total_population':
        
        map.addLayer({
          'id': 'dasymetric',
          'type': 'fill-extrusion',
          'source': 'dasymetric',
          'source-layer': 'dasymetric',
          'paint': {
            'fill-extrusion-color': ['step', ['get', layerId ],
              "#edf8fb", 500,
              "#bfd3e6", 600,
              "#9ebcda", 700,
              "#8c96c6", 800,
              "#8856a7", 900,
              "#810f7c", 4000,
              '#000000'],
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              12,
              1,
              15,
              8
            ]
          }
        }, 'roads 0 Guided Busway Casing'
        );
        
        
        
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
            'fill-opacity': 0.1,
            'fill-outline-color': 'rgba(0, 0, 0, 0.9)'
          }
        }, 'roads 0 Guided Busway Casing'
        );
        
        break;
      case 'broadband':
        
        map.addLayer({
          'id': 'dasymetric',
          'type': 'fill-extrusion',
          'source': 'dasymetric',
          'source-layer': 'dasymetric',
          'paint': {
            'fill-extrusion-color': ['step', ['get', layerId ],
              "#fff7ec", 0.01,
              "#fee8c8", 2,
              "#fdd49e", 5,
              "#fdbb84", 10,
              "#d7301f", 50,
              "#7f0000", 100,
              '#000000'],
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              12,
              1,
              15,
              8
            ]
          }
        }, 'roads 0 Guided Busway Casing'
        );
        
        
        map.addLayer({
          'id': 'data_zones',
          'type': 'fill',
          'source': 'data_zones',
          'source-layer': 'data_zones',
          'paint': {
            'fill-color': ["step", ["get", layerId ],
             "#fff7ec", 0.01,
              "#fee8c8", 2,
              "#fdd49e", 5,
              "#fdbb84", 10,
              "#d7301f", 50,
              "#7f0000", 100,
              "#000000"],
            'fill-opacity': 0.1,
            'fill-outline-color': 'rgba(0, 0, 0, 0.9)'
          }
        }, 'roads 0 Guided Busway Casing'
        );
        
        break;
      default:
      
        map.addLayer({
          'id': 'dasymetric',
          'type': 'fill-extrusion',
          'source': 'dasymetric',
          'source-layer': 'dasymetric',
          'paint': {
            'fill-extrusion-color': ['step', ['get', layerId ],
              "#053061", 3,
              "#2166ac", 5,
              "#4393c3", 7,
              "#92c5de", 10,
              "#f7f7f7", 15,
              "#f4a582", 30,
              "#b2182b", 60,
              "#67001f", 200,
              '#000000'],
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              12,
              1,
              15,
              8
            ]
          }
        }, 'roads 0 Guided Busway Casing'
        );
      
      
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
            'fill-opacity': 0.1,
            'fill-outline-color': 'rgba(0, 0, 0, 0.9)'
          }
        }, 'roads 0 Guided Busway Casing'
        );
      }
  } else {
    console.log("off");
    if (map.getLayer("data_zones")) map.removeLayer("data_zones");
    if (map.getLayer('dasymetric')) map.removeLayer('dasymetric');
  }
}