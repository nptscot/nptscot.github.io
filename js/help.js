
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
  toggle_overlay(true)
  document.getElementById("help").style.display = "block";
}


// Function to convert the loaded Markdown file text to HTML
// #!# Copied from manual.js
function mdToHtml (mdText)
{
  const converter = new showdown.Converter ();
  const html = converter.makeHtml (mdText);
  return html;
}
