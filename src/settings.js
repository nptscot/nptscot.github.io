
// Settings definitions for this installation
const settings = {
	
	// Map position
	initialPosition: {
		center: [-3.1382, 55.9533],	// Lon,lat
		zoom: 8,
	},
	maxZoom: 19,
	minZoom: 6,
	
	// Basemap styles
	basemapStyleDefault: 'greyscale_nobuild',
	basemapStyles: {
		'greyscale_nobuild': {
			title: 'OS greyscale',
			buildingColour: '#d1cfcf'
		},
		'satellite': {
			title: 'Satellite',
			buildingColour: false   // No buildings
		},
		'opencyclemap': {
			title: 'OpenCycleMap',
			buildingColour: false   // No buildings
		},
		'google_nobuild': {
			title: 'Outdoors',
			buildingColour: '#f0eded'
		},
		'dark_nobuild': {
			title: 'Dark',
			buildingColour: '#000000'
		},
	},
	
	// Tileserver for data layers
	tileserverUrl: 'https://nptscot.blob.core.windows.net/pmtiles',		// Not slash-terminated
	tileserverTempLocalOverrides: {		// Temporarily define any local folder paths where particular layers should come from
		//rnet: 'utilitytrips/',
		//cohesivenetwork: 'cohesivenetwork/',
	},
	
	// Manual
	manualEditingUrl: 'https://github.com/nptscot/nptscot.github.io/edit/dev/%id/index.md',
	
	// Analytics
	gaProperty: 'G-QZMHV92YXJ',
};
  