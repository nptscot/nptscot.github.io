

// Enable the accordion functionality for the layer controls box and popups
accordion ();


// Layer controls box UI
layerControlsBoxUi ();




// Function to manage the layer controls box UI
function layerControlsBoxUi ()
{
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
  
  /* Show and hide UI */
  function showlayercontrols(show){
    
    // Toggle box
    var box = document.getElementById('rightbox');
    box.style.display = (show ? 'block' : 'none');
    
    var boxbutton = document.getElementById('showrightbox');
    boxbutton.style.display = (show ? 'none' : 'block');
  }
}


// Function to manage an accordion
function accordion () {
  
  // Listen for accordion clicks, on a late-bound basis
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains ('accordion')) {
      button = e.target;
      
      // Toggle between adding and removing the 'active' class, to highlight the button that controls the panel
      button.classList.toggle('active');
      
      // Toggle between hiding and showing the active panel
      var panel = button.nextElementSibling;
      panel.style.display = (panel.style.display == 'block' ? 'none' : 'block');
    }
  });
}
