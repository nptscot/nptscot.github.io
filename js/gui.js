// General GUI functions

topnav ();


// Main menu responsive display
function topnav ()
{
  document.getElementById ('expandtopnav').addEventListener ('click', function (e) {
    var x = document.getElementById('myTopnav');
    if (x.className == 'topnav') {
      x.classList.add ('responsive');
    } else {
      x.classList.remove ('responsive');
    }
    e.preventDefault ();
  });
}