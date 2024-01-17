// #!# Need to define the assumed data structure, e.g. the 'charts' key shows a part field

// Data zones
const chartDefinitions = {

  // UI elements
  mapLayerId: 'data_zones',
  location_modal_id: "zone_modal",

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

  // Scenario suffixes and their labels
  scenarios: [
    ['', 'Baseline'],
    ['_go_dutch_fastest', 'Go Dutch (Fastest)'],
    ['_ebike_fastest', 'Ebike (Fastest)'],
    ['_go_dutch_quietest', 'Go Dutch (Quietest)'],
    ['_ebike_quietest', 'Ebike (Quietest)']
  ]
};


// Travel to School Modeshare
const chartDefinitionsSchools = {

  // UI elements
  mapLayerId: 'schools',
  location_modal_id: "school_modal",

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

  // Scenario suffixes and their labels
  scenarios: [
    ['', 'Baseline'],
    ['_go_dutch_fastest', 'Go Dutch (Fastest)'],
    ['_ebike_fastest', 'Ebike (Fastest)'],
    ['_go_dutch_quietest', 'Go Dutch (Quietest)'],
    ['_ebike_quietest', 'Ebike (Quietest)']
  ]
};



// Function to create a chart modal
const chartsModal = function (chartDefinitions) {

  // Create the modal
  const location_modal = newModal (chartDefinitions.location_modal_id);

  // Open modal on clicking the supported map layer
  const charts = {};
  map.on('click', chartDefinitions.mapLayerId, function (e) {

    // Ensure the source matches
    let clickedFeatures = map.queryRenderedFeatures(e.point);
    clickedFeatures = clickedFeatures.filter(function (el) {
      const layersToExclude = ['composite', 'dasymetric', 'placenames'];  // #!# Hard-coded list - need to clarify purpose
      return !layersToExclude.includes(el.source);
      //return el.source != 'composite';
    });
    if (clickedFeatures[0].sourceLayer != chartDefinitions.mapLayerId) {
      return;
    }
    
    // Display the modal
    location_modal.show ();

    // Assemble the JSON data file URL
    const featureProperties = e.features[0].properties;
    const locationId = featureProperties[chartDefinitions.propertiesField];
    const dataUrl = chartDefinitions.dataUrl.replace('%id', locationId);

    // Get the data
    fetch(dataUrl)
      .then (function (response) {return response.json ();})
      .then (function (json) {
        const locationData = json[0];
        //console.log ('Retrieved data for location ' + locationId, locationData);

        //Hide Spinner
        //document.getElementById('loader').style.display = 'none';

        // Set the title
        const title = chartDefinitions.titlePrefix + featureProperties[chartDefinitions.titleField];
        document.getElementById(chartDefinitions.titleId).innerHTML = '<h2>' + title + '</h2>';

        // Create the charts
        createCharts(locationData);
      })
      .catch (function (error) {
        alert('Failed to get data for this location. Please try refreshing the page.');
      });
  });


  // Function to create all charts
  function createCharts(locationData) {

    // Create each chart, clearing existing if present
    chartDefinitions.charts.forEach((chartDefinition, i) => {
      if (charts[i]) {
        charts[i].destroy();
      }
      charts[i] = createChart(locationData, chartDefinition[0], chartDefinition[1], chartDefinition[2]);
    });
  };


  // Function to create a chart
  function createChart(locationData, id, prefix, labelString) {

    // Assemble the datasets
    const datasets = [];
    chartDefinitions.modes.forEach(mode => {
      datasets.push({
        label: mode[0],
        data: chartDefinitions.scenarios.map(scenario => locationData[prefix + '_' + mode[1] + scenario[0]]),
        backgroundColor: mode[2],
        borderColor: mode[3],
        borderWidth: 1
      })
    });

    // Create and return the chart
    return new Chart(document.getElementById(id).getContext('2d'), {
      type: 'bar',
      data: {
        labels: chartDefinitions.scenarios.map(scenario => scenario[1]),
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
}


chartsModal(chartDefinitions);
chartsModal(chartDefinitionsSchools);
