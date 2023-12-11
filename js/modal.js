// Declare Chart Values
var commuteOriginChart;
var commuteDestinationChart;
var primaryOrginChart;
var secondaryOriginChart;
var shoppingOriginChart;
var shoppingDestinationChart;
var leisureOriginChart;
var leisureDestinationChart;
var visitingOriginChart;
var visitingDestinationChart;

// Deinfe the modal

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
  
  // Block Modal when clicking on other layers
  let f = map.queryRenderedFeatures(e.point);
  var layersToExclude = ['composite', 'dasymetric','placenames'];

  f = f.filter(function (el) {
    return !layersToExclude.includes(el.source);
  });
  
  if (f.length == 1) {
    
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
  
	if(commuteOriginChart){commuteOriginChart.destroy();}
	if(commuteDestinationChart){commuteDestinationChart.destroy();}
	if(primaryOrginChart){primaryOrginChart.destroy();}
	if(secondaryOriginChart){secondaryOriginChart.destroy();}
	if(shoppingOriginChart){shoppingOriginChart.destroy();}
	if(shoppingDestinationChart){shoppingDestinationChart.destroy();}
	if(leisureOriginChart){shoppingOriginChart.destroy();}
	if(leisureDestinationChart){shoppingDestinationChart.destroy();}
	if(visitingOriginChart){shoppingOriginChart.destroy();}
	if(visitingDestinationChart){shoppingDestinationChart.destroy();}
  
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

  // Commute Origin
  var bicycle_comm_orig = createArray('comm_orig_bicycle', suffixes);
  var foot_comm_orig = createArray('comm_orig_foot', suffixes);
  var car_comm_orig = createArray('comm_orig_car', suffixes);
  var public_transport_comm_orig = createArray('comm_orig_public_transport', suffixes);
  var taxi_comm_orig = createArray('comm_orig_taxi', suffixes);
  
  // Commute Destination
  var bicycle_comm_dest = createArray('comm_dest_bicycle', suffixes);
  var foot_comm_dest = createArray('comm_dest_foot', suffixes);
  var car_comm_dest = createArray('comm_dest_car', suffixes);
  var public_transport_comm_dest = createArray('comm_dest_public_transport', suffixes);
  var taxi_comm_dest = createArray('comm_dest_taxi', suffixes);
  
  // School Primary Origin
  var bicycle_primary_orig = createArray('schl_primary_orig_bicycle', suffixes);
  var foot_primary_orig = createArray('schl_primary_orig_foot', suffixes);
  var car_primary_orig = createArray('schl_primary_orig_car', suffixes);
  var public_transport_primary_orig = createArray('schl_primary_orig_public_transport', suffixes);
  var other_primary_orig = createArray('schl_primary_orig_other', suffixes);
  
  // School Secondary Origin
  var bicycle_secondary_orig = createArray('schl_secondary_orig_bicycle', suffixes);
  var foot_secondary_orig = createArray('schl_secondary_orig_foot', suffixes);
  var car_secondary_orig = createArray('schl_secondary_orig_car', suffixes);
  var public_transport_secondary_orig = createArray('schl_secondary_orig_public_transport', suffixes);
  var other_secondary_orig = createArray('schl_secondary_orig_other', suffixes);
  
  // shopping Origin
  var bicycle_shopping_orig = createArray('shopping_orig_bicycle', suffixes);
  var foot_shopping_orig = createArray('shopping_orig_foot', suffixes);
  var car_shopping_orig = createArray('shopping_orig_car', suffixes);
  var public_transport_shopping_orig = createArray('shopping_orig_public_transport', suffixes);
  var taxi_shopping_orig = createArray('shopping_orig_taxi', suffixes);
  
  // shopping Destination
  var bicycle_shopping_dest = createArray('shopping_dest_bicycle', suffixes);
  var foot_shopping_dest = createArray('shopping_dest_foot', suffixes);
  var car_shopping_dest = createArray('shopping_dest_car', suffixes);
  var public_transport_shopping_dest = createArray('shopping_dest_public_transport', suffixes);
  var taxi_shopping_dest = createArray('shopping_dest_taxi', suffixes);
  
  // leisure Origin
  var bicycle_leisure_orig = createArray('leisure_orig_bicycle', suffixes);
  var foot_leisure_orig = createArray('leisure_orig_foot', suffixes);
  var car_leisure_orig = createArray('leisure_orig_car', suffixes);
  var public_transport_leisure_orig = createArray('leisure_orig_public_transport', suffixes);
  var taxi_leisure_orig = createArray('leisure_orig_taxi', suffixes);
  
  // leisure Destination
  var bicycle_leisure_dest = createArray('leisure_dest_bicycle', suffixes);
  var foot_leisure_dest = createArray('leisure_dest_foot', suffixes);
  var car_leisure_dest = createArray('leisure_dest_car', suffixes);
  var public_transport_leisure_dest = createArray('leisure_dest_public_transport', suffixes);
  var taxi_leisure_dest = createArray('leisure_dest_taxi', suffixes);
  
  // visiting Origin
  var bicycle_visiting_orig = createArray('visiting_orig_bicycle', suffixes);
  var foot_visiting_orig = createArray('visiting_orig_foot', suffixes);
  var car_visiting_orig = createArray('visiting_orig_car', suffixes);
  var public_transport_visiting_orig = createArray('visiting_orig_public_transport', suffixes);
  var taxi_visiting_orig = createArray('visiting_orig_taxi', suffixes);
  
  // visiting Destination
  var bicycle_visiting_dest = createArray('visiting_dest_bicycle', suffixes);
  var foot_visiting_dest = createArray('visiting_dest_foot', suffixes);
  var car_visiting_dest = createArray('visiting_dest_car', suffixes);
  var public_transport_visiting_dest = createArray('visiting_dest_public_transport', suffixes);
  var taxi_visiting_dest = createArray('visiting_dest_taxi', suffixes);
  /*
  var suffixes = [
    '', 
    '_go_dutch_primary_fastest',
    '_ebike_primary_fastest',
    '_go_dutch_primary_quietest',
    '_ebike_primary_quietest'
  ];
  
  // Primary Orig
  var bicycle_primary_orig = createArray('schl_orig_bicycle', suffixes);
  var foot_primary_orig = createArray('schl_orig_foot', suffixes);
  var car_primary_orig = createArray('schl_orig_car', suffixes);
  var public_transport_primary_orig = createArray('schl_orig_public_transport', suffixes);
  var other_primary_orig = createArray('schl_orig_other', suffixes);
  
  var suffixes = [
    '', 
    '_go_dutch_secondary_fastest',
    '_ebike_secondary_fastest',
    '_go_dutch_secondary_quietest',
    '_ebike_secondary_quietest'
  ];

  // Secondary Orig
  var bicycle_secondary_orig = createArray('schl_orig_bicycle', suffixes);
  var foot_secondary_orig = createArray('schl_orig_foot', suffixes);
  var car_secondary_orig = createArray('schl_orig_car', suffixes);
  var public_transport_secondary_orig = createArray('schl_orig_public_transport', suffixes);
  var other_secondary_orig = createArray('schl_orig_other', suffixes);
  */
  
  
  // Commute Origin
  /*
  var bicycle_comm_orig = [
    sub.comm_orig_bicycle, 
    sub.comm_orig_bicycle_go_dutch_fastest,
    sub.comm_orig_bicycle_ebike_fastest,
    sub.comm_orig_bicycle_go_dutch_quietest,
    sub.comm_orig_bicycle_ebike_quietest
    ];
  
  var foot_comm_orig = [
    sub.comm_orig_foot, 
    sub.comm_orig_foot_go_dutch_fastest,
    sub.comm_orig_foot_ebike_fastest,
    sub.comm_orig_foot_go_dutch_quietest,
    sub.comm_orig_foot_ebike_quietest
    ];
    
  var car_comm_orig = [
    sub.comm_orig_car, 
    sub.comm_orig_car_go_dutch_fastest,
    sub.comm_orig_car_ebike_fastest,
    sub.comm_orig_car_go_dutch_quietest,
    sub.comm_orig_car_ebike_quietest
    ];
    
  var public_transport_comm_orig = [
    sub.comm_orig_public_transport, 
    sub.comm_orig_public_transport_go_dutch_fastest,
    sub.comm_orig_public_transport_ebike_fastest,
    sub.comm_orig_public_transport_go_dutch_quietest,
    sub.comm_orig_public_transport_ebike_quietest
    ];
    
  var taxi_comm_orig = [
    sub.comm_orig_taxi, 
    sub.comm_orig_taxi_go_dutch_fastest,
    sub.comm_orig_taxi_ebike_fastest,
    sub.comm_orig_taxi_go_dutch_quietest,
    sub.comm_orig_taxi_ebike_quietest
    ];
  
  
  // Commute Destination
  var bicycle_comm_dest = [
    sub.comm_dest_bicycle, 
    sub.comm_dest_bicycle_go_dutch_fastest,
    sub.comm_dest_bicycle_ebike_fastest,
    sub.comm_dest_bicycle_go_dutch_quietest,
    sub.comm_dest_bicycle_ebike_quietest
    ];
  
  var foot_comm_dest = [
    sub.comm_dest_foot, 
    sub.comm_dest_foot_go_dutch_fastest,
    sub.comm_dest_foot_ebike_fastest,
    sub.comm_dest_foot_go_dutch_quietest,
    sub.comm_dest_foot_ebike_quietest
    ];
    
  var car_comm_dest = [
    sub.comm_dest_car, 
    sub.comm_dest_car_go_dutch_fastest,
    sub.comm_dest_car_ebike_fastest,
    sub.comm_dest_car_go_dutch_quietest,
    sub.comm_dest_car_ebike_quietest
    ];
    
  var public_transport_comm_dest = [
    sub.comm_dest_public_transport, 
    sub.comm_dest_public_transport_go_dutch_fastest,
    sub.comm_dest_public_transport_ebike_fastest,
    sub.comm_dest_public_transport_go_dutch_quietest,
    sub.comm_dest_public_transport_ebike_quietest
    ];
    
  var taxi_comm_dest = [
    sub.comm_dest_taxi, 
    sub.comm_dest_taxi_go_dutch_fastest,
    sub.comm_dest_taxi_ebike_fastest,
    sub.comm_dest_taxi_go_dutch_quietest,
    sub.comm_dest_taxi_ebike_quietest
    ];
    
  */
  
  /*
  // Primary Orig
  var bicycle_primary_orig = [
    sub.bicycle_primary, 
    sub.schl_orig_bicycle_go_dutch_primary_fastest,
    sub.schl_orig_bicycle_ebike_primary_fastest,
    sub.schl_orig_bicycle_go_dutch_primary_quietest,
    sub.schl_orig_bicycle_ebike_primary_quietest
    ];
  
  var foot_primary_orig = [
    sub.foot_primary, 
    sub.schl_orig_foot_go_dutch_primary_fastest,
    sub.schl_orig_foot_ebike_primary_fastest,
    sub.schl_orig_foot_go_dutch_primary_quietest,
    sub.schl_orig_foot_ebike_primary_quietest
    ];
    
  var car_primary_orig = [
    sub.car_primary, 
    sub.schl_orig_car_go_dutch_primary_fastest,
    sub.schl_orig_car_ebike_primary_fastest,
    sub.schl_orig_car_go_dutch_primary_quietest,
    sub.schl_orig_car_ebike_primary_quietest
    ];
    
  var public_transport_primary_orig = [
    sub.public_transport_primary, 
    sub.schl_orig_public_transport_go_dutch_primary_fastest,
    sub.schl_orig_public_transport_ebike_primary_fastest,
    sub.schl_orig_public_transport_go_dutch_primary_quietest,
    sub.schl_orig_public_transport_ebike_primary_quietest
    ];
    
  var other_primary_orig = [
    sub.other_primary, 
    sub.schl_orig_other_go_dutch_primary_fastest,
    sub.schl_orig_other_ebike_primary_fastest,
    sub.schl_orig_other_go_dutch_primary_quietest,
    sub.schl_orig_other_ebike_primary_quietest
    ];
    
  // Secondary Orig
  var bicycle_secondary_orig = [
    sub.bicycle_secondary, 
    sub.schl_orig_bicycle_go_dutch_secondary_fastest,
    sub.schl_orig_bicycle_ebike_secondary_fastest,
    sub.schl_orig_bicycle_go_dutch_secondary_quietest,
    sub.schl_orig_bicycle_ebike_secondary_quietest
    ];
  
  var foot_secondary_orig = [
    sub.foot_secondary, 
    sub.schl_orig_foot_go_dutch_secondary_fastest,
    sub.schl_orig_foot_ebike_secondary_fastest,
    sub.schl_orig_foot_go_dutch_secondary_quietest,
    sub.schl_orig_foot_ebike_secondary_quietest
    ];
    
  var car_secondary_orig = [
    sub.car_secondary, 
    sub.schl_orig_car_go_dutch_secondary_fastest,
    sub.schl_orig_car_ebike_secondary_fastest,
    sub.schl_orig_car_go_dutch_secondary_quietest,
    sub.schl_orig_car_ebike_secondary_quietest
    ];
    
  var public_transport_secondary_orig = [
    sub.public_transport_secondary, 
    sub.schl_orig_public_transport_go_dutch_secondary_fastest,
    sub.schl_orig_public_transport_ebike_secondary_fastest,
    sub.schl_orig_public_transport_go_dutch_secondary_quietest,
    sub.schl_orig_public_transport_ebike_secondary_quietest
    ];
    
  var other_secondary_orig = [
    sub.other_secondary, 
    sub.schl_orig_other_go_dutch_secondary_fastest,
    sub.schl_orig_other_ebike_secondary_fastest,
    sub.schl_orig_other_go_dutch_secondary_quietest,
    sub.schl_orig_other_ebike_secondary_quietest
    ];
  
  */

  var commuteOrigin_ctx = document.getElementById('commuteOriginChart').getContext('2d');
  var commuteDestination_ctx = document.getElementById('commuteDestinationChart').getContext('2d');
  var primaryOrgin_ctx = document.getElementById('primaryOrginChart').getContext('2d');
  var secondaryOrigin_ctx = document.getElementById('secondaryOriginChart').getContext('2d');
  
  var shoppingOrigin_ctx = document.getElementById('shoppingOriginChart').getContext('2d');
  var shoppingDestination_ctx = document.getElementById('shoppingDestinationChart').getContext('2d');
  var leisureOrigin_ctx = document.getElementById('leisureOriginChart').getContext('2d');
  var leisureDestination_ctx = document.getElementById('leisureDestinationChart').getContext('2d');
  var visitingOrigin_ctx = document.getElementById('visitingOriginChart').getContext('2d');
  var visitingDestination_ctx = document.getElementById('visitingDestinationChart').getContext('2d');
  
	commuteOriginChart = new Chart(commuteOrigin_ctx, {
		type: 'bar',
		data: {
			labels: ['Baseline','Go Dutch (Fastest)','Ebike (Fastest)','Go Dutch (Quietest)','Ebike (Quietest)'],
			datasets: [{
				label: 'Bicycle',
				data: bicycle_comm_orig,
				backgroundColor: 'rgba(51,160,44, 0.8)',
				borderColor: 'rgba(51,160,44, 1)',
				borderWidth: 1,
				order: 1
			},
			{
				label: 'Car',
				data: car_comm_orig,
				backgroundColor: 'rgba(227,26,28, 0.8)',
				borderColor: 'rgba(227,26,28, 1)',
				borderWidth: 1,
				order: 5
			},
			{
				label: 'Public transport',
				data: public_transport_comm_orig ,
				backgroundColor: 'rgba(56,108,176, 0.8)',
				borderColor: 'rgba(56,108,176, 1)',
				borderWidth: 1,
				order: 3
			},
			{
				label: 'Foot',
				data: foot_comm_orig,
				backgroundColor: 'rgba(178,223,138, 0.8)',
				borderColor: 'rgba(178,223,138, 1)',
				borderWidth: 1,
				order: 2
			},
			{
				label: 'Taxi',
				data: taxi_comm_orig,
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
  
  commuteDestinationChart = new Chart(commuteDestination_ctx, {
		type: 'bar',
		data: {
			labels: ['Baseline','Go Dutch (Fastest)','Ebike (Fastest)','Go Dutch (Quietest)','Ebike (Quietest)'],
			datasets: [{
				label: 'Bicycle',
				data: bicycle_comm_dest,
				backgroundColor: 'rgba(51,160,44, 0.8)',
				borderColor: 'rgba(51,160,44, 1)',
				borderWidth: 1,
				order: 1
			},
			{
				label: 'Car',
				data: car_comm_dest,
				backgroundColor: 'rgba(227,26,28, 0.8)',
				borderColor: 'rgba(227,26,28, 1)',
				borderWidth: 1,
				order: 5
			},
			{
				label: 'Public transport',
				data: public_transport_comm_dest ,
				backgroundColor: 'rgba(56,108,176, 0.8)',
				borderColor: 'rgba(56,108,176, 1)',
				borderWidth: 1,
				order: 3
			},
			{
				label: 'Foot',
				data: foot_comm_dest,
				backgroundColor: 'rgba(178,223,138, 0.8)',
				borderColor: 'rgba(178,223,138, 1)',
				borderWidth: 1,
				order: 2
			},
			{
				label: 'Taxi',
				data: taxi_comm_dest,
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
	
	primaryOrginChart = new Chart(primaryOrgin_ctx, {
		type: 'bar',
		data: {
			labels: ['Baseline','Go Dutch (Fastest)','Ebike (Fastest)','Go Dutch (Quietest)','Ebike (Quietest)'],
			datasets: [{
				label: 'Bicycle',
				data: bicycle_primary_orig,
				backgroundColor: 'rgba(51,160,44, 0.8)',
				borderColor: 'rgba(51,160,44, 1)',
				borderWidth: 1,
				order: 1
			},
			{
				label: 'Car',
				data: car_primary_orig,
				backgroundColor: 'rgba(227,26,28, 0.8)',
				borderColor: 'rgba(227,26,28, 1)',
				borderWidth: 1,
				order: 5
			},
			{
				label: 'Public transport',
				data: public_transport_primary_orig ,
				backgroundColor: 'rgba(56,108,176, 0.8)',
				borderColor: 'rgba(56,108,176, 1)',
				borderWidth: 1,
				order: 3
			},
			{
				label: 'Foot',
				data: foot_primary_orig,
				backgroundColor: 'rgba(178,223,138, 0.8)',
				borderColor: 'rgba(178,223,138, 1)',
				borderWidth: 1,
				order: 2
			},
			{
				label: 'Other',
				data: other_primary_orig,
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
	
	secondaryOriginChart = new Chart(secondaryOrigin_ctx, {
		type: 'bar',
		data: {
			labels: ['Baseline','Go Dutch (Fastest)','Ebike (Fastest)','Go Dutch (Quietest)','Ebike (Quietest)'],
			datasets: [{
				label: 'Bicycle',
				data: bicycle_secondary_orig,
				backgroundColor: 'rgba(51,160,44, 0.8)',
				borderColor: 'rgba(51,160,44, 1)',
				borderWidth: 1,
				order: 1
			},
			{
				label: 'Car',
				data: car_secondary_orig,
				backgroundColor: 'rgba(227,26,28, 0.8)',
				borderColor: 'rgba(227,26,28, 1)',
				borderWidth: 1,
				order: 5
			},
			{
				label: 'Public transport',
				data: public_transport_secondary_orig ,
				backgroundColor: 'rgba(56,108,176, 0.8)',
				borderColor: 'rgba(56,108,176, 1)',
				borderWidth: 1,
				order: 3
			},
			{
				label: 'Foot',
				data: foot_secondary_orig,
				backgroundColor: 'rgba(178,223,138, 0.8)',
				borderColor: 'rgba(178,223,138, 1)',
				borderWidth: 1,
				order: 2
			},
			{
				label: 'Other',
				data: other_secondary_orig,
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
	
	
	shoppingOriginChart = new Chart(shoppingOrigin_ctx, {
		type: 'bar',
		data: {
			labels: ['Baseline','Go Dutch (Fastest)','Ebike (Fastest)','Go Dutch (Quietest)','Ebike (Quietest)'],
			datasets: [{
				label: 'Bicycle',
				data: bicycle_shopping_orig,
				backgroundColor: 'rgba(51,160,44, 0.8)',
				borderColor: 'rgba(51,160,44, 1)',
				borderWidth: 1,
				order: 1
			},
			{
				label: 'Car',
				data: car_shopping_orig,
				backgroundColor: 'rgba(227,26,28, 0.8)',
				borderColor: 'rgba(227,26,28, 1)',
				borderWidth: 1,
				order: 5
			},
			{
				label: 'Public transport',
				data: public_transport_shopping_orig ,
				backgroundColor: 'rgba(56,108,176, 0.8)',
				borderColor: 'rgba(56,108,176, 1)',
				borderWidth: 1,
				order: 3
			},
			{
				label: 'Foot',
				data: foot_shopping_orig,
				backgroundColor: 'rgba(178,223,138, 0.8)',
				borderColor: 'rgba(178,223,138, 1)',
				borderWidth: 1,
				order: 2
			},
			{
				label: 'Taxi',
				data: taxi_shopping_orig,
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
  
  shoppingDestinationChart = new Chart(shoppingDestination_ctx, {
		type: 'bar',
		data: {
			labels: ['Baseline','Go Dutch (Fastest)','Ebike (Fastest)','Go Dutch (Quietest)','Ebike (Quietest)'],
			datasets: [{
				label: 'Bicycle',
				data: bicycle_shopping_dest,
				backgroundColor: 'rgba(51,160,44, 0.8)',
				borderColor: 'rgba(51,160,44, 1)',
				borderWidth: 1,
				order: 1
			},
			{
				label: 'Car',
				data: car_shopping_dest,
				backgroundColor: 'rgba(227,26,28, 0.8)',
				borderColor: 'rgba(227,26,28, 1)',
				borderWidth: 1,
				order: 5
			},
			{
				label: 'Public transport',
				data: public_transport_shopping_dest ,
				backgroundColor: 'rgba(56,108,176, 0.8)',
				borderColor: 'rgba(56,108,176, 1)',
				borderWidth: 1,
				order: 3
			},
			{
				label: 'Foot',
				data: foot_shopping_dest,
				backgroundColor: 'rgba(178,223,138, 0.8)',
				borderColor: 'rgba(178,223,138, 1)',
				borderWidth: 1,
				order: 2
			},
			{
				label: 'Taxi',
				data: taxi_shopping_dest,
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
	
	leisureOriginChart = new Chart(leisureOrigin_ctx, {
		type: 'bar',
		data: {
			labels: ['Baseline','Go Dutch (Fastest)','Ebike (Fastest)','Go Dutch (Quietest)','Ebike (Quietest)'],
			datasets: [{
				label: 'Bicycle',
				data: bicycle_leisure_orig,
				backgroundColor: 'rgba(51,160,44, 0.8)',
				borderColor: 'rgba(51,160,44, 1)',
				borderWidth: 1,
				order: 1
			},
			{
				label: 'Car',
				data: car_leisure_orig,
				backgroundColor: 'rgba(227,26,28, 0.8)',
				borderColor: 'rgba(227,26,28, 1)',
				borderWidth: 1,
				order: 5
			},
			{
				label: 'Public transport',
				data: public_transport_leisure_orig ,
				backgroundColor: 'rgba(56,108,176, 0.8)',
				borderColor: 'rgba(56,108,176, 1)',
				borderWidth: 1,
				order: 3
			},
			{
				label: 'Foot',
				data: foot_leisure_orig,
				backgroundColor: 'rgba(178,223,138, 0.8)',
				borderColor: 'rgba(178,223,138, 1)',
				borderWidth: 1,
				order: 2
			},
			{
				label: 'Taxi',
				data: taxi_leisure_orig,
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
  
  leisureDestinationChart = new Chart(leisureDestination_ctx, {
		type: 'bar',
		data: {
			labels: ['Baseline','Go Dutch (Fastest)','Ebike (Fastest)','Go Dutch (Quietest)','Ebike (Quietest)'],
			datasets: [{
				label: 'Bicycle',
				data: bicycle_leisure_dest,
				backgroundColor: 'rgba(51,160,44, 0.8)',
				borderColor: 'rgba(51,160,44, 1)',
				borderWidth: 1,
				order: 1
			},
			{
				label: 'Car',
				data: car_leisure_dest,
				backgroundColor: 'rgba(227,26,28, 0.8)',
				borderColor: 'rgba(227,26,28, 1)',
				borderWidth: 1,
				order: 5
			},
			{
				label: 'Public transport',
				data: public_transport_leisure_dest ,
				backgroundColor: 'rgba(56,108,176, 0.8)',
				borderColor: 'rgba(56,108,176, 1)',
				borderWidth: 1,
				order: 3
			},
			{
				label: 'Foot',
				data: foot_leisure_dest,
				backgroundColor: 'rgba(178,223,138, 0.8)',
				borderColor: 'rgba(178,223,138, 1)',
				borderWidth: 1,
				order: 2
			},
			{
				label: 'Taxi',
				data: taxi_leisure_dest,
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
	
	visitingOriginChart = new Chart(visitingOrigin_ctx, {
		type: 'bar',
		data: {
			labels: ['Baseline','Go Dutch (Fastest)','Ebike (Fastest)','Go Dutch (Quietest)','Ebike (Quietest)'],
			datasets: [{
				label: 'Bicycle',
				data: bicycle_visiting_orig,
				backgroundColor: 'rgba(51,160,44, 0.8)',
				borderColor: 'rgba(51,160,44, 1)',
				borderWidth: 1,
				order: 1
			},
			{
				label: 'Car',
				data: car_visiting_orig,
				backgroundColor: 'rgba(227,26,28, 0.8)',
				borderColor: 'rgba(227,26,28, 1)',
				borderWidth: 1,
				order: 5
			},
			{
				label: 'Public transport',
				data: public_transport_visiting_orig ,
				backgroundColor: 'rgba(56,108,176, 0.8)',
				borderColor: 'rgba(56,108,176, 1)',
				borderWidth: 1,
				order: 3
			},
			{
				label: 'Foot',
				data: foot_visiting_orig,
				backgroundColor: 'rgba(178,223,138, 0.8)',
				borderColor: 'rgba(178,223,138, 1)',
				borderWidth: 1,
				order: 2
			},
			{
				label: 'Taxi',
				data: taxi_visiting_orig,
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
  
  visitingDestinationChart = new Chart(visitingDestination_ctx, {
		type: 'bar',
		data: {
			labels: ['Baseline','Go Dutch (Fastest)','Ebike (Fastest)','Go Dutch (Quietest)','Ebike (Quietest)'],
			datasets: [{
				label: 'Bicycle',
				data: bicycle_visiting_dest,
				backgroundColor: 'rgba(51,160,44, 0.8)',
				borderColor: 'rgba(51,160,44, 1)',
				borderWidth: 1,
				order: 1
			},
			{
				label: 'Car',
				data: car_visiting_dest,
				backgroundColor: 'rgba(227,26,28, 0.8)',
				borderColor: 'rgba(227,26,28, 1)',
				borderWidth: 1,
				order: 5
			},
			{
				label: 'Public transport',
				data: public_transport_visiting_dest ,
				backgroundColor: 'rgba(56,108,176, 0.8)',
				borderColor: 'rgba(56,108,176, 1)',
				borderWidth: 1,
				order: 3
			},
			{
				label: 'Foot',
				data: foot_visiting_dest,
				backgroundColor: 'rgba(178,223,138, 0.8)',
				borderColor: 'rgba(178,223,138, 1)',
				borderWidth: 1,
				order: 2
			},
			{
				label: 'Taxi',
				data: taxi_visiting_dest,
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


