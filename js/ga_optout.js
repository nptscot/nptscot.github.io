// Set to the same value as the web property used on the site
var gaProperty = 'G-QZMHV92YXJ';

// Disable tracking if the opt-out cookie exists.
var disableStr = 'ga-disable-' + gaProperty;
if (document.cookie.indexOf(disableStr + '=true') > -1) {
  window[disableStr] = true;
}

// Opt-out function
function gaOptout() {
  document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/; SameSite=None; Secure';
  window[disableStr] = true;
}


// Handle cookie warning buttons
document.querySelectorAll ('#cookiewarning button').forEach (function (button) {
  button.addEventListener('click', function (e) {
    cookieButton (button.value);
  });
});


// Warning Control
function cookieButton(accepted) {
  
  if(accepted){
    setCookie('NPTtrack', 'true');
  } else {
    //alert("Tracking Op-Out Disabled");
    gaOptout();
    setCookie('NPTtrack', 'false');
  }
  
  var cookiewarning = document.getElementById("cookiewarning");
  cookiewarning.style.display = "none";
}


// Cookie managment functions
function setCookie(name, value) {
  var d = new Date();
  d.setTime(d.getTime() + (1000 * 24 * 60 * 60 * 1000));
  var expires = 'expires=' + d.toUTCString();
  document.cookie = name + '=' + value + ';' + expires + ';path=/';
}

function getCookie(name) {
  var name = name + '=';
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
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

// Cookie warning
function showCookieWarning(){
  var cookiewarning = document.getElementById("cookiewarning");
  var NPTcookie = getCookie('NPTtrack');
  console.log("Cookie status: '" + NPTcookie + "'");
  cookiewarning.style.display = (NPTcookie === '' ? 'block' : 'none');
}

showCookieWarning();



