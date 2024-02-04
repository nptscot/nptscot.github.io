// #!# Need to define the assumed data structure, e.g. the 'charts' key shows a part field

// Chart definitions, indexed by map layer ID
const chartDefinitions = {

  // Data zones
  data_zones: {
    
    // Data fields
    // #!# Should use a main server URL setting
    dataUrl: 'https://nptscot.blob.core.windows.net/json/DataZone/%id.json',
    propertiesField: 'DataZone',
    titleField: 'DataZone',
    
    // Title
    titlePrefix: 'Zone Summary: ',

    charts: [
      [
        // Commute Origin
        'comm_orig',
        'Commuters leaving',
        'The bar chart shows estimated mode shares under different scenarios for commuters leaving this zone. (i.e they live here and commute to another zone).',
        'Annual Average Daily Flow'
      ],
      [
        // Commute Destination
        'comm_dest',
        'Commuters arriving',
        'The bar chart shows estimated mode shares under different scenarios for commuters arriving this zone. (i.e they work here and live in another zone).',
        'Annual Average Daily Flow'
      ],
      [
        // School Primary Origin
        'schl_primary_orig',
        'Primary school children',
        'The bar chart shows estimated mode shares under different scenarios for primary school childen that live in this zone.',
        'Annual Average Daily Flow'
      ],
      [
        // School Secondary Origin
        'schl_secondary_orig',
        'Secondary school children',
        'The bar chart shows estimated mode shares under different scenarios for secondary school childen that live in this zone.',
        'Annual Average Daily Flow'
      ],
      [
        // shopping Origin
        'shopping_orig',
        'Shoppers leaving',
        'The bar chart shows estimated mode shares of shopping trips under different scenarios for trips leaving this zone.',
        'Annual Average Daily Flow'
      ],
      [
        // shopping Destination
        'shopping_dest',
        'Shoppers arriving',
        'The bar chart shows estimated mode shares of shopping trips under different scenarios for trips arriving this zone.',
        'Annual Average Daily Flow'
      ],
      [
        // leisure Origin
        'leisure_orig',
        'Leisure trips leaving',
        'The bar chart shows estimated mode shares of leisure trips under different scenarios for trips leaving this zone.',
        'Annual Average Daily Flow'
      ],
      [
        // leisure Destination
        'leisure_dest',
        'Leisure trips arriving',
        'The bar chart shows estimated mode shares of leisure trips under different scenarios for trips arriving this zone.',
        'Annual Average Daily Flow'
      ],
      [
        // visiting Origin
        'visiting_orig',
        'visiting friends and family trips leaving',
        'The bar chart shows estimated mode shares of trips for visiting friends and family under different scenarios for trips leaving this zone.',
        'Annual Average Daily Flow'
      ],
      [
        // visiting Destination
        'visiting_dest',
        'visiting friends and family trips arriving',
        'The bar chart shows estimated mode shares of trips for visiting friends and family under different scenarios for trips arriving this zone.',
        'Annual Average Daily Flow'
      ],
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
  },
  
  
  // Travel to School Modeshare
  schools: {

    // Data fields
    dataUrl: 'https://nptscot.blob.core.windows.net/json/School/%id.json',
    propertiesField: 'SeedCode',
    titleField: 'SchoolName',

    // Title
    titlePrefix: '',

    charts: [
      [
        // School Primary Destination
        'schl_primary_dest',
        'Primary school modal split',
        'The bar chart shows estimated mode shares for primary school children under different scenarios.',
        'Annual Average Daily Flow'
      ],
      [
        // School Secondary Destination
        'schl_secondary_dest',
        'Secondary school modal split',
        'The bar chart shows estimated mode shares for seconday school children under different scenarios.',
        'Annual Average Daily Flow'
      ],
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
  }
};


// Create charts for the defined map layers
charts (chartDefinitions);


// Function to handle chart creation
function charts (chartDefinitions)
{
  // Handles to charts
  const chartHandles = {};

  
  // Function to create a chart modal
  const chartsModal = function (mapLayerId, chartDefinition) {

    // Create the modal
    const location_modal = newModal (mapLayerId + '-chartsmodal');
    
    // Initialise the HTML structure, creating a box for each chart, writing in the titles and descriptions, and setting the canvas ID
    initialiseChartBoxHtml (mapLayerId, chartDefinition.charts);
    
    // Open modal on clicking the supported map layer
    map.on('click', mapLayerId, function (e) {

      // Ensure the source matches
      let clickedFeatures = map.queryRenderedFeatures(e.point);
      clickedFeatures = clickedFeatures.filter(function (el) {
        const layersToExclude = ['composite', 'dasymetric', 'placenames'];  // #!# Hard-coded list - need to clarify purpose
        return !layersToExclude.includes(el.source);
        //return el.source != 'composite';
      });
      if (clickedFeatures[0].sourceLayer != mapLayerId) {
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
          document.querySelector(`#${mapLayerId}-chartsmodal .modal-title`).innerHTML = title;

          // Create the charts
          createCharts(chartDefinition, locationData);
        })
        .catch (function (error) {
          alert('Failed to get data for this location. Please try refreshing the page.');
        });
    });
  }
  
  
  // Function to initialise the chart box HTML from a template
  function initialiseChartBoxHtml (mapLayerId, charts)
  {
    const template = document.querySelector (`#${mapLayerId}-chartsmodal .chart-template`);
    charts.forEach((chart) => {
      const chartBox = template.content.cloneNode (true);
      chartBox.querySelector ('.chart-title').innerText = chart[1];
      chartBox.querySelector ('.chart-description').innerText = chart[2];
      chartBox.querySelector ('.chart-container canvas').id = chart[0] + '-chart';
      document.querySelector (`#${mapLayerId}-chartsmodal .modal-body`).appendChild (chartBox);
    });
  }
  
  
  // Function to create all charts
  function createCharts(chartDefinition, locationData) {

    // Create each chart
    chartDefinition.charts.forEach((chart, i) => {
      
      // Assemble the datasets to be shown
      const datasets = [];
      chartDefinition.modes.forEach(mode => {
        datasets.push({
          label: mode[0],
          data: chartDefinition.scenarios.map(scenario => locationData[chart[0] + '_' + mode[1] + scenario[0]]),
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
      chartHandles[i] = renderChart(chart[0] + '-chart', chart[3], datasets, labels);
    });
  };


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
  
  
  // Create each set of charts
  Object.entries (chartDefinitions).forEach (([mapLayerId, chartDefinition]) => {
    chartsModal(mapLayerId, chartDefinition);
  });
}