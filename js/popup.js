// Click on Transit transitstops
map.on('click', 'rnet', function (e) {
var coordinates = e.lngLat;
var all_fast_bicycle  = e.features[0].properties.all_fastest_bicycle ;
var all_balance_bicycle = e.features[0].properties.all_balanced_bicycle;
var all_quiet_bicycle = e.features[0].properties.all_quietest_bicycle;
var all_ebike_bicycle = e.features[0].properties.all_ebike_bicycle;
var all_fast_bicycle_go_dutch = e.features[0].properties.all_fastest_bicycle_go_dutch;
var all_balance_bicycle_go_dutch = e.features[0].properties.all_balanced_bicycle_go_dutch;
var all_quiet_bicycle_go_dutch = e.features[0].properties.all_quietest_bicycle_go_dutch;
var all_ebike_bicycle_go_dutch = e.features[0].properties.all_ebike_bicycle_go_dutch;

var commute_fast_bicycle  = e.features[0].properties.commute_fastest_bicycle ;
var commute_balance_bicycle = e.features[0].properties.commute_balanced_bicycle;
var commute_quiet_bicycle = e.features[0].properties.commute_quietest_bicycle;
var commute_ebike_bicycle = e.features[0].properties.commute_ebike_bicycle;
var commute_fast_bicycle_go_dutch = e.features[0].properties.commute_fastest_bicycle_go_dutch;
var commute_balance_bicycle_go_dutch = e.features[0].properties.commute_balanced_bicycle_go_dutch;
var commute_quiet_bicycle_go_dutch = e.features[0].properties.commute_quietest_bicycle_go_dutch;
var commute_ebike_bicycle_go_dutch = e.features[0].properties.commute_ebike_bicycle_go_dutch;

var school_fast_bicycle  = e.features[0].properties.school_fastest_bicycle ;
var school_balance_bicycle = e.features[0].properties.school_balanced_bicycle;
var school_quiet_bicycle = e.features[0].properties.school_quietest_bicycle;
var school_ebike_bicycle = e.features[0].properties.school_ebike_bicycle;
var school_fast_bicycle_go_dutch = e.features[0].properties.school_fastest_bicycle_go_dutch;
var school_balance_bicycle_go_dutch = e.features[0].properties.school_balanced_bicycle_go_dutch;
var school_quiet_bicycle_go_dutch = e.features[0].properties.school_quietest_bicycle_go_dutch;
var school_ebike_bicycle_go_dutch = e.features[0].properties.school_ebike_bicycle_go_dutch;

var Gradient = e.features[0].properties.Gradient;
var Quietness = e.features[0].properties.Quietness;

var description = '<div><p><h4>All</h4></p><table><tr><th></th><th>Fastest</th><th>Balanced</th><th>Quietest</th><th>Ebikes</th></tr>' +
'<tr><th>Baseline</th><th>' + all_fast_bicycle + '</th><th>' + all_balance_bicycle + '</th><th>' + all_quiet_bicycle + 
'</th><th>' + all_ebike_bicycle + '</th></tr><tr><th>Go Dutch</th><th>' + all_fast_bicycle_go_dutch + '</th><th>' +
all_balance_bicycle_go_dutch + '</th><th>' + all_quiet_bicycle_go_dutch + '</th><th>' + all_ebike_bicycle_go_dutch + '</th></tr></table>' +
'<p><h4>Commute</h4></p><table><tr><th></th><th>Fastest</th><th>Balanced</th><th>Quietest</th><th>Ebikes</th></tr>' +
'<tr><th>Baseline</th><th>' + commute_fast_bicycle + '</th><th>' + commute_balance_bicycle + '</th><th>' + commute_quiet_bicycle + 
'</th><th>' + commute_ebike_bicycle + '</th></tr><tr><th>Go Dutch</th><th>' + commute_fast_bicycle_go_dutch + '</th><th>' +
commute_balance_bicycle_go_dutch + '</th><th>' + commute_quiet_bicycle_go_dutch + '</th><th>' + commute_ebike_bicycle_go_dutch + '</th></tr></table>' +
'<p><h4>School</h4></p><table><tr><th></th><th>Fastest</th><th>Balanced</th><th>Quietest</th><th>Ebikes</th></tr>' +
'<tr><th>Baseline</th><th>' + school_fast_bicycle + '</th><th>' + school_balance_bicycle + '</th><th>' + school_quiet_bicycle + 
'</th><th>' + school_ebike_bicycle + '</th></tr><tr><th>Go Dutch</th><th>' + school_fast_bicycle_go_dutch + '</th><th>' +
school_balance_bicycle_go_dutch + '</th><th>' + school_quiet_bicycle_go_dutch + '</th><th>' + school_ebike_bicycle_go_dutch + '</th></tr></table>' +


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

