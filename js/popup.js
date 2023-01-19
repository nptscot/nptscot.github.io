// Click on Transit transitstops
map.on('click', 'rnet', function (e) {
var coordinates = e.lngLat;
var bicycle  = e.features[0].properties.bicycle ;
var bicycle_go_dutch = e.features[0].properties.bicycle_go_dutch;
var Gradient = e.features[0].properties.Gradient;
var Quietness = e.features[0].properties.Quietness;

var description = '<p> Baseline 2011: ' + bicycle + '</p>' +
'<p> Go Dutch: ' + bicycle_go_dutch + '</p>' +
'<p> Gradient: ' + Gradient + '</p>' +
'<p> Quietness: ' + Quietness + '</p>';
 
new maplibregl.Popup()
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

