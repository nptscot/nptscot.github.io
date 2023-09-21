// Declare Chart Values
var commuteOriginChart;
var commuteDestinationChart;
var primaryOrginChart;
var secondaryOriginChart;

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
        //Hide Spinner
        //$('#loader').hide();
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
  
	if(commuteOriginChart){
		commuteOriginChart.destroy();
	}
	if(commuteDestinationChart){
		commuteDestinationChart.destroy();
	}
	if(primaryOrginChart){
		primaryOrginChart.destroy();
	}
	if(secondaryOriginChart){
		secondaryOriginChart.destroy();
	}
  
  
  // Commute Origin
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
  

  var commuteOrigin_ctx = document.getElementById('commuteOriginChart').getContext('2d');
  var commuteDestination_ctx = document.getElementById('commuteDestinationChart').getContext('2d');
  var primaryOrgin_ctx = document.getElementById('primaryOrginChart').getContext('2d');
  var secondaryOrigin_ctx = document.getElementById('secondaryOriginChart').getContext('2d');
  
  
  
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
	
	
	
};


