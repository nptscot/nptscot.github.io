
// Handler for help buttons which have a data-help attribute indicating there is a manual section
document.querySelectorAll ('.helpbutton').forEach (function (button) {
  if (button.dataset.help) {   // E.g. data-help="scenario" refers to the scenario section
    button.addEventListener ('click', function () {
      show_help (button.dataset.help);
    });
  }
});


// Function to handle (?) tooltips, loading extracts from the manual
function show_help(sectionId)
{
  //console.log("Trigger help for sectionId: " + sectionId);
  fetch('/manual/index.md')
    .then (response => response.text ())
    .then(text => {
      
      // Extract the Markdown text between comments
      regex = new RegExp (`<!-- #${sectionId} -->(.+)<!-- /#${sectionId} -->`, 's');  // s flag is for 'match newlines'
      result = regex.exec (text);
      extract = result[1];
      
      // Convert to HTML
      html = mdToHtml (extract);
      
      // Parse to HTML
      const parser = new DOMParser();
      const otherPage = parser.parseFromString(html, 'text/html');
      const contentHtml = otherPage.querySelector('body');
      //console.log(otherDiv.innerHTML);
      if(!contentHtml) {
        contentHtml = '<p><strong>Help missing!</strong></p>';
      }
      
      // Add the HTML
      document.getElementById('helpcontent').innerHTML = contentHtml.innerHTML;
    });
  
  // Show in modal
  const help_modal = newModal ('help_modal');
  help_modal.show ();
}


// Function to convert the loaded Markdown file text to HTML
// #!# Copied from manual.js
function mdToHtml (mdText)
{
  const converter = new showdown.Converter ();
  const html = converter.makeHtml (mdText);
  return html;
}
