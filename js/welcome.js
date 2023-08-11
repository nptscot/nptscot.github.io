// Get the <span> element that closes the welcome or help
var span = document.getElementsByClassName("closewelcome")[0];
var spanhelp = document.getElementsByClassName("closehelp")[0];

function formatAsUKDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-GB', options);
}


document.getElementById("updatedate").innerHTML = 'Last Updated: ' + formatAsUKDate(document.lastModified);

// Add "Date of OSM Data on which network results are based" to the welcome by reading-in date.txt, which contains the date of the most recent OSM data:
// Read-in date.txt:
function getOSMDate() {
  var request = new XMLHttpRequest();
  request.open('GET', 'date.txt', false);
  request.send(null);
  if (request.status === 200) {
    var osmdate = request.responseText;
  }
  // Convert to Date:
  var osmdate = new Date(osmdate);
  return formatAsUKDate(osmdate);
}
osmdate = getOSMDate();

document.getElementById("osmdate").innerHTML = 'Date of OSM Data on which network results are based: ' + osmdate;

// When the user clicks on <span> (x), close the welcome and help
span.onclick = function() {
  document.getElementById("welcome").style.display = "none";
  toggle_overlay(false);
};

spanhelp.onclick = function() {
  document.getElementById("help").style.display = "none";
  toggle_overlay(false);
};

// When the user clicks anywhere outside of the welcome, close it
//window.onclick = function(event) {
//  if(!welcome.contains(event.target)){
//	welcome.style.display = "none";
//	toggle_overlay(false);
//  }
//};

function toggle_overlay(on) {
  //console.log(on)
  if(on){
    document.getElementById("overlay").style.display = "block";
  } else {
    document.getElementById("overlay").style.display = "none";
  }
}




