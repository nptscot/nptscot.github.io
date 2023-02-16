function show_help(help) {
  switch (help) {
      case 'purpose':
        document.getElementById("helpcontent").innerHTML = `
        <h3>Trip purpose</h3>
        <p>People have many reasons to travel, and their reasons for travel often change their choice of destinations and routes. Therefore a cycling network designed for commuters may look very different to a network designed for children to travel to school. The trip purpose drop-down allows you to view different networks based on different trip purposes.</p>
        <h4>Commute</h4>
        <p>The commute network is based on the 2011 Census travel to work data. Commuters tend to favour radial routes from suburban residential areas into town and city centres where most jobs are concentrated.</p>
        `;
        break;
      case 'type':
        document.getElementById("helpcontent").innerHTML = `
        <h3>Network type</h3>
        <p>The network type reflects choices cyclists make about route choice. There is strong evidence that cyclists prefer the most direct route, and it reduces journey times and the physical effort of cycling. However, cyclists may make detours away from roads that are (or are perceived to be) dangerous. There is strong evidence that safety concerns are the main barrier to more people cycling.</p>
        <h4>Fastests (prefered)</h4>
        <p>The fastest network is based on cyclists taking the most direct (legal) routes. While cyclists prefer direct routes, this will often bring them onto busy and dangerous major roads, which are a barrier to cycling. Planners seeking to maximise cycling will build high-quality cycle infrastructure along busy roads, which form part of the fastest cycle route network.</p>
        <h4>Quietest</h4>
        <p>The quiet network assumes that cyclists will avoid busy roads and be willing to take significant detours. While directing cyclists away from busy roads and onto quieter back streets may seem like a good idea, it can have significant downsides. Quiet routes are always longer and often much harder to navigate as they weave around the back streets. Even if the routes are very safe, the longer and more complex journeys will discourage cycling. The NPT captures this effect, and the total number of cyclists on the quiet route network is less than on the fast route network.</p>
        <p>Quiet networks work best when the directness penalty is small. For example, a city with a grid layout could alternate between roads designed for cars and streets designed for active travel. </p>
        <p><img src="images/amsterdam_networks.JPG" alt="Amsterdam car and cycle networks" class="responsive"></p>
        <p>The image above (<a href="https://maps.amsterdam.nl/plushoofdnetten/" target="_blank">source</a>) shows how Amsterdam uses its grid layout to have parallel but separate networks for cars (red, orange, black) and bicycles (green). Notice how the cycling network is much denser than the car network, ensuring that cyclists almost always benefit from a more direct route.</p>
        <h4>Balanced</h4>
        <p>The balanced network is a trade-off between the fastest and quietest networks. It highlights places where cycling and car networks can be separated without penalising directness too much. Planners should not view quiet or balanced networks as ways to avoid building high-quality cycle infrastructure. Instead, consider if moving the cycle infrastructure one street over may unlock qualitative benefits for cyclists, such as more pleasant journies that are worth a small penalty in total journey time.</p>
        <h4>EBikes</h4>
        <p>The ebikes network is a variant of the fastest network that reduces the penalty for going up hills. Pedal cyclists incur a significant time and effort penalty from going uphill, so a longer but flatter route is often faster. A good ebike can enable cyclists to ride uphill at 15 mph without breaking a sweat. Thus ebike riders may choose shorter but hillier routes than pedal cyclists.</p>
        <p>As ebikes increase a cyclist's range and carrying capacity while reducing effort and journey times, a world with many ebikes would expect higher levels of cycling than one with only pedal cycles.</p>
        
        `;
        break;
      case 'scenario':
        document.getElementById("helpcontent").innerHTML = `
        <h3>Scenarios</h3>
        <p>The scenarios drop-down allows you to view different levels of cycling and other information about the road network</p>
        <h4>Baseline (2011)</h4>
        <p>The baseline scenario is based on the 2011 travel-to-work data and is intended to represent the current level of cycling. As such, it is intended to show where there is current demand to cycle infrastructure.</p>
        <h4>Go Dutch</h4>
        <p>The Go Dutch scenario imagines a future where people in the UK are as likely to travel by bike as people in the Netherlands while accounting for differences in trip distance and hilliness between locations. As such, the network shows where there could be future demand for cycling infrastructure.</p>
        <p>Planners should seek to design cycle networks that meet the needs of both current and future cyclists. But they may phase the construction to prioritise roads that will meet the needs of current cyclists and enable new people to cycle.</p>
        <h4>Quietness</h4>
        <p>The quietness score grades roads from 0-100 on how cycle friendly they are. Quietness scores affect route choice. Therefore roads that are both important cycling routes and have a low quietness score are barriers to cycling uptake and should be a priority for improved cycle infrastructure.</p>
        <h4>Gradient</h4>
        <p>The average gradient of the road is shown. Steeper roads are a barrier to cycling and affect route choice and the uptake of cycling in the scenarios.</p>
        
        `;
        break;
      case 'ends':
        document.getElementById("helpcontent").innerHTML = `
        <h3>Trip ends</h3>
        <p>Travel data can be summarised by origins or destinations. Consider work travel; typically, people travel from many residential areas at the edge of cities into a few city centre areas where most jobs are concentrated. So mapping cycling by origins shows information about residents. But mapping by destination shows information about workers. </p>
        <p></p>
        
        `;
        break;
      case 'filters':
        document.getElementById("helpcontent").innerHTML = `
        <h3>Route Network Filters</h3>
        <p>The sliders allow you to show/hide parts of the route network. You can filter on three variables:</p>
        <h4>Numbers of cyclists</h4>
        <p>This filter is only available when "Line colour" is set to a cycling scenario.</p>
        <h4>Gradient</h4>
        <p>Set the maximum and minimum gradient of roads that are visible. Gradient measures the average gradient of the road segment as a percentage. E.g. 0% = flat, 100% = vertical cliff.</p>
        <h4>Quietness</h4>
        <p>Set the maximum and minimum quietness of roads that are visible. Quietness measures how cycle friendly the existing road is from 0 (least friendly) to 100 most (friendly).</p>
        <p></p>
        `;
        break;
      default:
        console.log('unknown help selected: ' + help);
  }
  document.getElementById("help").style.display = "block";
  toggle_overlay(true)

}

