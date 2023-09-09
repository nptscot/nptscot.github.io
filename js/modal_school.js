// Declare Chart Values
var t2sChart;

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
  var layersToExclude = ['composite', 'dasymetric','placenames'];

  f = f.filter(function (el) {
    return !layersToExclude.includes(el.source);
    //return el.source != 'composite';
  });
  
  if (f.length == 1) {
    
    school_modal.style.display = "block";
	
    var sub = e.features[0].properties;
  	var dataurl = 'https://nptscot.blob.core.windows.net/json/School/' + sub.SeedCode + '.json';
    var schooldata;
    $.getJSON(dataurl, function (json) {
        console.log( "downloaded school json" );
        schooldata = json[0];
    })
      .done(function() {
        //Hide Spinner
        //$('#loader').hide();
        document.getElementById("school-modal-title").innerHTML = "<h2>" + sub.SchoolName + "</h2>";
        // Define Charts
  		  makeChartsModeshareSchool(schooldata);
      })
      .fail(function() {
        alert("Failed to get data for this school, please try refreshing the page");
      });
    
    //return;
  } 
	
});






makeChartsModeshareSchool = function(sub){
  
  // Mode share by origin
  // Mode share by desitination
  // Baseline
  // GoDuch
  
  // 4 stacke bar makeChartsTransport
  // Travel to Work Modeshare
	if(t2sChart){
		t2sChart.destroy();
	}
	
	var currentShare = [
	  sub.bicycle_primary,
	  sub.foot_primary,
	  sub.public_transport_primary,
	  sub.car_primary,
	  sub.other_primary
	];
	
	
	var futureShare = [
	  sub.bicycle_go_dutch_primary_fastest,
	  sub.foot_go_dutch_primary_fastest,
	  sub.public_transport_go_dutch_primary_fastest,
	  sub.car_go_dutch_primary_fastest,
	  sub.other_go_dutch_primary_fastest
	];
  
  
  // Travel to School Modeshare
	if(t2sChart){
		t2sChart.destroy();
	}
	
	var t2sctx = document.getElementById('t2sChart').getContext('2d');
	t2sChart = new Chart(t2sctx, {
		type: 'doughnut',
		data: {
			datasets: [{
				label: 'Go Dutch',
				data: futureShare,
				backgroundColor: [
				'rgba(178,223,138, 1)',
				'rgba(51,160,44, 1)',
				'rgba(227,26,28, 1)',
				'rgba(128,128,128, 1)',
				'rgba(35,35,35, 1)'
				],
				weight: 0.2
				
			},{
				label: 'Basline',
				data: currentShare,
				backgroundColor: [
				'rgba(178,223,138, 1)',
				'rgba(51,160,44, 1)',
				'rgba(227,26,28, 1)',
				'rgba(128,128,128, 1)',
				'rgba(35,35,35, 1)'
				]
				
			}],
			
			labels: ['Bicycle','Foot','Public Transport','Car','Other']
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			cutoutPercentage: 0,
			legend : {
			  position: 'right',
        align: 'middle'
			}
		}
	});
  
  
	
	
	
	
	
	
	
};


