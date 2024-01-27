

mapPopups ();

// Click on rnet for popup
// #!# Gradient and Quietness are capitalised
function mapPopups () {
  
  // Register popup on click
  map.on('click', 'rnet', function (e) {
  
    // Get the clicked co-ordinates
    const coordinates = e.lngLat;
    
    // Obtain the clicked feature
    let feature = e.features[0];
    
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
    feature.properties._ncycle = ncycleField (feature);
    
    // Inject external links properties
    feature.properties = addExternalLinks (feature.properties, coordinates);
    
    // Create the popup HTML from the template in the HTML
    const popupHtml = processTemplate ('mappopup', feature.properties);
    
    // Create the popup
    new maplibregl.Popup({className: 'layerpopup'})
      .setLngLat(coordinates)
      .setHTML(popupHtml)
      .addTo(map);
  });
  
  
  // Function to convert a template to HTML, substituting placeholders
  function processTemplate (templateId, properties)
  {
     // Get template for the popup (from the HTML page), which defines fields to be used from feature.properties
     const template = document.querySelector('template#' + templateId).innerHTML;
    
     // Substitute placeholders in template
     return template.replace (/{([^}]+)}/g, (placeholderString, field) => properties[field]);    // See: https://stackoverflow.com/a/52036543/
  }
  
  
  // Function to determine the field for number of cyclists
  function ncycleField (feature)
  {
    const layerPurpose = document.getElementById('rnet_purpose_input').value;
    const layerType = document.getElementById('rnet_type_input').value;
    const layerScenario = document.getElementById('rnet_scenario_input').value;
    const layername = layerPurpose + '_' + layerType + '_' + layerScenario;
    return feature.properties[layername];
  }
  
  
  // Function to add external links
  function addExternalLinks (properties, coordinates)
  {
    properties._streetViewUrl = 'https://maps.google.com/maps?q=&layer=c&cbll=' + coordinates.lat + ',' + coordinates.lng + '&cbp=11,0,0,0,0';
    properties._osmUrl = 'https://www.openstreetmap.org/#map=19/' + coordinates.lat + '/' + coordinates.lng;
    return properties;
  }
}




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
