// Data definitions, i.e. layers, charts, etc.
const datasets = {
	
	// Data layers
	layers: {
		
		rnet: {
			'id': 'rnet',
			'source': {
				'type': 'vector',
				'url': 'pmtiles://%tileserverUrl/rnet-2023-12-17.pmtiles',
			},
			'source-layer': 'rnet',
			'type': 'line',
		},
		
		'rnet-simplified': {
			'id': 'rnet-simplified',
			'source': {
				'type': 'vector',
				'url': 'pmtiles://%tileserverUrl/rnet_simplified-2023-12-17.pmtiles',	 // #!# Inconsistent path - needs fixing
			},
			'source-layer': 'rnet',
			'type': 'line',
		},
		
		data_zones: {
			'id': 'data_zones',
			'type': 'fill',
			'source': {
			'type': 'vector',
				'url': 'pmtiles://%tileserverUrl/data_zones-2023-12-17.pmtiles',
				},
			'source-layer': 'data_zones',
			'paint': {
				'fill-color': '#9c9898',
				'fill-opacity': 0.8,
				'fill-outline-color': '#000000'
			}
		},
		
		schools: {
			'id': 'schools',
			'type': 'circle',
			'source': {
				'type': 'vector',
				'url': 'pmtiles://%tileserverUrl/schools-2023-12-17.pmtiles',
			},
			'source-layer': 'schools',
			'paint': {
				"circle-color": [
					'match',
					['get', 'SchoolType'],
					'Primary','#313695',
					'Secondary','#a50026',
					/* other */ '#43f22c'
				],
				// make circles larger as the user zooms
				'circle-radius': {
					'base': 5,
					'stops': [
						[8, 6],
						[22, 180]
					]
				},
			}
		},
		
		wards: {
			'id': 'wards',
			'type': 'line',
			'source': {
				'type': 'vector',
				'url': 'pmtiles://%tileserverUrl/wards.pmtiles',
			},
			'source-layer': 'wards',
			'paint': {
				'line-color': 'rgba(32, 107, 7, 1)',
				'line-width': 2
			}
		},
		
		holyrood: {
			'id': 'holyrood',
			'type': 'line',
			'source': {
				'type': 'vector',
				'url': 'pmtiles://%tileserverUrl/holyrood.pmtiles',
			},
			'source-layer': 'holyrood',
			'paint': {
				'line-color': 'rgba(83, 123, 252, 1)',
				'line-width': 2
			}
		},
		
		scot_regions: {
			'id': 'scot_regions',
			'type': 'line',
			'source': {
				'type': 'vector',
				'url': 'pmtiles://%tileserverUrl/scot_regions.pmtiles',
			},
			'source-layer': 'scot_regions',
			'paint': {
				'line-color': 'rgba(186, 177, 6, 1)',
				'line-width': 2
			}
		},
		
		la: {
			'id': 'la',
			'type': 'line',
			'source': {
				'type': 'vector',
				'url': 'pmtiles://%tileserverUrl/la.pmtiles',
			},
			'source-layer': 'la',
			'paint': {
				'line-color': 'rgba(107, 7, 7, 1)',
				'line-width': 2
			} 
		},
		
		cohesivenetwork: {
			'id': 'cohesivenetwork',
			'type': 'line',
			'source': {
				'type': 'vector',
				'url': 'pmtiles://%tileserverUrl/cohesivenetwork.pmtiles',
			},
			'source-layer': 'example_cohesive',	// #!# Needs fixing to 'cohesivenetwork'
			'paint': {
				'line-color': [
					'match',
					['get', 'group'],
					1, '#1230b4',
					2, '#894cf7',
					3, '#f07984',
					4, '#fff551',
					/* other */ 'gray'
					],
				'line-width': 2
			}
		}
	},
	
	
	// Layer styling callbacks functions, each defined below
	layerStyling: {
		rnet:				rnetStyling,
		"rnet-simplified":	rnetStyling,
		data_zones:			data_zonesStyling,
	},
	
	
	// #!# These need to be merged with lineColours
	legends: {
		
		rnet: {
			'none': [
				['&nbsp;',	'#304ce7']
			],
			'flow': [
				['1',		'#9C9C9C'],
				['50',		'#FFFF73'],
				['100',		'#AFFF00'],
				['250',		'#00FFFF'],
				['500',		'#30B0FF'],
				['1000',	'#2E5FFF'],
				['2000',	'#0000FF'],
				['3000+',	'#FF00C5'],
			],
			'quietness': [
				['0-25',	'#882255'],
				['25-50',	'#CC6677'],
				['50-75',	'#44AA99'],
				['75-100',	'#117733'],
			],
			'gradient': [
				['0-3',		'#59ee19'],
				['3-5',		'#37a009'],
				['5-7',		'#FFC300'],
				['7-10',	'#C70039'],
				['10+',		'#581845'],
			]
		},
		
		data_zones: {
			'SIMD2020v2_Decile': [
				['1st', 	'#a50026'],
				['2nd',		'#d73027'],
				['3rd', 	'#f46d43'],
				['4th', 	'#fdae61'],
				['5th', 	'#fee090'],
				['6th', 	'#e0f3f8'],
				['7th', 	'#abd9e9'],
				['8th', 	'#74add1'],
				['9th', 	'#4575b4'],
				['10th',	'#313695'],
			],
			'population_density': [
				['10',		'#edf8fb'],
				['50',		'#bfd3e6'],
				['100', 	'#9ebcda'],
				['150',		'#8c96c6'],
				['200',		'#8856a7'],
				['600',		'#810f7c'],
			],
			'broadband': [
				['0%',		'#fff7ec'],
				['2%',		'#fee8c8'],
				['5%',		'#fdd49e'],
				['10%',		'#fdbb84'],
				['50%', 	'#d7301f'],
				['100%',	'#7f0000'],
			],
			'pcycle': [
				['0-1', 	'#A50026'],
				['2-3', 	'#D73027'],
				['4-6', 	'#F46D43'],
				['7-9', 	'#FDAE61'],
				['10-14',	'#FEE090'],
				['15-19',	'#ffffbf'],
				['20-24',	'#C6DBEF'],
				['25-29',	'#ABD9E9'],
				['30-39',	'#74ADD1'],
				['40',		'#4575B4'],
			],
			'pcycle_go_dutch': [		// Actually same as pcycle
				['0-1',		'#A50026'],
				['2-3',		'#D73027'],
				['4-6',		'#F46D43'],
				['7-9',		'#FDAE61'],
				['10-14',	'#FEE090'],
				['15-19',	'#ffffbf'],
				['20-24',	'#C6DBEF'],
				['25-29',	'#ABD9E9'],
				['30-39',	'#74ADD1'],
				['40',		'#4575B4'],
			],
			'_': [	// Default; is time in minutes
				['3',		'#053061'],
				['5',		'#2166ac'],
				['7',		'#4393c3'],
				['10',		'#92c5de'],
				['15',		'#f7f7f7'],
				['30',		'#f4a582'],
				['60',		'#b2182b'],
				['200',		'#67001f'],
			],
		},
	},
	
	
	lineColours: {
		
		rnet: {
			none: '#304ce7',
			flow: [
				'rgba(0,0,0,0)', 1,
				'#9C9C9C', 50,
				'#FFFF73', 100,
				'#AFFF00', 250,
				'#00FFFF', 500,
				'#30B0FF', 1000,
				'#2E5FFF', 2000,
				'#0000FF', 3000
			],
			quietness: [
				'#882255', 25,
				'#CC6677', 50,
				'#44AA99', 75,
				'#117733', 101
			],
			gradient: [
				'#59ee19', 3,
				'#37a009', 5,
				'#FFC300', 7,
				'#C70039', 10,
				'#581845', 100
			]
		},
		
		// #!# These are presumably restatements of dzLegendColours
		data_zones: {
			'SIMD2020v2_Decile': [
				'#a50026', 1.1,			 // #!# This block is basically enums rather than ranges, so current fudge of .1 is to avoid off-by-one errors
				'#d73027', 2.1,
				'#f46d43', 3.1,
				'#fdae61', 4.1,
				'#fee090', 5.1,
				'#e0f3f8', 6.1,
				'#abd9e9', 7.1,
				'#74add1', 8.1,
				'#4575b4', 9.1,
				'#313695', 10.1,
				'#000000'
			],
			'population_density': [
				'#edf8fb', 10,
				'#bfd3e6', 50,
				'#9ebcda', 100,
				'#8c96c6', 150,
				'#8856a7', 200,
				'#810f7c', 600,
				'#000000'
			],
			'broadband': [
				'#fff7ec', 0.01,		// #!# Currently zero is used for voids - data should be changed to use known constant e.g. -9999
				'#fee8c8', 2,
				'#fdd49e', 5,
				'#fdbb84', 10,
				'#d7301f', 50,
				'#7f0000', 100,
				'#000000'
			],
			'pcycle': [
				'#A50026', 2,
				'#D73027', 4,
				'#F46D43', 7,
				'#FDAE61', 10,
				'#FEE090', 15,
				'#ffffbf', 20,
				'#C6DBEF', 25,
				'#ABD9E9', 30,
				'#74ADD1', 40,
				'#4575B4', 100,
				'#000000'
			],
			'pcycle_go_dutch': [
				'#A50026', 2,
				'#D73027', 4,
				'#F46D43', 7,
				'#FDAE61', 10,
				'#FEE090', 15,
				'#ffffbf', 20,
				'#C6DBEF', 25,
				'#ABD9E9', 30,
				'#74ADD1', 40,
				'#4575B4', 100,
				'#000000'
			],
			'_': [		// Default
				'#053061', 3,
				'#2166ac', 5,
				'#4393c3', 7,
				'#92c5de', 10,
				'#f7f7f7', 15,
				'#f4a582', 30,
				'#b2182b', 60,
				'#67001f', 200,
				'#000000'
			]
		},
	},
	
	
	// Chart definitions, indexed by map layer ID
	// #!# Need to define more clearly the assumed data structure, e.g. the 'charts' key shows a part field
	charts: {

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
					'The bar chart shows estimated mode shares for secondary school children under different scenarios.',
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
	},
	
	
	// Popups
	popups: {
		
		'rnet': {
			layerId: 'rnet',
			templateId: 'rnet-popup',
			preprocessingCallback: popupCallback,	// Defined below
			smallValuesThreshold: 10,
			literalFields: ['Gradient', 'Quietness'] // #!# Gradient and Quietness are capitalised unlike other
		},
		
		'rnet-simplified': {
			templateId: 'rnet-popup',
			preprocessingCallback: popupCallback,	// Defined below
			smallValuesThreshold: 10,
			literalFields: ['Gradient', 'Quietness'] // #!# Gradient and Quietness are capitalised unlike other
		}
	}
};


// Callbacks
function popupCallback (feature)
{
	const layerWidthField = getLayerWidthField ();
	feature.properties._ncycle = feature.properties[layerWidthField];
	console.log (feature.properties._ncycle, layerWidthField);
	return feature;
}


// Function to determine layer width field
function getLayerWidthField ()
{
	const purpose  = document.querySelector ('select.updatelayer[data-layer="rnet"][name="purpose"]').value;
	const type     = document.querySelector ('select.updatelayer[data-layer="rnet"][name="type"]').value;
	const scenario = document.querySelector ('select.updatelayer[data-layer="rnet"][name="scenario"]').value;
	const layerWidthField = purpose + '_' + type + '_' + scenario;
	return layerWidthField;
}


// Styling callback for rnet/rnet_simplified
function rnetStyling (layerId, map, settings, datasets, createLegend /* callback */)
{
	// Update the Legend - Do this even if map layer is off
	const colour = document.querySelector ('select.updatelayer[data-layer="rnet"][name="colour"]').value;
	createLegend (datasets.legends.rnet, colour, 'linecolourlegend');
	
	// No special handling needed if not visible
	if (!document.querySelector ('input.showlayer[data-layer="' + layerId + '"]').checked) {
		return;
	}
	
	// Determine the layer width field
	const layerWidthField = getLayerWidthField();
	
	// Parse route network slider input fields to be used as filters
	const sliders = {};
	document.querySelectorAll ('input.slider[data-layer="rnet"]').forEach (sliderInput => {
		const sliderValue = sliderInput.value.split ('-');
		sliders[sliderInput.name] = {
			min: Number(sliderValue[0]),
			max: Number(sliderValue[1])
		};
	});
	
	// Only filter cyclists if scenario set
	const filter = ['all',
		['>=', layerWidthField, sliders.cycle.min],
		['<=', layerWidthField, sliders.cycle.max],
		['>=', 'Quietness', sliders.quietness.min],
		['<=', 'Quietness', sliders.quietness.max],
		['>=', 'Gradient', sliders.gradient.min],
		['<=', 'Gradient', sliders.gradient.max]
	];
	
	// Define line colour
	const line_colours = {
		'none': datasets.lineColours.rnet.none,
		'flow': [
			'step', ['get', layerWidthField],
			...datasets.lineColours.rnet.flow,
			'#FF00C5'
		],
		'quietness': [
			'step', ['get', 'Quietness'],
			...datasets.lineColours.rnet.quietness,
			'#000000'
		],
		'gradient': [
			'step', ['get', 'Gradient'],
			...datasets.lineColours.rnet.gradient,
			'#000000'
		]
	};
	
	// Define line width
	// Implements the formula y = (3 / (1 + exp(-3*(x/1000 - 1.6))) + 0.3)
	// This code was hard to work out!
	const line_width = [
		'interpolate',
		['linear'],
		['zoom'],
		12, ['*', 2.1, ['+', 0.3, ['/', 3, ['+', 1, ['^', 2.718, ['-', 2.94, ['*', ['get', layerWidthField], 0.0021]]]]]]],
		14, ['*', 5.25, ['+', 0.3, ['/', 3, ['+', 1, ['^', 2.718, ['-', 2.94, ['*', ['get', layerWidthField], 0.0021]]]]]]],
		15, ['*', 7.5, ['+', 0.3, ['/', 3, ['+', 1, ['^', 2.718, ['-', 2.94, ['*', ['get', layerWidthField], 0.0021]]]]]]],
		16, ['*', 18, ['+', 0.3, ['/', 3, ['+', 1, ['^', 2.718, ['-', 2.94, ['*', ['get', layerWidthField], 0.0021]]]]]]],
		18, ['*', 52.5, ['+', 0.3, ['/', 3, ['+', 1, ['^', 2.718, ['-', 2.94, ['*', ['get', layerWidthField], 0.0021]]]]]]],
	];
	
	// Set the filter
	map.setFilter (layerId, filter);
	
	// Set paint properties
	map.setPaintProperty (layerId, 'line-color', line_colours[colour]);
	map.setPaintProperty (layerId, 'line-width', line_width);
}


// Styling callback for data zones (including buildings styling)
function data_zonesStyling (layerId, map, settings, datasets, createLegend /* callback */)
{
	// Update the legend (even if map layer is off)
	const field = document.querySelector ('select.updatelayer[data-layer="data_zones"][name="field"]').value
	createLegend (datasets.legends.data_zones, field, 'dzlegend');
	
	// Get UI state
	const daysymetricMode = document.querySelector ('input.updatelayer[data-layer="data_zones"][name="daysymetricmode"]').checked;
	
	// Set paint properties
	map.setPaintProperty (layerId, 'fill-color', ['step', ['get', field], ...getStyleColumn (field, datasets)]);
	map.setPaintProperty (layerId, 'fill-opacity', (daysymetricMode ? 0.1 : 0.8)); // Very faded-out in daysymetric mode, as the buildings are coloured
	
	// Set buildings layer colour/visibility
	const buildingColour = getBuildingsColour(settings);
	map.setPaintProperty ('dasymetric', 'fill-extrusion-color', (buildingColour || '#9c9898'));
	map.setLayoutProperty ('dasymetric', 'visibility', (buildingColour ? 'visible' : 'none'));
}


// Function to determine the buildings colour
function getBuildingsColour (settings)
{
	// If datazones is off, buildings shown, if vector style, as static colour appropriate to the basemap
	if (!document.querySelector ('input.showlayer[data-layer="data_zones"]').checked) {
		const styleName = document.querySelector('#basemapform input:checked').value;	// Same as nptUi.getBasemapStyle()
		return settings.basemapStyles[styleName].buildingColour;
	}
	
	// If dasymetric mode, use a colour set based on the layer
	if (document.querySelector ('input.updatelayer[data-layer="data_zones"][name="daysymetricmode"]').checked) {
		const field = document.querySelector ('select.updatelayer[data-layer="data_zones"][name="field"]').value;
		return ['step', ['get', field], ...getStyleColumn (field, datasets)];
	}
	
	// Default to gray
	return '#9c9898';
}


// Function to determine the style column
function getStyleColumn (layerId, datasets)
{
	const style_col_selected = datasets.lineColours.data_zones.hasOwnProperty(layerId) ? layerId : '_';
	return datasets.lineColours.data_zones[style_col_selected];
}

