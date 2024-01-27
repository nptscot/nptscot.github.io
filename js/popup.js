
// Callback to determine the field for number of cyclists
const ncycleField = function ncycleField (feature) {
  const layerPurpose = document.getElementById('rnet_purpose_input').value;
  const layerType = document.getElementById('rnet_type_input').value;
  const layerScenario = document.getElementById('rnet_scenario_input').value;
  const layername = layerPurpose + '_' + layerType + '_' + layerScenario;
  return feature.properties[layername];
}

// Create popups
mapPopups ({
  layerId: 'rnet',
  preprocessingCallbacks: {
    '_ncycle': ncycleField
  },
  smallValuesThreshold: 10,
  literalFields: ['Gradient', 'Quietness']  // #!# Gradient and Quietness are capitalised unlike other
});



// Click on rnet for popup
// Options are: layerId, preprocessingCallbacks, smallValuesThreshold, literalFields
function mapPopups (options) {
  
  // Enable cursor pointer
  layerPointer (options.layerId);
  
  // Register popup on click
  map.on ('click', options.layerId, function (e) {
  
    // Get the clicked co-ordinates
    const coordinates = e.lngLat;
    
    // Obtain the clicked feature
    let feature = e.features[0];
    
    // Suppress small numeric values
    if (options.smallValuesThreshold) {
      Object.entries (feature.properties).forEach (([key, value]) => {
        if (options.literalFields && options.literalFields.includes (key)) {return;  /* i.e. continue */}
        if (Number.isFinite(value) && (value < options.smallValuesThreshold)) {   // Number check means strings/percentages/etc. get skipped
          feature.properties[key] = '<' + options.smallValuesThreshold;
        }
      });
    }
    
    // Process any preprocessing callbacks
    if (options.preprocessingCallbacks) {
      Object.entries (options.preprocessingCallbacks).forEach (([field, callbackFunction]) => {
        feature.properties[field] = callbackFunction (feature);
      });
    }

    // Make external links properties available to the template
    feature.properties = addExternalLinks (feature.properties, coordinates);
    
    // Create the popup HTML from the template in the HTML
    const popupHtml = processTemplate (options.layerId + '-popup', feature.properties);
    
    // Create the popup
    new maplibregl.Popup({className: 'layerpopup'})
      .setLngLat(coordinates)
      .setHTML(popupHtml)
      .addTo(map);
  });
  
  
  // Function to handle pointer hover changes for a layer
  function layerPointer (layerId)
  {
    // Change the cursor to a pointer when the mouse is over the layer.
    map.on('mouseenter', layerId, function () {
      map.getCanvas().style.cursor = 'pointer';
    });
    
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', layerId, function () {
      map.getCanvas().style.cursor = '';
    });
  }
  
  
  // Function to convert a template to HTML, substituting placeholders
  function processTemplate (templateId, properties)
  {
     // Get template for the popup (from the HTML page), which defines fields to be used from feature.properties
     const template = document.querySelector('template#' + templateId).innerHTML;
    
     // Substitute placeholders in template
     return template.replace (/{([^}]+)}/g, (placeholderString, field) => properties[field]);    // See: https://stackoverflow.com/a/52036543/
  }
  
  
  // Function to add external links
  function addExternalLinks (properties, coordinates)
  {
    properties._streetViewUrl = 'https://maps.google.com/maps?q=&layer=c&cbll=' + coordinates.lat + ',' + coordinates.lng + '&cbp=11,0,0,0,0';
    properties._osmUrl = 'https://www.openstreetmap.org/#map=19/' + coordinates.lat + '/' + coordinates.lng;
    return properties;
  }
}




// Popup accordion
popupAccordion = function(){
  var acc = document.getElementById('popupaccordion');
  acc.classList.toggle('active');
  var panel = document.getElementById('popuppanel');
  panel.style.display = (panel.style.display === 'block' ? 'none' : 'block');
}
