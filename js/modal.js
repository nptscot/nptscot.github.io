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
  Object.keys (charts).forEach (chartId => {
    if(charts[chartId]) {
		charts[chartId].destroy();
	}
  });
  
  function createArray(prefix, suffixes) {
    return suffixes.map(suffix => sub[prefix + suffix]);
  }
  
  var suffixes = [
    '', 
    '_go_dutch_fastest',
    '_ebike_fastest',
    '_go_dutch_quietest',
    '_ebike_quietest'
  ];
  
  const labels = [
    'Baseline',
    'Go Dutch (Fastest)',
    'Ebike (Fastest)',
    'Go Dutch (Quietest)',
    'Ebike (Quietest)'
  ];



  
  // Commute Origin
  charts.commuteOriginChart = new Chart(document.getElementById('commuteOriginChart').getContext('2d'), {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [{
				label: 'Bicycle',
				data: createArray('comm_orig_bicycle', suffixes),
				backgroundColor: 'rgba(51,160,44, 0.8)',
				borderColor: 'rgba(51,160,44, 1)',
				borderWidth: 1,
				order: 1
			},
			{
				label: 'Car',
				data: createArray('comm_orig_car', suffixes),
				backgroundColor: 'rgba(227,26,28, 0.8)',
				borderColor: 'rgba(227,26,28, 1)',
				borderWidth: 1,
				order: 5
			},
			{
				label: 'Public transport',
				data: createArray('comm_orig_public_transport', suffixes) ,
				backgroundColor: 'rgba(56,108,176, 0.8)',
				borderColor: 'rgba(56,108,176, 1)',
				borderWidth: 1,
				order: 3
			},
			{
				label: 'Foot',
				data: createArray('comm_orig_foot', suffixes),
				backgroundColor: 'rgba(178,223,138, 0.8)',
				borderColor: 'rgba(178,223,138, 1)',
				borderWidth: 1,
				order: 2
			},
			{
				label: 'Taxi',
				data: createArray('comm_orig_taxi', suffixes),
				backgroundColor: 'rgba(166,206,227, 0.8)',
				borderColor: 'rgba(166,206,227, 1)',
				borderWidth: 1,
				order: 6
			}
			
			]
		},
		options: {
			scales: {
				y: {
				  stacked: true,
				  scaleLabel: {
            display: true,
            labelString: 'Daily commuters'
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
  
  // Commute Destination
  charts.commuteDestinationChart = new Chart(document.getElementById('commuteDestinationChart').getContext('2d'), {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [{
				label: 'Bicycle',
				data: createArray('comm_dest_bicycle', suffixes),
				backgroundColor: 'rgba(51,160,44, 0.8)',
				borderColor: 'rgba(51,160,44, 1)',
				borderWidth: 1,
				order: 1
			},
			{
				label: 'Car',
				data: createArray('comm_dest_car', suffixes),
				backgroundColor: 'rgba(227,26,28, 0.8)',
				borderColor: 'rgba(227,26,28, 1)',
				borderWidth: 1,
				order: 5
			},
			{
				label: 'Public transport',
				data: createArray('comm_dest_public_transport', suffixes) ,
				backgroundColor: 'rgba(56,108,176, 0.8)',
				borderColor: 'rgba(56,108,176, 1)',
				borderWidth: 1,
				order: 3
			},
			{
				label: 'Foot',
				data: createArray('comm_dest_foot', suffixes),
				backgroundColor: 'rgba(178,223,138, 0.8)',
				borderColor: 'rgba(178,223,138, 1)',
				borderWidth: 1,
				order: 2
			},
			{
				label: 'Taxi',
				data: createArray('comm_dest_taxi', suffixes),
				backgroundColor: 'rgba(166,206,227, 0.8)',
				borderColor: 'rgba(166,206,227, 1)',
				borderWidth: 1,
				order: 6
			}
			
			]
		},
		options: {
			scales: {
				y: {
				  stacked: true,
				  scaleLabel: {
            display: true,
            labelString: 'Daily commuters'
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
	
	// School Primary Origin
	charts.primaryOrginChart = new Chart(document.getElementById('primaryOrginChart').getContext('2d'), {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [{
				label: 'Bicycle',
				data: createArray('schl_primary_orig_bicycle', suffixes),
				backgroundColor: 'rgba(51,160,44, 0.8)',
				borderColor: 'rgba(51,160,44, 1)',
				borderWidth: 1,
				order: 1
			},
			{
				label: 'Car',
				data: createArray('schl_primary_orig_car', suffixes),
				backgroundColor: 'rgba(227,26,28, 0.8)',
				borderColor: 'rgba(227,26,28, 1)',
				borderWidth: 1,
				order: 5
			},
			{
				label: 'Public transport',
				data: createArray('schl_primary_orig_public_transport', suffixes) ,
				backgroundColor: 'rgba(56,108,176, 0.8)',
				borderColor: 'rgba(56,108,176, 1)',
				borderWidth: 1,
				order: 3
			},
			{
				label: 'Foot',
				data: createArray('schl_primary_orig_foot', suffixes),
				backgroundColor: 'rgba(178,223,138, 0.8)',
				borderColor: 'rgba(178,223,138, 1)',
				borderWidth: 1,
				order: 2
			},
			{
				label: 'Other',
				data: createArray('schl_primary_orig_other', suffixes),
				backgroundColor: 'rgba(166,206,227, 0.8)',
				borderColor: 'rgba(166,206,227, 1)',
				borderWidth: 1,
				order: 6
			}
			
			]
		},
		options: {
			scales: {
				y: {
				  stacked: true,
				  scaleLabel: {
            display: true,
            labelString: 'Daily commuters'
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
	
	// School Secondary Origin
	charts.secondaryOriginChart = new Chart(document.getElementById('secondaryOriginChart').getContext('2d'), {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [{
				label: 'Bicycle',
				data: createArray('schl_secondary_orig_bicycle', suffixes),
				backgroundColor: 'rgba(51,160,44, 0.8)',
				borderColor: 'rgba(51,160,44, 1)',
				borderWidth: 1,
				order: 1
			},
			{
				label: 'Car',
				data: createArray('schl_secondary_orig_car', suffixes),
				backgroundColor: 'rgba(227,26,28, 0.8)',
				borderColor: 'rgba(227,26,28, 1)',
				borderWidth: 1,
				order: 5
			},
			{
				label: 'Public transport',
				data: createArray('schl_secondary_orig_public_transport', suffixes) ,
				backgroundColor: 'rgba(56,108,176, 0.8)',
				borderColor: 'rgba(56,108,176, 1)',
				borderWidth: 1,
				order: 3
			},
			{
				label: 'Foot',
				data: createArray('schl_secondary_orig_foot', suffixes),
				backgroundColor: 'rgba(178,223,138, 0.8)',
				borderColor: 'rgba(178,223,138, 1)',
				borderWidth: 1,
				order: 2
			},
			{
				label: 'Other',
				data: createArray('schl_secondary_orig_other', suffixes),
				backgroundColor: 'rgba(166,206,227, 0.8)',
				borderColor: 'rgba(166,206,227, 1)',
				borderWidth: 1,
				order: 6
			}
			
			]
		},
		options: {
			scales: {
				y: {
				  stacked: true,
				  scaleLabel: {
            display: true,
            labelString: 'Daily commuters'
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
	
	// shopping Origin
	charts.shoppingOriginChart = new Chart(document.getElementById('shoppingOriginChart').getContext('2d'), {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [{
				label: 'Bicycle',
				data: createArray('shopping_orig_bicycle', suffixes),
				backgroundColor: 'rgba(51,160,44, 0.8)',
				borderColor: 'rgba(51,160,44, 1)',
				borderWidth: 1,
				order: 1
			},
			{
				label: 'Car',
				data: createArray('shopping_orig_car', suffixes),
				backgroundColor: 'rgba(227,26,28, 0.8)',
				borderColor: 'rgba(227,26,28, 1)',
				borderWidth: 1,
				order: 5
			},
			{
				label: 'Public transport',
				data: createArray('shopping_orig_public_transport', suffixes) ,
				backgroundColor: 'rgba(56,108,176, 0.8)',
				borderColor: 'rgba(56,108,176, 1)',
				borderWidth: 1,
				order: 3
			},
			{
				label: 'Foot',
				data: createArray('shopping_orig_foot', suffixes),
				backgroundColor: 'rgba(178,223,138, 0.8)',
				borderColor: 'rgba(178,223,138, 1)',
				borderWidth: 1,
				order: 2
			},
			{
				label: 'Taxi',
				data: createArray('shopping_orig_taxi', suffixes),
				backgroundColor: 'rgba(166,206,227, 0.8)',
				borderColor: 'rgba(166,206,227, 1)',
				borderWidth: 1,
				order: 6
			}
			
			]
		},
		options: {
			scales: {
				y: {
				  stacked: true,
				  scaleLabel: {
            display: true,
            labelString: 'Daily shoppers'
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
  
  // shopping Destination
  charts.shoppingDestinationChart = new Chart(document.getElementById('shoppingDestinationChart').getContext('2d'), {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [{
				label: 'Bicycle',
				data: createArray('shopping_dest_bicycle', suffixes),
				backgroundColor: 'rgba(51,160,44, 0.8)',
				borderColor: 'rgba(51,160,44, 1)',
				borderWidth: 1,
				order: 1
			},
			{
				label: 'Car',
				data: createArray('shopping_dest_car', suffixes),
				backgroundColor: 'rgba(227,26,28, 0.8)',
				borderColor: 'rgba(227,26,28, 1)',
				borderWidth: 1,
				order: 5
			},
			{
				label: 'Public transport',
				data: createArray('shopping_dest_public_transport', suffixes) ,
				backgroundColor: 'rgba(56,108,176, 0.8)',
				borderColor: 'rgba(56,108,176, 1)',
				borderWidth: 1,
				order: 3
			},
			{
				label: 'Foot',
				data: createArray('shopping_dest_foot', suffixes),
				backgroundColor: 'rgba(178,223,138, 0.8)',
				borderColor: 'rgba(178,223,138, 1)',
				borderWidth: 1,
				order: 2
			},
			{
				label: 'Taxi',
				data: createArray('shopping_dest_taxi', suffixes),
				backgroundColor: 'rgba(166,206,227, 0.8)',
				borderColor: 'rgba(166,206,227, 1)',
				borderWidth: 1,
				order: 6
			}
			
			]
		},
		options: {
			scales: {
				y: {
				  stacked: true,
				  scaleLabel: {
            display: true,
            labelString: 'Daily shoppers'
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
	
	// leisure Origin
	charts.leisureOriginChart = new Chart(document.getElementById('leisureOriginChart').getContext('2d'), {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [{
				label: 'Bicycle',
				data: createArray('leisure_orig_bicycle', suffixes),
				backgroundColor: 'rgba(51,160,44, 0.8)',
				borderColor: 'rgba(51,160,44, 1)',
				borderWidth: 1,
				order: 1
			},
			{
				label: 'Car',
				data: createArray('leisure_orig_car', suffixes),
				backgroundColor: 'rgba(227,26,28, 0.8)',
				borderColor: 'rgba(227,26,28, 1)',
				borderWidth: 1,
				order: 5
			},
			{
				label: 'Public transport',
				data: createArray('leisure_orig_public_transport', suffixes) ,
				backgroundColor: 'rgba(56,108,176, 0.8)',
				borderColor: 'rgba(56,108,176, 1)',
				borderWidth: 1,
				order: 3
			},
			{
				label: 'Foot',
				data: createArray('leisure_orig_foot', suffixes),
				backgroundColor: 'rgba(178,223,138, 0.8)',
				borderColor: 'rgba(178,223,138, 1)',
				borderWidth: 1,
				order: 2
			},
			{
				label: 'Taxi',
				data: createArray('leisure_orig_taxi', suffixes),
				backgroundColor: 'rgba(166,206,227, 0.8)',
				borderColor: 'rgba(166,206,227, 1)',
				borderWidth: 1,
				order: 6
			}
			
			]
		},
		options: {
			scales: {
				y: {
				  stacked: true,
				  scaleLabel: {
            display: true,
            labelString: 'Daily shoppers'
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
  
  // leisure Destination
  charts.leisureDestinationChart = new Chart(document.getElementById('leisureDestinationChart').getContext('2d'), {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [{
				label: 'Bicycle',
				data: createArray('leisure_dest_bicycle', suffixes),
				backgroundColor: 'rgba(51,160,44, 0.8)',
				borderColor: 'rgba(51,160,44, 1)',
				borderWidth: 1,
				order: 1
			},
			{
				label: 'Car',
				data: createArray('leisure_dest_car', suffixes),
				backgroundColor: 'rgba(227,26,28, 0.8)',
				borderColor: 'rgba(227,26,28, 1)',
				borderWidth: 1,
				order: 5
			},
			{
				label: 'Public transport',
				data: createArray('leisure_dest_public_transport', suffixes) ,
				backgroundColor: 'rgba(56,108,176, 0.8)',
				borderColor: 'rgba(56,108,176, 1)',
				borderWidth: 1,
				order: 3
			},
			{
				label: 'Foot',
				data: createArray('leisure_dest_foot', suffixes),
				backgroundColor: 'rgba(178,223,138, 0.8)',
				borderColor: 'rgba(178,223,138, 1)',
				borderWidth: 1,
				order: 2
			},
			{
				label: 'Taxi',
				data: createArray('leisure_dest_taxi', suffixes),
				backgroundColor: 'rgba(166,206,227, 0.8)',
				borderColor: 'rgba(166,206,227, 1)',
				borderWidth: 1,
				order: 6
			}
			
			]
		},
		options: {
			scales: {
				y: {
				  stacked: true,
				  scaleLabel: {
            display: true,
            labelString: 'Daily shoppers'
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
	
	// visiting Origin
	charts.visitingOriginChart = new Chart(document.getElementById('visitingOriginChart').getContext('2d'), {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [{
				label: 'Bicycle',
				data: createArray('visiting_orig_bicycle', suffixes),
				backgroundColor: 'rgba(51,160,44, 0.8)',
				borderColor: 'rgba(51,160,44, 1)',
				borderWidth: 1,
				order: 1
			},
			{
				label: 'Car',
				data: createArray('visiting_orig_car', suffixes),
				backgroundColor: 'rgba(227,26,28, 0.8)',
				borderColor: 'rgba(227,26,28, 1)',
				borderWidth: 1,
				order: 5
			},
			{
				label: 'Public transport',
				data: createArray('visiting_orig_public_transport', suffixes) ,
				backgroundColor: 'rgba(56,108,176, 0.8)',
				borderColor: 'rgba(56,108,176, 1)',
				borderWidth: 1,
				order: 3
			},
			{
				label: 'Foot',
				data: createArray('visiting_orig_foot', suffixes),
				backgroundColor: 'rgba(178,223,138, 0.8)',
				borderColor: 'rgba(178,223,138, 1)',
				borderWidth: 1,
				order: 2
			},
			{
				label: 'Taxi',
				data: createArray('visiting_orig_taxi', suffixes),
				backgroundColor: 'rgba(166,206,227, 0.8)',
				borderColor: 'rgba(166,206,227, 1)',
				borderWidth: 1,
				order: 6
			}
			
			]
		},
		options: {
			scales: {
				y: {
				  stacked: true,
				  scaleLabel: {
            display: true,
            labelString: 'Daily shoppers'
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
  
	// visiting Destination
	charts.visitingDestinationChart = new Chart(document.getElementById('visitingDestinationChart').getContext('2d'), {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [{
				label: 'Bicycle',
				data: createArray('visiting_dest_bicycle', suffixes),
				backgroundColor: 'rgba(51,160,44, 0.8)',
				borderColor: 'rgba(51,160,44, 1)',
				borderWidth: 1,
				order: 1
			},
			{
				label: 'Car',
				data: createArray('visiting_dest_car', suffixes),
				backgroundColor: 'rgba(227,26,28, 0.8)',
				borderColor: 'rgba(227,26,28, 1)',
				borderWidth: 1,
				order: 5
			},
			{
				label: 'Public transport',
				data: createArray('visiting_dest_public_transport', suffixes) ,
				backgroundColor: 'rgba(56,108,176, 0.8)',
				borderColor: 'rgba(56,108,176, 1)',
				borderWidth: 1,
				order: 3
			},
			{
				label: 'Foot',
				data: createArray('visiting_dest_foot', suffixes),
				backgroundColor: 'rgba(178,223,138, 0.8)',
				borderColor: 'rgba(178,223,138, 1)',
				borderWidth: 1,
				order: 2
			},
			{
				label: 'Taxi',
				data: createArray('visiting_dest_taxi', suffixes),
				backgroundColor: 'rgba(166,206,227, 0.8)',
				borderColor: 'rgba(166,206,227, 1)',
				borderWidth: 1,
				order: 6
			}
			
			]
		},
		options: {
			scales: {
				y: {
				  stacked: true,
				  scaleLabel: {
            display: true,
            labelString: 'Daily shoppers'
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
	
	
	
};


