
// Settings for this installation
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
	
	// Buildings/placenames tiles URL; can use %tileserverUrl to represent the above
	buildingsTilesUrl: 'pmtiles://%tileserverUrl/dasymetric-2023-12-17.pmtiles',
	placenamesTilesUrl: 'pmtiles://%tileserverUrl/oszoom_names.pmtiles',
	
	// Manual
	manualEditingUrl: 'https://github.com/nptscot/nptscot.github.io/edit/dev/%id/index.md',
	
	// OSM data date
	osmDate: '6 December 2023',
	
	// Analytics
	gaProperty: 'G-QZMHV92YXJ',
	
	// UI callback
	uiCallback: rnetCheckboxProxying,	// Defined below
};
  

// Function to handle rnet checkbox proxying - the combination of the enabled and simplified checkboxes set the 'real' layer checkboxes
function rnetCheckboxProxying ()
{
	console.log ('rnetCheckboxProxying');
	// Define a function to calculate the real checkbox values based on the enabled/simplified boxes
	function setRnetCheckboxes ()
	{
		const layerEnabled = document.getElementById ('rnetcheckboxproxy').checked;
		const simplifiedMode = document.getElementById ('rnet-simplifiedcheckboxproxy').checked;
		document.getElementById ('rnetcheckbox').checked = (layerEnabled && !simplifiedMode);
		document.getElementById ('rnetcheckbox').dispatchEvent(new Event('change'));
		document.getElementById ('rnet-simplifiedcheckbox').checked = (layerEnabled && simplifiedMode);
		document.getElementById ('rnet-simplifiedcheckbox').dispatchEvent(new Event('change'));
	}
	
	// Set initial state
	setRnetCheckboxes ();
	
	// Change state
	document.querySelectorAll('.rnetproxy').forEach ((input) => {
		input.addEventListener ('change', function (e) {
			setRnetCheckboxes ();
		});
	});
}

		
