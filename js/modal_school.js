// Travel to School Modeshare



// Declare charts collection
var charts = {};

// Define the modal
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
  
  console.log("Click on schools")
  
  // Block Modal when clicking on other layers
  let f = map.queryRenderedFeatures(e.point);
  var layersToExclude = ['composite', 'dasymetric','placenames'];

  f = f.filter(function (el) {
    return !layersToExclude.includes(el.source);
    //return el.source != 'composite';
  });
  
  //console.log(f[0].sourceLayer)
  
  
  if (f[0].sourceLayer == "schools") {
    
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
    'Go Dutch (Fastest)','Ebike (Fastest)',
    'Go Dutch (Quietest)','Ebike (Quietest)'
  ];
  
  function createChart (id, prefix, labelString)
  {
	const modes = [
		// Label, field (e.g. bicycle => comm_orig_bicycle_ebike_fastest), background colour, border colour
		['Bicycle', 'bicycle', 'rgba(51,160,44, 0.8)', 'rgba(51,160,44, 1)'],
		['Foot', 'foot', 'rgba(178,223,138, 0.8)', 'rgba(178,223,138, 1)'],
		['Public transport', 'public_transport', 'rgba(56,108,176, 0.8)', 'rgba(56,108,176, 1)'],
		['Car', 'car', 'rgba(227,26,28, 0.8)', 'rgba(227,26,28, 1)'],
		['Other', 'other', 'rgba(166,206,227, 0.8)', 'rgba(166,206,227, 1)'],	// #!# NB the main modal has taxi rather than other
	];
	
	// Assemble the datasets
	var datasets = [];
	modes.forEach (mode => {
		datasets.push (
			{
				label: mode[0],
				data: createArray(prefix + '_' + mode[1], suffixes),
				backgroundColor: mode[2],
				borderColor: mode[3],
				borderWidth: 1
			}
		)
	});
	
	return new Chart(document.getElementById(id).getContext('2d'), {
		type: 'bar',
		data: {
			labels: labels,
			datasets: datasets
		},
		options: {
			scales: {
				y: {
				  stacked: true,
				  title: {
            display: true,
            text: labelString
          },
				  scaleLabel: {
            display: true
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
	})
  }

	
	  // Define chart parameters
	chartDefinitions = [
		['primaryChart', 'schl_primary_dest', 'Number of Children'],	// School Primary Destination
		['secondaryChart', 'schl_primary_dest', 'Number of Children'],	// School Secondary Destination  #!# Data doesn't seem to be present/showing
	];
	
	chartDefinitions.forEach ((chartDefinition, i) => {
		charts[i] = createChart (chartDefinition[0], chartDefinition[1], chartDefinition[2]);
	});
	
};
