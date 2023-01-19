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
  if (checkBox.checked === true) {
    if (map.getLayer('rnet')) map.removeLayer('rnet');
    switch (layerId) {
      case 'Quietness':
        map.addLayer({
          'id': 'rnet',
          'type': 'line',
          'source': 'rnet',
          'source-layer': 'rnet',
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
        
        document.getElementById("rnetlegend").innerHTML = `<button onclick="show_rnet_legend(false)" style="float:right" aria-label="Hide legend"><i class="fas fa-times"></i></button>
        <h4>Quietness</h4>
        <div><span style="background-color: #882255;" class="legenddot"></span>0-25</div>
    	  <div><span style="background-color: #CC6677;" class="legenddot"></span>25-50</div>
    	  <div><span style="background-color: #44AA99;" class="legenddot"></span>50-75</div>
    	  <div><span style="background-color: #117733;" class="legenddot"></span>75-100</div>`;
    	  
        break;
      case 'Gradient':
        map.addLayer({
          'id': 'rnet',
          'type': 'line',
          'source': 'rnet',
          'source-layer': 'rnet',
          'paint': {
            'line-color': ["step", ["get", layerId],
              "#feebe2", 0,
              "#fcc5c0", 2,
              "#fa9fb5", 4,
              "#f768a1", 6,
              "#dd3497", 8,
              "#ae017e", 10,
              "#7a0177", 100,
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
        
        document.getElementById("rnetlegend").innerHTML = `<button onclick="show_rnet_legend(false)" style="float:right" aria-label="Hide legend"><i class="fas fa-times"></i></button>
        <h4>Gradient</h4>
        <div><span style="background-color: #feebe2;" class="legenddot"></span>0</div>
    	  <div><span style="background-color: #fcc5c0;" class="legenddot"></span>2</div>
    	  <div><span style="background-color: #fa9fb5;" class="legenddot"></span>4</div>
    	  <div><span style="background-color: #f768a1;" class="legenddot"></span>6</div>
    	  <div><span style="background-color: #dd3497;" class="legenddot"></span>8</div>
    	  <div><span style="background-color: #ae017e;" class="legenddot"></span>10</div>
    	  <div><span style="background-color: #7a0177;" class="legenddot"></span>100</div>`;
        
        break;
      default:
        map.addLayer({
          'id': 'rnet',
          'type': 'line',
          'source': 'rnet',
          'source-layer': 'rnet',
          'paint': {
            'line-color': ["step", ["get", layerId],
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


function switch_zones() {
  var checkBox = document.getElementById('zonescheckbox');
  var layerId = document.getElementById("zones_input").value;
  if (checkBox.checked === true) {
    if (map.getLayer('zones')) map.removeLayer('zones');
    map.addLayer({
      'id': 'zones',
      'type': 'fill',
      'source': 'zones',
      'source-layer': 'zones',
      'paint': {
        'fill-color': ["step", ["get", layerId],
          "#1b7837", 1000,
          "#5aae61", 2000,
          "#a6dba0", 3000,
          "#d9f0d3", 4000,
          "#e7d4e8", 5000,
          "#c2a5cf", 6000,
          "#9970ab", 7000,
          "#762a83"],
        'fill-opacity': 0.7,
        'fill-outline-color': 'rgba(0, 0, 0, 0.2)'
      }
    }, 'roads 0 Restricted Road'
    );

  } else {
    if (map.getLayer("zones")) map.removeLayer("zones");
  }
}