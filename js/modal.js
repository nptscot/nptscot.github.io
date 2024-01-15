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

  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      hide ();
    }
  });

  // Treat escape key as implied close
  window.addEventListener('keyup', function (event) {
    if (event.key == 'Escape') {
      if (modal.style.display == 'block') {
        hide ();
      }
    }
  });
  
  // Show
  const show = function () {
    modal.style.display = 'block';
  };
  
  // Hide
  const hide = function () {
    modal.style.display = 'none';
  };
  
  // Accessor functions
  return {
    show: show,
    hide: hide
  }
}

