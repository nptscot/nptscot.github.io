
// Convert 3 to <9
function suppresssmall(x) {
  if(x < 10){
   return "\u22649";
  }
  return x;
}

// Click on rnet for popup
map.on('click', 'rnet', function (e) {
var coordinates = e.lngLat;

// Process all the properties
// Processed gradinet and quietness but ignored
const properties = e.features[0].properties;
const prop = {};

for (const property in properties) {
  prop[property] = suppresssmall(properties[property]);
}

var Gradient = e.features[0].properties.Gradient;
var Quietness = e.features[0].properties.Quietness;

var description = '<div class="mappopup"><h4>Fast/Direct network</h4>' + 

'<table><tr><th></th><th>Baseline</th><th>Go Dutch</th><th>Ebikes</th></tr>' +
'<tr><th>All</th><th>' + prop.all_fastest_bicycle + '</th><th>' + prop.all_fastest_bicycle_go_dutch + '</th><th>' + prop.all_fastest_bicycle_ebike + '</th></tr>' + 
'<tr><th>Commute</th><th>' + prop.commute_fastest_bicycle + '</th><th>' + prop.commute_fastest_bicycle_go_dutch + '</th><th>' + prop.commute_fastest_bicycle_ebike + '</th></tr>' +
'<tr><th>Primary</th><th>' + prop.primary_fastest_bicycle + '</th><th>' + prop.primary_fastest_bicycle_go_dutch + '</th><th>' + prop.primary_fastest_bicycle_ebike + '</th></tr>' +
'<tr><th>Secondary</th><th>' + prop.secondary_fastest_bicycle + '</th><th>' + prop.secondary_fastest_bicycle_go_dutch + '</th><th>' + prop.secondary_fastest_bicycle_ebike + '</th></tr>' +
'</table>' +

'<h4>Quiet/Indirect network</h4>' + 

'<table><tr><th></th><th>Baseline</th><th>Go Dutch</th><th>Ebikes</th></tr>' +
'<tr><th>All</th><th>' + prop.all_quietest_bicycle + '</th><th>' + prop.all_quietest_bicycle_go_dutch + '</th><th>' + prop.all_quietest_bicycle_ebike + '</th></tr>' + 
'<tr><th>Commute</th><th>' + prop.commute_quietest_bicycle + '</th><th>' + prop.commute_quietest_bicycle_go_dutch + '</th><th>' + prop.commute_quietest_bicycle_ebike + '</th></tr>' +
'<tr><th>Primary</th><th>' + prop.primary_quietest_bicycle + '</th><th>' + prop.primary_quietest_bicycle_go_dutch + '</th><th>' + prop.primary_quietest_bicycle_ebike + '</th></tr>' +
'<tr><th>Secondary</th><th>' + prop.secondary_quietest_bicycle + '</th><th>' + prop.secondary_quietest_bicycle_go_dutch + '</th><th>' + prop.secondary_quietest_bicycle_ebike + '</th></tr>' +
'</table>' +

'<p> Gradient: ' + Gradient + '%</p>' +
'<p> Cycle friendliness: ' + Quietness + '%</p>' +
'<p><a target="_blank" href="http://maps.google.com/maps?q=&layer=c&cbll=' + 
coordinates.lat + ',' + coordinates.lng +
'&cbp=11,0,0,0,0">Google Street View </a><i class="fa fa-external-link" aria-hidden="true"></i></p><div>';

// Add link to https://www.openstreetmap.org/edit#map=20/latitude/longitude
// With a message like "Data on this segment wrong or missing something? Update it on <a href="https://www.openstreetmap.org/edit#map=20/55.95145/-3.17960">OSM</a>."
'<p>Data on this segment wrong or missing something? <a href="https://www.openstreetmap.org/edit#map=20/' + coordinates.lat + '/' + coordinates.lng + '">Update on OpenStreetMap</a>.</p>';

new maplibregl.Popup({maxWidth: '400px'})
.setLngLat(coordinates)
.setHTML(description)
.addTo(map);

});

// Change the cursor to a pointer when the mouse is over the layer.
map.on('mouseenter', 'rnet', function () {
map.getCanvas().style.cursor = 'pointer';
});
 
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'rnet', function () {
map.getCanvas().style.cursor = '';
});

