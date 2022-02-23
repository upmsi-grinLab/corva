/*
// A JS file for controlling the leaflet and its elements
// Author: John Christopher E. Azcarraga
// CoRVA Database
*/

// Initializing clusters (markers)
var pruneCluster = new PruneClusterForLeaflet();

// Initializing the map
var map = L.map( 'map', {
          center: [13.599512,121.984222],
          zoom: 6,
          minZoom: 6,
          maxZoom: 12,
          scrollWheelZoom: false,
          zoomControl: false
});

// Baselayer from ESRI Imagery
// Find a basemap that does not have demarkations 
var ESRI_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var ESRI_WorldStreetMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
}).addTo(map);

var myURL = jQuery( 'script[src$="leaf-demo2.js"]' ).attr( 'src' ).replace( 'leaf-demo.js', '' );

// Minimap
var miniMap = new L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', 
{
  maxZoom: 17,
  minZoom: 4
});
var miniMapLayer = new L.Control.MiniMap(miniMap, { toggleDisplay: true, height: 200, width: 200 });

// Formatting the icon
var myIcon = L.icon({
  iconUrl: 'js/images/pin24.png',
  iconRetinaUrl: 'js/images/ipn48.png',
  iconSize: [29, 24],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});


// Adding markers to the cluster group

// NIPAS markers
for ( var i = 0; i < nipasMarkers.length; ++i )
{
  var marker = new PruneCluster.Marker(nipasMarkers[i].lat,nipasMarkers[i].lon);

  marker.data.popup = '<strong style="font-size:18px">' + nipasMarkers[i]['nipas_name'] + '</strong>' +
  '<br/><br/><b>YEAR ESTABLISHED:</b></br>' +nipasMarkers[i]['year_established'] +
  '<br/><b>AREA(ha):</b></br>' + nipasMarkers[i]['area'] + '<br/><br/><br/><button class=\'btn btn-info btn-sm\' value='+ nipasMarkers[i]['locID'] +' onclick=\'viewnipasInfo('+i+')\'>View Details</button>'; 

  pruneCluster.RegisterMarker(marker);
}
map.addLayer(pruneCluster);

/* O V E R L A Y S */
// Source: https://github.com/mapbox/leaflet-omnivore
var coralStyle = L.geoJson(null, {
    style: function(feature) {
        return { color: '#ff6e6e', weight:4 };
    }
}); 
// var nipasCoral = omnivore.kml('files/kml/corva_coral.kml', null, coralStyle)
//     .on('ready', function() {
//         map.fitBounds(runLayer.getBounds());
//     });
var nipasCoral = omnivore.topojson('files/topojson/corva_coral.topojson', null, coralStyle)
    .on('ready', function() {
        map.fitBounds(runLayer.getBounds());
    });

var mangroveStyle = L.geoJson(null, {
    style: function(feature) {
        return { color: '#38a800', weight: 4};
    }
}); 
// var nipasMangrove = omnivore.kml('files/kml/corva_mangrove.kml', null, mangroveStyle)
//     .on('ready', function() {
//         map.fitBounds(runLayer.getBounds());
//     });
var nipasMangrove = omnivore.topojson('files/topojson/corva_mangrove.topojson', null, mangroveStyle)
    .on('ready', function() {
        map.fitBounds(runLayer.getBounds());
    });

var seagrassStyle = L.geoJson(null, {
    style: function(feature) {
        return { color: '#FFFF00', weight: 4 };
    }
}); 
// var nipasSeagrass = omnivore.kml('files/kml/corva_seagrass.kml', null, seagrassStyle)
//     .on('ready', function() {
//         map.fitBounds(runLayer.getBounds());
//     });
var nipasSeagrass = omnivore.topojson('files/topojson/corva_seagrass.topojson', null, seagrassStyle)
    .on('ready', function() {
        map.fitBounds(runLayer.getBounds());
    });

var reefStyle = L.geoJson(null, {
  style: function(feature) {
      return { color: '#4BC6B9', weight: 3 };
}
}); 
var nipasReef = omnivore.kml('files/kml/corva_reef.kml', null, reefStyle)
    .on('ready', function() {
        map.fitBounds(runLayer.getBounds());
    });

var boundaryStyle = L.geoJson( null, {
  style: function(feature){
    return { weight: 1, color: '#000000', fillOpacity: 0  };
  }
});

var nipasBoundaries = omnivore.kml('files/kml/corva_protected_areas.kml', null, boundaryStyle )
  .on('ready', function(){
    map.fitBounds(runLayer.getBounds());
  }).addTo(map);


/* L E G E N D S */

    
/* L I S T E N E R S */
map.on('overlayadd', function(eo) {
  if(eo.name == 'NIPAS Sites<br/><br/><strong>NIPAS OVERLAY</strong><br/>') {
    nipasBoundaries.addTo(map);
  }
});

map.on('overlayremove', function(eo){
  if(eo.name == 'NIPAS Sites<br/><br/><strong>NIPAS OVERLAY</strong><br/>'){
    map.removeLayer(nipasBoundaries);
  }
});

/* C O N T R O L S */
// Sidebar version 2
var sidebar = L.control.sidebar('sidebar', {
    closeButton: false,
    position: 'left'
});
map.addControl(sidebar);

L.control.zoom({
     position:'bottomright'
}).addTo(map);


/* B A S E L A Y E R S  A N D  M A R K E R S */

// Defining the available base map layers
var baseLayers = {
  "ESRI World Imagery" :    ESRI_WorldImagery,
  "ESRI World StreetMap" :  ESRI_WorldStreetMap
};

// Defining overlays
var overlays = {
  "NIPAS Sites<br/><br/><strong>NIPAS OVERLAY</strong><br/>": pruneCluster,
   "Coral Cover":            nipasCoral,
  "Mangrove Cover":          nipasMangrove,
  "Potential Seagrass Cover": nipasSeagrass
};

L.control.layers(baseLayers, overlays, { collapsed: false }).addTo(map);