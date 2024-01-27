
// Convert small to <9
function suppresssmall(x) {
  return (x < 10 ? '≤9' : x);
}

// Click on rnet for popup
map.on('click', 'rnet', function (e) {
  
  var coordinates = e.lngLat;

  // Process all the properties
  // Processed gradient and quietness but ignored
  const properties = e.features[0].properties;
  const prop = {};

  for (const property in properties) {
    prop[property] = suppresssmall(properties[property]);
  }

  var Gradient = e.features[0].properties.Gradient;
  var Quietness = e.features[0].properties.Quietness;

  var layerPurpose = document.getElementById("rnet_purpose_input").value;
  var layerScenario = document.getElementById("rnet_scenario_input").value;
  var layerType = document.getElementById("rnet_type_input").value;

  var layername = layerPurpose + "_" + layerType + "_" + layerScenario;

  var ncycle = suppresssmall(e.features[0].properties[layername]);
  
  var streetViewUrl = 'https://maps.google.com/maps?q=&layer=c&cbll=' +  coordinates.lat + ',' + coordinates.lng + '&cbp=11,0,0,0,0';
  var osmUrl = 'https://www.openstreetmap.org/#map=19/' + coordinates.lat + '/' + coordinates.lng;
  
  var description = '<div class="mappopup">' + 
  '<p>Cyclists: ' + ncycle + '</p>' +
  '<p>Gradient: ' + Gradient + '%</p>' +
  '<p>Cycle-friendliness: ' + Quietness + '%</p>' +
  '<p><a class="externallink" target="_blank" href="' + streetViewUrl + '">Google Street View <i class="fa fa-external-link" aria-hidden="true"></i></a> ' +
  '<a class="externallink" target="_blank" href="' + osmUrl + '">OpenStreetMap <i class="fa fa-external-link" aria-hidden="true"></i></a></p>' +

  '<button class="accordion" id="popupaccordion" onclick="popupAccordion();">All Network Details</button>' +
  '<div class="panel" id="popuppanel">' +

  '<h4>Fast/Direct network</h4>' +
  '<table><tr><th></th><th>Baseline</th><th>Go Dutch</th><th>Ebikes</th></tr>' +
  '<tr><th>All</td><td>' + prop.all_fastest_bicycle + '</td><td>' + prop.all_fastest_bicycle_go_dutch + '</td><td>' + prop.all_fastest_bicycle_ebike + '</td></tr>' + 
  '<tr><th>Commute</td><td>' + prop.commute_fastest_bicycle + '</td><td>' + prop.commute_fastest_bicycle_go_dutch + '</td><td>' + prop.commute_fastest_bicycle_ebike + '</td></tr>' +
  '<tr><th>Primary</td><td>' + prop.primary_fastest_bicycle + '</td><td>' + prop.primary_fastest_bicycle_go_dutch + '</td><td>' + prop.primary_fastest_bicycle_ebike + '</td></tr>' +
  '<tr><th>Secondary</td><td>' + prop.secondary_fastest_bicycle + '</td><td>' + prop.secondary_fastest_bicycle_go_dutch + '</td><td>' + prop.secondary_fastest_bicycle_ebike + '</td></tr>' +
  '<tr><th>Utility</td><td>' + prop.utility_fastest_bicycle + '</td><td>' + prop.utility_fastest_bicycle_go_dutch + '</td><td>' + prop.utility_fastest_bicycle_ebike + '</td></tr>' +
  '</table>' +

  '<h4>Quiet/Indirect network</h4>' + 
  '<table><tr><th></th><th>Baseline</th><th>Go Dutch</th><th>Ebikes</th></tr>' +
  '<tr><th>All</td><td>' + prop.all_quietest_bicycle + '</td><td>' + prop.all_quietest_bicycle_go_dutch + '</td><td>' + prop.all_quietest_bicycle_ebike + '</td></tr>' + 
  '<tr><th>Commute</td><td>' + prop.commute_quietest_bicycle + '</td><td>' + prop.commute_quietest_bicycle_go_dutch + '</td><td>' + prop.commute_quietest_bicycle_ebike + '</td></tr>' +
  '<tr><th>Primary</td><td>' + prop.primary_quietest_bicycle + '</td><td>' + prop.primary_quietest_bicycle_go_dutch + '</td><td>' + prop.primary_quietest_bicycle_ebike + '</td></tr>' +
  '<tr><th>Secondary</td><td>' + prop.secondary_quietest_bicycle + '</td><td>' + prop.secondary_quietest_bicycle_go_dutch + '</td><td>' + prop.secondary_quietest_bicycle_ebike + '</td></tr>' +
  '<tr><th>Utility</td><td>' + prop.utility_quietest_bicycle + '</td><td>' + prop.utility_quietest_bicycle_go_dutch + '</td><td>' + prop.utility_quietest_bicycle_ebike + '</td></tr>' +
  '</table>' +
    
  '</div>';

  new maplibregl.Popup({className: 'layerpopup'})
    .setLngLat(coordinates)
    .setHTML(description)
    .addTo(map);
});



layerPointer ('rnet');

// Function to handle pointer hover changes for a layer
function layerPointer (layer) {
  
  // Change the cursor to a pointer when the mouse is over the layer.
  map.on('mouseenter', layer, function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  
  // Change it back to a pointer when it leaves.
  map.on('mouseleave', layer, function () {
    map.getCanvas().style.cursor = '';
  });
}

// Popup accordion
popupAccordion = function(){
  var acc = document.getElementById('popupaccordion');
  acc.classList.toggle('active');
  var panel = document.getElementById('popuppanel');
  panel.style.display = (panel.style.display === 'block' ? 'none' : 'block');
}
