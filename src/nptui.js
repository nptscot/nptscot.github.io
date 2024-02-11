// NPT UI implementation code

/*jslint browser: true, white: true, single: true, for: true, unordered: true, long: true */
/*global alert, console, window, maplibregl, pmtiles, MaplibreGeocoder, noUiSlider, tippy */

const nptUi = (function () {
	
	'use strict';
	
	
	// Settings
	let _settings = {};		// Will be populated by constructor
	let _datasets = {};		// Will be populated by constructor
	let _map;
	
	// Functions
	return {
		
		// Main function
		initialise: function (settings, datasets)
		{
			// Populate the settings and datasets class properties
			_settings = settings;
			_datasets = datasets;
			
			// Manage analytics cookie setting
			nptUi.manageAnalyticsCookie ();
			
			// Set OSM date in welcome message
			nptUi.setOsmDate ();
			
			// Create welcome screen
			nptUi.newModal ('welcome');
			nptUi.updateDate ();
			
			// Enable the accordion functionality for the layer controls box and popups
			nptUi.accordion ();
			
			// Layer controls box UI
			nptUi.layerControlsBoxUi ();
			
			// General GUI topnav function
			nptUi.topnav ();
			
			// Create the map UI
			_map = nptUi.createMap ();
			
			// Manage layers
			nptUi.manageLayers ();
			
			// Create popups
			nptUi.createPopups ();
			
			// Create charts for the defined map layers
			nptUi.charts ();
			
			// Handler for help buttons which have a data-help attribute indicating there is a manual section
			nptUi.handleHelpButtons ();
			
			// Create sliders
			nptUi.createSliders ();
			
			// Tooltip support
			nptUi.tooltips ();
			
			// UI specialised function callback, if defined
			if (typeof _settings.uiCallback === 'function') {
				_settings.uiCallback ();
			}
		},
		
		
		// function to manage analytics cookie setting
		manageAnalyticsCookie: function ()
		{
			// Disable tracking if the opt-out cookie exists.
			const disableStr = 'ga-disable-' + _settings.gaProperty;
			if (document.cookie.indexOf(disableStr + '=true') > -1) {
				window[disableStr] = true;
			}
			
			// Define the cookie name
			const cookieName = 'NPTtrack';
			
			// Handle cookie warning buttons
			document.querySelectorAll('#cookiewarning button').forEach(function (button) {
				button.addEventListener('click', function (e) {
					cookieButton(button.value);
				});
			});
			
			// Show the cookie warning
			showCookieWarning();
			
			
			// Opt-out function
			function gaOptout ()
			{
				document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/; SameSite=None; Secure';
				window[disableStr] = true;
			}
			
			
			// Warning Control
			function cookieButton (accepted)
			{
				if (accepted) {
					nptUi.setCookie(cookieName, 'true');
				} else {
					//alert("Tracking Op-Out Disabled");
					gaOptout();
					nptUi.setCookie(cookieName, 'false');
				}
				
				const cookiewarning = document.getElementById ('cookiewarning');
				cookiewarning.style.display = 'none';
			}
			
			
			// Cookie warning
			function showCookieWarning ()
			{
				const cookiewarning = document.getElementById ('cookiewarning');
				const NPTcookie = nptUi.getCookie (cookieName);
				//console.log ("Cookie status: '" + NPTcookie + "'");
				cookiewarning.style.display = (NPTcookie === '' ? 'block' : 'none');
			}
		},
		
		
		// Function to set the OSM date in the welcome message
		setOsmDate: function ()
		{
			document.getElementById ('osmupdatedate').innerHTML = _settings.osmDate;
		},
		
		
		// Function to manage modal dialogs
		newModal: function (modalId)
		{
			// Identify the modal
			const modal = document.getElementById(modalId);
			
			// When the user clicks on <span> (x), close the modal
			const closeButton = document.querySelector('#' + modalId + ' .modal-close');
			closeButton.addEventListener('click', function () {
				hide();
			});
			
			// Treat clicking outside of the modal as implied close
			window.addEventListener('click', function (event) {
				if (event.target == modal || event.target.id == 'overlay') {
					hide();
				}
			});
			
			// Treat escape key as implied close
			window.addEventListener('keyup', function (event) {
				if (event.key == 'Escape') {
					if (window.getComputedStyle(modal).display == 'block') { // I.e. is displayed
						hide();
					}
				}
			});
			
			// Show
			const show = function ()
			{
				document.getElementById('overlay').style.display = 'block';
				modal.style.display = 'block';
			};
			
			// Hide
			const hide = function ()
			{
				modal.style.display = 'none';
				document.getElementById('overlay').style.display = 'none';
			};
			
			// Accessor functions
			return {
				show: show,
				hide: hide
			};
		},
		
		
		// Function to set the update date in the welcome screen
		updateDate: function ()
		{
			document.getElementById('updatedate').innerText = nptUi.formatAsUKDate(document.lastModified);
		},
		
		
		// Function to manage an accordion
		accordion: function ()
		{
			// Listen for accordion clicks, on a late-bound basis
			document.addEventListener('click', function (e) {
				if (e.target.classList.contains('accordion')) {
					const button = e.target;
					
					// Toggle between adding and removing the 'active' class, to highlight the button that controls the panel
					button.classList.toggle('active');
					
					// Toggle between hiding and showing the active panel
					const panel = button.nextElementSibling;
					panel.style.display = (panel.style.display == 'block' ? 'none' : 'block');
				}
			});
		},	
		
		
		// Function to manage the layer controls box UI
		layerControlsBoxUi: function ()
		{
			// Show the layer controls box
			showlayercontrols(true);
			
			// Auto-open a section if required
			if (document.getElementById('autoopen')) {
				document.getElementById('autoopen').click ();
			}
			
			// Show layer control box when button clicked on
			document.querySelector('#showrightbox button').addEventListener('click', function () {
				showlayercontrols(true);
			});
			
			// Close layer control box when X clicked on
			document.querySelector('#rightbox button.close-button').addEventListener('click', function () {
				showlayercontrols(false);
			});
			
			/* Show and hide UI */
			function showlayercontrols(show)
			{
				// Toggle box
				const box = document.getElementById ('rightbox');
				box.style.display = (show ? 'block' : 'none');
				
				const boxbutton = document.getElementById ('showrightbox');
				boxbutton.style.display = (show ? 'none' : 'block');
			}
		},
		
		
		// Main menu responsive display
		topnav: function ()
		{
			document.getElementById ('expandtopnav').addEventListener ('click', function (e) {
				const x = document.getElementById('myTopnav');
				if (x.className == 'topnav') {
					x.classList.add ('responsive');
				} else {
					x.classList.remove ('responsive');
				}
				e.preventDefault ();
			});
		},
		
		
		// Function to set up the map UI and controls
		createMap: function ()
		{
			// Create the layer switcher
			nptUi.layerSwitcherHtml();
			
			// Main map setup
			const map = new maplibregl.Map({
				container: 'map',
				style: 'tiles/style_' + nptUi.getBasemapStyle() + '.json',
				center: _settings.initialPosition.center,
				zoom: _settings.initialPosition.zoom,
				maxZoom: _settings.maxZoom,
				minZoom: _settings.minZoom,
				maxPitch: 85,
				hash: true,
				antialias: document.getElementById('antialiascheckbox').checked
			});
			
			// pmtiles
			let protocol = new pmtiles.Protocol();
			maplibregl.addProtocol('pmtiles', protocol.tile);
			
			// Add geocoder control; see: https://github.com/maplibre/maplibre-gl-geocoder
			map.addControl(new MaplibreGeocoder(
				nptUi.geocoderApi(), {
					maplibregl: maplibregl,
					collapsed: true
				}
			), 'top-left');
			
			// Add +/- buttons
			map.addControl(new maplibregl.NavigationControl(), 'top-left');
			
			// Add terrain control
			map.addControl(new maplibregl.TerrainControl({
				source: 'terrainSource',
				exaggeration: 1.25
			}), 'top-left');
			
			// Add buildings; note that the style/colouring may be subsequently altered by data layers
			nptUi.addBuildings(map);
			document.getElementById('basemapform').addEventListener('change', function (e) {
				nptUi.addBuildings(map);
			});
			
			// Add placenames support
			map.once('idle', function () {
				nptUi.placenames(map);
			});
			
			// Add geolocation control
			map.addControl(new maplibregl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true
				},
				trackUserLocation: true
			}), 'top-left');
			
			// Add full-screen control
			map.addControl(new maplibregl.FullscreenControl(), 'top-left');
			
			// Add basemap change control
			class BasemapButton {
				onAdd(map) {
					const div = document.createElement('div');
					div.className = 'maplibregl-ctrl maplibregl-ctrl-group';
					div.innerHTML = '<button aria-label="Change basemap"><img src="/images/basemap.svg" title="Change basemap" /></button>';
					div.addEventListener('contextmenu', (e) => e.preventDefault());
					div.addEventListener('click', function () {
						const box = document.getElementById('basemapcontrol');
						box.style.display = (window.getComputedStyle(box).display == 'none' ? 'block' : 'none');
					});
					return div;
				}
			}
			map.addControl(new BasemapButton(), 'top-left');
			
			// Add scale
			map.addControl(new maplibregl.ScaleControl({
				maxWidth: 80,
				unit: 'metric'
			}), 'bottom-left');
			
			// Add attribution
			map.addControl(new maplibregl.AttributionControl({
				compact: true,
				customAttribution: 'Contains OS data © Crown copyright 2021, Satelite map © ESRI 2023, © OpenStreetMap contributors'
			}), 'bottom-right');
			
			// Antialias reload
			document.getElementById('antialiascheckbox').addEventListener('click', function () {
				location.reload();
			});
			
			// Fire map ready when ready, which layer-enabling can be picked up
			map.once('idle', function () {
				document.dispatchEvent(new Event('@map/ready', {
					'bubbles': true
				}));
			});
			
			// Change map and reload state on basemap change
			document.getElementById('basemapform').addEventListener('change', function () {
				const styleName = nptUi.getBasemapStyle();
				const styleCurrent = map.getStyle().name;
				if (styleCurrent == styleName) {
					return;
				}
				console.log('Restyling from ' + styleCurrent + ' to ' + styleName);
				map.setStyle('tiles/style_' + styleName + '.json');
				
				// Fire map ready event when ready
				map.once('idle', function () {
					document.dispatchEvent(new Event('@map/ready', {
						'bubbles': true
					}));
				});
			});
			
			// Return the map handle
			return map;
		},
		
		
		// Generate layer switcher HTML
		layerSwitcherHtml: function ()
		{
			// Create each switcher button
			const options = [];
			Object.entries(_settings.basemapStyles).forEach(([id, basemap]) => {
				let option = `<input type="radio" name="basemap" id="${id}-basemap" value="${id}"` + (id == _settings.basemapStyleDefault ? ' checked="checked"' : '') + ' />';
				option += `<label for="${id}-basemap"><img src="images/basemaps/${id}.png" title="${basemap.title}" /></label>`;
				options.push(option);
			});
			
			// Insert radiobuttons into form
			document.getElementById('basemapform').innerHTML = options.join(' ');
		},
		
		// Function to get the currently-checked basemap style
		getBasemapStyle: function ()
		{
			return document.querySelector('#basemapform input:checked').value;
		},
		
		
		// Function to add the buildings layer
		addBuildings: function (map)
		{
			// When ready
			map.once ('idle', function () {
				
				// Add the source
				if (!map.getSource ('dasymetric')) {
					map.addSource ('dasymetric', {
						'type': 'vector',
						'url': _settings.buildingsTilesUrl.replace ('%tileserverUrl', _settings.tileserverUrl),
					});
				}
				
				// Initialise the layer
				if (!map.getLayer('dasymetric')) {
					map.addLayer({
						'id': 'dasymetric',
						'type': 'fill-extrusion',
						'source': 'dasymetric',
						'source-layer': 'dasymetric',
						'layout': {
							'visibility': 'none'
						},
						'paint': {
							'fill-extrusion-color': '#9c9898', // Default gray
							'fill-extrusion-height': [
								'interpolate',
								['linear'],
								['zoom'],
								12, 1,
								15, 8
							]
						}
					}, 'roads 0 Guided Busway Casing');
				}
			});
		},
		
		
		// Function to manage display of placenames
		placenames: function (map)
		{
			// Add the source
			map.addSource ('placenames', {
				'type': 'vector',
				'url': _settings.placenamesTilesUrl.replace ('%tileserverUrl', _settings.tileserverUrl),
			});
			
			// Load the style definition
			// #!# The .json file is currently not a complete style definition, e.g. with version number etc.
			fetch ('/tiles/partial-style_oszoom_names.json')
				.then (function (response) {
					return response.json ();
				})
				.then (function (placenameLayers) {
					
					// Add each layer, respecting the initial checkbox state
					Object.entries(placenameLayers).forEach(([layerId, layer]) => {
						const checkbox = document.getElementById('placenamescheckbox');
						layer.visibility = (checkbox.checked ? 'visible' : 'none');
						map.addLayer(layer);
					});
					
					// Listen for checkbox changes
					document.getElementById('placenamescheckbox').addEventListener('click', (e) => {
						const checkbox = document.getElementById('placenamescheckbox');
						Object.entries(placenameLayers).forEach(([layerId, layer]) => {
							map.setLayoutProperty(layerId, 'visibility', (checkbox.checked ? 'visible' : 'none'));
						});
					});
				});
		},
		
		
		// Geocoding API implementation
		geocoderApi: function ()
		{
			const geocoder_api = {
				forwardGeocode: async (config) => {
					const features = [];
					try {
						let request = 'https://nominatim.openstreetmap.org/search?q=' + config.query + '&format=geojson&polygon_geojson=1&addressdetails=1&countrycodes=gb';
						const response = await fetch(request);
						const geojson = await response.json();
						for (let feature of geojson.features) {
							let center = [
								feature.bbox[0] + (feature.bbox[2] - feature.bbox[0]) / 2,
								feature.bbox[1] + (feature.bbox[3] - feature.bbox[1]) / 2
							];
							let point = {
								type: 'Feature',
								geometry: {
									type: 'Point',
									coordinates: center
								},
								place_name: feature.properties.display_name,
								properties: feature.properties,
								text: feature.properties.display_name,
								place_type: ['place'],
								center: center
							};
							features.push(point);
						}
					} catch (e) {
						console.error(`Failed to forwardGeocode with error: ${e}`);
					}
					
					return {
						features: features
					};
				}
			};
			
			return geocoder_api;
		},
		
		
		// Function to manage layers
		manageLayers: function ()
		{
			// Add layers when the map is ready (including after a basemap change)
			document.addEventListener('@map/ready', function () {
				
				// Initialise datasets (sources and layers)
				nptUi.initialiseDatasets();
				
				// Set initial state for all layers
				Object.keys(_datasets.layers).forEach(layerId => {
					nptUi.toggleLayer(layerId);
				});
				
				// Handle layer change controls, each marked with the updatelayer class
				document.querySelectorAll('.updatelayer').forEach((input) => {
					input.addEventListener('change', function (e) {
						let layerId = e.target.id;
						// #!# The input IDs should be standardised, to replace this list of regexp matches
						layerId = layerId.replace(/checkbox$/, ''); // Checkboxes, e.g. data_zonescheckbox => data_zones
						layerId = layerId.replace(/_checkbox_.+$/, ''); // Checkboxes, e.g. data_zones_checkbox_dasymetric => data_zones
						layerId = layerId.replace(/_slider-.+$/, ''); // Slider hidden inputs, e.g. rnet_slider-quietness => rnet
						layerId = layerId.replace(/_selector$/, ''); // Dropdowns, e.g. data_zones_selector => data_zones   #!# Should be input, but currently data_zones_input would clash with rnet_*_input on next line
						layerId = layerId.replace(/_[^_]+_input$/, ''); // Dropdowns, e.g. rnet_purpose_input => rnet
						nptUi.toggleLayer(layerId);
						// #!# Workaround, pending adapting layerId to be a list of affected layers
						if (layerId == 'rnet') {
							nptUi.toggleLayer('rnet-simplified');
						}
					});
				});
			});
		},
		
		
		// Function to initialise datasets (sources and layers)
		initialiseDatasets: function ()
		{
			// console.log ('Initialising sources and layers');
			
			// Replace tileserver URL placeholder in layer definitions
			Object.entries(_datasets.layers).forEach(([layerId, layer]) => {
				let tileserverUrl = (_settings.tileserverTempLocalOverrides[layerId] ? _settings.tileserverTempLocalOverrides[layerId] : _settings.tileserverUrl);
				_datasets.layers[layerId].source.url = layer.source.url.replace ('%tileserverUrl', tileserverUrl)
			});
			
			// Add layers, and their sources, initially not visible when initialised
			Object.keys(_datasets.layers).forEach(layerId => {
				const beforeId = (layerId == 'data_zones' ? 'roads 0 Guided Busway Casing' : 'placeholder_name'); // #!# Needs to be moved to definitions
				_datasets.layers[layerId].layout = {
					visibility: 'none'
				};
				_map.addLayer(_datasets.layers[layerId], beforeId);
			});
		},
		
		
		toggleLayer: function (layerId)
		{
			//console.log ('Toggling layer ' + layerId);
			
			// Check for a dynamic styling callback and run it
			if (_datasets.layerStyling[layerId]) {
				_datasets.layerStyling[layerId] (layerId, _map, _settings, _datasets, nptUi.createLegend);
			}
			
			// Set the visibility of the layer, based on the checkbox value
			const isVisible = document.getElementById(layerId + 'checkbox').checked;
			_map.setLayoutProperty(layerId, 'visibility', (isVisible ? 'visible' : 'none'));
		},
		
		
		createLegend: function (legendColours, selected, selector)
		{
			// Create the legend HTML
			// #!# Should be a list, not nested divs
			let legendHtml = '<div class="l_r">';
			selected = (legendColours.hasOwnProperty(selected) ? selected : '_');
			legendColours[selected].forEach(legendColour => {
				legendHtml += `<div class="lb"><span style="background-color: ${legendColour[1]}"></span>${legendColour[0]}</div>`;
			})
			legendHtml += '</div>';
			
			// Set the legend
			document.getElementById(selector).innerHTML = legendHtml;
		},
		
		
		// Function to create popups
		createPopups: function ()
		{
			// Add to each layer
			Object.entries (_datasets.popups).forEach (([layerId, options]) => {
				nptUi.mapPopups (layerId, options);
			});
		},
		
		
		// Popup handler
		// Options are: {preprocessingCallback, smallValuesThreshold, literalFields}
		mapPopups: function (layerId, options)
		{
			// Enable cursor pointer
			layerPointer (layerId);
			
			// Register popup on click
			_map.on ('click', layerId, function (e) {
				
				// Get the clicked co-ordinates
				const coordinates = e.lngLat;
				
				// Obtain the clicked feature
				let feature = e.features[0];
				
				// Process any preprocessing callback
				if (options.preprocessingCallback) {
					feature = options.preprocessingCallback(feature);
				}
				
				// Number formatting
				Object.entries(feature.properties).forEach(([key, value]) => {
					if (options.literalFields && options.literalFields.includes(key)) {
						return; /* i.e. continue */
					}
					if (Number.isFinite(value)) { // Number check means strings/percentages/etc. get skipped
						
						// Suppress small numeric values
						if (value < options.smallValuesThreshold) {
							if (options.smallValuesThreshold) {
								feature.properties[key] = '<' + options.smallValuesThreshold;
								return; // i.e. continue
							}
						}
						
						// Thousands separator
						feature.properties[key] = value.toLocaleString('en-GB');
					}
				});
				
				// Make external links properties available to the template
				feature.properties = addExternalLinks(feature.properties, coordinates);
				
				// Create the popup HTML from the template in the HTML
				const popupHtml = processTemplate(options.templateId, feature.properties);
				
				// Create the popup
				new maplibregl.Popup ({
						className: 'layerpopup'
					})
					.setLngLat (coordinates)
					.setHTML (popupHtml)
					.addTo (_map);
					
				// #!# Need to close popup when layer visibility changed - currently a popup is left hanging if the layer is toggled on/off (e.g. due to simplification or field change)
			});
			
			
			// Function to handle pointer hover changes for a layer
			function layerPointer (layerId)
			{
				// Change the cursor to a pointer when the mouse is over the layer.
				_map.on('mouseenter', layerId, function () {
					_map.getCanvas().style.cursor = 'pointer';
				});
				
				// Change it back to a pointer when it leaves.
				_map.on('mouseleave', layerId, function () {
					_map.getCanvas().style.cursor = '';
				});
			}
			
			
			// Function to convert a template to HTML, substituting placeholders
			function processTemplate (templateId, properties)
			{
				// Get template for the popup (from the HTML page), which defines fields to be used from feature.properties
				const template = document.querySelector('template#' + templateId).innerHTML;

				// Substitute placeholders in template
				return template.replace(/{([^}]+)}/g, (placeholderString, field) => properties[field]); // See: https://stackoverflow.com/a/52036543/
			}
			
			
			// Function to add external links
			function addExternalLinks (properties, coordinates)
			{
				properties._streetViewUrl = 'https://maps.google.com/maps?q=&layer=c&cbll=' + coordinates.lat + ',' + coordinates.lng + '&cbp=11,0,0,0,0';
				properties._osmUrl = 'https://www.openstreetmap.org/#map=19/' + coordinates.lat + '/' + coordinates.lng;
				return properties;
			}
		},
		
		
		// Function to handle chart creation
		charts: function ()
		{
			// Handles to charts
			const chartHandles = {};
			
			// Function to create a chart modal
			const chartsModal = function (mapLayerId, chartDefinition) {
				
				// Initialise the HTML structure for this modal
				initialiseChartsModalHtml (mapLayerId);
				
				// Create the modal
				const location_modal = nptUi.newModal (mapLayerId + '-chartsmodal');
				
				// Initialise the HTML structure for the set of chart boxes, writing in the titles and descriptions, and setting the canvas ID
				initialiseChartBoxHtml(mapLayerId, chartDefinition.charts);
				
				// Open modal on clicking the supported map layer
				_map.on ('click', mapLayerId, function (e) {
					
					// Ensure the source matches
					let clickedFeatures = _map.queryRenderedFeatures(e.point);
					clickedFeatures = clickedFeatures.filter(function (el) {
						const layersToExclude = ['composite', 'dasymetric', 'placenames']; // #!# Hard-coded list - need to clarify purpose
						return !layersToExclude.includes(el.source);
						//return el.source != 'composite';
					});
					if (clickedFeatures[0].sourceLayer != mapLayerId) {
						return;
					}
					
					// Display the modal
					location_modal.show();
					
					// Assemble the JSON data file URL
					const featureProperties = e.features[0].properties;
					const locationId = featureProperties[chartDefinition.propertiesField];
					const dataUrl = chartDefinition.dataUrl.replace('%id', locationId);
					
					// Get the data
					fetch(dataUrl)
						.then(function (response) {
							return response.json();
						})
						.then(function (json) {
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
						.catch(function (error) {
							alert('Failed to get data for this location. Please try refreshing the page.');
						});
				});
			}
			
			
			// Function to initialise the modal HTML from the template
			function initialiseChartsModalHtml (mapLayerId)
			{
				const template = document.querySelector(`#chart-modal`);
				const chartModal = template.content.cloneNode(true);
				chartModal.querySelector('.modal').id = mapLayerId + '-chartsmodal';
				document.body.appendChild(chartModal);
			}
			
			
			// Function to initialise the chart box HTML from the template
			function initialiseChartBoxHtml (mapLayerId, charts)
			{
				const template = document.querySelector(`#${mapLayerId}-chartsmodal .chart-template`);
				charts.forEach((chart) => {
					const chartBox = template.content.cloneNode(true);
					chartBox.querySelector('.chart-title').innerText = chart[1];
					chartBox.querySelector('.chart-description').innerText = chart[2];
					chartBox.querySelector('.chart-container canvas').id = chart[0] + '-chart';
					document.querySelector(`#${mapLayerId}-chartsmodal .modal-body`).appendChild(chartBox);
				});
			}
			
			
			// Function to create all charts
			function createCharts (chartDefinition, locationData)
			{
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
			function renderChart (divId, title, datasets, labels)
			{
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
			Object.entries (_datasets.charts).forEach(([mapLayerId, chartDefinition]) => {
				chartsModal (mapLayerId, chartDefinition);
			});
		},
		
		
		// Click handler for manual help buttons
		handleHelpButtons: function ()
		{
			document.querySelectorAll ('.helpbutton').forEach (function (button) {
				if (button.dataset.help) { // E.g. data-help="scenario" refers to the scenario section
					button.addEventListener ('click', function () {
						nptUi.showHelp (button.dataset.help);
					});
				}
			});
		},
		
		
		// Function to handle (?) tooltips, loading extracts from the manual
		showHelp: function (sectionId)
		{
			//console.log("Trigger help for sectionId: " + sectionId);
			fetch ('/manual/index.md')
				.then (response => response.text())
				.then (text => {
					
					// Extract the Markdown text between comments
					const regex = new RegExp (`<!-- #${sectionId} -->(.+)<!-- /#${sectionId} -->`, 's'); // s flag is for 'match newlines'
					const result = regex.exec (text);
					const extract = result[1];
					
					// Convert to HTML
					const html = nptUi.mdToHtml (extract);
					
					// Parse to HTML
					const parser = new DOMParser ();
					const otherPage = parser.parseFromString (html, 'text/html');
					const contentHtml = otherPage.querySelector ('body');
					//console.log(otherDiv.innerHTML);
					if (!contentHtml) {
						contentHtml = '<p><strong>Help missing!</strong></p>';
					}
					
					// Add the HTML
					document.getElementById ('helpcontent').innerHTML = contentHtml.innerHTML;
				});
			
			// Show in modal
			const help_modal = newModal ('help_modal');
			help_modal.show();
		},
		
		
		// Function to convert the loaded Markdown file text to HTML
		// #!# Copied from manual.js
		mdToHtml: function (mdText)
		{
			const converter = new showdown.Converter();
			const html = converter.makeHtml(mdText);
			return html;
		},
		
		
		// Function to create the sliders
		createSliders: function ()
		{
			// Find each div to be converted to a slider
			document.querySelectorAll('div.slider-styled').forEach(div => {
				
				// Calculate the attributes based on an associated <datalist>
				const attributes = nptUi.sliderAttributes(div.id);
				
				// Create the slider
				noUiSlider.create(div, {
					start: [attributes.min, attributes.max],
					connect: true,
					range: attributes.range,
					pips: {
						mode: 'range',
						density: attributes.density,
						format: attributes.format
					}
				});
				
				// Define handler to proxy the result to hidden input fields, with value "<numStart>-<numFinish>"
				const inputField = div.id.replace ('-ui', '');
				div.noUiSlider.on ('update', function () {
					document.getElementById (inputField).value = Number (div.noUiSlider.get()[0]) + '-' + Number (div.noUiSlider.get()[1]);
					document.getElementById (inputField).dispatchEvent (new Event('change'));
				});
			});
		},
		
		
		// Function to determine the slider attributes based on a datalist accompanying the slider element
		sliderAttributes: function (sliderId)
		{
			// Start an object to hold range, min, max, density, format
			const sliderAttributes = {};
		
			// Identify the datalist
			const datalistElement = document.getElementById(sliderId + '-values');
			if (!datalistElement) {
				console.log('ERROR in HTML: No <datalist> defined for slider ' + sliderId);
				return {};
			}
		
			// Loop through each datalist value, e.g. slider-cycle should be accompanied by <datalist id="slider-cycle-values">
			sliderAttributes.range = {};
			let increments;
			const sliderOptions = Array.from(datalistElement.options);
			sliderOptions.forEach((option, index) => {
		
				// Determine the increment to the next; last item has no increment; use defined or calculated for others
				if (index == (sliderOptions.length - 1)) { // Last
					increments = null;
				} else if (option.dataset.hasOwnProperty('increments')) { // Increments defined
					increments = parseInt(option.dataset.increments);
				} else { // Increments is difference from current to next, e.g. 1 then 10 => 9
					increments = parseInt(sliderOptions[index + 1].value - option.value);
				}
		
				// Register result, e.g. {"12.5%": [1, 9], ...}
				sliderAttributes.range[option.dataset.position] = [parseInt(option.value), increments]; // E.g. [1, 9]
			});
		
			// Add min/max
			sliderAttributes.min = parseInt(sliderOptions[0].value);
			sliderAttributes.max = parseInt(sliderOptions[sliderOptions.length - 1].value);
		
			// Add density
			sliderAttributes.density = parseInt(datalistElement.dataset.density);
		
			// Add format labels, if any
			const labels = {};
			sliderOptions.forEach((option, index) => {
				if (option.dataset.hasOwnProperty('label')) {
					labels[option.value] = option.dataset.label;
				}
			});
			if (Object.keys(labels).length) {
				sliderAttributes.format = {
					to: function (value) {
						return (labels.hasOwnProperty(value) ? labels[value] : value);
					}
				};
			} else {
				sliderAttributes.format = null;
			}
		
			// Return the result
			//console.log ('Slider values for id ' + sliderId + ':', sliderAttributes);
			return sliderAttributes;
		},
		
		
		// Function to add tooltips
		tooltips: function ()
		{
			tippy('[title]', {
				content(reference) {
				const title = reference.getAttribute('title');
				reference.removeAttribute('title');
				return title;
				},
			});
		},


		// Function to format a date
		formatAsUKDate: function (date)
		{
			const options = {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			};
			return new Date(date).toLocaleDateString('en-GB', options);
		},
		
		
		// Generic cookie managment functions
		setCookie: function (name, value)
		{
			const d = new Date();
			d.setTime(d.getTime() + (1000 * 24 * 60 * 60 * 1000));
			const expires = 'expires=' + d.toUTCString();
			document.cookie = name + '=' + value + ';' + expires + ';path=/';
		},
		
		
		getCookie: function (name)
		{
			name = name + '=';
			const ca = document.cookie.split(';');
			for (let i = 0; i < ca.length; i++) {
				let c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) === 0) {
					return c.substring(name.length, c.length);
				}
			}
			return "";
		}
	};
	
} ());
