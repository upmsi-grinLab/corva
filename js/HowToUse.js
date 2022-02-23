function HowToUse() {
	var intro = introJs();
    intro.setOptions({
        showStepNumbers: true,
        steps: [
            { 
          	  intro: "<center>Welcome to the</br><b>CoRVA Database!</b></center>"
            },
            {
              element: document.querySelector('#map'),
              intro: "<center><b>NIPAS MAP</b></center></br><justify><p>The map contains data on all the Philippine NIPAS Sites, represented as markers.</p></justify>"
            },
            {
              element: document.querySelector('#sidebar'),
              intro: "<center><b>SIDEBAR PANEL</b></center>"
            },
            {
              element: document.querySelector('.home-tab'),
              intro: "<center><b>ABOUT WINDOW</b></br></br></center><center><p>Contains detailed information about the CoRVA program. Information between this part is highlighted using infographics as well as its objectives.</p></center>",
              position: 'right'
            },
            {
              element: document.querySelector('.projects-tab'),
              intro: "<center><b>MONITORING THE NIPAS WINDOW</b></br></br></center><center><p>Shows the eight (8) components of the CoRVA program. Each components contains its project leader and methods. Images are also available to explain briefly how the project gathers data.</p></center>",
              position: 'right'
            },
            {
              element: document.querySelector('.database-tab'),
              intro: "<center><b>LIST OF NIPAS SITES WINDOW</b></br></br></center><center><p>Contains the complete list of all the thirty-three (33) NIPAS sites and one (1) proposed NIPAS site.</p></center>",
              position: 'right'
            },
            {
              element: document.querySelector('.nipas-tab'),
              intro: "<center><b>SITE DETAILS WINDOW</b></center></br><center><p>Is activated when a marker is clicked to view more details on a specific NIPAS site. It contains two (2) downloadable materials, NIPAS proclamation in PDF format and a detailed NIPAS site document in PDF format.</p></center>",
              position: 'right'
            },
            {
              element: document.querySelector('.leaflet-control-layers.leaflet-control-layers-expanded.leaflet-control'),
              intro: "<center><b>OVERLAY PANEL</b></br></br></center><center>Contains basemaps, NIPAS markers and overlays.</center>",
              position: 'right'
            },
            {
              element: document.querySelector('.leaflet-control-layers-base'),
              intro: "<center><b>BASEMAPS</b></center></br><center>There are currently two (2) available basemaps, </br>ESRI World Imagery and ESRI World Street Map.</center>",
              position: 'right'
            },
            {
              element: document.querySelector('.leaflet-control-layers-overlays'),
              intro: "<center><b>NIPAS OVERLAYS</b></br></br></center><center>Contains toggle options for NIPAS sites markers and habitat overlays.</center>",
              position: 'right'
            },
            {
              element: ('div.leaflet-panel-layers-expanded.leaflet-control'),
              intro: "<center>That's all!</center>",
              position: 'right'
            }
        ]
    });
    intro.start();
}