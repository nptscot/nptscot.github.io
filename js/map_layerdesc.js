function switchLayerDesc(layer) {
  var layerId = document.getElementById("layerinput").value;
  
  switch(layerId) {
  case "total_emissions_grade":
    document.getElementById("layerdesc").innerHTML = `<p>Estimated average annual carbon footprint per person for each LSOA. Based on a mix of local and national data. Each area has a grade from A+ (low emissions) to F- (high emissions) in comparison to the England average. See the popup report for more details. </p>`;
    break;
  default:
    document.getElementById("layerdesc").innerHTML = `<p>No Description</p>`;
  } 
}