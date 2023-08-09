// Declare Chart Values
var mode_school_chart;

// Deinfe the modal

var school_modal = document.getElementById("school_modal");
// Get the <span> element that closes the modal
var span_modal = document.getElementsByClassName("closeschoolmodal")[0];

// When the user clicks on <span> (x), close the modal
span_modal.onclick = function() {
  school_modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == school_modal) {
	school_modal.style.display = "none";
  }
};

// How map triggers the modal 
// On click open modal
map.on('click', 'schools', function(e) {
  
  
  
  // Block Modal when clicking on other layers
  let f = map.queryRenderedFeatures(e.point);
  f = f.filter(function (el) {
    return el.source != 'composite';
  });
  
  console.log(f);
  
  if (f.length == 1) {
    
    school_modal.style.display = "block";
	
    var sub = e.features[0].properties;
  	var dataurl = 'https://nptscot.blob.core.windows.net/json/School/' + sub.SeedCode + '.json';
    var zonedata;
    $.getJSON(dataurl, function (json) {
        console.log( "downloaded school json" );
        zonedata = json[0];
    })
      .done(function() {
        //Hide Spinner
        //$('#loader').hide();
        // Define Charts
  		  makeChartsModeshare(zonedata);
      })
      .fail(function() {
        alert("Failed to get data for this school, please try refreshing the page");
      });
    
    //return;
  } 
	
});






makeChartsModeshare = function(sub){
  
  // Mode share by origin
  // Mode share by desitination
  // Baseline
  // GoDuch
  
  // 4 stacke bar makeChartsTransport
  // Travel to Work Modeshare
	if(mode_school_chart){
		mode_school_chart.destroy();
	}
  
  var bicycle = [
    sub.comm_orig_bicycle, 
    sub.comm_orig_bicycle_go_dutch_fastest, 
    sub.comm_dest_bicycle, 
    sub.comm_dest_bicycle_go_dutch_fastest
    ];
  
  var car_driver = [
    sub.comm_orig_car_driver, 
    sub.comm_orig_car_driver_go_dutch_fastest, 
    sub.comm_dest_car_driver, 
    sub.comm_dest_car_driver_go_dutch_fastest
    ];
    
  var car_passenger = [
    sub.comm_orig_car_passenger, 
    sub.comm_orig_car_passenger_go_dutch_fastest, 
    sub.comm_dest_car_passenger, 
    sub.comm_dest_car_passenger_go_dutch_fastest
    ];
    
  var public_transport = [
    sub.comm_orig_public_transport, 
    sub.comm_orig_public_transport_go_dutch_fastest, 
    sub.comm_dest_public_transport, 
    sub.comm_dest_public_transport_go_dutch_fastest
    ];
    
  var foot = [
    sub.comm_orig_foot, 
    sub.comm_orig_foot_go_dutch_fastest, 
    sub.comm_dest_foot, 
    sub.comm_dest_foot_go_dutch_fastest
    ];
    
  var other = [
    sub.comm_orig_other, 
    sub.comm_orig_other_go_dutch_fastest, 
    sub.comm_dest_other, 
    sub.comm_dest_other_go_dutch_fastest
    ];
  
  
  var mode_school_ctx = document.getElementById('mode_school_chart').getContext('2d');
	mode_school_chart = new Chart(mode_school_ctx, {
		type: 'bar',
		data: {
			labels: ['Leaving Baseline','Leaving Go Dutch','Arriving Baseline','Arriving Go Dutch'],
			datasets: [{
				label: 'Bicycle',
				data: bicycle,
				backgroundColor: 'rgba(51,160,44, 0.8)',
				borderColor: 'rgba(51,160,44, 1)',
				borderWidth: 1,
				order: 1
			},
			{
				label: 'Car driver',
				data: car_driver,
				backgroundColor: 'rgba(227,26,28, 0.8)',
				borderColor: 'rgba(227,26,28, 1)',
				borderWidth: 1,
				order: 5
			},
			{
				label: 'Car passenger',
				data: car_passenger,
				backgroundColor: 'rgba(251,154,153, 0.8)',
				borderColor: 'rgba(251,154,153, 1)',
				borderWidth: 1,
				order: 4
			},
			{
				label: 'Public transport',
				data: public_transport ,
				backgroundColor: 'rgba(56,108,176, 0.8)',
				borderColor: 'rgba(56,108,176, 1)',
				borderWidth: 1,
				order: 3
			},
			{
				label: 'Foot',
				data: foot,
				backgroundColor: 'rgba(178,223,138, 0.8)',
				borderColor: 'rgba(178,223,138, 1)',
				borderWidth: 1,
				order: 2
			},
			{
				label: 'Other',
				data: other,
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


