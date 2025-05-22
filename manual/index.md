# NPT manual


Welcome to the Network Planning Tool ([NPT](https://www.npt.scot)), a web application for strategic cycle network planning in Scotland.
The NPT is designed to help local authorities, transport planners, and other stakeholders identify the best locations for cycling infrastructure and routes based on cycling potential and demand.

The NPT, and the related Network Planning Workspace ([NPW](https://npw.scot)) web application for sketching, evaluating and sharing route network designs, are Funded by Transport Scotland and developed by the University of Leeds, [CycleStreets](https://www.cyclestreets.net/) and [A/B Street](https://a-b-street.github.io/docs/) in collaboration with [Sustrans Scotland](https://www.sustrans.org.uk/about-us/our-work-in-scotland/).
These tools build on the functionality of the [Propensity to Cycle Tool](https://www.jtlu.org/index.php/jtlu/article/view/862) (available at [pct.bike](https://www.pct.bike/)) but go beyond the PCT in several ways.
Compared with the PCT, the NPT has an improved map interface, includes additional trip purposes in the estimates of cycling potential, uses higher-resolution data resulting in denser networks, and includes new layers: the Cohesive Network, Cycling Level of Service (LoS), and Street Space layers. 

Each of these elements is described in this manual, which is divided into the following sections:

1.  The map interface and controls
  - [The route network layer](#routenetwork) shows the estimated number of cycle trips on the transport network under different scenarios
  - [The existing cycle network layer](#clos) shows the quality of the existing cycle network, existing cycle infrastructure, and traffic volumes
  - [The street space layer](#streetspace) shows the deliverability of segregated cycle infrastructure
  - [The coherent network layer](#coherentnetwork) shows a strategic cycle network based on the route network
2.  A series of open access [data downloads](https://github.com/nptscot/npt/releases/tag/v2025-05-01) that can be analysed in-house with GIS such as QGIS or data science tools such as R and Python
3.  The [codebase](https://github.com/nptscot/) that can be modified to fix bugs, add new features, and develop new scenarios

The NPT is an open-source and open access project, meaning the source code and results are transparent and in the public domain for all stakeholders to benefit from and build on. 
If you see an opportunity to improve the tool or its outputs, we encourage you to let us know by [raising an issue](https://github.com/nptscot/npt/issues) (requiring a GitHub account).

## 1 Map interface and controls

![Map controls](/images/map_controls.png)

The map can be navigated using map controls on the top left of the screen.

The NPT provides different basemaps. The example below shows the basemap selection options with the satellite basemap with 3D terrain enabled. You can hide the basemap selection option by clicking the change basemap button again.

![Basemap controls](/images/basemaps.png)

The Anti-alias option enables advanced rendering options that make the map look smoother and clearer. However, performance on low-end devices may be impaired when using anti-aliasing.

### Layer controls

![Layer Controls](/images/layer_controls.png)

The layer controls on the right side of the map control what information is shown on the map.

The NPT allows you to view and interact with many datasets for cycle network planning.
The user interface to add, remove or change different data layers that overlay the map is divided into several sections. Each section appears in the layer control panel on the right side of the map.
Each section is described below.

### Route network

The Route network layer displays estimates of cycling potential (i.e. number of cycle trips) on the road and path network, down to the level of individual segments.  It is the first and for many use cases the most important layer in the NPT.. The layer is useful for -identifying  where cycling infrastructure and new routes should ideally be located in order to meet latent demand, in order to maximise usage and ultimately modal shift to cycling. This data is used to inform the creation of the primary cycle network in the Network Planning Workspace. 

The route network provides a range of options and filters to allow you to view cycling potential for different journey purposes and under different scenarios of cycling uptake. For example if you are planning safe cycling routes to school, the primary and secondary school networks are particularly useful. The trip purpose and scenario options are described in detail below.


<!-- #purpose -->

#### Trip purpose

People have many reasons to travel, and their reasons often change their choice of destinations and routes. Therefore, a cycling network designed to serve commuters may look very different to a network designed for children to travel to school. The trip purpose drop-down allows you to view different networks based on different trip purposes.

##### All

This is the default view that displays all journey purposes that are part of the NPT (travel to work, travel to school and other everyday journeys) combined. It offers an overview of total cycling potential and as  such it is useful as a starting point for planning local authority and regional cycle networks. 

##### Commute

The commute network, as the second option in the travel purpose dropdown list, shows journeys to work and is based on the 2011 Census travel to work origin/destination data. Commuters tend to favour radial routes from suburban residential areas into town and city centres where most jobs are concentrated. This layer can help identify the core arterial cycle network.

##### Primary school

The primary school network, as the third option in the travel purpose dropdown list, shows cycling potential for children cycling to primary schools, whether by e-cargo, accompanied by adults, or including as part of 'cycle buses' or travelling independently. It is based on the Scottish Government's Pupil Census 2021 origin/destination data adjusted using data from the Hands Up Scotland Survey. It provides insights into the routes that could be taken by children and carers. Recognising these patterns is important for urban planners, enabling them to emphasize and develop infrastructure that prioritises the safety of young people. Schools tend to be located in residential areas, so the resulting primary and secondary school networks tend to favour denser orbital routes that could be supported by modal filters and traffic management.

##### Secondary school

The secondary school network is the fourth option in the travel purpose dropdown menu. It is based on the same data sources as the primary school network and offers insights into the networks that could provide young people with safe cycling options to get to and from secondary school.

##### Other everyday

<!-- Comments: Perhaps linking the methodology paper here? We are maybe a bit light on methodology content compared to PCT? -->

Other Everyday trips include trips for three individual purposes; shopping, to access leisure facilities and personal trips. Each trip purpose is described below, with this network being the combination of these three journey purposes. It is produced using a modelled approach which takes account of the distribution of households, relevant destinations, the average number of journeys made for these trip purposes (based on Scottish Household Survey) and the distances people cycle.

Shopping trips account for cycling behaviours of individuals travelling to shops, including for food shopping, providing insights into the most popular routes for these types of trips.

<!-- Comments:include a complete list of the broad types of destinations included, rather than just for examples. Please can this list be produced and worked into the text-->

Trips to access leisure facilities captures the cycling patterns of individuals travelling to social hubs, parks, and recreational destinations (e.g. leisure centres, cinemas).

Personal trips captures the cycling patterns of individuals visiting friends and family.

##### Trip purposes not considered

The NPT does not currently include estimates of cycling for recreational purposes or as part of a mixed-mode journey.

Recreational cycling is important in many places, but has high seasonal variability and is complex to model as people cycling often lack a clear destination. The NPT focuses on everyday cycling, which is more predictable and has a clearer destination.

The NPT currently only considers direct journeys where the whole trip is by bicycle. It does not consider mixed-mode journeys such as cycling to the station and then taking a train to your final destination. This means that the NPT slightly underestimates cycling potential overall and may significantly underestimate cycling potential in specific places (such as around train stations).

<!-- /#purpose -->

<!-- #scenario -->

#### Scenarios

The scenarios drop-down allows you to view different levels of cycling and other information about the road network

##### Baseline 

The baseline scenario represents the current level of cycling. As such, it is intended to show where there is an existing demand for cycling infrastructure.

##### Go Dutch

The Go Dutch scenario imagines a future with a high level of cycling, where people in Scotland are as likely to travel by cycle as people in the Netherlands, while accounting for differences in trip distance and hilliness between locations. People in the Netherlands make 28% of trips by bicycle, greater than fifteen times higher than the figure of 1.7% in Scotland in 2022.The Go Dutch scenario scales up the baseline scenario to a Dutch modal share for cycling in Scotland. This is not produced by scaling up baseline trips by a uniform factor, rather it takes account of trip distance and hilliness. So for example, in flatter areas the Go Dutch scenario will show a greater increase over baseline than equivalent more hilly areas. As such, this network shows how a Dutch modal share for cycling could be distributed across Scotland. Planners should seek to design cycle networks that meet the needs of those currently cycling and those who may in future.

##### EBikes

The Ebike scenario models the additional increase in cycling that would be achieved on top of the Go Dutch scenario, through the widespread uptake of electric cycles The scenarios alters both the assumptions around cycling uptake and the routes choices made by people cycling, for example a reduced penalty for going up hills. People using a pedal cycle incur a significant time and effort penalty from going uphill. Hence, a longer but flatter route is often faster. A good ebike can enable people to ride uphill at 15 mph without breaking a sweat. Thus ebike riders may choose shorter but hillier routes than those using a pedal cycle.

As ebikes increase the range a typical person can cycle, as well as carrying capacity, while reducing effort and journey times, a world with many ebikes would expect higher levels of cycling than one with only pedal cycles.

<!-- /#scenario -->

<!-- #type -->

#### Network type

The 'network type' reflects route choices people make when cycling. There is strong evidence that people prefer the most direct route, and it reduces journey times and the physical effort of cycling.

The need to prioritise creation of a network of safe & direct cycle routes, is central to Transport Scotland's Cycling Framework for Active Travel and Active Travel Strategy Guidance. [Cycling By Design](https://www.transport.gov.scot/publication/cycling-by-design/) defines how to achieve a high level of service for cycling, either through providing cycling facilities physically separated from traffic or on carriageway where traffic speed and volume is sufficiently low.

However, until such a safe & direct network is created, people cycling may make detours away from roads that are (or are perceived to be) dangerous. There is strong evidence that safety concerns are the main barrier to more people cycling.

CycleStreets calculate the routes likely to be taken by people cycling, and each network type is based on one of their routeing [algorithms](https://www.cyclestreets.net/help/journey/howitworks/). The route choices are based on the current road infrastructure and don't account for planned improvements or missing links.

![Route network types](/images/rnet_types.png)

Examples of the two network types in Edinburgh show how different assumptions about the routes people cycling take affect where the busiest parts (pink) of the network are predicted to be.

Note that the choice of network type does not just change the routes people take but also the number of cycle trips predicted under each scenario. This is because quieter routes are typically longer and hillier than the direct route which discourages cycling.

##### Fast/direct (preferred)

This network type should be treated as the default.

The fastest network is based on people taking the most direct  routes on which it is legal to cycle. While people prefer direct routes, this will often bring them onto busy and dangerous major roads, which are a barrier to cycling without the provision of cycle infrastructure separated from traffic. Planners seeking to maximise cycling will build high-quality cycle infrastructure along main roads, which form part of the fast/direct cycle route network.

High quality cycle network plans, particularly in urban areas, will be based on joining up the fast/direct routes with the highest predicted numbers of cycle trips to create a dense & coherent network. Our associated Network Planning Workspace guides users step-by-step through a best practice process for creating a high-quality cycle network plan, based on the principles set out in Cycling by Design. 


##### Quiet/indirect

The quiet network assumes that people will avoid busy roads and be willing to take significant detours. While directing people away from busy roads and onto quieter back streets may seem like a good idea, it can have significant downsides. Quiet routes are often longer and more challenging to navigate as they weave around the back streets. Even if the roads are safe, longer and more complex journeys discourage cycling. The NPT captures this effect, and the total number of cycle trips on the quiet route network is less than on the fast route network.

The most likely application of the 'Quiet/Indirect' network type is to:

* Identify potential low cost/high impact 'quick wins' where meaningful additions to the cycle network can be made in the very short term e.g. by filtering residential streets parallel to main roads.
* Supporting the design of Low Traffic Neighbourhoods.

Quiet networks work best when the directness penalty is small. For example, a city with a grid layout could alternate between roads designed for cars and streets designed for active travel.

![Amsterdam car and cycle networks](/images/amsterdam_networks.JPG)

The image above ([source](https://maps.amsterdam.nl/plushoofdnetten/)) shows how Amsterdam uses its grid layout to have parallel but separate networks for cars (red, orange, black) and bicycles (green). Notice how the cycling network is much denser than the car network, ensuring that people who cycle almost always benefit from a more direct route.

<!-- /#type -->

<!-- #colour -->

#### Line colour

The line colour option allows you to visualise different characteristics of the route network. Below the line colour option is a contextual legend which shows the meaning of the colours on the map.

##### Number of cycle trips

![Number of cycle trips](/images/number_of_cyclists.png)

This is an estimate of the average number of daily cycle trips in either direction (AADT) passing along each segment, for the selected purpose, network type, and scenario.

The thickness of the lines in the route network is also defined by the number of cycle trips, with thicker lines representing more people cycling.

##### Cycle friendliness

![Cycle friendliness](/images/cycle_friendliness.png)

Cycle friendliness is a subjective measure representing the quality of a route segment (a section of road or path) for cycling, with a score between 0 (very low quality) and 100 (very high quality). It considers a [range of factors](https://www.cyclestreets.net/api/v1/journey/), using data derived from OpenStreetMap.

Factors that contribute to a higher score of cycle friendliness include (as appropriate):

* Whether the cycleway is shared with motor vehicles or pedestrians,
* The type of road
* Presence of cycle infrastructure
* Speed limit
* Surface quality
* Cycle signage, 
* Any barriers or obstructions
* Path width
* Route legibility

See [CycleStreets](https://www.cyclestreets.net/help/journey/howitworks/#quietness) for further information, the term 'quietness' is used for the same measure that we call 'cycle friendliness'.

##### Gradient

![Gradient](/images/gradient.png)

The average gradient of the road is shown as a percentage. Steeper roads are a barrier to cycling and affect route choice and the uptake of cycling in the scenarios. Please note that in some locations where the network does not follow the land contours, such as elevated structures like North Bridge in Edinburgh, the gradient will incorrectly show flat sections of network as steep. This issue does not affect all bridges, for example, bridges over the River Clyde in Glasgow show correct gradients. We are aware of this inconsistency and are working to address it.

<!-- /#colour -->

<!-- #simplified_rnet -->

#### Simplified route network

The NPT includes a 'Simplified' toggle that simplifies the route network display. Major road corridors can be complex with multiple adjacent carriageways, cycle paths and footways, which are often shown as individual line features on OSM. This makes it hard to assess overall demand across corridors that contain multiple parallel segments. The simplified network attempts to address this problem by combining parallel routes into a single 'centerline' for each corridor.

**Disclaimer:** The simplified network uses OS Open Roads, which aggregates values from the OSM layer. This joining stage may yield some errors. Please report any noticed errors to (trazwa@leeds.ac.uk).

This can lead to a loss of detail. For a comprehensive analysis, it's advisable to consider both the simplified and the full route networks in tandem when evaluating cycling demand. This dual approach helps balance the big-picture overview with the nuanced details of specific routes. 


![Simplified Network](/images/simplified.png)

<!-- /#simplified_rnet -->

#### Popup

<!-- Comments: names in the pop up box be the same as the trip purpose names from the route network drop down. 'Primary' & 'Secondary' confuses with NPW Primary & Secondary network, 'Utility' not used anywhere else in the tool -->

Clicking on any segment within the route network on the map will display a pop-up window.

![Popup](/images/rnet_popup.png)

The popup provides a summary table for all the information available about the route network. The table displays the number of cycle trips for each scenario - such as baseline, Go Dutch, and e-bikes - and distinguishes between the Fast/Direct and Quiet/Indirect network types. Above  the table, the average gradient of the road and its cycle friendliness score are shown, which assesses the suitability of the road for cycling. Additionally, there's an option to directly access the Google Street View of the road, if available, for a more grounded perspective.

<!-- #filters -->

### Route network filters

![Route network filters](/images/rnet_filters.png)

The sliders allow you to show/hide parts of the route network. You can filter on three variables:

#### Numbers of cycle trips

Tailor the map to display routes with a particular range of predicted cycling traffic, reflecting the selected scenario and route type.

#### Gradient

Set the maximum and minimum gradient of roads that are visible. Gradient measures the average gradient of the road segment as a percentage. E.g. 0% = flat, 100% = vertical cliff.

#### Cycle friendliness

Set the maximum and minimum quietness of roads that are visible. Quietness measures how cycle friendly the existing road is, from hostile (least friendly) to quiet (most friendly).

<!-- /#filters -->

<!-- #coherentnetwork -->

### Coherent network

This section outlines the development of a coherent strategic cycling network, composed of high-potential, direct routes within urban areas. Created through automated analysis, this network emphasises coherence in design to ensure cycling infrastructure is functional, accessible, and efficient.

The coherent network can be used as a 'starter for 10'  for planning a strategic cycle network in urban areas prioritising investment by highlighting routes that maximize coverage and connectivity, while aligning with demand. The methodology used focuses on several key aspects:


#### Data integration

Ordnance Survey Open Roads (OS) provides the foundational structure, complemented by OpenStreetMap (OSM) data to include off-road paths and cycle lanes. This integration ensures that both official road classifications and additional cycling-specific infrastructure are represented.

#### Network filtering and clustering

Route selection for the coherent network is based on two key attributes: road classification and cycling connectivity potential, both of which influence the "arterialness" score. This score prioritises routes that balance road hierarchy with accessibility for cyclists. Using a spatial clustering algorithm (DBSCAN), high-flow areas are identified, forming a focused coherent network by filtering out redundant or isolated segments. This method ensures that selected routes maximize connectivity and suitability, aligning the network's structure with both directness and density requirements.

Routes are classified into primary and secondary categories based on road type. A roads are classified as primary routes, forming the backbone of the cycling network. All other roads, including B roads, minor roads, and off-road paths, are classified as secondary routes, providing supplementary connections and ensuring comprehensive coverage.


#### Directness and density optimisation

The network is adjusted to ensure direct routes with optimal density (e.g. 250m in urban centres, 400m in suburban areas). This allows the network to meet a wide range of origin-destination trip needs, improving access and usability.

#### Iterative refinement

Stakeholder feedback and ongoing urban data updates support iterative refinements, aligning the network with evolving user needs and policy objectives.

By focusing on coherence, directness, and optimal route density, this coherent network offers a structured foundation for cycle network planning.



<!-- /#coherentnetwork -->

<!-- #clos -->

#### Existing cycle network quality

The default view for this layer shows an assessment of the quality of the existing cycle network, using a high-level assessment of the Cycling Level of Service (LoS). In network planning a high LoS network should designed this will be suitable for most users, including new and less confident users. In general the LoS will be high where either the traffic speeds and volumes are sufficiently low or where cycle infrastructure is provided to sufficiently physically separate people cycling from traffic. The "existing cycle network" is defined as all roads and paths on which it is legal to cycle. As a result this layer is useful to help define where new infrastructure is needed as part of the network planning process. It provides a graphical representation of the distribution of high LoS roads across Scotland that are for most users. 

This section also provides data on existing cycle infrastructure, speed limits, traffic volumes that are combined to produce an estimated LoS. 

#### Level of service

The LoS layer provides an overview of the existing cycle network quality in Scotland, based on the [Cycling by Design guidance](https://www.transport.gov.scot/media/50323/cycling-by-design-update-2019-final-document-15-september-2021-1.pdf) (Table 3.2).

![Table 3.2: When to separate cycle users from motor traffic](/images/clos_facilities.png)

Note: Table 3.2 displays Motor Traffic Speed in KPH ranges. For applying this guidance in the UK, these KPH ranges are mapped to the corresponding UK statutory MPH speed limits as follows:
*   20 mph statutory speed limit correspond to the 0 kph to 30 kph range.
*   30 mph statutory speed limit correspond to the 30 kph to 50 kph range.
*   40 mph statutory speed limit correspond to the 50 kph to 65 kph range.
*   50 mph statutory speed limit correspond to the 65 kph to 80 kph range.
*   60 mph statutory speed limit correspond to the 80 kph to 95 kph range.
*   60+ mph statutory speed limit correspond to the 95 kph to 110 kph range.

<!-- /#clos -->

<!-- #infrastructuretypes -->

#### Estimated traffic volume

<!-- Comments: need to confirm the DfT Road Traffic Statistics 2022 -->

The traffic volume layer visualises modelled traffic levels for roads on which cycling is permitted. The primary source of input data for major roads is the Department for Transport (DfT) road traffic statistics (e.g., DfT Road Traffic Statistics 2022). However, DfT data predominantly covers the major road network.

To provide a comprehensive assessment across all roads where cycling is legal, a modelled approach is employed to 'fill in the gaps'. This model uses metrics such as [centrality](https://en.wikipedia.org/wiki/Centrality) (a measure of how central segments are to the road network), population density, and employment density to estimate traffic volumes in passenger car units (PCU) per day. For specific low-speed environments, such as service roads and car parks, a 10 mph speed assumption is applied in the model.

The model was trained and validated using real-world traffic count data from a selection of 20 mph residential roads in Edinburgh to ensure its accuracy. The outputs categorise traffic levels into ranges that correspond to the guidance in the [Cycling by Design document](https://www.transport.gov.scot/media/50323/cycling-by-design-update-2019-final-document-15-september-2021-1.pdf#page=68), which are essential for Level of Service (LoS) assessments. The specific ranges, with units of annual average daily traffic (AADT), are: 0-999, 1000-1,999, 2000-2,999, 3000-3,999, and 4,000+ AADT.

While the model provides estimates, it is important to acknowledge the inherent uncertainties. The confidence limits for the produced traffic flows may vary based on multiple factors including data quality, modeling assumptions, and local conditions. Users should consider these potential variations when interpreting the data and recognize that actual traffic flows may deviate from the modelled estimates within a reasonable margin.


#### Cycle infrastructure

Cycle infrastructure is classified as follows:

<!-- TODO: replace pic of Off road cycleway: https://www.google.com/maps/@55.9387415,-3.160149,3a,75y,109.03h,77.48t/data=!3m7!1e1!3m5!1sCIABIhADycKzlSoW3Gf9ZZwABd9W!2e10!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FAB8u6HZjuX9Y8J44NDJpBOWF5GlT-Zb02yQnNL092UGlVVsTE9S6e2GMKg90BGutrA-nT8BADy0HVotbFHZEAue773lHwFN10CDkeSu75qtd1TdQ4Ll-qO_e-uQYa6lH1jCkhymp8P3Q8deeZPor%3Dw900-h600-k-no-pi12.517559037190722-ya33.06879461415933-ro0-fo100!7i5760!8i2880?entry=ttu&g_ep=EgoyMDI1MDUxMS4wIKXMDSoASAFQAw%3D%3D -->

<table>
    <tr>
        <th>Infrastructure type/name</th>
        <th>Description</th>
        <th>Example</th>
        <th>Colour on map</th>
    </tr>
    <tr>
        <td>Segregated Track</td>
        <td>Segregated roadside cycle track that provides physical protection from motor traffic and separation from pedestrians. This category includes cycle tracks at carriageway level (including light segregation), stepped cycle tracks and footway level cycle tracks which are separated from pedestrians.</td>
        <td><a href="https://www.cyclestreets.net/location/81274/" target="_blank"><img src="/manual/segregated.jpg" alt="Segregated track" /></a></td>
        <td><span style="background-color: #054d05; color: white;">Dark green</span></td>
    </tr>
    <tr>
        <td>Off Road Cycleway</td>
        <td>These are paths which are usually, but not always, shared with pedestrians and are not adjacent to a road. (which we define as at least 10m in its centre from roads. In Cycling by Design they are called 'detached or remote cycle tracks').</td>
        <td><a href="https://www.cyclestreets.net/location/86744/" target="_blank"><img src="/manual/offroad.jpg" alt="Off road cycleway" /></a></td>
        <td><span style="background-color: #3a9120; color: white;">Mid green</span></td>
    </tr>
    <tr>
        <td>Shared Footway</td>
        <td>In Cycling by Design this is a cycle track at footway level (adjacent to carriageway)" but that does not provide separation from pedestrians, i.e. a pavement that has been designated for use by both pedestrians and people cycling.</td>
        <td><a href="https://www.cyclestreets.net/location/92805/" target="_blank"><img src="/manual/shareduse.jpg" alt="Shared footway" /></a></td>
        <td><span style="background-color: #ffbf00; color: white;">Orange</span></td>
    </tr>
    <tr>
        <td>Painted Cycle Lane</td>
        <td>On-carriageway cycle lane that does not provide physical protection from motor traffic. It includes both advisory and mandatory cycle lanes</td>
        <td><a href="https://www.cyclestreets.net/location/81341/" target="_blank"><img src="/manual/lane.jpg" alt="Painted cycle lane" /></a></td>
        <td><span style="background-color: #ff0000; color: white;">Red</span></td>
    </tr>
</table>

### Speed limit

The speed limit data displayed in the NPT is primarily sourced from OpenStreetMap (OSM). In instances where speed limit information is not explicitly available in the OSM data, the following assumptions are applied to infer the speed limit based on the `highway` tag:

*   **10 mph**: Assumed for `highway` types classified as "service".
*   **30 mph**: Assumed for `highway` types classified as "residential".
*   **40 mph**: Assumed for `highway` types classified as "primary", "secondary", or "tertiary". This is a general assumption, as actual speed limits can vary between urban (often 30 or 40 mph) and rural (often 60 mph) contexts for these road types.
*   **60 mph**: Assumed for `highway` types classified as "trunk".
*   **70 mph**: Assumed for `highway` types classified as "motorway".
*   **No speed limit assigned (`NA`)**: For `highway` types such as "footway", "cycleway", "path", "pedestrian", or "razed", no speed limit is assigned.
*   If a `highway` type does not fall into any of the above categories and lacks an explicit speed tag, its speed limit also remains `NA`.


<!-- /#infrastructuretypes -->

<!-- #streetspace -->

### Street space evaluation

<!-- From index.html, see the table beginning:
 				<div class="layertools layertools-streetspace">
-->

The Street Space layer allows at-a-glance evaluation of the <em>spatial</em> deliverability of segregated cycle infrastructure (on links requiring dedicated infrastructure).

It categorises roads in accordance with the [Cycling by Design guidance](https://www.transport.gov.scot/media/50323/cycling-by-design-update-2019-final-document-15-september-2021-1.pdf#page=68). It specifies the methodology for classifying road space and cycle infrastructure. The sections below describe the measurement methods and datasets used, the cycle infrastructure types considered, and the assumptions regarding bus routes and road types.

The analysis compares the space required for segregated cycle infrastructure (widths taken from [Cycling by Design guidance table 3.2](https://www.transport.gov.scot/media/50323/cycling-by-design-update-2019-final-document-15-september-2021-1.pdf#page=68)) with the available kerb-to-kerb (carriageway) or full corridor (including footways and verges) widths.

Note: Space required for parking and loading is currently excluded from the analysis, due to lack of a national parking & loading dataset.


#### Road width measurements

Two key measurements are taken to assess whether existing roads can accommodate cycle infrastructure: carriage width and corridor width. 
Data on carriageway widths were derived from Ordnance Survey Mastermap Highways data, using the "averageWidth" attribute from the RoadLink layer (see [docs.os.uk](https://docs.os.uk/os-downloads/networks/os-mastermap-highways-network-roads/os-mastermap-highways-network-roads-technical-specification/structured-data-types/roadwidthtype) for details).
Data on pavement widths were derived from Ordnance Survey Mastermap Topographic data (see terms and conditions below). These width attributes were truncated to 1 metre precision and aggregated to OS OpenRoads geometries to simplify the data for visualisation in the web app. In cases where a single OpenRoads centreline represents two or more carriageways or pavements, the width attributes were added.

##### Within road width (Carriageway width) 
   
- **Definition:** The width available within the carriageway only.
- **Excludes:** Manmade roadside area such as footways.
- **Usage:** Determines if cycle infrastructure can fit solely within the carriageway.

##### Using edge-to-edge (Corridor width)

- **Definition:** The total width of the road corridor, encompassing both the carriageway and manmade roadside features (e.g., footways). 
- **Usage:** Where local policy allows, part of the footway or other manmade roadside features may be reallocated for cycle infrastructure, provided that minimum safe footway widths are maintained (2x 2 m footway width).

#### Cycle infrastructure width requirements

Two main types of cycle infrastructure are considered, depending on the street configuration:

Two Unidirectional Protected Cycle Tracks, one on each side of the street  (shown as '2 x 1 -way tracks' in the tool):
  - *Absolute Minimum Width:* 1.5 m  
  - *Desirable Minimum Width:* 2.0 m  

A single Bidirectional Cycle Track on one side of the street  (shown as 2-way track):
  - *Absolute Minimum Width:* 2.0 m
  - *Desirable Minimum Width:* 3.0 m

#### Buffers for cycle infrastructure

Buffers are applied based on road speed and traffic conditions, as specified in Table 3.8 of the Cycling by Design document [Cycling by Design document](https://www.transport.gov.scot/media/50323/cycling-by-design-update-2019-final-document-15-september-2021-1.pdf#page=64). These buffers must be accounted for when calculating the effective available width for cycle infrastructure.

| Road type / Speed limit | Buffer width |
|-------------------------|--------------|
| 30 mph                  | 0.5 m        |
| 40 mph                  | 1.0 m        |
| 50 mph                  | 2.0 m        |
| 60 mph                  | 2.5 m        |
| 70 mph                  | 3.5 m        |

#### Bus routes and road traffic assumptions

##### Bus routes and dedicated bus lanes

Bus routes and dedicated bus lanes are key factors in determining the available space for cycle infrastructure:

- **Non-bus routes:**  
  The necessary carriageway lane width is considered to be **2 × 2.75 m**.

- **Bus routes without dedicated bus lanes:**  
  The necessary carriageway lane width to accommodate buses is considered to be **2 × 3.2 m**.

- **Bus routes with dedicated bus lanes:**  
  The necessary carriageway lane width to accommodate dedicated bus lanes is considered to be **2 × 3.2 m** plus an additional space of **`n_bus_lanes` × 3.2 m** for the dedicated bus lanes.

##### Road types

Roads are categorised based on their traffic configuration and bus route status:
- Two‐way for motor traffic (non–bus route)
- Two‐way for motor traffic (bus route without dedicated bus lanes)
- Two‐way for motor traffic (bus route with dedicated bus lanes)

#### Categorisation based on available width

The Street Space layer divides roads into three groups, depending on whether the available width (carriageway width or corridor width) can accommodate the cycle infrastructure:

- **Not enough space:**
  The available space is insufficient to fit even the absolute minimum width of cycle infrastructure.

- **Absolute minimum:**
  The available space is enough to accommodate the absolute minimum width of cycle infrastructure, but it does not meet the desirable minimum.

- **Desirable minimum:**
  The available space is sufficient to accommodate the desirable minimum width of cycle infrastructure, providing a more comfortable design for all users.


<!-- /#streetspace -->

<!-- #data_zones -->

### Data zones

Data Zones are small statistical neighbourhoods created for the Census. In the NPT, they are used to provide contextual area-based information.

![Data zones](/images/data_zones.png)

<!-- Comments: Data source for these needs to be included, where not self evident , such as for SIMD -->

The data zone options are:

* % commuter cycling (baseline)
* % commuter cycling (Go Dutch)
* Population density (per hectare)
* Index of Multiple Deprivation (2020)
* Drive time to a petrol station
* Drive time to GP
* Drive time to post office
* Drive time to a retail centre
* Drive time to primary school
* Drive time to secondary school
* Public transport time to GP
* Public transport time to a post office
* Public transport time to a retail centre
* % without superfast broadband

**Dasymetric mode**

By default, the data zones are shown as a [dasymetric map](https://en.wikipedia.org/wiki/Dasymetric_map). This means that the buildings within a zone are coloured to display information. If you turn off dasymetric mode, a simple [choropleth map](https://en.wikipedia.org/wiki/Choropleth_map) is shown where the whole Data Zone is coloured. Note that the same underlying data is being visualised in both modes, and the differences between modes are merely aesthetic. However, dasymetric maps are intended to better represent the data by emphasising the true locations of people who are not uniformly distributed across the Data Zone. 

![Dasymetric maps](/images/dasymetric.png)

Dasymetric map (left) and choropleth map (right) for the Index of Multiple Deprivation in Edinburgh.

<!-- /#data_zones -->

#### Data zone popup

<!-- popup not working yet -->

Clicking on any Data Zone shows the popup report for that zone. Ten graphs are presented

##### Commuters leaving

The bar chart shows estimated mode shares under different scenarios for people leaving this zone to go to work. (i.e. they live here and commute to another zone).

##### Commuters arriving

The bar chart shows estimated mode shares under different scenarios for people arriving in this zone at work. (i.e. they work here and live in another zone).

##### Primary school children

The bar chart shows estimated mode shares under different scenarios for primary school children that live in this zone.

##### Secondary school children

The bar chart shows estimated mode shares under different scenarios for secondary school children that live in this zone.

##### Shoppers leaving

The bar chart shows estimated mode shares of shopping trips under different scenarios for trips leaving this zone.

##### Shoppers arriving

The bar chart shows estimated mode shares of shopping trips under different scenarios for trips arriving this zone.

##### People leaving to travel to a Leisure facility

The bar chart shows estimated mode shares of leisure trips under different scenarios for trips leaving this zone.

##### People arriving at a Leisure facility

The bar chart shows estimated mode shares of leisure trips under different scenarios for trips arriving this zone.

##### People leaving to visit friends and family

The bar chart shows estimated mode shares of trips for visiting friends and family under different scenarios for trips leaving this zone.

##### People arriving to visit friends and family

The bar chart shows estimated mode shares of trips for visiting friends and family under different scenarios for trips arriving this zone.

### Other layers

The NPT provides several supplementary map layers that enhance the contextual understanding of the cycling network

* Schools (click on a school to see current and potential future mode split data): Revealing the locations of primary, secondary, and other educational institutions, this layer allows users to click on individual schools to review the present and potential future distribution of travel modes among students
* Wards: This layer overlays the boundaries of local electoral wards onto the map
* Scottish Parliamentary Constituencies: Users can display the geographic divisions for Scottish parliamentary representation
* Local Authority: Highlight the administrative areas within Scotland, aiding in planning and analysis at a local government level.

## Accessing the NPT 

### Progressive Web App

The NPT is a Progressive Web App (PWA), which can be installed on many devices, including your smartphone. The App provides the same features as the website. Still, it includes additional benefits such as pining the App to your device's home screen and full-screen support.

How to install the NPT as an app

#### Android

1.  Visit [www.npt.scot](http://www.npt.scot) using Google Chrome
2.  Click the "Add NPT to Home screen" and follow the instructions

If the "Add NPT to Home screen" option does not appear, you can also select the "Install app" option from the main chrome menu (…)

#### Windows 10 & 11 and Linux

1.  Visit [www.npt.scot](http://www.npt.scot) using Microsoft Edge or Chrome
2.  In the address bar, click the App install button
3.  Click install

#### iOS

1.  Visit [www.npt.scot](http://www.npt.scot) using Safari
2.  In the bottom menu bar, click the share button (middle button)
3.  Click "Add to Home Screen"
4.  Click "Add"

#### macOS

1.  Visit [www.npt.scot](http://www.npt.scot) using Safari
2.  In the address bar, click the App install button
3.  Click install

<!--

#### Schools popup

Clicking on any school shows the schools popup

### Trip ends

Travel data can be summarised by origins or destinations. Consider work travel; typically, people travel from many residential areas at the edge of cities into a few city centre areas where most jobs are concentrated. So mapping cycling by origins shows information about residents. But mapping by destination shows information about workers.

-->

