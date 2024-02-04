// #!# Need to define the assumed data structure, e.g. the 'charts' key shows a part field

// Data zones
const chartDefinition = {

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
    // #!# Chart labels can be refactored to single setting
    ['commuteOriginChart', 'comm_orig', 'Annual Average Daily Flow'], // Commute Origin
    ['commuteDestinationChart', 'comm_dest', 'Annual Average Daily Flow'], // Commute Destination
    ['primaryOrginChart', 'schl_primary_orig', 'Annual Average Daily Flow'], // School Primary Origin
    ['secondaryOriginChart', 'schl_secondary_orig', 'Annual Average Daily Flow'], // School Secondary Origin
    ['shoppingOriginChart', 'shopping_orig', 'Annual Average Daily Flow'], // shopping Origin
    ['shoppingDestinationChart', 'shopping_dest', 'Annual Average Daily Flow'], // shopping Destination
    ['leisureOriginChart', 'leisure_orig', 'Annual Average Daily Flow'], // leisure Origin
    ['leisureDestinationChart', 'leisure_dest', 'Annual Average Daily Flow'], // leisure Destination
    ['visitingOriginChart', 'visiting_orig', 'Annual Average Daily Flow'], // visiting Origin
    ['visitingDestinationChart', 'visiting_dest', 'Annual Average Daily Flow'], // visiting Destination
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
const chartDefinitionSchools = {

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
    ['primaryChart', 'schl_primary_dest', 'Annual Average Daily Flow'], // School Primary Destination
    ['secondaryChart', 'schl_primary_dest', 'Annual Average Daily Flow'], // School Secondary Destination  #!# Data doesn't seem to be present/showing
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
const chartsModal = function (chartDefinition) {

  // Create the modal
  const location_modal = newModal (chartDefinition.location_modal_id);

  // Open modal on clicking the supported map layer
  const chartHandles = {};
  map.on('click', chartDefinition.mapLayerId, function (e) {

    // Ensure the source matches
    let clickedFeatures = map.queryRenderedFeatures(e.point);
    clickedFeatures = clickedFeatures.filter(function (el) {
      const layersToExclude = ['composite', 'dasymetric', 'placenames'];  // #!# Hard-coded list - need to clarify purpose
      return !layersToExclude.includes(el.source);
      //return el.source != 'composite';
    });
    if (clickedFeatures[0].sourceLayer != chartDefinition.mapLayerId) {
      return;
    }
    
    // Display the modal
    location_modal.show ();

    // Assemble the JSON data file URL
    const featureProperties = e.features[0].properties;
    const locationId = featureProperties[chartDefinition.propertiesField];
    const dataUrl = chartDefinition.dataUrl.replace('%id', locationId);

    // Get the data
    fetch(dataUrl)
      .then (function (response) {return response.json ();})
      .then (function (json) {
        const locationData = json[0];
        //console.log ('Retrieved data for location ' + locationId, locationData);

        //Hide Spinner
        //document.getElementById('loader').style.display = 'none';

        // Set the title
        const title = chartDefinition.titlePrefix + featureProperties[chartDefinition.titleField];
        document.getElementById(chartDefinition.titleId).innerHTML = '<h2>' + title + '</h2>';

        // Create the charts
        createCharts(chartDefinition, locationData);
      })
      .catch (function (error) {
        alert('Failed to get data for this location. Please try refreshing the page.');
      });
  });


  // Function to create all charts
  function createCharts(chartDefinition, locationData) {

    // Create each chart
    chartDefinition.charts.forEach((chart, i) => {
      
      // Assemble the datasets to be shown
      const datasets = [];
      chartDefinition.modes.forEach(mode => {
        datasets.push({
          label: mode[0],
          data: chartDefinition.scenarios.map(scenario => locationData[chart[1] + '_' + mode[1] + scenario[0]]),
          backgroundColor: mode[2],
          borderColor: mode[3],
          borderWidth: 1
        });
      });
      
      // Bar labels
      const labels = chartDefinition.scenarios.map(scenario => scenario[1]);
      
      // Clear existing if present
      if (chartHandles[i]) {
        chartHandles[i].destroy();
      }
      
      // Render the chart (and register it to a handle so it can be cleared in future)
      chartHandles[i] = renderChart(chart[0], chart[2], datasets, labels);
    });
  };
}


// Function to render a chart
function renderChart (divId, title, datasets, labels) {

  // Create and return the chart
  return new Chart(document.getElementById(divId).getContext('2d'), {
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
            text: title
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


chartsModal(chartDefinition);
chartsModal(chartDefinitionSchools);
