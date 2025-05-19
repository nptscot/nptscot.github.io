# Data

This page provides links to download data from the NPT as well as extra information on licensing and methods for data users.


## Data Access and Licence

The main aggregated outputs of the NPT are available to download from [https://github.com/nptscot/npt/releases](https://github.com/nptscot/npt/releases) on a monthly basis (e.g., [v2025-05-01](https://github.com/nptscot/npt/releases/tag/v2025-05-01)). The data is provided under the [Open Data Commons Attribution License](https://opendatacommons.org/licenses/by/).

With the exception of the Street Space dataset (described below), you are free to:

* Share: To copy, distribute and use the data.
* Create: To produce works from the data.
* Adapt: To modify, transform and build upon the data.

As long as you:

* Attribute: You must attribute any public use of the data, or works produced from the data, in the manner specified in the license. For any use or redistribution of the data, or works produced from it, you must make clear to others the license of the data and keep intact any notices on the original data.

This licence does not apply to the website, vector tiles, or other hosted data which is only to be used via the official NPT website. You must not link, embed, scrape or otherwise use the constituent parts of the website.

### Route network data with cycling potential and quietness attributes

The route network dataset can be downloaded as a GeoPackage from [https://github.com/nptscot/npt/releases](https://github.com/nptscot/npt/releases). New versions are released monthly (e.g., [rnet_2025-05-01.gpkg](https://github.com/nptscot/npt/releases/download/v2025-05-01/rnet_2025-05-01.gpkg) for the May 2025 release). This dataset contains the route network data with cycling potential and quietness attributes.

### Cycling level of service data

The cycling level of service dataset can be downloaded as a GeoPackage from [https://github.com/nptscot/npt/releases](https://github.com/nptscot/npt/releases). New versions are released monthly (e.g., [clos_2025-05-01.gpkg](https://github.com/nptscot/npt/releases/download/v2025-05-01/clos_2025-05-01.gpkg) for the May 2025 release). This dataset contains the cycling level of service data, including estimated motor traffic levels, current cycling infrastructure, speed limits and inferred level of service.

#### Street space data terms and conditions

Contains [OS data](https://www.ordnancesurvey.co.uk/customers/public-sector/public-sector-licensing/copyright-acknowledgments) © Crown copyright and database rights 2025 OS licence number 100046668.

- You are granted a non-exclusive, royalty free revocable licence solely to view the licensed data for non-commercial purposes for the period during which Transport Scotland makes it available;
- You are not permitted to copy, sub-license, distribute, sell or otherwise make available the licensed data to third parties in any form; and
- Third party rights to enforce the terms of this licence shall be reserved to OS.

The streetspace dataset contains estimates of the widths of non-residential streets and pavements in Scotland, and calculates which types of cycle tracks could be fitted to the streetspace, with results provided at the level of [Ordance Survey OpenRoads](https://www.ordnancesurvey.co.uk/products/os-open-roads) dataset. It can be downloaded as a GeoPackage from [https://github.com/nptscot/npt/releases](https://github.com/nptscot/npt/releases). New versions are released monthly (e.g., [streetspace_2025-05-01.gpkg](https://github.com/nptscot/npt/releases/download/v2025-05-01/streetspace_2025-05-01.gpkg) for the May 2025 release).

## Data sources

The NPT is based on the following data sources:

- Aggregated origin-destination data from the 2011 Census at the Data Zone level (source: National Records of Scotland)
- Aggregated data on the number of pupils travelling to school in each Data Zone in Scotland from the 2021 Scottish Census (source: Scottish Government Education Department)
- OpenStreetMap data downloaded with the [`osmactive`](https://nptscot.github.io/osmactive/) R package (source: OpenStreetMap)
- Ordnance Survey [Open Roads](https://www.ordnancesurvey.co.uk/products/os-open-roads) data (source: Ordnance Survey)
- Ordnance Survey [MasterMap Highways](https://www.ordnancesurvey.co.uk/products/os-mastermap-highways-network-roads) data, which provided information on carriageway widths, presented as width categories in the StreetSpace layer which is partly derived from this data (source: Ordnance Survey)
- Ordnance Survey [MasterMap Topography](https://www.ordnancesurvey.co.uk/products/os-mastermap-topography-layer) data, which provided information on pavement geometries, presented as width categories in the StreetSpace layer which is partly derived from this data (source: Ordnance Survey)
- Ordnance Survey [Code-Point](https://www.ordnancesurvey.co.uk/business-government/products/code-point) data to inform the destinations of simulated utility trips (source: Ordnance Survey)



## Source Code

The source code used in the analysis and to build the website is published under the GNU Affero General Public License v3.0.

You are free:

* To Share: copy and redistribute the material in any medium or format
* To Adapt: remix, transform, and build upon the material for any purpose, even commercially.

As long as you:

* Attribute: You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
* ShareAlike: If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

The source code [is published on GitHub](https://github.com/nptscot)

