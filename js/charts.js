
// Create charts for the defined map layers
charts (datasets.charts);


// Function to handle chart creation
function charts (chartDefinitions)
{
  // Handles to charts
  const chartHandles = {};

  
  // Function to create a chart modal
  const chartsModal = function (mapLayerId, chartDefinition) {
    
    // Initialise the HTML structure for this modal
    initialiseChartsModalHtml (mapLayerId);
    
    // Create the modal
    const location_modal = newModal (mapLayerId + '-chartsmodal');
    
    // Initialise the HTML structure for the set of chart boxes, writing in the titles and descriptions, and setting the canvas ID
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
  
  
  // Function to initialise the modal HTML from the template
  function initialiseChartsModalHtml (mapLayerId)
  {
    const template = document.querySelector (`#chart-modal`);
    const chartModal = template.content.cloneNode (true);
    chartModal.querySelector ('.modal').id = mapLayerId + '-chartsmodal';
    document.body.appendChild (chartModal);
  }
  
  
  // Function to initialise the chart box HTML from the template
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