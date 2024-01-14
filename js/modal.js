// Data zones

dataZonesModal = function ()
{

var chartDefinitions = {
// #!# Labels are sometimes wrong, but don't seem to be used anyway
	charts: [
		['commuteOriginChart', 'comm_orig', 'Daily commuters'],			// Commute Origin
		['commuteDestinationChart', 'comm_dest', 'Daily commuters'],// Commute Destination
		['primaryOrginChart', 'schl_primary_orig', 'Daily commuters'],	// School Primary Origin
		['secondaryOriginChart', 'schl_secondary_orig', 'Daily commuters'],	// School Secondary Origin
		['shoppingOriginChart', 'shopping_orig', 'Daily shoppers'],	// shopping Origin
		['shoppingDestinationChart', 'shopping_dest', 'Daily shoppers'],	// shopping Destination
		['leisureOriginChart', 'leisure_orig', 'Daily shoppers'],// leisure Origin
		['leisureDestinationChart', 'leisure_dest', 'Daily shoppers'],	// leisure Destination
		['visitingOriginChart', 'visiting_orig', 'Daily shoppers'],	// visiting Origin
		['visitingDestinationChart', 'visiting_dest', 'Daily shoppers'],	// visiting Destination
	],
	
	modes: [
		// Label, field (e.g. bicycle => comm_orig_bicycle_ebike_fastest), background colour, border colour
		['Bicycle', 'bicycle', 'rgba(51,160,44, 0.8)', 'rgba(51,160,44, 1)'],
		['Foot', 'foot', 'rgba(178,223,138, 0.8)', 'rgba(178,223,138, 1)'],
		['Public transport', 'public_transport', 'rgba(56,108,176, 0.8)', 'rgba(56,108,176, 1)'],
		['Car', 'car', 'rgba(227,26,28, 0.8)', 'rgba(227,26,28, 1)'],
		['Taxi', 'taxi', 'rgba(166,206,227, 0.8)', 'rgba(166,206,227, 1)'],
	],
	
	suffixes: [
		'', 
		'_go_dutch_fastest',
		'_ebike_fastest',
		'_go_dutch_quietest',
		'_ebike_quietest'
	],
	
	labels: [
		'Baseline',
		'Go Dutch (Fastest)',
		'Ebike (Fastest)',
		'Go Dutch (Quietest)',
		'Ebike (Quietest)'
  	]
};


// Declare charts collection
var charts = {};




// Define the modal

var zone_modal = document.getElementById("zone_modal");
// Get the <span> element that closes the modal
var span_modal = document.getElementsByClassName("closemodal")[0];

// When the user clicks on <span> (x), close the modal
span_modal.onclick = function() {
  zone_modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == zone_modal) {
	zone_modal.style.display = "none";
  }
};


// How map triggers the modal 
// On click open modal
map.on('click', 'data_zones', function(e) {
  
  console.log("Click on Zones")
  
  // Block Modal when clicking on other layers
  let f = map.queryRenderedFeatures(e.point);
  var layersToExclude = ['composite', 'dasymetric','placenames'];

  f = f.filter(function (el) {
    return !layersToExclude.includes(el.source);
  });
  
  if (f[0].sourceLayer == "data_zones") {
    
    zone_modal.style.display = "block";
	
    var sub = e.features[0].properties;
  	var dataurl = 'https://nptscot.blob.core.windows.net/json/DataZone/' + sub.DataZone + '.json';
    var zonedata;
    $.getJSON(dataurl, function (json) {
        console.log( "downloaded zone json" );
        zonedata = json[0];
    })
      .done(function() {
        document.getElementById("zone-modal-title").innerHTML = "<h2>Zone Summary: " + sub.DataZone + "</h2>";
        // Define Charts
  		  makeChartsModeshare(zonedata);
      })
      .fail(function() {
        alert("Failed to get data for this zone, please try refreshing the page");
      });
    
    //return;
  } 
	
});






makeChartsModeshare = function(sub){
	
  // Clear existing if present
  Object.keys (charts).forEach (i => {
    if(charts[i]) {
		charts[i].destroy();
	}
  });
  
  function createArray(prefix, suffixes) {
    return suffixes.map(suffix => sub[prefix + suffix]);
  }
  
  
  function createChart (id, prefix, labelString)
  {
	// Assemble the datasets
	var datasets = [];
	chartDefinitions.modes.forEach (mode => {
		datasets.push (
			{
				label: mode[0],
				data: createArray(prefix + '_' + mode[1], chartDefinitions.suffixes),
				backgroundColor: mode[2],
				borderColor: mode[3],
				borderWidth: 1
			}
		)
	});
	
  
	return new Chart(document.getElementById(id).getContext('2d'), {
		type: 'bar',
		data: {
			labels: chartDefinitions.labels,
			datasets: datasets
		},
		options: {
			scales: {
				y: {
				  stacked: true,
				  scaleLabel: {
            display: true,
            labelString: labelString
          },
					ticks: {
						beginAtZero: true,
						
					}
				},
				x: {
				  stacked: true
				},
			},
			responsive: true,
			maintainAspectRatio: false
		}
	});
  }
  
  
  
  chartDefinitions.charts.forEach ((chartDefinition, i) => {
	charts[i] = createChart (chartDefinition[0], chartDefinition[1], chartDefinition[2]);
  });
  
  
  

};

}

dataZonesModal ();