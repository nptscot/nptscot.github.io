var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}


/* Show and hide UI */
function showrighbox(show){
    var box = document.getElementById("rightbox");
    var boxbutton = document.getElementById("showrightbox");
    if(show){
      box.style.display = "block";
      boxbutton.style.display = "none";
    } else {
      box.style.display = "none";
      boxbutton.style.display = "block"; 
    }
}

function showbasemapcontrol(show){
    var box = document.getElementById("basemapcontrol");
    
    if(box.style.display == "none"){
      box.style.display = "block";
    } else {
      box.style.display = "none";
    }
}


function expandtopnav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}