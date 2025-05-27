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
			
			// Filter for LADs only
			const ladFeatures = boundaries.features.filter(feature => feature.properties.kind === 'LAD');

			// Add the list
			const div = document.createElement ('div');
			div.id = 'localAuthoritiesListContainer'; // Changed ID for clarity
			div.innerHTML = boundariesList (ladFeatures); // Use new list rendering function
			document.querySelector ('#content').appendChild (div);

			// Add search functionality
			const searchInput = document.getElementById('searchInput');
			searchInput.addEventListener('keyup', function() {
				const filter = searchInput.value.toLowerCase();
				// Filter from the ladFeatures list
				const filteredLads = ladFeatures.filter(feature => {
					return feature.properties.name.toLowerCase().includes(filter);
				});
				div.innerHTML = boundariesList(filteredLads); // Update with list rendering
			});
		});
}


// Function to render the list (renamed from boundariesTable)
function boundariesList (features) 
{
	// Build the list from each feature
	let html = '<ul class="lad-list">'; // Use a class for potential styling
	features.forEach (function (feature) { 
		const linkUrl = 'https://npw.scot/npw?boundary=LAD_' + encodeURIComponent (feature.properties.name);
		html += '<li><a href="' + linkUrl + '">' + feature.properties.name + '</a></li>'; 
	});
	html += '</ul>';
	
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
