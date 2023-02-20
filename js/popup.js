// Click on Transit transitstops
map.on('click', 'rnet', function (e) {
var coordinates = e.lngLat;
var fast_bicycle  = e.features[0].properties.fastest_bicycle ;
var balance_bicycle = e.features[0].properties.balanced_bicycle;
var quiet_bicycle = e.features[0].properties.quietest_bicycle;
var ebike_bicycle = e.features[0].properties.ebike_bicycle;
var fast_bicycle_go_dutch = e.features[0].properties.fastest_bicycle_go_dutch;
var balance_bicycle_go_dutch = e.features[0].properties.balanced_bicycle_go_dutch;
var quiet_bicycle_go_dutch = e.features[0].properties.quietest_bicycle_go_dutch;
var ebike_bicycle_go_dutch = e.features[0].properties.ebike_bicycle_go_dutch;

var Gradient = e.features[0].properties.Gradient;
var Quietness = e.features[0].properties.Quietness;

var description = '<div><p><h4>Road summary</h4></p><table><tr><th></th><th>Fastest</th><th>Balanced</th><th>Quietest</th><th>Ebikes</th></tr>' +
'<tr><th>Baseline</th><th>' + fast_bicycle + '</th><th>' + balance_bicycle + '</th><th>' + quiet_bicycle + 
'</th><th>' + ebike_bicycle + '</th></tr><tr><th>Go Dutch</th><th>' + fast_bicycle_go_dutch + '</th><th>' +
balance_bicycle_go_dutch + '</th><th>' + quiet_bicycle_go_dutch + '</th><th>' + ebike_bicycle_go_dutch + '</th></tr></table>' +
'<p> Gradient: ' + Gradient + '</p>' +
'<p> Quietness: ' + Quietness + '</p><div>';
 
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

