

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


// Manage layer controls box if present
if (document.getElementById('rightbox')) {
  
  // Show the layer controls box, and open up the route network part of this
  showlayercontrols(true);
  document.getElementById('rnet_accordion').click();
  
  // Show layer control box when button clicked on
  document.querySelector ('#showrightbox button').addEventListener ('click', function () {
    showlayercontrols (true);
  });
  
  // Close layer control box when X clicked on
  document.querySelector ('#rightbox button.close-button').addEventListener ('click', function () {
    showlayercontrols (false);
  });
}


/* Show and hide UI */
function showlayercontrols(show){
  
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


