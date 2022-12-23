//function hidewelcome() {
//  var x = document.getElementById("welcome");
//  if (x.style.display === "none") {
//    x.style.display = "block";
//  } else {
//    x.style.display = "none";
//  }
//  
//} 

// Get the welcome
var welcome = document.getElementById("welcome");

// Get the <span> element that closes the welcome
var span = document.getElementsByClassName("closewelcome")[0];

// When the user clicks on <span> (x), close the welcome
span.onclick = function() {
  welcome.style.display = "none";
};

// When the user clicks anywhere outside of the welcome, close it
window.onclick = function(event) {
  if (event.target == welcome) {
	welcome.style.display = "none";
  }
};


