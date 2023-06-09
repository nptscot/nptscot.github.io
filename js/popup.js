
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

var description = '<div><p><h4>All</h4></p><table><tr><th></th><th>Fastest</th><th>Balanced</th><th>Quietest</th><th>Ebikes</th></tr>' +
'<tr><th>Baseline</th><th>' + prop.all_fastest_bicycle + '</th><th>' + prop.all_balanced_bicycle + '</th><th>' + prop.all_quietest_bicycle + 
'</th><th>' + prop.all_ebike_bicycle + '</th></tr><tr><th>Go Dutch</th><th>' + prop.all_fastest_bicycle_go_dutch + '</th><th>' +
prop.all_balanced_bicycle_go_dutch + '</th><th>' + prop.all_quietest_bicycle_go_dutch + '</th><th>' + prop.all_ebike_bicycle_go_dutch + '</th></tr></table>' +
'<p><h4>Commute</h4></p><table><tr><th></th><th>Fastest</th><th>Balanced</th><th>Quietest</th><th>Ebikes</th></tr>' +
'<tr><th>Baseline</th><th>' + prop.commute_fastest_bicycle + '</th><th>' + prop.commute_balanced_bicycle + '</th><th>' + prop.commute_quietest_bicycle + 
'</th><th>' + prop.commute_ebike_bicycle + '</th></tr><tr><th>Go Dutch</th><th>' + prop.commute_fastest_bicycle_go_dutch + '</th><th>' +
prop.commute_balanced_bicycle_go_dutch + '</th><th>' + prop.commute_quietest_bicycle_go_dutch + '</th><th>' + prop.commute_ebike_bicycle_go_dutch + '</th></tr></table>' +
'<p><h4>School</h4></p><table><tr><th></th><th>Fastest</th><th>Balanced</th><th>Quietest</th><th>Ebikes</th></tr>' +
'<tr><th>Baseline</th><th>' + prop.school_fastest_bicycle + '</th><th>' + prop.school_balanced_bicycle + '</th><th>' + prop.school_quietest_bicycle + 
'</th><th>' + prop.school_ebike_bicycle + '</th></tr><tr><th>Go Dutch</th><th>' + prop.school_fastest_bicycle_go_dutch + '</th><th>' +
prop.school_balanced_bicycle_go_dutch + '</th><th>' + prop.school_quietest_bicycle_go_dutch + '</th><th>' + prop.school_ebike_bicycle_go_dutch + '</th></tr></table>' +


'<p> Gradient: ' + Gradient + '</p>' +
'<p> Quietness: ' + Quietness + '</p>' +
'<p><a target="_blank" href="http://maps.google.com/maps?q=&layer=c&cbll=' + 
coordinates.lat + ',' + coordinates.lng +
'&cbp=11,0,0,0,0">Google Street View </a><i class="fa fa-external-link" aria-hidden="true"></i></p><div>';

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

