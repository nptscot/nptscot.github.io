
// Click on rnet for popup
// #!# Gradient and Quietness are capitalised
map.on('click', 'rnet', function (e) {
  
  const coordinates = e.lngLat;
  
  const feature = e.features[0];
  
  // Format key fields as percentages
  const percentageFields = ['Gradient', 'Quietness'];
  percentageFields.forEach (field => {
    feature.properties[field] += '%';
  });
    
  // Suppress small numeric values
  Object.entries (feature.properties).forEach (([key, value]) => {
    if (Number.isFinite(value) && (value < 10)) {   // Number check means strings/percentages/etc. get skipped
      feature.properties[key] = '≤9';
    }
  });
  
  // Determine the number of cyclists for this layer
  var layerPurpose = document.getElementById('rnet_purpose_input').value;
  var layerType = document.getElementById('rnet_type_input').value;
  var layerScenario = document.getElementById('rnet_scenario_input').value;
  var layername = layerPurpose + '_' + layerType + '_' + layerScenario;
  feature.properties._ncycle = feature.properties[layername];
  
  // Inject external links properties
  feature.properties._streetViewUrl = 'https://maps.google.com/maps?q=&layer=c&cbll=' +  coordinates.lat + ',' + coordinates.lng + '&cbp=11,0,0,0,0';
  feature.properties._osmUrl = 'https://www.openstreetmap.org/#map=19/' + coordinates.lat + '/' + coordinates.lng;
  
  var description = '<div class="mappopup">' + 
  '<p>Cyclists: ' + feature.properties._ncycle + '</p>' +
  '<p>Gradient: ' + feature.properties.Gradient + '</p>' +
  '<p>Cycle-friendliness: ' + feature.properties.Quietness + '</p>' +
  '<p><a class="externallink" target="_blank" href="' + feature.properties._streetViewUrl + '">Google Street View <i class="fa fa-external-link" aria-hidden="true"></i></a> ' +
  '<a class="externallink" target="_blank" href="' + feature.properties._osmUrl + '">OpenStreetMap <i class="fa fa-external-link" aria-hidden="true"></i></a></p>' +

  '<button class="accordion" id="popupaccordion" onclick="popupAccordion();">All Network Details</button>' +
  '<div class="panel" id="popuppanel">' +

  '<h4>Fast/Direct network</h4>' +
  '<table><tr><th></th><th>Baseline</th><th>Go Dutch</th><th>Ebikes</th></tr>' +
  '<tr><th>All</td><td>' + feature.properties.all_fastest_bicycle + '</td><td>' + feature.properties.all_fastest_bicycle_go_dutch + '</td><td>' + feature.properties.all_fastest_bicycle_ebike + '</td></tr>' +
  '<tr><th>Commute</td><td>' + feature.properties.commute_fastest_bicycle + '</td><td>' + feature.properties.commute_fastest_bicycle_go_dutch + '</td><td>' + feature.properties.commute_fastest_bicycle_ebike + '</td></tr>' +
  '<tr><th>Primary</td><td>' + feature.properties.primary_fastest_bicycle + '</td><td>' + feature.properties.primary_fastest_bicycle_go_dutch + '</td><td>' + feature.properties.primary_fastest_bicycle_ebike + '</td></tr>' +
  '<tr><th>Secondary</td><td>' + feature.properties.secondary_fastest_bicycle + '</td><td>' + feature.properties.secondary_fastest_bicycle_go_dutch + '</td><td>' + feature.properties.secondary_fastest_bicycle_ebike + '</td></tr>' +
  '<tr><th>Utility</td><td>' + feature.properties.utility_fastest_bicycle + '</td><td>' + feature.properties.utility_fastest_bicycle_go_dutch + '</td><td>' + feature.properties.utility_fastest_bicycle_ebike + '</td></tr>' +
  '</table>' +

  '<h4>Quiet/Indirect network</h4>' + 
  '<table><tr><th></th><th>Baseline</th><th>Go Dutch</th><th>Ebikes</th></tr>' +
  '<tr><th>All</td><td>' + feature.properties.all_quietest_bicycle + '</td><td>' + feature.properties.all_quietest_bicycle_go_dutch + '</td><td>' + feature.properties.all_quietest_bicycle_ebike + '</td></tr>' +
  '<tr><th>Commute</td><td>' + feature.properties.commute_quietest_bicycle + '</td><td>' + feature.properties.commute_quietest_bicycle_go_dutch + '</td><td>' + feature.properties.commute_quietest_bicycle_ebike + '</td></tr>' +
  '<tr><th>Primary</td><td>' + feature.properties.primary_quietest_bicycle + '</td><td>' + feature.properties.primary_quietest_bicycle_go_dutch + '</td><td>' + feature.properties.primary_quietest_bicycle_ebike + '</td></tr>' +
  '<tr><th>Secondary</td><td>' + feature.properties.secondary_quietest_bicycle + '</td><td>' + feature.properties.secondary_quietest_bicycle_go_dutch + '</td><td>' + feature.properties.secondary_quietest_bicycle_ebike + '</td></tr>' +
  '<tr><th>Utility</td><td>' + feature.properties.utility_quietest_bicycle + '</td><td>' + feature.properties.utility_quietest_bicycle_go_dutch + '</td><td>' + feature.properties.utility_quietest_bicycle_ebike + '</td></tr>' +
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
