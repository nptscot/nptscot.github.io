// When the user moves their mouse over the state-fill layer, we'll update the
// feature state for the feature under the mouse.
/*
map.on('mousemove', 'data_zones', function (e) {
  console.log(hoveredStateId);
  if (e.features.length > 0) {
    if (hoveredStateId) {
      map.setFeatureState(
        { sourceLayer: 'data_zones_boarder', source: 'data_zones', id: hoveredStateId },
        { hover: false }
      );
    }
    hoveredStateId = e.features[0].id;
    console.log(e.features[0]);
    map.setFeatureState(
      { sourceLayer: 'data_zones_boarder', source: 'data_zones', id: hoveredStateId },
      { hover: true }
    );
  }
});
 
// When the mouse leaves the state-fill layer, update the feature state of the
// previously hovered feature.
map.on('mouseleave', 'data_zones', function () {
  if (hoveredStateId) {
    map.setFeatureState(
      { source: 'states', id: hoveredStateId },
      { hover: false }
    );
  }
  hoveredStateId = null;
});

*/