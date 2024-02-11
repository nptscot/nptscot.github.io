// NPT UI implementation code

/*jslint browser: true, white: true, single: true, for: true, unordered: true, long: true */
/*global alert, console, window, noUiSlider, tippy */

var nptUi = (function () {
	
	'use strict';
	
	
	// Settings
	let _settings = {};		// Will be populated by constructor
	
	
	// Functions
	return {
		
		// Main function
		initialise: function (settings)
		{
			// Populate the settings class property
			_settings = settings;
			
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
			
			// Handler for help buttons which have a data-help attribute indicating there is a manual section
			nptUi.handleHelpButtons ();
			
			// Create sliders
			nptUi.createSliders ();
			
			// Tooltip support
			nptUi.tooltips ();
		},
		
		
		// function to manage analytics cookie setting
		manageAnalyticsCookie: function ()
		{
			// Disable tracking if the opt-out cookie exists.
			var disableStr = 'ga-disable-' + _settings.gaProperty;
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

				var cookiewarning = document.getElementById("cookiewarning");
				cookiewarning.style.display = "none";
			}


			// Cookie warning
			function showCookieWarning ()
			{
				var cookiewarning = document.getElementById("cookiewarning");
				var NPTcookie = nptUi.getCookie(cookieName);
				console.log("Cookie status: '" + NPTcookie + "'");
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
			let text = 'Last updated: ' + nptUi.formatAsUKDate(document.lastModified) + '.';
			text += ' You may need to <a href="https://www.minitool.com/news/f5-vs-ctrl-f5.html">clear your browser cache</a> to see the latest updates.'
			document.getElementById('updatedate').innerHTML = text;
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
					var panel = button.nextElementSibling;
					panel.style.display = (panel.style.display == 'block' ? 'none' : 'block');
				}
			});
		},	
		
		
		// Function to manage the layer controls box UI
		layerControlsBoxUi: function ()
		{
			// Show the layer controls box, and open up the route network part of this
			showlayercontrols(true);
			document.getElementById('rnet_accordion').click();
			
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
				var box = document.getElementById('rightbox');
				box.style.display = (show ? 'block' : 'none');
				
				var boxbutton = document.getElementById('showrightbox');
				boxbutton.style.display = (show ? 'none' : 'block');
			}
		},
		
		
		// Main menu responsive display
		topnav: function ()
		{
			document.getElementById ('expandtopnav').addEventListener ('click', function (e) {
				var x = document.getElementById('myTopnav');
				if (x.className == 'topnav') {
					x.classList.add ('responsive');
				} else {
					x.classList.remove ('responsive');
				}
				e.preventDefault ();
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
				const slider = div.id.replace('slider-', '');
				div.noUiSlider.on('update', function () {
					document.getElementById('rnet_slider-' + slider).value = Number(div.noUiSlider.get()[0]) + '-' + Number(div.noUiSlider.get()[1]);
					document.getElementById('rnet_slider-' + slider).dispatchEvent(new Event('change'));
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
			var d = new Date();
			d.setTime(d.getTime() + (1000 * 24 * 60 * 60 * 1000));
			var expires = 'expires=' + d.toUTCString();
			document.cookie = name + '=' + value + ';' + expires + ';path=/';
		},
		
		
		getCookie: function (name)
		{
			var name = name + '=';
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
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
	