
// Function to manage modal dialogs
const newModal = function (modalId)
{
  // Identify the modal
  const modal = document.getElementById(modalId);
  
  // When the user clicks on <span> (x), close the modal
  const closeButton = document.querySelector('#' + modalId + ' .modal-close');
  closeButton.addEventListener('click', function () {
    hide ();
  });

  // Treat clicking outside of the modal as implied close
  window.addEventListener('click', function (event) {
    if (event.target == modal || event.target.id == 'overlay') {
      hide ();
    }
  });

  // Treat escape key as implied close
  window.addEventListener('keyup', function (event) {
    if (event.key == 'Escape') {
      if (window.getComputedStyle(modal).display == 'block') {   // I.e. is displayed
        hide ();
      }
    }
  });
  
  // Show
  const show = function () {
    document.getElementById('overlay').style.display = 'block';
    modal.style.display = 'block';
  };
  
  // Hide
  const hide = function () {
    modal.style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  };
  
  // Accessor functions
  return {
    show: show,
    hide: hide
  }
}

