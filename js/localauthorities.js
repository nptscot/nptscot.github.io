// Load data
loadLocalAuthorities (settings);

// Top nav
topnav ();


// Load the Markdown file as text and place it into the content div
function loadLocalAuthorities (settings)
{
	// Fetch the data
	fetch (settings.boundariesUrl)
		.then (function (response) {
			return response.json ();
		})
		.then (function (boundaries) {
			
			// Add the table
			const div = document.createElement ('div');
			div.id = 'localAuthoritiesTableContainer'; // Add an ID for easier selection
			div.innerHTML = boundariesTable (boundaries.features);
			document.querySelector ('#content').appendChild (div);

			// Add search functionality
			const searchInput = document.getElementById('searchInput');
			searchInput.addEventListener('keyup', function() {
				const filter = searchInput.value.toLowerCase();
				const filteredBoundaries = boundaries.features.filter(feature => {
					return feature.properties.name.toLowerCase().includes(filter);
				});
				div.innerHTML = boundariesTable(filteredBoundaries);
			});
		});
}


// Function to render the table
function boundariesTable (features) // Changed parameter to expect an array of features
{
	// Build the table from each feature
	let html = '<table class="lines" id="localAuthoritiesTable">'; // Added an ID to the table
	html += '<tr>';
	html += '<th>Type</th>';
	html += '<th>Area</th>';
	html += '<th>Network Planning Tool (NPW)</th>';
	html += '</tr>';
	features.forEach (function (feature) { // Changed from Object.entries to iterate directly over features array
		const linkUrl = 'https://npw.scot/npw?boundary=LAD_' + encodeURIComponent (feature.properties.name);
		html += '<tr>';
		html += '<td>' + feature.properties.kind + '</td>';
		html += '<td>' + feature.properties.name + '</td>';
		html += '<td>' + '<a href="' + linkUrl + '">NPW</a></td>';
		html += '</tr>';
	});
	html += '</table>';
	
	// Return the HTML
	return html;
}



// Function to create table of contents
function createToc ()
{
  // Create new div and attach to body
  const tocDiv = document.createElement('div');
  tocDiv.classList.add ('table-of-contents');
  document.querySelector('body').appendChild (tocDiv);
  
  // Add UL to TOC
  const ul = document.createElement('ul');
  tocDiv.appendChild (ul);
  
  const toc = document.querySelector('.table-of-contents');
  const headings = document.querySelectorAll('h2, h3');

  let lastH2Item = null;

  headings.forEach((heading) => {
    const level = heading.tagName.toLowerCase();
    const title = heading.textContent;
    const anchor = heading.id;

    const link = document.createElement('a');
    link.textContent = title;
    link.setAttribute('href', `#${anchor}`);

    const item = document.createElement('li');
    item.appendChild(link);

    if (level === 'h2') {
      const sublist = document.createElement('ul');
      item.appendChild(sublist);
      toc.querySelector('ul').appendChild(item);
      lastH2Item = item;
    } else if (level === 'h3' && lastH2Item) {
      const sublist = document.createElement('ul');
      item.appendChild(sublist);
      lastH2Item.querySelector('ul').appendChild(item);
    }

    heading.addEventListener('click', () => {
      location.hash = anchor;
    });
  });
}


// Function to create an editing link
function createEditLink ()
{
  // Determine the page slug (e.g. /manual/ is 'manual')
  const matches = window.location.pathname.match (new RegExp ('^/([^/]+)/'));
  const slug = matches[1];
  
  // Assemble the link
  const link = settings.manualEditingUrl.replace ('%id', slug);
  
  // Create new div and attach to body
  document.querySelector('#editlink').href = link;
}


// Main menu responsive display
function topnav ()
{
  document.getElementById ('expandtopnav').addEventListener ('click', function (e) {
    var nav = document.querySelector ('nav');
    if (!nav.classList.contains ('responsive')) {
      nav.classList.add ('responsive');
    } else {
      nav.classList.remove ('responsive');
    }
    e.preventDefault ();
  });
}
