// NPT UI implementation code

/*jslint browser: true, white: true, single: true, for: true, unordered: true, long: true */
/*global alert, console, window */

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
	