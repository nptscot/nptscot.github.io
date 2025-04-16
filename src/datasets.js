// Data definitions, i.e. layers, charts, etc.

// Define main highway widths
const staticHighwayWidths = [
	'motorway', 5,
	'motorway_link', 5,
	'trunk', 5,
	'trunk_link', 5,
	'primary', 4,
	'primary_link', 4,
	'secondary', 4,
	'secondary_link', 4,
	'tertiary', 3,
	'tertiary_link', 3,
];

// Define an expression to use those widths but have smaller streets switch from 1px zoomed out to 2px closer
const highwayTypeLineWidths = [
	'step',
	['zoom'],
	[
		'match',
		['get', 'highway'],
			...staticHighwayWidths,
		1
	],
	13, [
		'match',
		['get', 'highway'],
			...staticHighwayWidths,
		2
	]
];

function streetspaceSublayer (sublayer)
{
	return {
		paint: {
			'line-color': [
				'match',
				['get', sublayer],
					'Not enough space', '#dd7777',
					'Absolute minimum', '#e0b97d',
					'Desirable minimum', '#75a375',
				'rgba(0, 0, 0, 0)', // Invisible
			]
		}
	};
}

function data_zonesSublayer (sublayer)
{
	return {
		paint: {
			'fill-color': [
				'step',
				['get', sublayer],
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
		}
	};
}

const datasets = {
	
	/* Example:
	
	foo: {
		
		// Layer definition - Mapbox GL JS standard addLayer structure
		layer: {...},
		
		// Sublayers - paint rendering for each selectable sublayer
		sublayers: {
			sublayername: {
				paint: {
					'line-color': [
						'match',
						['get', 'sublayername']
							value1: colour1,
							value2: colour2,
							...
						fallbackvalue
					],
					...
				},
				[Another sublayer]
			}
		},
		
		// Layer styling callbacks function, defined at the end
		layerStyling: fooStyling,
		
		// Legends
		// If not present, and there is a sublayers list, these will be auto-generated from the sublayers paint first values
		// #!# These need to be merged with sublayers
		legends: {...},
		
		// Chart definitions
		// #!# Need to define more clearly the assumed data structure, e.g. the 'charts' key shows a part field
		charts: {...},
		
		// Popups
		// #!# Need to add support for auto-popups if <template> is present, as these is becoming boilerplate code
		popups: {...}
	},
	
	*/
	
	rnet: {
		layer: {
			'id': 'rnet',
			'source': {
				'type': 'vector',
				'url': 'pmtiles://%tileserverUrl/rnet_2025-03-01.pmtiles',
			},
			'source-layer': 'rnet',
			'type': 'line',
		},
		sublayers: {
			none: {
				paint: {
					'line-color': '#304ce7'
				}
			},
			flow: {
				paint: {
					'line-color': [
						'step',
						['get', 'all_fastest_bicycle_go_dutch'],	/* layerWidthField will change this field later; see below */
							'rgba(0,0,0,0)', 1,	/* fully transparent */
							'#9C9C9C', 50,
							'#FFFF73', 100,
							'#AFFF00', 250,
							'#00FFFF', 500,
							'#30B0FF', 1000,
							'#2E5FFF', 2000,
							'#0000FF', 3000,
						'#FF00C5'	/* 3000+ */
					]
				}
			},
			quietness: {
				paint: {
					'line-color': [
						'step',
						['get', 'quietness'],
							'#882255', 25,
							'#CC6677', 50,
							'#44AA99', 75,
							'#117733', 100.001,		/* i.e. including 100 */
						'#000000'	/* will never get used */
					]
				}
			},
			gradient: {
				paint: {
					'line-color': [
						'step',
						['get', 'gradient'],
							'#59ee19', 3,
							'#37a009', 5,
							'#FFC300', 7,
							'#C70039', 10,
							'#581845', 100,
						'#000000'
					]
				}
			}
		},
		layerStyling: rnetStyling,
		// #!# Need to generate this from the sublayers styles
		legends: {
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
		popups: {
			layerId: 'rnet',
			templateId: 'rnet-popup',
			preprocessingCallback: popupCallback,	// Defined below
			smallValuesThreshold: 10,
			literalFields: ['gradient', 'quietness']
		}
	},
	
	'rnet-simplified': {
		layer: {
			'id': 'rnet-simplified',
			'source': {
				'type': 'vector',
				'url': 'pmtiles://%tileserverUrl/rnet_simplified_2025-03-01.pmtiles',	 // #!# Inconsistent path - needs fixing
			},
			'source-layer': 'rnet_simplified',
			'type': 'line',
		},
		// sublayers: uses rnet - copied-in below at the end of this array creation
		// layerStyling: uses rnet - copied-in below at the end of this array creation
		// legends: uses rnet - copied-in below at the end of this array creation
		popups: {
			templateId: 'rnet-popup',
			preprocessingCallback: popupCallback,	// Defined below
			smallValuesThreshold: 10,
			literalFields: ['gradient', 'quietness']
		}
	},
	
	// #!# Tiles filename, and source layer still reflect the old name, and need to be updated
	coherentnetwork: {
		layer: {
			'id': 'coherentnetwork',
			'type': 'line',
			'source': {
				'type': 'vector',
				'url': 'pmtiles://%tileserverUrl/combined_CN_4_2025-03-01_OS.pmtiles',
			},
			'source-layer': 'coherent_networks',
			'paint': {
				'line-color': [
					'match',
					['get', 'road_function_npt'],
						'Primary', '#e73f74',
						'Secondary', '#f1ce63',
						// 'Local Access', '#7faedd',
					/* other */ '#808080'
				],
				'line-width': 3
			},
		},
		// legends will be auto-generated from the paint match definition
	},
	
	clos: {
		layer: {
			'id': 'clos',
			'type': 'line',
			'source': {
				'type': 'vector',
				'url': 'pmtiles://%tileserverUrl/cbd_layer_2025-03-01.pmtiles',
			},
			'source-layer': 'cbd_layer',
			'paint': {
				'line-color': '#603',
				'line-width': 2
			}
		},
		sublayers: {
			'Level of Service': {
				paint: {
					'line-color': [
						'match',
						['get', 'Level of Service'],
							'Should not be used (non-compliant intervention)', '#4a0404',
							'Should not be used (mixed traffic)', 'darkred',
							'Low', 'red',
							'Medium', '#d27d2d',
							'High', 'mediumseagreen',
						'gray'
					],
					'line-width': highwayTypeLineWidths
				}
			},
			'Traffic volume category': {
				paint: {
					'line-color': [
						'match',
						['get', 'Traffic volume category'],
							'0 to 1999', '#27918d',
							'2000 to 3999', '#ffaa33',
							'4000+', '#440154',
						'gray',
					],
					'line-width': highwayTypeLineWidths
				}
			},
			'Speed limit': {
				paint: {
					'line-color': [
						'match',
						['get', 'Speed limit'],
							10, '#87a96b',
							20, 'seagreen',
							30, '#cc5500',
							40, 'orangered',
							50, '#ce2029',
							60, 'firebrick',
							70, 'darkred',
						'gray',
					],
					'line-width': highwayTypeLineWidths
				}
			},
			'Infrastructure type': {
				paint: {
					'line-color': [
						'match',
						['get', 'Infrastructure type'],
							'Segregated Track (wide)', '#054d05',
							'Off Road Cycleway', '#3a9120',
							'Segregated Track (narrow)', '#87d668',
							'Shared Footway', '#ffbf00',
							'Painted Cycle Lane', '#ff0000',
						'rgba(0, 0, 0, 0)', 	// Invisible
					],
					'line-width': [
						'match',
						['get', 'Infrastructure type'],
							'Segregated Track (wide)', 6,
							'Off Road Cycleway', 4,
							'Segregated Track (narrow)', 4,
							'Shared Footway', 3,
							'Painted Cycle Lane', 1.8,
						2,
					]
				}
			},
		},
		// legends will be auto-generated from the sublayer match definitions
		popups: {
			layerId: 'clos',
			templateId: 'clos-popup'
		}
	},
	
	streetspace: {
		layer: {
			'id': 'streetspace',
			'type': 'line',
			'source': {
				'type': 'vector',
				'url': 'pmtiles://%tileserverUrl/os_networks_categorized_street_space_with_widths.pmtiles',
			},
			'source-layer': 'street_space',
			'paint': {
				'line-color': 'gray',		// Overriden below in sublayers, as is a multi-field dataset
				'line-width': 4
			}
		},
		sublayers: {
			'carriageway_1way': streetspaceSublayer ('carriageway_1way'),
			'carriageway_2way': streetspaceSublayer ('carriageway_2way'),
			'combined_1way'   : streetspaceSublayer ('combined_1way'),
			'combined_2way'   : streetspaceSublayer ('combined_2way'),
		},
		// #!# Can't currently use auto-legends, as the sublayerselector mechanism doesn't yet support radiobuttons rather than select
		legends: {
			'streetspace': [
				['Not enough space', '#dd7777'],
				['Absolute minimum', '#e0b97d'],
				['Desirable minimum', '#75a375'],
			]
		},
		popups: {
			layerId: 'streetspace',
			templateId: 'streetspace-popup'
		}
	},
	
	data_zones: {
		layer: {
			'id': 'data_zones',
			'type': 'fill',
			'source': {
			'type': 'vector',
				'url': 'pmtiles://%tileserverUrl/data_zones_2025-03-01.pmtiles',
				},
			'source-layer': 'data_zones',
			'paint': {
				'fill-color': '#9c9898',
				'fill-opacity': 0.8,
				'fill-outline-color': '#000000'
			}
		},
		sublayers: {
			pcycle: {
				paint: {
					'fill-color': [
						'step',
						['get', 'pcycle'],
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
					]
				}
			},
			pcycle_go_dutch: {
				paint: {
					'fill-color': [
						'step',
						['get', 'pcycle_go_dutch'],
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
					]
				}
			},
			population_density: {
				paint: {
					'fill-color': [
						'step',
						['get', 'population_density'],
							'#edf8fb', 10,
							'#bfd3e6', 50,
							'#9ebcda', 100,
							'#8c96c6', 150,
							'#8856a7', 200,
							'#810f7c', 600,
						'#000000'
					]
				}
			},
			SIMD2020v2_Decile: {
				paint: {
					'fill-color': [
						'step',
						['get', 'SIMD2020v2_Decile'],
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
					]
				}
			},
			drive_petrol:    data_zonesSublayer ('drive_petrol'),
			drive_GP:        data_zonesSublayer ('drive_GP'),
			drive_post:      data_zonesSublayer ('drive_post'),
			drive_retail:    data_zonesSublayer ('drive_retail'),
			drive_primary:   data_zonesSublayer ('drive_primary'),
			drive_secondary: data_zonesSublayer ('drive_secondary'),
			PT_GP:           data_zonesSublayer ('PT_GP'),
			PT_post:         data_zonesSublayer ('PT_post'),
			PT_retail:       data_zonesSublayer ('PT_retail'),
			broadband: {
				paint: {
					'fill-color': [
						'step',
						['get', 'broadband'],
							'#fff7ec', 0.01,		// #!# Currently zero is used for voids - data should be changed to use known constant e.g. -9999
							'#fee8c8', 2,
							'#fdd49e', 5,
							'#fdbb84', 10,
							'#d7301f', 50,
							'#7f0000', 100,
						'#000000'
					]
				}
			},
		},
		layerStyling: data_zonesStyling,
		// #!# These are presumably restatements of sublayers
		legends: {
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
		/*
		,
		// #!# Disabled this popup as of September 2024 - can be deleted later if data issues resolved
		charts: {
			
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
					'Visiting friends and family trips leaving',
					'The bar chart shows estimated mode shares of trips for visiting friends and family under different scenarios for trips leaving this zone.',
					'Annual Average Daily Flow'
				],
				[
					// visiting Destination
					'visiting_dest',
					'Visiting friends and family trips arriving',
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
		}
		*/
	},
	
	busroutes: {
		layer: {
			'id': 'busroutes',
			'type': 'line',
			'source': {
				'type': 'vector',
				'url': 'pmtiles://%tileserverUrl/osm_bus_route_pmtiles.pmtiles',
			},
			'source-layer': 'osm_bus_route',
			'paint': {
				'line-color': 'red',
				'line-width': 2
			}
		},
		legends: {
			'busroutes': [
				['Bus routes', 'red'],
			]
		},
		popups: {
			layerId: 'busroutes',
			templateId: 'busroutes-popup'
		}
	},
	
	schools: {
		layer: {
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
				'circle-stroke-color': '#ccc',
				'circle-stroke-width': 1
			}
		},
		// legends will be auto-generated from the paint match definition
		/*
		,
		// Travel to School Modeshare
		charts: {

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
		*/
	},
	
	wards: {
		layer: {
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
		legends: {
			'wards': [
				['Ward boundaries', 'rgba(32, 107, 7, 1)'],
			]
		}
	},
	
	holyrood: {
		layer: {
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
		legends: {
			'holyrood': [
				['Scottish Parliament Constituency boundaries', 'rgba(83, 123, 252, 1)'],
			]
		}
	},
	
	la: {
		layer: {
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
		legends: {
			'la': [
				['Local authority boundaries', 'rgba(107, 7, 7, 1)'],
			]
		}
	},
	
	urbanrural: {
		layer: {
			'id': 'urbanrural',
			'type': 'line',
			'source': {
				'type': 'vector',
				'url': 'pmtiles://%tileserverUrl/SG_Urban_2020.pmtiles',
			},
			'source-layer': 'coherent_networks',
			'paint': {
				'line-color': '#8dd3c7',
				'line-width': 2,
			}
		},
		legends: {
			'urbanrural': [
				['Urban/rural boundary', '#8dd3c7'],
			]
		}
	}
};

// Clone rnet definitions, to avoid restatement of large arrays, above
datasets['rnet-simplified'].sublayers    = datasets['rnet'].sublayers;
datasets['rnet-simplified'].layerStyling = datasets['rnet'].layerStyling;
datasets['rnet-simplified'].legends      = datasets['rnet'].legends;



// Callbacks
function popupCallback (feature)
{
	const layerWidthField = getLayerWidthField ();
	feature.properties._ncycle = feature.properties[layerWidthField];
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
function rnetStyling (layerId, map, settings, datasets)
{
	// No special handling needed if not visible
	if (!document.querySelector ('input.showlayer[data-layer="' + layerId + '"]').checked) {
		return;
	}
	
	// Determine the sublayer (field) in use
	const sublayer = document.querySelector ('select.updatelayer.sublayerselector-' + layerId).value;
	
	// Determine the layer width field
	const layerWidthField = getLayerWidthField ();
	
	// Parse route network slider input fields to be used as filters
	const sliders = {};
	document.querySelectorAll ('input.slider[data-layer="rnet"]').forEach (sliderInput => {
		const sliderValue = sliderInput.value.split ('-');
		sliders[sliderInput.name] = {
			min: Number(sliderValue[0]),
			max: Number(sliderValue[1])
		};
	});
	
	// Only filter cycle trips if scenario set
	const filter = ['all',
		['>=', layerWidthField, sliders.cycle.min],
		['<=', layerWidthField, sliders.cycle.max],
		['>=', 'quietness', sliders.quietness.min],
		['<=', 'quietness', sliders.quietness.max],
		['>=', 'gradient', sliders.gradient.min],
		['<=', 'gradient', sliders.gradient.max]
	];
	
	// In flow (Cycle trips per day) mode, the line colour is based on the layer width field, i.e. derived from the parameters
	if (sublayer == 'flow') {
		datasets[layerId].sublayers[sublayer].paint['line-color'][1] = ['get', layerWidthField];
	}
	
	// Set the line colour
	const lineColour = datasets[layerId].sublayers[sublayer].paint['line-color'];
	
	// Define line width
	// Implements the formula y = (3 / (1 + exp(-3*(x/1000 - 1.6))) + 0.3)
	// This code was hard to work out!
	const lineWidth = [
		'interpolate',
		['linear'],
		['zoom'],
		12, ['*', 2.1,  ['+', 0.3, ['/', 3, ['+', 1, ['^', 2.718, ['-', 2.94, ['*', ['get', layerWidthField], 0.0021]]]]]]],
		14, ['*', 5.25, ['+', 0.3, ['/', 3, ['+', 1, ['^', 2.718, ['-', 2.94, ['*', ['get', layerWidthField], 0.0021]]]]]]],
		15, ['*', 7.5,  ['+', 0.3, ['/', 3, ['+', 1, ['^', 2.718, ['-', 2.94, ['*', ['get', layerWidthField], 0.0021]]]]]]],
		16, ['*', 18,   ['+', 0.3, ['/', 3, ['+', 1, ['^', 2.718, ['-', 2.94, ['*', ['get', layerWidthField], 0.0021]]]]]]],
		18, ['*', 52.5, ['+', 0.3, ['/', 3, ['+', 1, ['^', 2.718, ['-', 2.94, ['*', ['get', layerWidthField], 0.0021]]]]]]],
	];
	
	// Set the filter
	map.setFilter (layerId, filter);
	
	// Set paint properties
	map.setPaintProperty (layerId, 'line-color', lineColour);
	map.setPaintProperty (layerId, 'line-width', lineWidth);
}


// Styling callback for data zones (including buildings styling)
function data_zonesStyling (layerId, map, settings, datasets)
{
	// Determine the sublayer (field) in use
	const sublayer = document.querySelector ('select.updatelayer.sublayerselector-' + layerId).value;
	
	// Get UI state
	const daysymetricMode = document.querySelector ('input.updatelayer[data-layer="data_zones"][name="daysymetricmode"]').checked;
	
	// Set paint properties
	map.setPaintProperty (layerId, 'fill-color', datasets[layerId].sublayers[sublayer].paint['fill-color']);
	map.setPaintProperty (layerId, 'fill-opacity', (daysymetricMode ? 0.1 : 0.8)); // Very faded-out in daysymetric mode, as the buildings are coloured
	
	// Set buildings layer colour/visibility
	const buildingColour = getBuildingsColour (settings, sublayer, daysymetricMode);
	map.setPaintProperty ('dasymetric', 'fill-extrusion-color', (buildingColour || '#9c9898'));
	map.setLayoutProperty ('dasymetric', 'visibility', (buildingColour ? 'visible' : 'none'));
}


// Function to determine the buildings colour
function getBuildingsColour (settings, sublayer, daysymetricMode)
{
	// If datazones is off, buildings shown, if vector style, as static colour appropriate to the basemap
	if (!document.querySelector ('input.showlayer[data-layer="data_zones"]').checked) {
		const styleName = document.querySelector ('#basemapform input:checked').value;	// Same as nptUi.getBasemapStyle()
		return settings.basemapStyles[styleName].buildingColour;
	}
	
	// If dasymetric mode, use a colour set based on the layer
	if (daysymetricMode) {
		return datasets['data_zones'].sublayers[sublayer].paint['fill-color'];
	}
	
	// Default to gray
	return '#9c9898';
}


// Function to generate a colour scheme
function colourGradient (start, finish, stops)
{
	// Start list of colours
	const colours = [];
	
	// Determine increment between stops
	const increment = 1 / (stops - 1);
	
	// Define a colour interpolation function
	const interpolateColour = function (colour1, colour2, factor)
	{
		const r1 = parseInt (colour1.substring (1, 3), 16);
		const g1 = parseInt (colour1.substring (3, 5), 16);
		const b1 = parseInt (colour1.substring (5, 7), 16);
		
		const r2 = parseInt (colour2.substring (1, 3), 16);
		const g2 = parseInt (colour2.substring (3, 5), 16);
		const b2 = parseInt (colour2.substring (5, 7), 16);
		
		const r = Math.round (r1 + factor * (r2 - r1));
		const g = Math.round (g1 + factor * (g2 - g1));
		const b = Math.round (b1 + factor * (b2 - b1));
		
		return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString (16).slice (1);
	}
	
	// Get each stop
	let i;
	factor = 0;
	for (i = 0; i < stops; i++) {
		colours.push ([(i + 1), interpolateColour (start, finish, factor)]);
		factor += increment;
	}
	
	// Format as a flat list, e.g. (1, #nnnnnn, 2, #nnnnnn, ...)
	const matchList = [];
	colours.forEach (function ([value, colour]) {
		matchList.push (value);
		matchList.push (colour);
	});
	
	//console.log (colours, matchList);
	
	// Return the colours and the matchlist
	return [colours, matchList];
}
