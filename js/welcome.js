// Get the <span> element that closes the welcome or help
var span = document.getElementsByClassName("closewelcome")[0];
var spanhelp = document.getElementsByClassName("closehelp")[0];

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

