var chartsModal = function (chartDefinitions) {

	// Define the modal
	var location_modal = document.getElementById(chartDefinitions.location_modal_id);
	// Get the <span> element that closes the modal
	var span_modal = document.getElementsByClassName(chartDefinitions.location_modal_close)[0];
  
	// When the user clicks on <span> (x), close the modal
	span_modal.onclick = function () {
		location_modal.style.display = "none";
	};
  
	// When the user clicks anywhere outside of the modal, close it
	// #!# This has crosstalk with the other modal implementation
	window.onclick = function (event) {
		if (event.target == location_modal) {
		location_modal.style.display = "none";
	  }
	};
  
	// How map triggers the modal 
	// On click open modal
	map.on('click', chartDefinitions.mapLayerId, function (e) {
  
	  console.log("Click on location")
  
	  // Block Modal when clicking on other layers
	  let f = map.queryRenderedFeatures(e.point);
	  var layersToExclude = ['composite', 'dasymetric', 'placenames'];
  
	  f = f.filter(function (el) {
		return !layersToExclude.includes(el.source);
		//return el.source != 'composite';
	  });
  
	  //console.log(f[0].sourceLayer)
	  if (f[0].sourceLayer == chartDefinitions.mapLayerId) {
  
		location_modal.style.display = "block";
  
		var sub = e.features[0].properties;
		var dataurl = chartDefinitions.dataUrl.replace ('%id', sub[chartDefinitions.propertiesField]);
		var locationData;
		$.getJSON(dataurl, function (json) {
			console.log("downloaded location json");
			locationData = json[0];
		  })
		  .done(function () {
			//Hide Spinner
			//$('#loader').hide();
			document.getElementById(chartDefinitions.titleId).innerHTML = "<h2>" + chartDefinitions.titlePrefix + sub[chartDefinitions.titleField] + "</h2>";
			// Define Charts
			createCharts(locationData);
		  })
		  .fail(function () {
			alert("Failed to get data for this location, please try refreshing the page");
		  });
  
		//return;
	  }
	});
  
	var charts = {};
	function createCharts (sub) {
  
	  // Clear existing if present
	  Object.keys(charts).forEach(i => {
		if (charts[i]) {
          charts[i].destroy();
		}
	  });
  
	  function createArray(prefix, suffixes) {
		return suffixes.map(suffix => sub[prefix + suffix]);
	  }
  
	  function createChart(id, prefix, labelString) {
		
		// Assemble the datasets
		var datasets = [];
		chartDefinitions.modes.forEach(mode => {
		  datasets.push({
			label: mode[0],
			data: createArray(prefix + '_' + mode[1], chartDefinitions.suffixes),
			backgroundColor: mode[2],
			borderColor: mode[3],
			borderWidth: 1
		  })
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
				title: {
				  display: true,
				  text: labelString
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
  
	  // Create each chart
	  chartDefinitions.charts.forEach((chartDefinition, i) => {
		charts[i] = createChart(chartDefinition[0], chartDefinition[1], chartDefinition[2]);
	  });
	};
  }
  
  
  
// Data zones
var chartDefinitions = {
	
	// UI elements
	mapLayerId: 'data_zones', 
	location_modal_id: "zone_modal",
	location_modal_close: 'closemodal',

	// Data fields
	dataUrl: 'https://nptscot.blob.core.windows.net/json/DataZone/%id.json',
	propertiesField: 'DataZone',
	titleField: 'DataZone',

	// Title
	titleId: 'zone-modal-title',
	titlePrefix: 'Zone Summary: ',

	charts: [
		// #!# Labels are sometimes wrong, but don't seem to be used anyway
		['commuteOriginChart', 'comm_orig', 'Daily commuters'], // Commute Origin
		['commuteDestinationChart', 'comm_dest', 'Daily commuters'], // Commute Destination
		['primaryOrginChart', 'schl_primary_orig', 'Daily commuters'], // School Primary Origin
		['secondaryOriginChart', 'schl_secondary_orig', 'Daily commuters'], // School Secondary Origin
		['shoppingOriginChart', 'shopping_orig', 'Daily shoppers'], // shopping Origin
		['shoppingDestinationChart', 'shopping_dest', 'Daily shoppers'], // shopping Destination
		['leisureOriginChart', 'leisure_orig', 'Daily shoppers'], // leisure Origin
		['leisureDestinationChart', 'leisure_dest', 'Daily shoppers'], // leisure Destination
		['visitingOriginChart', 'visiting_orig', 'Daily shoppers'], // visiting Origin
		['visitingDestinationChart', 'visiting_dest', 'Daily shoppers'], // visiting Destination
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

chartsModal (chartDefinitions);



// Travel to School Modeshare
var chartDefinitionsSchools = {
	
	// UI elements
	mapLayerId: 'schools',
	location_modal_id: "school_modal",
	location_modal_close: 'closeschoolmodal',

	// Data fields
	dataUrl: 'https://nptscot.blob.core.windows.net/json/School/%id.json',
	propertiesField: 'SeedCode',
	titleField: 'SchoolName',

	// Title
	titleId: 'school-modal-title',
	titlePrefix: '',

	charts: [
		['primaryChart', 'schl_primary_dest', 'Number of Children'], // School Primary Destination
		['secondaryChart', 'schl_primary_dest', 'Number of Children'], // School Secondary Destination  #!# Data doesn't seem to be present/showing
	],

	modes: [
		// Label, field (e.g. bicycle => comm_orig_bicycle_ebike_fastest), background colour, border colour
		['Bicycle', 'bicycle', 'rgba(51,160,44, 0.8)', 'rgba(51,160,44, 1)'],
		['Foot', 'foot', 'rgba(178,223,138, 0.8)', 'rgba(178,223,138, 1)'],
		['Public transport', 'public_transport', 'rgba(56,108,176, 0.8)', 'rgba(56,108,176, 1)'],
		['Car', 'car', 'rgba(227,26,28, 0.8)', 'rgba(227,26,28, 1)'],
		['Other', 'other', 'rgba(166,206,227, 0.8)', 'rgba(166,206,227, 1)'], // #!# NB the main modal has taxi rather than other
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


chartsModal (chartDefinitionsSchools);
