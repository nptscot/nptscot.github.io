

accordion ();

function accordion () {
  
  document.querySelectorAll('.accordion').forEach (element => {
    element.addEventListener('click', function() {
      
      // Toggle between adding and removing the "active" class, to highlight the button that controls the panel
      this.classList.toggle('active');
      
      // Toggle between hiding and showing the active panel
      var panel = this.nextElementSibling;
      panel.style.display = (panel.style.display == 'block' ? 'none' : 'block');
    });
  });
}


// Show the layer controls box, and open up the route network part of this
showrighbox(true);
document.getElementById('rnet_accordion').click();

/* Show and hide UI */
function showrighbox(show){
    
  // Toggle box
  var box = document.getElementById('rightbox');
  box.style.display = (show ? 'block' : 'none');
  
  var boxbutton = document.getElementById('showrightbox');
  boxbutton.style.display = (show ? 'none' : 'block');
}


// Basemap control
function showbasemapcontrol(){
    var box = document.getElementById('basemapcontrol');
    box.style.display = (box.style.display == 'none' ? 'block' : 'none');
}


// Main menu responsive display
function expandtopnav() {
  var x = document.getElementById('myTopnav');
  if (x.className == 'topnav') {
    x.classList.add ('responsive');
  } else {
    x.classList.remove ('responsive');
  }
}