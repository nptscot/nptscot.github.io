// Create modal for help
newModal ('welcome');


function formatAsUKDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-GB', options);
}


document.getElementById("updatedate").innerHTML = 'Last Updated: ' + formatAsUKDate(document.lastModified) + '. You may need to <a href="https://www.minitool.com/news/f5-vs-ctrl-f5.html">clear your browser cache</a> to see the latest updates.';

// When the user clicks on <span> (x), close the welcome and help
var spanhelp = document.getElementsByClassName("closehelp")[0];
spanhelp.onclick = function() {
  document.getElementById("help").style.display = "none";
  toggle_overlay(false);
};

function toggle_overlay(on) {
  if(on){
    document.getElementById("overlay").style.display = "block";
  } else {
    document.getElementById("overlay").style.display = "none";
  }
}



