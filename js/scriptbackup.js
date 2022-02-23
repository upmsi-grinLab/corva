/* JQuery */

//Mangroves
var myData;
var MyYears;
var Index=0;
var ManLocId;

//Coral Data
var myDataCoralData;
var MyYearsCoralData;
var IndexCoralData=0;
var ManLocIdCoralData;

//Fish sp
var myDataFishSp;
var MyYearsFishSp;
var IndexFishSp=0;
var ManLocIdFishSp;

//Fish den
var myDataFishDen;
var MyYearsFishDen;
var IndexFishDen=0;
var ManLocIdFishDen;

//Fish bio
var myDataFishBio;
var MyYearsFishBio;
var IndexFishBio=0;
var ManLocIdFishBio;

//Seagrass
var myDataSeagrass;
var MyYearsSeagrass;
var IndexSeagrass=0;
var ManLocIdSeagrass;

//Seagrass Cover
var myDataSeagrassCover;
var MyYearsSeagrassCover;
var IndexSeagrassCover=0;
var ManLocIdSeagrassCover;

//Deep Coral
var myDataDeepCoral;
var MyYearsDeepCoral;
var IndexDeepCoral=0;
var ManLocIdDeepCoral;

/* 
 *  Prevent default action upon submit
 *  This will prevent the page from reloading
 */

$("#filterNipas").submit(function(e) {
    e.preventDefault();
});

/*
 *  Variables decoded from JSON files
 */

/* NIPAS data viewed as markers in the map */
var nipasMarkers = (function(){
  var nipasMarkers = null;
  $.ajax({
    url: 'nipas-results.json',
    async: false,
    dataType: 'json',
    success: function(response){
      nipasMarkers = response;
    }
  });
  return nipasMarkers;
})();

/* Fish data, graphed as stacked chart */

var fishDataSP = (function(){
  var fishDataSP = null;
  $.ajax({
    url: 'fish-sp.json',
    async: false,
    dataType: 'json',
    success: function(response){
      fishDataSP = response;
    }
  });
  return fishDataSP;
})();

var fishDataDEN = (function(){
  var fishDataDEN = null;
  $.ajax({
    url: 'fish-den.json',
    async: false,
    dataType: 'json',
    success: function(response){
      fishDataDEN = response;
    }
  });
  return fishDataDEN;
})();

var fishDataBIO = (function(){
  var fishDataBIO = null;
  $.ajax({
    url: 'fish-bio.json',
    async: false,
    dataType: 'json',
    success: function(response){
      fishDataBIO = response;
    }
  });
  return fishDataBIO;
})();

/* End fish data*/

/* Shallow reef data */
var coralData = (function(){
  var coralData = null;
  $.ajax({
    url: 'coral-results.json',
    async: false,
    dataType: 'json',
    success: function(response){
      coralData = response;
    }
  });
  return coralData;
})();
/* End shallow reef */

/* Deep reef data */
var deepData = (function(){
  var deepData = null;
  $.ajax({
    url: 'deep-results.json',
    async: false,
    dataType: 'json',
    success: function(response){
      deepData = response;
    }
  });
  return deepData;
})();
/* End deep reef data */

/* Seagrass Cover data */
var seagrassCover = (function(){
  var seagrassCover = null;
  $.ajax({
    url: 'seagrassCover-results.json',
    async: false,
    dataType: 'json',
    success: function(response){
      seagrassCover = response;
    }
  });
  return seagrassCover;
})();
/* End Seagrass Cover data */

/* Seagrass data */
var seagrassData = (function(){
  var seagrassData = null;
  $.ajax({
    url: 'seagrass-results.json',
    async: false,
    dataType: 'json',
    success: function(response){
      seagrassData = response;
    }
  });
  return seagrassData;
})();
/* End seagrass data */


/* ARRAS data */
var arrasData = (function(){
  var arrasData = null;
  $.ajax({
    url: 'arras-results.json',
    async: false,
    dataType: 'json',
    success: function(response){
      arrasData = response;
    }
  });
  return arrasData;
})();
/* End ARRAS data */

/* Mangrove data viewed as stacked chart */
var mangroveData = (function(){
  var mangroveData = null;
  $.ajax({
    url: 'mangrove-results.json',
    async: false,
    dataType: 'json',
    success: function(response){
      mangroveData = response;
    }
  });
  return mangroveData;
})();
/* End mangrove data*/

/* Coastal Stability data; */

var coastalData = (function(){
  var coastalData = null;
  $.ajax({
    url: 'coastal-results.json',
    async: false,
    dataType: 'json',
    success: function(response){
      coastalData = response;
    }
  });
  return coastalData;
})();
/* End coastal data*/



/* End variables from external JSON files */


/* F U N C T I O N S */

/*
 *  Method for opening external text file
 *  Parameters: file location, NIPAS site location ID, DIV component id
 *  Source: https://stackoverflow.com/questions/14446447/javascript-read-local-text-file
 */ 
function openText(fileLocation, loc_id, component){

  // Concatenate file location and NIPAS id
  var textFilePath = fileLocation + loc_id +  '.txt'; 
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", textFilePath, true);

  // HTTP request
  rawFile.onreadystatechange = function ()
  {
        if(rawFile.readyState === 4)
        {
          if(rawFile.status === 200 || rawFile.status === 0)
          {
              // Document successfully fetched
              var allText = rawFile.responseText;
              document.getElementById(component).innerHTML = '';
              document.getElementById(component).innerText = allText;
          }
        }
  }
  
  rawFile.send();
} /* End openText function */

/*
 *  Method for creating a Bootstrap carousel anywhere in the website
 *  Parameters: NIPAS Id, File path for images, DIV id, Arbitrary carousel ID, Artbitrary Image ID
 */
function addCarousel(loc_id, filePath, component, carouselId, imagesId){
  var carouselContent = '';
  var imagesFilePath = filePath + loc_id +'/';

  $.ajax({

      // AJAS POST Request
      // Using getImages.php file
      type: 'POST',
      url: "./getImages.php",
      data: { 'path' : imagesFilePath },
      async: false,
      success: function(data, status){
          
          // Creation of the carousel components
          var carousel_indicator = '<ul class="carousel-indicators">';
          var inner_carousel     = '<div class="carousel-inner">';

          data = $.parseJSON(data);

          for(var i = 0; i < data.length; i++) {
            if( i == 0){
              carousel_indicator += '<li data-target="#'+ carouselId +'" data-slide-to="'+ i +'" class="active"></li>';
              inner_carousel += '<div class="carousel-item active">'+
                      '<img class="d-block img-fluid" src="'+ imagesFilePath + data[i] +'" width="100%"></div>';

            }else{
              carousel_indicator += '<li data-target="#'+ carouselId +'" data-slide-to="'+ i +'"></li>';
              inner_carousel += '<div class="carousel-item">'+
                        '<img class="d-block img-fluid" src="'+ imagesFilePath + data[i] +'" width="100%"></div>';
            }
          } // End for loop

          // Add closing tags
          carousel_indicator  += '</ul>';
          inner_carousel      += '</div>';
          carouselContent     += '<div id="'+ imagesId +'" class="carousel slide" data-ride="carousel">';
          carouselContent     += carousel_indicator;
          carouselContent     += inner_carousel;

        // Adding NEXT and PREVIOUS button to the carousel images  
        carouselContent += '<a class="carousel-control-prev" href="#'+ imagesId +'" role="button" data-slide="prev">' +
                '<span class="carousel-control-prev-icon" aria-hidden="true" style="background-color: black;"></span><span class="sr-only">Previous</span></a>' +
                '<a class="carousel-control-next" href="#'+ imagesId +'" role="button" data-slide="next">' +
                '<span class="carousel-control-next-icon" aria-hidden="true" style="background-color: black;"></span><span class="sr-only">Next</span>' +
                '</a></div>';

        // Embed the created carousel of images inside the website
        document.getElementById(component).innerHTML = carouselContent;
       }
    });

    // Display default image if images in the location is not found
    if( carouselContent == ''){
      document.getElementById(component).innerHTML = '<img src="carousel.png" onerror="onError(this)" width="100%" />';
    }

} /* End addCarousel function */

/*
 * Viewing additional NIPAS information
 * Opens the sidebar
 */
function viewnipasInfo(id){

  // Expand the sidebar
  sidebar.open('nipas-details');

  // Zoom to a particular marker
  // Places a 0.5 degree offset on the zoomed marker (0.5 degrees to the right).
  var ofset=nipasMarkers[id].lon;
  map.setView( [ nipasMarkers[id].lat, ofset ], 11);
  //map.setView( [ nipasMarkers[id].lat, nipasMarkers[id].lon ],10);
  
  var sidebarElement = document.getElementById('nipas-content');

  if(nipasMarkers[id].year_established == '0000')
  {
    nipasMarkers[id].year_established = 'N/A';
  }

  var content = '<h3 class="alert-heading">'+nipasMarkers[id].nipas_name+'</h3>';
  content += '<div id=\'nipas-desc\' class=\'fontSize-medium\' style="font-size: 1.2em; text-align: justify;"></div><br>';
  content = content +
  '<br><table class=\'table table-sm\'>'+
    '<tr>'+
      '<th scope="row" colspan="2">Longitude: </th>'+
      '<td>'+ nipasMarkers[id].lon +'</td>'+
    '</tr>'+
    '<tr>'+
      '<th scope="row" colspan="2">Latitude: </th>'+
      '<td>'+ nipasMarkers[id].lat +'</td>'+
    '</tr>'+
    '<tr>'+
      '<th scope="row" colspan="2">Municipality: </th>'+
      '<td>'+ nipasMarkers[id].municipality +'</td>'+
    '</tr>'+
    '<tr>'+
      '<th scope="row" colspan="2">Area: </th>'+
      '<td>'+ nipasMarkers[id].area +' hectares</td>'+
    '</tr>'+
    '<tr>'+
      '<th scope="row" colspan="2">Year Established: </th>'+
      '<td>'+ nipasMarkers[id].year_established +'</td>'+
    '<tr>'+
      '<th scope="row" colspan="2">Coral Area: </th>'+
      '<td>'+ nipasMarkers[id].coral_area +' hectares</td>'+
    '<tr>'+
       '<th scope="row" colspan="2">Mangrove Area: </th>'+
       '<td>'+ nipasMarkers[id].mangrove_area +' hectares</td>'+
    '<tr>'+
       '<th scope="row" colspan="2">Potential Seagrass Area: </th>'+
      '<td>'+ nipasMarkers[id].seagrass_area +' hectares</td>'+
    '<tr style="list-style:none";>'+
      '<ul>'+
      '<th scope="row" colspan="2">Downloadable Links: </th>'+
      '<td>'+'<li>'+'<a href="files/proclamations/' + nipasMarkers[id].filename + '" download="' + nipasMarkers[id].filename + '"><download>Legal Document</a>'+ '<li>'+'<a href="files/site_description/'+ nipasMarkers[id].locID + '.pdf" download="' + nipasMarkers[id].locID + '.pdf"><download>NIPAS Poster</a>' +'</td>'+'</li>'+'</li>'+
    '</ul>'+
  '</tr>'+
  '</table><br/>';
  sidebarElement.innerHTML = content;

  // Generate data from CoRVA components  
  document.getElementById('nipas-tab').style.display = "flex";
  var nipasData = document.getElementById('nipas-data');
  var nipasDataContent = '<ul class="nav nav-pills" id="pills-tab" role="tablist">'+
      '<li class="nav-item"><a class="nav-link active" id="pills-arras-tab" data-toggle="pill" href="#pills-arras" role="tab">ARRAS</a></li>'+
      '<li class="nav-item"><a class="nav-link" id="pills-shallow-tab" data-toggle="pill" href="#pills-shallow" role="tab">Shallow Reef</a></li>'+
      '<li class="nav-item"><a class="nav-link" id="pills-fish-tab" data-toggle="pill" href="#pills-fish" role="tab" >Reef Fish</a></li>'+
      '<li class="nav-item"><a class="nav-link" id="pills-mangrove-tab" data-toggle="pill" href="#pills-mangrove" role="tab" >Mangrove</a></li>'+
      '<li class="nav-item"><a class="nav-link" id="pills-seagrass-tab" data-toggle="pill" href="#pills-seagrass" role="tab" >Seagrass</a></li>'+
      '<li class="nav-item"><a class="nav-link" id="pills-deep-coral-tab" data-toggle="pill" href="#pills-deep" role="tab">Deep Coral</a></li>'+
      '<li class="nav-item"><a class="nav-link" id="pills-coastal-tab" data-toggle="pill" href="#pills-coastal" role="tab" >Coastal Stability</a></li>'+
      '<li class="nav-item"><a class="nav-link" id="pills-connectivity-tab" data-toggle="pill" href="#pills-connectivity" role="tab" >Connectivity</a></li>'+
      '<li class="nav-item"><a class="nav-link" id="pills-management-tab" data-toggle="pill" href="#pills-management" role="tab" >Management</a></li>'+
      '</ul>';
  
  // NIPAS DATA
  nipasDataContent += '<div class="tab-content" id="pills-tabContent">';
  nipasDataContent += '<div class="tab-pane active" id="pills-arras" role="tabpanel"><br/>' + 
  				      '<p style="font-size: 1.4em;text-align: justify;">Large-scale reef assessment was conducted using the <a href="#" onClick="viewMethodDescription(\'arras-link\')">ARRAS technologies</a>.</p><br/>' +
  				      '<div id="arrasData"></div></div>';
  nipasDataContent += '<div class="tab-pane" id="pills-shallow" role="tabpanel">' + 
  					  '<p style="font-size: 1.4em;text-align: justify;">Coral Survey uses a combined <a href="#" onClick="viewMethodDescription(\'shallow-reef-link\')">Reef Check and GEF-CRTR protocol</a>.</p>' +
  					  '<br/><div style="font-size: 200%;"><strong><center>Coral Data</center></strong></div>' +
              '<br/><div id="jCoralData"style="font-size: 150%;"><p><b>Survey Date: </b><span id="SurveyDateCoralData" style="color: blue;"></span></p></div>  <div id=\'coral-data\' style="width: 700px; height: 500px;"></div>   <br/><div id = "mybuttonsCoralData" style="position: relative; left:40px; top: -20px;"> <button type="button" onclick="IncCoralData()">Prev</button> <button type="button" onclick="DecCoralData()">Next</button> </div> <br/><div id="coral-carousel"></div></div>';
  nipasDataContent += '<div class="tab-pane" id="pills-fish" role="tabpanel">' +
  					  '<p style="font-size: 1.4em;text-align: justify;">Reef fish communities were assessed using <a href="#" onClick="viewMethodDescription(\'reef-fish-link\')">fish visual census</a>.</p>' +
              '<br/><div style="font-size: 200%;"><strong><center>Species Count</center></strong></div>' +
  					  '<br/><div id="jFishSp" style="font-size: 150%;"><p><b>Survey Date: </b><span id="SurveyDateFishSp" style="color: blue;"></span></p></div> <div id=\'fish-data-sp\' style="width: 680px; height: 500px;"></div>  <br/><div id = "mybuttonsFishSp" style="position: relative; left:40px; top: -20px;"> <button type="button" onclick="IncFishSp()">Prev</button> <button type="button" onclick="DecFishSp()">Next</button> </div> <hr/>' +
              '<br/><div style="font-size: 200%;"><strong><center>Mean Abundance</center></strong></div>' +
              '<br/><div id="jFishDen" style="font-size: 150%;"><p><b>Survey Date: </b><span id="SurveyDateFishDen" style="color: blue;"></span></p></div> <div id=\'fish-data-den\' style="width: 680px; height: 500px;"></div><br/>   <br/><div id = "mybuttonsFishDen" style="position: relative; left:40px; top: -20px;"> <button type="button" onclick="IncFishDen()">Prev</button> <button type="button" onclick="DecFishDen()">Next</button> </div>  <hr/>' +
              '<br/><div style="font-size: 200%;"><strong><center>Mean Biomass</center></strong></div>' +
              '<br/><div id="jFishBio" style="font-size: 150%;"><p><b>Survey Date: </b><span id="SurveyDateFishBio" style="color: blue;"></span></p></div> <div id=\'fish-data-bio\' style="width: 680px; height: 500px;"></div>   <br/><div id = "mybuttonsFishBio" style="position: relative; left:40px; top: -20px;"> <button type="button" onclick="IncFishBio()">Prev</button> <button type="button" onclick="DecFishBio()">Next</button> </div>  </div>';
  nipasDataContent += '<div class="tab-pane" id="pills-coastal" role="tabpanel"></div>';
  nipasDataContent += '<div class="tab-pane" id="pills-connectivity" role="tabpanel"><br><div class="row"><div class="col-lg-12 col-md-12">' + 
  					  '<p style="font-size: 1.4em;text-align: justify;">To know the extent to which population of marine organisms are linked, we used the HYCOM model to <a href="#" onClick="viewMethodDescription(\'connectivity-link\')">simulate dispersal pattern </a>for coral larvae.</p>' + 
  					  '<img src=\'files/connectivity/'+ nipasMarkers[id].locID +'.gif\' width="100%"><br/><br/><div id="connectivity-carousel"></div>' + '</div></div></div>';
  nipasDataContent += '<div class="tab-pane" id="pills-mangrove" role="tabpanel">' + 
                      '<p style="font-size: 1.4em;text-align: justify;">Mangroves were assessed using <a href="#" onClick="viewMethodDescription(\'mangrove-link\')">this method</a>.</p>' +
                      '<br/><div style="font-size: 200%;"><strong><center>Mangrove Data</center></strong></div>' +
                      '<br/><br/><div id="jmangrove"style="font-size: 150%;"><p><b>Survey Date: </b><span id="SurveyDate" style="color: blue;"></span></p></div><div id="mangrove-data" style="width: 680px; height:450px;"></div><br/> <div id = "mybuttons" style="position: relative; left:40px; top: -20px;"> <button type="button" onclick="Inc()">Prev</button> <button type="button" onclick="Dec()">Next</button></div><br/>' + 
                      '<div id="mangrove-carousel"></div></div>';
  nipasDataContent += '<div class="tab-pane" id="pills-management" role="tabpanel">'+ 
  					  '<br/><div id="management_desc" style="font-size: 1.4em; text-align: justify;"></div><br/>' + 
  					  '<img class="project_images rounded mx-auto d-block" src=\"files/management/'+nipasMarkers[id].locID +'.png\" onerror=\"onError(this);\" width=\"100%\"\'></div>';
  nipasDataContent += '<div class="tab-pane" id="pills-seagrass" role="tabpanel">' + 
              '<p style="font-size: 1.4em;text-align: justify;">Seagrasses were assessed using <a href="#" onClick="viewMethodDescription(\'seagrass-link\')">this method</a>.</p>' +
              '<br/><div style="font-size: 200%;"><strong><center>Seagrass Cover Data</center></strong></div>' +
              '<div style="font-size: 150%;">' +
                '<p><b>Survey Date: </b><span id="SurveyDateSeagrassCover" style="color: blue;"></span></p>' +
              '</div>' +
              '<br/><div id=\'seagrass-pie\' style="width: 700px; height: 500px;"></div>' +
              '<br/><div id="mybuttonsSeagrassCover" style="position: relative; left:40px; top:-20px;">' +
                '<button type="button" onclick="IncSeagrassCover()">Prev</button>' +
                '<button type="button" onclick="DecSeagrassCover()">Next</button>' +
              '</div>' +
              '<br/><div style="font-size: 200%;"><strong><center>Seagrass Data</center></strong></div>' + 
              '<br/><div id="jSeagrass" style="font-size: 150%;">' +
                '<p><b>Survey Date: </b><span id="SurveyDateSeagrass" style="color: blue;"></span></p>' +
              '</div>' +
              '<br/><div id="seagrass-data" style="width: 680px; height:520px;"></div>' +
              '<br/><div id = "mybuttonsSeagrass" style="position: relative; left:40px; top: -20px;">' + 
                '<button type="button" onclick="IncSeagrass()">Prev</button>' +
                '<button type="button" onclick="DecSeagrass()">Next</button>' +
              '</div>' +
              '<br/><br/><div id="seagrass-carousel"></div></div>';
  nipasDataContent += '<div class="tab-pane" id="pills-deep" role="tabpanel">' + 
  					  '<div id="deep-desc"></div><br/>' +
              '<br/><div style="font-size: 200%;"><strong><center>Substrate Composition</center></strong></div>' +
              '<br/><div id="jDeepCoral" style="font-size: 150%;"><p><b>Survey Date: </b><span id="SurveyDateDeepCoral" style="color: blue;"></span></p></div> <div id="deep-data" style="width: 700px; height: 500px;"><br/></div>  <br/><div id = "mybuttonsDeepCoral" style="position: relative; left:40px; top: -20px;"> <button type="button" onclick="IncDeepCoral()">Prev</button> <button type="button" onclick="DecDeepCoral()">Next</button> </div>  </div>';
  nipasDataContent += '</div>';
  //nipasDataContent += '</div>';	// There is one missing closing </div>.
  nipasData.innerHTML = nipasDataContent;

   // Fetch text files from folders
  openText('files/desc/', nipasMarkers[id].locID, 'nipas-desc')
  openText('files/management/', nipasMarkers[id].locID, 'management_desc');
  
  // Pie chart for Corals 
  loadCoralData(nipasMarkers[id].locID);

  // Stacked chart for Fish
  loadFishData(nipasMarkers[id].locID, fishDataSP, 'Species Count','fish-data-sp','species/500m2');
  loadFishData(nipasMarkers[id].locID, fishDataDEN, 'Mean Abundance','fish-data-den','mt/km2');
  loadFishData(nipasMarkers[id].locID, fishDataBIO, 'Mean Biomass','fish-data-bio','individuals/500m2');

  // Stacked chart for Mangrove
  MyType="mangrove";
  loadMangroveData(nipasMarkers[id].locID, mangroveData, 'mangrove-data', 'stem density', 'Stem Density', 'Average / m2');
  //loadMangroveData(nipasMarkers[id].locID, mangroveData, 'mangrove-data-canopy', 'canopy cover', 'Canopy Cover', '% Average of species in m2');
  //loadMangroveData(nipasMarkers[id].locID, mangroveData, 'mangrove-data-basal', 'basal area', 'Basal Area', '& Average of species in m');

  // Seagrass Cover Pie Chart
  loadSeagrassCoverData(nipasMarkers[id].locID);
  // Stacked chart for Seagrass
  loadSeagrassData(nipasMarkers[id].locID, seagrassData, 'seagrass-data');

  // Images and remarks for Coastal
  loadCoastalData( nipasMarkers[id].locID, coastalData );

  // Stacked chart for deep reef
  loadDeepData(nipasMarkers[id].locID, 'deep-data', 'deep-desc');

  // Add image slider (carousel)
  addCarousel(nipasMarkers[id].locID, 'files/connectivity/_images/','connectivity-carousel','connectivityDemo','connectivityImages');
  addCarousel(nipasMarkers[id].locID, 'files/arras/_images/', 'arrasData','arrasDemo', 'arrasImages');
  addCarousel(nipasMarkers[id].locID, 'files/seagrass/_images/', 'seagrass-carousel','seagrassDemo', 'seagrassImages');
  addCarousel(nipasMarkers[id].locID, 'files/deep/_images/','deep-carousel','deepDemo', 'deepImages');
  addCarousel(nipasMarkers[id].locID, 'files/shallow/_images/', 'coral-carousel','shallowDemo', 'shallowImages');
  addCarousel(nipasMarkers[id].locID, 'files/mangrove/_images/','mangrove-carousel','mangroveDemo','mangroveImages');
}


// This function gets input from the current value of the region dropdown
function loadProvinces(){
  var regionID_currentValue = document.getElementById('regionDropdown').value;

  // Populating the dropdown menu
  for(j=document.nipasFilter.provinceDropdown.options.length-1;j>=0;j--){
    document.nipasFilter.provinceDropdown.remove(j);
  }

  var optn = document.createElement("OPTION");
  optn.text = "Select Province";
  optn.value = '';
  document.nipasFilter.provinceDropdown.options.add(optn);

  // Adding options to the dropdown
  for (i=0;i<nipasMarkers.length;i++){
    if(nipasMarkers[i].region_id == regionID_currentValue){
      var optn = document.createElement("OPTION");
      optn.text = nipasMarkers[i].province_name;
      optn.value = nipasMarkers[i].province_id;
      document.nipasFilter.provinceDropdown.options.add(optn);
    }

  }
}

/*
 *  This method is responsible for filtering the list of NIPAS sites in the sidebar
 *  Computation for total area is included 
 */
function filter(){

  // Defining local variables
  var nipasList = document.getElementById('list-nipasSites');
  var nipasArea = document.getElementById('nipas-totalArea');
  var regionID  = document.getElementById('regionDropdown').value;
  var content   = '';
  var totalArea = 0;

  // clears the list
  nipasList.innerHTML = '';

  if(regionID != ''){
    for(var i=0;i < nipasMarkers.length;i++){
      if(nipasMarkers[i].region_id == regionID){

        // Filtered list
        content = content + '<a href="#" onclick="viewnipasInfo('+(i)+');" class=\'list-group-item list-group-item-action\'>' + nipasMarkers[i].nipas_name + '</a>';
        totalArea =+ nipasMarkers[i].area;
      }
    }
  }else{
    for(var i=0;i < nipasMarkers.length;i++){

      // All NIPAS sites
      content = content + '<a href="#" onclick="viewnipasInfo('+(i)+');" class=\'list-group-item list-group-item-action\'>' + nipasMarkers[i].nipas_name + '</a>';
      totalArea =+ nipasMarkers[i].area;
    }
  }

  nipasList.innerHTML = content;

  // Display total area
  nipasArea.innerHTML = '<strong style=\'font-size: 1.2em;\'>Total Area:</strong> '+totalArea+' HECTARES.'; 
}

/*
 * Display a default image if no data is found
 */
function onError(image){
  image.onError = "";
  image.src = "files/err/no_data.png";
  return true;
}

/* 
 *  Create a pie chart for existing coral data on each NIPAS site
 */
function loadCoralData(id){

	IndexCoralData=0;
  ManLocIdCoralData=id;
  UpdateYearCoralData();
	UpdateDataCoralData();

  // var chartData = {};
  // for(i = 0; i < coralData.length ; i++){
  //   if(coralData[i].loc_id == id){
  //     chartData[coralData[i].monitor_year] = [
  //       {"Category": "Hard Coral", "size": coralData[i].HC_cover},
		//     {"Category": "Algal Assemblage", "size": coralData[i].AA_cover},
		//     {"Category": "Abiotic", "size": coralData[i].AB_cover},
		// 	  {"Category": "Macroalgae", "size": coralData[i].MA_cover},
		// 	  {"Category": "Halimeda", "size": coralData[i].HA_cover},
		//     {"Category": "Other Biota", "size": coralData[i].OB_cover}
  //     ];
  //  		var chartTitle = "Coral Data";
  //  		var remarks = '<br/><p style="font-size: 1.4em;">' + coralData[i].remarks + '</p>';
  //   }	
  // }


  // var currentYear = 0;
  // var maxYear     = 4018;

  // 	if (Object.keys(chartData).length > 0) {
  //   	var chart = AmCharts.makeChart("coral-data", {
  //     	"type"          : "pie",
		//     "theme"         : "light",
		//     "dataProvider"  : chartData,
		//     "valueField"    : "size",
		//     "titleField"    : "Category",
		//     "startDuration" : 0,
		//     "innerRadius"   : 80,
		//     "pullOutRadius" : 20,
		//     "marginTop"     : 30,
		//     // "titles": [{
		//     //     "text": chartTitle,
  //     //       "size": 25
		//     // }],
  //     	// "allLabels": [{
  //    		//   "y"       : "54%",
  //      //  	"align"   : "center",
  //      //  	"size"    : 25,
  //      //  	"bold"    : true,
  //      //  	"text"    : "currentYear",
  //      //  	"color"   : "#555",
  //     	// }, {
  //      //  	"y"       : "49%",
  //      //  	"align"   : "center",
  //      //  	"size"    : 15,
  //      //  	"text"    : "Year",
  //      //  	"color"   : "#555"
  //     	// }],
  //     	"listeners": [{
  //       	"event": "init",
  //       	"method": function( e ) {
  //       		var chart = e.chart;

  //       		function getCurrentData() {
  //         		do {
  //           		var data = chartData[ maxYear ];
  //           		maxYear--;
  //           		if(maxYear == 0) {
  //           			maxYear = 4018;
  //           		}
  //         		} while(data == undefined);
  //         		return data;
  //       		}

  //     			function loop() {
  //         		var data = getCurrentData();
  //         		// chart.allLabels[0].text = maxYear + 1;
  //         		chart.animateData( data, {
  //           		duration: 0
  //         		});
  //       		}
  //         	loop();
  //       	}
  //     	}],
  //      	"export": {
  //         // Export options 
  //       	"enabled": true,
  //       	"beforeCapture": function(menuConfig) { 
  //       		var url = "LOGO.png"; 
  //        		var setup = this.setup;
  //        		var timer = setInterval(function() {
  //        			if (setup.fabric) {
  //          			var canvas = setup.fabric;
  //          			clearTimeout(timer);
  //          			canvas.setOverlayImage(url, canvas.renderAll.bind(canvas), {
  //          				scaleX: 0.6,
  //          				scaleY: 0.6,
  //          				originX: 'left',
  //          				originY: 'top'
  //          			});
  //        			}
  //        		}, 100);
  //       	}
  //       }
  //   	});                                   
  // 	}
  // 	else {
  //   // Show no data image if NIPAS site has not been surveryed
  //     document.getElementById('SurveyDateCoralData').innerHTML = 'None on Record';
  //   	document.getElementById('coral-data').innerHTML = '<center><img src="files/err/no_data.png" width="100%" style="margin-top: 15px;"></center>';        
  // 	}	
  // 	return chartData;
}

/*
 *  This method creates a Pie Chart using Deep Coral data
 *  Utilizes the AmCharts JS Library
 */
function loadDeepData(id, chartComponent, descComponent){
  var chartData = {};
  IndexDeepCoral=0;
  ManLocIdDeepCoral=id;
  UpdateYearDeepCoral();
  UpdateDataDeepCoral();


  for(i = 0; i < deepData.length ; i++){
    // NIPAS site specific
    if(deepData[i].loc_id == id){
      chartData[deepData[i].survey_date] = [
        {"Category": "Live Coral",  "size"  : deepData[i].live_coral},
        {"Category": "Sand/Rubble", "size"  : deepData[i].sand_rubble},
        {"Category": "Dead Coral",  "size"  : deepData[i].dead_coral},
        {"Category": "Others",      "size"  : deepData[i].other}
      ];
      var chartTitle  = "Substrate Composition";
      var remarks     = '<br/><p style="font-size: 1.4em; text-align: justify;">' + deepData[i].remarks + '<br/>Deep or mesophotic coral reefs were (30m-40m) documented using <a href="#" onClick="viewMethodDescription(\'deep-coral-link\')">ROVs, echosounders, and manual surveys</a>.<br/>'+
                '<p style="font-size: 1.4em; text-align: justify;"><strong>Date of survey: </strong>'+ deepData[i].survey_date+'<br/>'+
                '<strong>Depth: </strong>'+ deepData[i].depth+' meters<br/>'+
                '<strong>Temperature: </strong>'+ deepData[i].temperature+' &deg;C <br/>'+
                '<strong>Species Observed: </strong><i>'+ deepData[i].species_richness+'</i><br/></p>'+
                '<div id="deep-carousel"></div>';
    }
  }

  var currentYear = 0;
  var maxYear     = 4018;

  if(Object.keys(chartData).length > 0 ){

    var chart = AmCharts.makeChart( chartComponent , {
      "type"          : "pie",
      "theme"         : "light",
      "dataProvider"  : chartData,
      "valueField"    : "size",
      "titleField"    : "Category",
      "startDuration" : 0,
      "innerRadius"   : 80,
      "pullOutRadius" : 20,
      "marginTop"     : 30,
      // "titles": [{
      //   "text": chartTitle
      // }],
      // "allLabels": [{
      //   "y"       : "54%",
      //   "align"   : "center",
      //   "size"    : 25,
      //   "bold"    : true,
      //   "text"    : "currentYear",
      //   "color"   : "#555",
      // }, {
      //   "y"       : "49%",
      //   "align"   : "center",
      //   "size"    : 15,
      //   "text"    : "Year",
      //   "color"   : "#555"
      // }],
      "listeners": [ {
        "event": "init",
        "method": function( e ) {
          var chart = e.chart;
          function getCurrentData() {
            do{
              var data = chartData[ maxYear ];
              maxYear--;
              if ( maxYear == 0 ) {
                maxYear = 4018; 
              }
            } while( data == undefined )
            return data;
          }
          function loop() {
            var data = getCurrentData();
            // chart.allLabels[0].text = maxYe5po4ar + 1;
            chart.animateData( data, {
              duration: 0,
            });
          }
          loop();
        }
      }],
      "export": {
          // Export options 
        "enabled": true,
        "beforeCapture": function(menuConfig) {
          //var url = "http:\\\\localhost\\training\\DENR.png"; 
          var url = "LOGO.png"; 
          var setup = this.setup;
          var timer = setInterval(function() {
            if (setup.fabric) {
              var canvas = setup.fabric;
              clearTimeout(timer);
              canvas.setOverlayImage(url, canvas.renderAll.bind(canvas), {
                scaleX: 0.6,
                scaleY: 0.6,
                originX: 'left',
                originY: 'top'
              });
            }
          }, 100);
        }
      }
    });

    // Add remarks at the bottom of the pie chart
    document.getElementById(descComponent).innerHTML = remarks;                                     
  }
  else{
    // Show no data image if NIPAS site has not been surveryed
    document.getElementById(chartComponent).innerHTML = '<center><img src="files/err/no_data.png" width="100%" style="margin-top: 15px;"></center>';        
  }
  return chartData;
}

/*
 *  This method utilizes the AmCharts JS library to create a stacked chart of FISH data
 */
function loadFishData(id, data, type, component, _givenLabel){
    // component identifies which <DIV> component holds the stacked graph
  var chartData   = [];
  var fishSurveyDate;

  if (type == 'Species Count') {
  	IndexFishSp=0;
	  ManLocIdFishSp=id;
	  UpdateYearFishSp();
	  UpdateDataFishSp();
    fishSurveyDate = 'SurveyDateFishSp';
  }
  else if (type ==  'Mean Abundance') {
  	IndexFishDen=0;
	  ManLocIdFishDen=id;
	  UpdateYearFishDen();
	  if(MyYearsFishDen != 0){
	   	UpdateDataFishDen();
	  }
    fishSurveyDate = 'SurveyDateFishDen';
	}
	else {
		IndexFishBio=0;
    ManLocIdFishBio=id;
    UpdateYearFishBio();
    if(MyYearsFishBio != 0){ 
	   	UpdateDataFishBio();
    }
    fishSurveyDate = 'SurveyDateFishBio';
	}

  	return chartData;
}

// // Note 3 graphs dapat
// /*
//  *  This method creates a stacked chart for available Mangrove data
//  *  Uses the AmCharts JS library
//  */
function loadMangroveData(id, data, component, type, header, legend){
  var chartData = [];
  Index = 0;
  ManLocId = id;
  UpdateYear();
  UpdateData();
	return chartData;
}

/* 
 *  Create a pie chart for available Seagras data on each NIPAS site
 */
function loadSeagrassCoverData(id){
    IndexSeagrassCover=0;
    ManLocIdSeagrassCover=id;
    UpdateYearSeagrassCover();
    UpdateDataSeagrassCover();
}


/*
 *  This method creates a stacked chart for available Seagrass data
 *  Uses the AmCharts JS library
 */
function loadSeagrassData(id, data, component){
  var chartData   = [];
  IndexSeagrass=0;
  ManLocIdSeagrass=id;
  UpdateYearSeagrass();
	UpdateDataSeagrass();
}

/*
 *  Load available ARRAS data from an external JSON file
 *  Error image if no data is found
 */
function loadArrasData( id ){
  arrasData.forEach(  function(data){
    if( data.loc_id == id){
      return data.remarks;
    }
  });

  return '';
  // return '<center><img src="files/err/no_data.png" width="100%" style="margin-top: 15px;"></center>';
}

function loadCoastalData( id, data ){
  for(i = 0, j = 0; i < data.length ; i++){
    if(data[i].loc_id == id){
      document.getElementById('pills-coastal').innerHTML = '<br><div class="row"><div class="col-lg-12 col-md-12"><p style="font-size: 1.4em;">'+ 
            data[i].survey_remarks +' Current state of the shore was evaluated using <a href="#" onClick="viewMethodDescription(\'coastal-link\')">on-site beach monitoring technique</a>.</p><br/><div style="font-size: 1.4em;"><strong>Survey Date:</strong> '+ data[i].survey_date + '<br/><strong>Lenght of shoreline surveyed:</strong> '+ data[i].survey_length + ' km.<br/><strong>Site:</strong> ' + data[i].monitoring_site + 
            '</div><br/><img class="project_images rounded mx-auto d-block" src=\"files/coastal/'+ data[i].loc_id +'.png\" onerror=\"onError(this);\" width=\"100%\"\'></div></div>';
      return;
    }
  }
  document.getElementById('pills-coastal').innerHTML = '<center><img src="files/err/no_data.png" width="100%" style="margin-top: 15px;"></center>'; 
  return; 
}

/*
 *  Open a specific tab in the project components panel
 */
function viewMethodDescription( _componentLink ){
  sidebar.open('projects');
  document.getElementById( _componentLink ).click();
}
/* End of script.js */

//***********************************************************


//Mangrove Functions
function Dec(){
  --Index;
  if(Index < 0){
	   Index = MyYears.length - 1;
  }
  UpdateData();
}

function Inc(){
  ++Index;
  if(Index > (MyYears.length-1)){
	   Index = 0;
  }
  UpdateData();
}

function UpdateYear(){
  $.ajax({
  	 type: 'POST',
  	 url: '/cgi-bin/MangroveYear.pl',
   	async: false,
   	data: {
    		"loc_id": 	ManLocId 
   	},
   	success: function(res){
     		MyYears=res;
   	},
   	error: function(){
     		alert("UpdateYear Mangrove Did not work!");
   	}
  });
}


var mangroveSpecies;
var mangrovesPresent;

function getMangroveSpecies() {
  mangroveSpecies = [
    {
      "title": "Aegiceras corniculatum",
      "balloonText": "<i>[[title]]</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Acors",      //x - Stem Density
      "yField": "Acorc",      //y - Canopy Cover change to "Total Height"
      "valueField": "Acorb",  //value - Basal Area
      "maxBulletSize": 100
    },

    {
      "title": "Aegiceras floridum",
      "balloonText": "<i>[[title]]</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Aflos",      //x - Stem Density
      "yField": "Afloc",      //y - Canopy Cover change to "Total Height"
      "valueField": "Aflob",  //value - Basal Area
      "maxBulletSize": 100
    },

    {
      "title": "Avicennia alba",
       //"lineColor": "HotPink",
      "balloonText": "<i>[[title]]</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Aalbs",      //x - Stem Density
      "yField": "Aalbc",      //y - Canopy Cover change to "Total Height"
      "valueField": "Aalbb",  //value - Basal Area
      "maxBulletSize": 100
    }, 

    {
      "title": "Avicennia marina",
       //"lineColor": "HotPink",
      "balloonText": "<i>[[title]]</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Amars",
      "yField": "Amarc",
      "valueField": "Amarb",
      "maxBulletSize": 100
    }, 

    {
      "title": "Avicennia officinalis",
      "balloonText": "<i>[[title]]</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Aoffs",      //x - Stem Density
      "yField": "Aoffc",      //y - Canopy Cover change to "Total Height"
      "valueField": "Aoffb",  //value - Basal Area
      "maxBulletSize": 100
    }, 
    
    {
      "title": "Avicennia rumphiana",
      "balloonText": "<i>Avicennia rumphiana</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Arums",
      "yField": "Arumc",
      "valueField": "Arumb",
      "maxBulletSize": 100
    }, 

    {
      "title": "Bruguiera cylindrica",
      "balloonText": "<i>[[title]]</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Bcyls",      //x - Stem Density
      "yField": "Bcylc",      //y - Canopy Cover change to "Total Height"
      "valueField": "Bcylb",  //value - Basal Area
      "maxBulletSize": 100
    },

    {
      "title": "Bruguiera gymnorhiza",
       //"lineColor": "HotPink",
      "balloonText": "<i>[[title]]</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Bgyms",      //x - Stem Density
      "yField": "Bgymc",      //y - Canopy Cover change to "Total Height"
      "valueField": "Bgymb",  //value - Basal Area
      "maxBulletSize": 100
    }, 
    
    {
      "title": "Bruguiera sexangula",
       //"lineColor": "IndianRed",
      "balloonText": "<i>Bruguiera sexangula</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Bsexs",
      "yField": "Bsexc",
      "valueField": "Bsexb",
      "maxBulletSize": 100
    }, 
    
    {
      "title": "Ceriops decandra",
       //"lineColor": "LightSalmon",
      "balloonText": "<i>Ceriops decandra</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Cdecs",
      "yField": "Cdecc",
      "valueField": "Cdecb",
      "maxBulletSize": 100
    }, 

    {
      "title": "Ceriops tagal",
       //"lineColor": "Olive",
      "balloonText": "<i>Ceriops tagal</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Ctags",
      "yField": "Ctagc",
      "valueField": "Ctagb",
      "maxBulletSize": 100
    }, 

    {
      "title": "Excoecaria agallocha",
      "balloonText": "<i>[[title]]</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Eagas",      //x - Stem Density
      "yField": "Eagac",      //y - Canopy Cover change to "Total Height"
      "valueField": "Eagab",  //value - Basal Area
      "maxBulletSize": 100
    }, 
    
    {
      "title": "Lumnitzera littorea",
       //"lineColor": "Orange",
      "balloonText": "<i>Lumnitzera littorea</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Llits",
      "yField": "Llitc",
      "valueField": "Llitb",
      "maxBulletSize": 100
    }, 

    {
      "title": "Lumnitzera lutea",
       //"lineColor": "Olive",
      "balloonText": "<i>Lumnitzera lutea</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Lluts",
      "yField": "Llutc",
      "valueField": "Llutb",
      "maxBulletSize": 100
    }, 

    {
      "title": "Lumnitzera racemosa",
      "balloonText": "<i>[[title]]</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Lracs",      //x - Stem Density
      "yField": "Lracc",      //y - Canopy Cover change to "Total Height"
      "valueField": "Lracb",  //value - Basal Area
      "maxBulletSize": 100
    }, 
    
    {
      "title": "Nypa fruticans",
      //"lineColor": "OrangeRed",
      "balloonText": "<i>Nypa fruticans</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Nfrus",
      "yField": "Nfruc",
      "valueField": "Nfrub",
      "maxBulletSize": 100
    }, 

    {
      "title": "Osbornia octodonta",
      "balloonText": "<i>Osbornia octodonta</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Oocts",
      "yField": "ooctc",
      "valueField": "Ooctb",
      "maxBulletSize": 100
    }, 

    {
      "title": "Pemphis acidula",
       //"lineColor": "Olive",
      "balloonText": "<i>Pemphis acidula</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Pacis",
      "yField": "Pacic",
      "valueField": "Pacib",
      "maxBulletSize": 100
    }, 

    {
      "title": "Rhizophora apiculata",
      //"lineColor": "Gold",
      "balloonText": "<i>Rhizophora apiculata</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Rapis",
      "yField": "Rapic",
      "valueField": "Rapib",
      "maxBulletSize": 100
    }, 
   
    {
      "title": "Rhizophora mucronata",
      //"lineColor": "GoldenRod",
      "balloonText": "<i>Rhizophora mucronata</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Rmucs",
      "yField": "Rmucc",
      "valueField": "Rmucb",
      "maxBulletSize": 100
    }, 
   
    {
      "title": "Rhizophora stylosa",
       //"lineColor": "Sienna",
      "balloonText": "<i>Rhizophora stylosa</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Rstys",
      "yField": "Rstyc",
      "valueField": "Rstyb",
      "maxBulletSize": 100
    }, 
    
    {
      "title": "Scyphiphora hydrophyllacea",
       //"lineColor": "Olive",
      "balloonText": "<i>cyphiphora hydrophyllacea</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Shyds",
      "yField": "Shydc",
      "valueField": "Shydb",
      "maxBulletSize": 100
    }, 

    {
      "title": "Sonneratia alba",
       //"lineColor": "Green",
      "balloonText": "<i>Sonneratia alba</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Salbs",
      "yField": "Salbc",
      "valueField": "Salbb",
      "maxBulletSize": 100
    }, 

    {
      "title": "Sonneratia caseolaris",
      "balloonText": "<i>[[title]]</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Scass",      //x - Stem Density
      "yField": "Scasc",      //y - Canopy Cover change to "Total Height"
      "valueField": "Scasb",  //value - Basal Area
      "maxBulletSize": 100
    },

    {
      "title": "Sonneratia ovata",
      "balloonText": "<i>[[title]]</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Sovas",      //x - Stem Density
      "yField": "Sovac",      //y - Canopy Cover change to "Total Height"
      "valueField": "Sovab",  //value - Basal Area
      "maxBulletSize": 100
    }, 
    
    {
      "title": "Xylocarpus granatum",
       //"lineColor": "Olive",
      "balloonText": "<i>Xylocarpus granatum</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Xgras",
      "yField": "Xgrac",
      "valueField": "Xgrab",
      "maxBulletSize": 100
    },

    {
      "title": "Xylocarpus moluccensis",
      "balloonText": "<i>[[title]]</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Xmols",      //x - Stem Density
      "yField": "Xmolc",      //y - Canopy Cover change to "Total Height"
      "valueField": "Xmolb",  //value - Basal Area
      "maxBulletSize": 100
    }, 

    {
      "title": "Other species",
      //"lineColor": "Teal",
      "balloonText": "<i>Other species</i><br/>Total Height: <b>[[y]]</b><br/>Stem Density: <b>[[x]]</b><br>Basal Area: <b>[[value]]</b>",
      "bullet": "circle",
      "labelText": "[[value]]",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "xField": "Ospes",
      "yField": "Ospec",
      "valueField": "Ospeb",
      "maxBulletSize": 100
    }
  ];
}


function UpdateData(){
  $.ajax({
	type: 'POST',
  	url: '/cgi-bin/MangroveData.pl',
 	 	async: false,
   	data: {
   		"loc_id": ManLocId, 
   		"year": MyYears[Index]
   	},
   	success: function(res){
     	myData=res;
   		if(MyYears[0] == -9999){
     		document.getElementById("mybuttons").innerHTML ="" ;
     		document.getElementById("SurveyDate").innerHTML = "None on Record.";
        document.getElementById("mangrove-data").innerHTML = '<center><img src="files/err/no_data.png" width="100%" style="margin-top: 15px;"></center>'; 
   		}
     	if(MyYears[0] != -9999){
			  show();
     	}
   	},
   	error: function(){
     	alert("UpdateData Mangrove Did not work!");
   	}
 	});
}

function show(){
  getMangroveSpecies();
  
  /* DO NOT DELETE!!! */
  // var keys = [];
  // mangrovesPresent = [];
  // for(var key in myData[0]){
  //   keys.push(key);
  // }

  // for(var j=0; j<mangroveSpecies.length; j++) {
  // 	var mang = mangroveSpecies[j].title.split(" ");
  // 	var mangGen = mang[0].substring(0,1);
  // 	var mangSpe = mangGen.concat(mang[1].substr(0,3));

  // 	for(var k=0; k<(keys.length); k+=3) {
  // 		if(keys[k].substring(0,4) == mangSpe) {
  // 			mangrovesPresent.push(mangroveSpecies[j]);
  // 		}
  // 	}
  // }
  /* END HERE */

  document.getElementById("SurveyDate").innerHTML= MyYears[Index];
  var chart = AmCharts.makeChart( "mangrove-data", {
    "type": "xy",
    "theme": "light",
    "legend": {
      "equalWidths": false,
      "periodValueText": "total: [[value.sum]]",
      "position": "right",
      "valueAlign": "left",
      "valueWidth": 100,
      "fontSize": 10
    },
    "dataProvider": myData,
    "balloon":{
      "fixedPosition":true,
    },
    "valueAxes": [{
      "position": "bottom",
       //"axisAlpha": 0
      "axisAlpha": 0
    }, {
      "minMaxMultiplier": 1,
      "axisAlpha": 0,
      "position": "left"
    }],
     //"startDuration": 1.5,
    "startDuration": 0.1,
    "graphs": mangroveSpecies,
    // "graphs": mangrovesPresent,
    
    "valueAxes":[{
      "position": "left",
      "title": "Total Height (Canopy Cover)"
    },{
      "position": "bottom",
      "title": "Stem Density\n\n( Note: Circle size is equal to the Basal Area. )"
    }],
    "marginLeft": 46,
    "marginBottom": 35,
    "export": {
      "enabled": true,
      "fileName": "mangrove" + MyYears[Index].toString(),
      "beforeCapture": function(menuConfig) {
        var url = "images/logo/agoscorva.png"; 
        var setup = this.setup; 
        var timer = setInterval(function() {
          if (setup.fabric) {
            var canvas = setup.fabric;
            clearTimeout(timer);
            canvas.setOverlayImage(url, canvas.renderAll.bind(canvas), {
              scaleX: 0.6,
              scaleY: 0.6,
              originX: 'left',
              originY: 'top'
            });
          }
        }, 100);
      }
    }
  });
  return;
}

//Coral Data Functions
function DecCoralData(){
  --IndexCoralData;
  if(IndexCoralData < 0){
  	 IndexCoralData = MyYearsCoralData.length - 1;
  }
  UpdateDataCoralData();
}

function IncCoralData(){
  ++IndexCoralData;
  if(IndexCoralData > (MyYearsCoralData.length-1)){
	   IndexCoralData = 0
  }
  UpdateDataCoralData();
}

function UpdateYearCoralData(){
  $.ajax({
   	type: 'POST',
   	url: '/cgi-bin/CoralDataYear.pl',
   	async: false,
   	data: {
     		"loc_id": 	ManLocIdCoralData 
   	},
   	success: function(res){
     		MyYearsCoralData=res;
   	},
   	error: function(ts){
     		alert("UpdateYear CoralData Did not work!");
   	}
 	});
}


function UpdateDataCoralData(){
  $.ajax({
   	type: 'POST',
   	url: '/cgi-bin/CoralDataData.pl',
 	 	async: false,
   	data: {
   		"loc_id": ManLocIdCoralData, 
   		"year": MyYearsCoralData[IndexCoralData]
   	},
   	success: function(res){
     	myDataCoralData=res;
   		if(MyYearsCoralData[0] == -9999){
     		document.getElementById("mybuttonsCoralData").innerHTML="";
     		document.getElementById("SurveyDateCoralData").innerHTML= "None on Record.";
        document.getElementById("coral-data").innerHTML = '<center><img src="files/err/no_data.png" width="100%" style="margin-top: 15px;"></center>';
   		}
     	if(MyYearsCoralData[0] != -9999){
			  showCoralData();
     	}
   	},
   	error: function(ts){
     	alert("UpdateData CoralData Did not work!");
   	}
 	});
}

function showCoralData(){
	document.getElementById("SurveyDateCoralData").innerHTML= MyYearsCoralData[IndexCoralData];
	var chart = AmCharts.makeChart("coral-data", {
    "type": "pie",
    "theme": "light",
    "dataProvider": myDataCoralData,
    "valueField": "Count",
    "titleField": "Type",
    "innerRadius": 80,
    "pullOutRadius" : 20,
    "marginTop": 30,
    "balloonText": "[[value]]",

	  "export": {
	    "enabled": true,
      "fileName": "coral_data" + MyYearsCoralData[IndexCoralData].toString(),
	    "beforeCapture": function(menuConfig) {
	      var url = "LOGO.png"; 
	      var setup = this.setup;
	      var timer = setInterval(function() {
		      if (setup.fabric) {
		       	var canvas = setup.fabric;
		       	clearTimeout(timer);
		       	canvas.setOverlayImage(url, canvas.renderAll.bind(canvas), {
		         	scaleX: 0.6,
		         	scaleY: 0.6,
		         	originX: 'left',
		         	originY: 'top'
		       	});
		      }
	      }, 100);
	    }
	  }
	});
  return;
}

//Fish Sp Functions
function DecFishSp(){
  --IndexFishSp;
  if(IndexFishSp < 0){
   	IndexFishSp = MyYearsFishSp.length - 1;
  }
  UpdateDataFishSp();
}

function IncFishSp(){
  ++IndexFishSp;
  if(IndexFishSp > (MyYearsFishSp.length-1)){
  	IndexFishSp = 0;
  }
  UpdateDataFishSp();
}

function UpdateYearFishSp(){
  $.ajax({
   	type: 'POST',
   	url: 'http://10.34.34.12/cgi-bin/FishSpYear.pl',
   	async: false,
   	data: {
     	"loc_id": 	ManLocIdFishSp 
   	},
   	success: function(res) {
     	MyYearsFishSp=res;
   	},
   	error: function() {
     	alert("UpdateYear FishSp Did not work!");
   	}
	});
}

function UpdateDataFishSp(){
  $.ajax({
   	type: 'POST',
  	url: 'http://10.34.34.12/cgi-bin/FishSpData.pl',
 		async: false,
   	data: {
     		"loc_id": ManLocIdFishSp, 
     		"year": MyYearsFishSp[IndexFishSp]
   	},
   	success: function(res){
     	myDataFishSp=res;
   		if(MyYearsFishSp[0] == -9999) {
       		document.getElementById("mybuttonsFishSp").innerHTML = "";
          document.getElementById("SurveyDateFishSp").innerHTML = "None on Record";
          document.getElementById("fish-data-sp").innerHTML = '<center><img src="files/err/no_data.png" width="100%" style="margin-top: 15px;"></center>'; 
   		}
   		if(MyYearsFishSp[0] != -9999) {
			  showFishSp("Species Count");
   		}
   	},
   	error: function(){
     	alert("UpdateData FishSp Did not work!");
   	}
  });
}


function showFishSp(chartTitle){
  document.getElementById("SurveyDateFishSp").innerHTML= MyYearsFishSp[IndexFishSp];
  var chart =AmCharts.makeChart( "fish-data-sp" , {
    "type"         : "serial",
    "theme"        : "light",
    "rotate"       : true,
    "marginBottom" : 50,
    "dataProvider" : myDataFishSp,
    // "titles"       : [{
    //  	"text"       :   chartTitle
    // }],
    "startDuration": 1,
  	"graphs": [{
    	"fillAlphas": 0.8,
    	"lineAlpha": 0.2,
    	"type": "column",
    	"valueField": "mpa",
    	"title": "MPA",
    	"labelText": "[[value]]",
    	"clustered": false,
    	"labelFunction": function(item) {
      		return Math.abs(item.values.value);
    	},
    	"balloonFunction": function(item) {
      		return item.category + ": " + Math.abs(item.values.value) + "%";
    	}
  		}, {
    	"fillAlphas": 0.8,
    	"lineAlpha": 0.2,
    	"type": "column",
    	"valueField": "out",
    	"title": "OUT",
    	"labelText": "[[value]]",
    	"clustered": false,
    	"labelFunction": function(item) {
      		return Math.abs(item.values.value);
    	},
    	"balloonFunction": function(item) {
      		return item.category + ": " + Math.abs(item.values.value) + "%";
    	}
  	}],
  	"categoryField": "type",
    "categoryAxis": {
    	"gridPosition": "start",
    	"gridAlpha": 0.2,
    	"axisAlpha": 0
  	},
    "valueAxes": [{
    	"gridAlpha": 0,
    	"ignoreAxisWidth": true,
    	"labelFunction": function(value) {
      		return Math.abs(value);
    	},
    	"guides": [{
      	"value": 0,
      	"lineAlpha": 0.2
    	}]
    }],
    "allLabels": [{
      "text": "MPA",
      "x": "28%",
      "y": "97%",
      "bold": true,
      "align": "middle"
    }, {
      "text": "OUT",
      "x": "75%",
      "y": "97%",
      "bold": true,
      "align": "middle"
    }],
    "balloon": {
     	"fixedPosition": true
    },
    "chartCursor": {
     	"valueBalloonsEnabled": false,
     	"cursorAlpha": 0.05,
     	"fullWidth": true
    },
    "export": {
      "enabled": true,
      "fileName": "fish_species" + MyYearsFishSp[IndexFishSp].toString(),
      "beforeCapture": function(menuConfig) {
        var url = "LOGO.png"; 
        var setup = this.setup;
        var timer = setInterval(function() {
          if (setup.fabric) {
            var canvas = setup.fabric;
            clearTimeout(timer);
            canvas.setOverlayImage(url, canvas.renderAll.bind(canvas), {
              scaleX: 0.6,
              scaleY: 0.6,
              originX: 'left',
              originY: 'top'
            });
          }
        }, 100);
      }
    } 
	});
  return;
}

//Fish Den Functions
function DecFishDen(){
  --IndexFishDen;
  if(IndexFishDen < 0){
    IndexFishDen = (MyYearsFishDen.length - 1);
  }
  UpdateDataFishDen();
}

function IncFishDen(){
  ++IndexFishDen;
  if(IndexFishDen > (MyYearsFishDen.length-1)){
    IndexFishDen = 0
  }
  UpdateDataFishDen();
}

function UpdateYearFishDen(){
  $.ajax({
    type: 'POST',
    url: 'http://10.34.34.12/cgi-bin/FishDenYear.pl',
    async: false,
    data: {
      "loc_id": 	ManLocIdFishDen 
    },
    success: function(res){
      MyYearsFishDen=res;
    },
    error: function(){
      alert("UpdateYear FishDen Did not work!");
    }
  });
}


function UpdateDataFishDen(){
  $.ajax({
    type: 'POST',
    url: 'http://10.34.34.12/cgi-bin/FishDenData.pl',
    async: false,
    data: {
      "loc_id": ManLocIdFishDen, 
      "year": MyYearsFishDen[IndexFishDen]
    },
    success: function(res){
      myDataFishDen=res;
	    if(MyYearsFishDen[0] == -9999){
        document.getElementById("mybuttonsFishDen").innerHTML="" ;
        document.getElementById("SurveyDateFishDen").innerHTML= "None on Record.";
        document.getElementById("fish-data-den").innerHTML = '<center><img src="files/err/no_data.png" width="100%" style="margin-top: 15px;"></center>'; 
	    }
      if(MyYearsFishDen[0] != -9999){
			  showFishDen("Mean Abundance");
      }
    },
    error: function(){
      alert("UpdateData FishDen Did not work!");
    }
  });
}


function showFishDen(chartTitle){
  document.getElementById("SurveyDateFishDen").innerHTML= MyYearsFishDen[IndexFishDen];
  var chart =AmCharts.makeChart( "fish-data-den" , {
    "type"         : "serial",
    "theme"        : "light",
    "rotate"       : true,
    "marginBottom" : 50,
    "dataProvider" : myDataFishDen,
    // "titles"       : [{
    //   "text"       :   chartTitle
    //                  }],
    "startDuration": 1,
    "graphs": [{
      "fillAlphas": 0.8,
      "lineAlpha": 0.2,
      "type": "column",
      "valueField": "mpa",
      "title": "MPA",
      "labelText": "[[value]]",
      "clustered": false,
      "labelFunction": function(item) {
        return Math.abs(item.values.value);
      },
      "balloonFunction": function(item) {
        return item.category + ": " + Math.abs(item.values.value) + "%";
      }
    }, {
      "fillAlphas": 0.8,
      "lineAlpha": 0.2,
      "type": "column",
      "valueField": "out",
      "title": "OUT",
      "labelText": "[[value]]",
      "clustered": false,
      "labelFunction": function(item) {
        return Math.abs(item.values.value);
      },
      "balloonFunction": function(item) {
        return item.category + ": " + Math.abs(item.values.value) + "%";
      }
    }],
    "categoryField": "type",
    "categoryAxis": {
      "gridPosition": "start",
      "gridAlpha": 0.2,
      "axisAlpha": 0
    },
    "allLabels": [{
      "text": "MPA",
      "x": "28%",
      "y": "97%",
      "bold": true,
      "align": "middle"
    }, {
      "text": "OUT",
      "x": "75%",
      "y": "97%",
      "bold": true,
      "align": "middle"
    }],
    "valueAxes": [{
      "gridAlpha": 0,
      "ignoreAxisWidth": true,
      "labelFunction": function(value) {
        return Math.abs(value);
      },
      "guides": [{
        "value": 0,
        "lineAlpha": 0.2
      }]
    }],
    "balloon": {
      "fixedPosition": true
    },
    "chartCursor": {
      "valueBalloonsEnabled": false,
      "cursorAlpha": 0.05,
      "fullWidth": true
    },
    "export": {
      // Export options
      "enabled": true,
      "fileName": "fish_abundance" + MyYearsFishDen[IndexFishDen].toString(),
      "beforeCapture": function(menuConfig) {
      //var url = "http:\\\\localhost\\training\\DENR.png"; 
        var url = "LOGO.png"; 
        var setup = this.setup;
        var timer = setInterval(function() {
          if (setup.fabric) {
            var canvas = setup.fabric;
            clearTimeout(timer);
            canvas.setOverlayImage(url, canvas.renderAll.bind(canvas), {
              scaleX: 0.6,
              scaleY: 0.6,
              originX: 'left',
              originY: 'top'
            });
          }
        }, 100);
      }
    } 
  });
  return;
}

//Fish Bio Functions
function DecFishBio(){
  --IndexFishBio;
  if(IndexFishBio < 0){
    IndexFishBio = MyYearsFishBio.length - 1;
  }
  UpdateDataFishBio();
}

function IncFishBio(){
  ++IndexFishBio;
  if(IndexFishBio > (MyYearsFishBio.length-1)){
    IndexFishBio = 0
  }
  UpdateDataFishBio();
}

function UpdateYearFishBio(){
  $.ajax({
    type: 'POST',
    url: 'http://10.34.34.12/cgi-bin/FishBioYear.pl',
    async: false,
    data: {
      "loc_id": 	ManLocIdFishBio 
    },
    success: function(res){
      MyYearsFishBio=res;
    },
    error: function(){
      alert("UpdateYear FishBio Did not work!");
    }
  });
}


function UpdateDataFishBio(){
  $.ajax({
    type: 'POST',
    url: 'http://10.34.34.12/cgi-bin/FishBioData.pl',
   	async: false,
    data: {
      "loc_id": ManLocIdFishBio, 
      "year": MyYearsFishBio[IndexFishBio]
    },
    success: function(res){
      myDataFishBio=res;
  	  if(MyYearsFishBio[0] == -9999){
        document.getElementById("mybuttonsFishBio").innerHTML = "" ;
        document.getElementById("SurveyDateFishBio").innerHTML = "None on Record.";
        document.getElementById("fish-data-bio").innerHTML = '<center><img src="files/err/no_data.png" width="100%" style="margin-top: 15px;"></center>'; 
  	  }
      if(MyYearsFishBio[0] != -9999){
  		  showFishBio("Mean Biomass");
      }
    },
    error: function(){
      alert("UpdateData FishBio Did not work!");
    }
  });
}


function showFishBio(chartTitle){
  document.getElementById("SurveyDateFishBio").innerHTML= MyYearsFishBio[IndexFishBio];
  var chart =AmCharts.makeChart( "fish-data-bio" , {
    "type"         : "serial",
    "theme"        : "light",
    "rotate"       : true,
    "marginBottom" : 50,
    "dataProvider" : myDataFishBio,
    // "titles"       : [{
    //   "text"       :   chartTitle
    //                  }],
    "startDuration": 1,
    "graphs": [{
      "fillAlphas": 0.8,
      "lineAlpha": 0.2,
      "type": "column",
      "valueField": "mpa",
      "title": "MPA",
      "labelText": "[[value]]",
      "clustered": false,
      "labelFunction": function(item) {
        return Math.abs(item.values.value);
      },
      "balloonFunction": function(item) {
        return item.category + ": " + Math.abs(item.values.value) + "%";
      }
    }, {
      "fillAlphas": 0.8,
      "lineAlpha": 0.2,
      "type": "column",
      "valueField": "out",
      "title": "OUT",
      "labelText": "[[value]]",
      "clustered": false,
      "labelFunction": function(item) {
        return Math.abs(item.values.value);
      },
      "balloonFunction": function(item) {
        return item.category + ": " + Math.abs(item.values.value) + "%";
      }
    }],
    "categoryField": "type",
    "categoryAxis": {
      "gridPosition": "start",
      "gridAlpha": 0.2,
      "axisAlpha": 0
    },
    "allLabels": [{
      "text": "MPA",
      "x": "28%",
      "y": "97%",
      "bold": true,
      "align": "middle"
    }, {
      "text": "OUT",
      "x": "75%",
      "y": "97%",
      "bold": true,
      "align": "middle"
    }],
    "valueAxes": [{
      "gridAlpha": 0,
      "ignoreAxisWidth": true,
      "labelFunction": function(value) {
        return Math.abs(value);
      },
      "guides": [{
        "value": 0,
        "lineAlpha": 0.2
      }]
    }],
    "balloon": {
      "fixedPosition": true
    },
    "chartCursor": {
      "valueBalloonsEnabled": false,
      "cursorAlpha": 0.05,
      "fullWidth": true
    },
    "export": {
          // Export options 
      "enabled": true,
      "fileName": "fish_biomass" + MyYearsFishBio[IndexFishBio].toString(),
      "beforeCapture": function(menuConfig) {
        var url = "LOGO.png"; 
        var setup = this.setup;
        var timer = setInterval(function() {
          if (setup.fabric) {
            var canvas = setup.fabric;
            clearTimeout(timer);
            canvas.setOverlayImage(url, canvas.renderAll.bind(canvas), {
                scaleX: 0.6,
                scaleY: 0.6,
                originX: 'left',
                originY: 'top'
            });
          }
        }, 100);
      }
    }
  });
  return;
}

 //SeagrassCover Data Functions
function DecSeagrassCover(){
  --IndexSeagrassCover;
  if(IndexSeagrassCover < 0){
    IndexSeagrassCover = MyYearsSeagrassCover.length - 1;
  }
  UpdateDataSeagrassCover();
}

function IncSeagrassCover(){
  ++IndexSeagrassCover;
  if(IndexSeagrassCover > (MyYearsSeagrassCover.length-1)){
    IndexSeagrassCover = 0
  }
  UpdateDataSeagrassCover();
}


function UpdateYearSeagrassCover(){
  $.ajax({
    type: 'POST',
    url: '/cgi-bin/SeagrassCoverYear.pl',
    async: false,
    data: {
      "loc_id":  ManLocIdSeagrassCover 
    },
    success: function(res){
      MyYearsSeagrassCover=res;
    },
    error: function(ts){
      alert("UpdateYear SeagrassCover Did not work!");
    }
  });
}


function UpdateDataSeagrassCover(){
  $.ajax({
    type: 'POST',
    url: '/cgi-bin/SeagrassCoverData.pl',
    async: false,
    data: {
      "loc_id": ManLocIdSeagrassCover,
      "year": MyYearsSeagrassCover[IndexSeagrassCover]
    },
    success: function(res){
      myDataSeagrassCover=res;
      if(MyYearsSeagrassCover[0] == -9999){
        document.getElementById("mybuttonsSeagrassCover").innerHTML = "";
        document.getElementById("SurveyDateSeagrassCover").innerHTML = "None on Record.";
        document.getElementById("seagrass-pie").innerHTML = '<center><img src="files/err/no_data.png" width="100%" style="margin-top: 15px;"></center>'; 
      }
      else {
        showSeagrassCover();
      }
    },
    error: function(ts){
      alert("UpdateData SeagrassCover Did not work!");
    }
  });
}

function showSeagrassCover(){
  document.getElementById("SurveyDateSeagrassCover").innerHTML= MyYearsSeagrassCover[IndexSeagrassCover];
  var chart = AmCharts.makeChart("seagrass-pie", {
    "type": "pie",
    "theme": "light",
    "dataProvider": myDataSeagrassCover,
    "valueField": "Count",
    "titleField": "Type",
    "innerRadius": 80,
    "pullOutRadius": 20,
    // "marginTop": 30,
    // "titles": [{
    //   "text": "Seagrass Cover Data",
    //   "size": 25
    // }],
    "balloonText": "Count: [[value]]",
    "export": {
      "enabled": true,
      "fileName": "seagrass_cover" + MyYearsSeagrassCover[IndexSeagrassCover].toString(),
      "beforeCapture": function(menuConfig) {
        var url = "LOGO.png"; 
        var setup = this.setup;
        var timer = setInterval(function() {
          if (setup.fabric) {
            var canvas = setup.fabric;
            clearTimeout(timer);
            canvas.setOverlayImage(url, canvas.renderAll.bind(canvas), {
              scaleX: 0.6,
              scaleY: 0.6,
              originX: 'left',
              originY: 'top'
            });
          }
        }, 100);
      }
    }
  });

   return;
 }

//Seagrass Functions
function DecSeagrass(){
    --IndexSeagrass;
    if(IndexSeagrass < 0){
     	IndexSeagrass = MyYearsSeagrass.length - 1;
    }
    UpdateDataSeagrass();
}

function IncSeagrass(){
    ++IndexSeagrass;
    if(IndexSeagrass > (MyYearsSeagrass.length-1)){
      	IndexSeagrass = 0
    }
    UpdateDataSeagrass();
}

function UpdateYearSeagrass(){
    $.ajax({
     	type: 'POST',
     	url: 'http://10.34.34.12/cgi-bin/SeagrassYear.pl',
     	async: false,
     	data: {
       		"loc_id": 	ManLocIdSeagrass 
     	},
     	success: function(res){
       		MyYearsSeagrass=res;
     	},
     	error: function(){
       		alert("UpdateYear Seagrass Did not work!");
     	}
   	});
}


function UpdateDataSeagrass(){
    $.ajax({
     	type: 'POST',
     	url: 'http://10.34.34.12/cgi-bin/SeagrassData.pl',
   		async: false,
     	data: {
       		"loc_id": ManLocIdSeagrass, 
       		"year": MyYearsSeagrass[IndexSeagrass]
     	},
     	success: function(res){
       		myDataSeagrass=res;
  		    if(MyYearsSeagrass[0] == -9999){
  		        document.getElementById("mybuttonsSeagrass").innerHTML = "" ;
  		        document.getElementById("SurveyDateSeagrass").innerHTML = "None on Record.";
              document.getElementById("seagrass-data").innerHTML = '<center><img src="files/err/no_data.png" width="100%" style="margin-top: 15px;"></center>'; 
  		    }
	       	if(MyYearsSeagrass[0] != -9999){
				    showSeagrass();
	       	}
     	},
     	error: function(){
       		alert("UpdateData Seagrass Did not work!");
     	}
  	});
}


function showSeagrass(){
  document.getElementById("SurveyDateSeagrass").innerHTML= MyYearsSeagrass[IndexSeagrass];
  var chart = AmCharts.makeChart( "seagrass-data", {
    "type": "serial",
    "theme": "light",
    "dataProvider" : myDataSeagrass,
        // "titles": [{
        //     "text": "Seagrass"
        // }, {
        //     "text": MyYearsSeagrass[IndexSeagrass],
        //     "bold": false
        // }],
    "valueAxes": [ {
      "gridColor": "#FFFFFF",
      "gridAlpha": 0.2,
      "dashLength": 0
    }],
    "gridAboveGraphs": true,
    "startDuration": 1,
    "graphs": [{
      "balloonText": "[[category]]: <b>[[value]]</b> shoots per m2",
      "fillAlphas": 0.8,
      "fillColorsField": "color",
      "lineAlpha": 0.2,
      "type": "column",
      "valueField": "count"
    }],
    "chartCursor": {
      "categoryBalloonEnabled": false,
      "cursorAlpha": 0,
      "zoomable": false
    },
    "allLabels": [
        // Initialize X and Y axis labels
      {"x": 2, "y": 300, "text": "shoots per m2", "align": "left", "size": 14, "color": "#000000", "rotation": 270, "bold": true}
    ],
    "categoryField": "species",
    "categoryAxis": {
      "gridPosition": "start",
      "labelRotation": 45
    },
    "export": {
        // Export options
      "enabled": true,
      "fileName": "seagrass_density" + MyYearsSeagrass[IndexSeagrass].toString(),
      "beforeCapture": function(menuConfig) {
        var url = "LOGO.png"; 
        var setup = this.setup;
        var timer = setInterval(function() {
          if (setup.fabric) {
            var canvas = setup.fabric;
            clearTimeout(timer);
            canvas.setOverlayImage(url, canvas.renderAll.bind(canvas), {
              scaleX: 0.6,
              scaleY: 0.6,
              originX: 'left',
              originY: 'top'
            });
          }
        }, 100);
      }
    },  
  });
  return;
}

//Deep Coral Functions
function DecDeepCoral(){
  --IndexDeepCoral;
  if(IndexDeepCoral < 0){
    IndexDeepCoral = MyYearsDeepCoral.length - 1;
  }
  UpdateDataDeepCoral();
}

function IncDeepCoral(){
  ++IndexDeepCoral;
  if(IndexDeepCoral > (MyYearsDeepCoral.length-1)){
    IndexDeepCoral = 0
  }
  UpdateDataDeepCoral();
}

function UpdateYearDeepCoral(){
  $.ajax({
    type: 'POST',
    url: 'http://10.34.34.12/cgi-bin/DeepCoralYear.pl',
    async: false,
    data: {
      "loc_id": 	ManLocIdDeepCoral 
    },
    success: function(res){
      MyYearsDeepCoral=res;
    },
    error: function(){
      alert("UpdateYear DeepCoral Did not work!");
    }
  });
}


function UpdateDataDeepCoral(){
  $.ajax({
    type: 'POST',
    url: 'http://10.34.34.12/cgi-bin/DeepCoralData.pl',
   	async: false,
    data: {
      "loc_id": ManLocIdDeepCoral, 
      "year": MyYearsDeepCoral[IndexDeepCoral]
    },
    success: function(res){
      myDataDeepCoral=res;
      if(MyYearsDeepCoral[0] == -9999){
        document.getElementById("mybuttonsDeepCoral").innerHTML = "" ;
        document.getElementById("SurveyDateDeepCoral").innerHTML = "None on Record.";
        document.getElementById("deep-data").innerHTML = '<center><img src="files/err/no_data.png" width="100%" style="margin-top: 15px;"></center>'; 
	    }
      if(MyYearsDeepCoral[0] != -9999){
			  showDeepCoral();
      }
    },
    error: function(){
      alert("UpdateData DeepCoral Did not work!");
    }
  });
}


function showDeepCoral(){
  document.getElementById("SurveyDateDeepCoral").innerHTML= MyYearsDeepCoral[IndexDeepCoral];
	var chart = AmCharts.makeChart("deep-data", {
    "type": "pie",
    "theme": "light",
    "innerRadius"   : 80,
    "pullOutRadius" : 20,
    "marginTop"     : 30,
    // "titles": [{
    //     "text": "Substrate Composition",
    //     "size": 15
    // }],
    //"gradientRatio": [-0.4, -0.4, -0.4, -0.4, -0.4, -0.4, 0, 0.1, 0.2, 0.1, 0, -0.2, -0.5],
    "dataProvider": myDataDeepCoral,
    "balloonText": "Count: [[value]]",
    "valueField": "Count",
    "titleField": "Type",
    "balloon": {
      "drop": true,
      "adjustBorderColor": false,
      "color": "#FFFFFF",
      "fontSize": 16
    },
    "export": {
      "enabled": true,
      "fileName": "deep_coral" + MyYearsDeepCoral[IndexDeepCoral].toString(),
      "beforeCapture": function(menuConfig) {
        var url = "LOGO.png"; 
        var setup = this.setup;
        var timer = setInterval(function() {
          if (setup.fabric) {
            var canvas = setup.fabric;
            clearTimeout(timer);
            canvas.setOverlayImage(url, canvas.renderAll.bind(canvas), {
              scaleX: 0.6,
              scaleY: 0.6,
              originX: 'left',
              originY: 'top'
            });
          }
        }, 100);
      }
    }
	});
  return;
}





