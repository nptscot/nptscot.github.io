// Create modal for help
newModal ('welcome');


function formatAsUKDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-GB', options);
}


document.getElementById("updatedate").innerHTML = 'Last Updated: ' + formatAsUKDate(document.lastModified) + '. You may need to <a href="https://www.minitool.com/news/f5-vs-ctrl-f5.html">clear your browser cache</a> to see the latest updates.';

