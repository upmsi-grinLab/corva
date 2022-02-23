<!-- 
      // PHP file implementing Leaflet JS map
 -->
<div id="map" style="width: 100% !important; min-height: 800px;" onload="loadNipasList();">
  
  <!-- Sidebar class, initally closed -->
  <div id="sidebar" class="sidebar collapsed" >
        
    <!-- Nav tabs -->
    <div class="sidebar-tabs" style='line-height: 1.1em'>
        <ul role="tablist">
            <!-- Icons from FontAwesome  -->
            <li><a href="#home" class="home-tab" role="tab"><i class="fa fa-home fa-2x"></i></a></li>
            <li><a href="#projects" class="projects-tab" role="tab"><i class="fa fa-info-circle fa-2x"></i></a></li>
            <li><a href="#database" class="database-tab" role="tab"><i class="fa fa-list-ul fa-2x"></i></a></li>
            <li><a href="#nipas-details" class="nipas-tab" role="tab"><i class="fa fa-map-marker fa-2x"></i></a></li>
        </ul>
    </div> <!-- /End nav tabs -->

    <!-- Sidebar Content -->
    <div class="sidebar-content">
        <!-- 
              // ABOUT component
              // Shows a brief description on the CoRVA Program 
        -->
        <div class="sidebar-pane" id="home">
          <!-- Header for ABOUT component -->
          <h1 class="sidebar-header" style="background-color: rgba(0,88,94,0.60);">ABOUT
            <span class="sidebar-close"><i class="fa fa-caret-left"></i></span>
          </h1>

          <div class='container-fluid' style="font-size: 1.4em;">

            <div class='row'>
              <div class="col-lg-12 col-md-12">
           <!--<center><img src='images/header-infographics.png' style="width: 70%;"></center> <!-- Infographics image> --> 
           <h3 style='color: #3289C7;'>Protecting Philippine Coral Reefs, Mangrove Forests, and Seagrass Beds</h3>
              </div>
              <div class="col-lg-1 col-md-1"></div><!-- Empty -->
            </div>

            <div class='row'>
              <div class="col-lg-12 col-md-12">
                <p>Coral reefs are one of the most diverse ecosystems on earth. Our reefs, together with our mangrove forests and seagrass beds, have been sustaining most, if not all Filipinos for food security, livelihoods, and overall wellbeing. These ecosystems are home to valuable flora and fauna that we utilize in countless ways. Coral reefs are vital to fisheries, with about half of the population of the Philippines being dependent on reefs for food and income from fishing. Marine organisms are also sources of medicines and are still being explored for future medical advances. These ecosystems also provide recreational and tourism opportunities that can generate significant revenue, and can actually be additional or even alternative sources of income to coastal communities. Coral reefs build themselves to withstand typhoons and tropical storms, and together with seagrass beds and mangrove forests, can further buffer our coastline against erosion, strong currents, high waves, typhoons, storm surges, and other extreme weather events.</p>
              </div>
              <div class="col-lg-1 col-md-1"></div> <!-- Empty -->
            </div>

            <div class='row'>
              <div class="col-lg-12 col-md-12">
              <!--   <center><img src='images/header-infographics.jpg' style="width: 95%;"></center> --> <!-- Another infographics -->


              <div id="corva" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#corva" data-slide-to="0" class="active"></li>
    <li data-target="#corva" data-slide-to="1"></li>
    <li data-target="#corva" data-slide-to="2"></li>
    <li data-target="#corva" data-slide-to="3"></li>

  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <center> <img src ="images/1logo.png"  style="width: 95%; alt="First slide"></center>
    </div>
    <div class="carousel-item">
      <center><img src ="images/2logo.png"  style="width: 95%; alt="Second slide"></center>
    </div>
    <div class="carousel-item">
      <center><img src ="images/3logo.png"  style="width: 95%; alt="Third slide"></center>
    </div>
      <div class="carousel-item">
      <center><img src ="images/4logo.png"  style="width: 95%; alt="Third slide"></center>
    </div>
      <div class="carousel-item">
      <center><img src ="images/5logo.png"  style="width: 95%; alt="Third slide"></center>
    </div>
      <div class="carousel-item">
      <center><img src ="images/6logo.png"  style="width: 95%; alt="Third slide"></center>
    </div>
      <div class="carousel-item">
      <center><img src ="images/7logo.png"  style="width: 95%; alt="Third slide"></center>
    </div>
      <div class="carousel-item">
      <center><img src ="images/8logo.png"  style="width: 95%; alt="Third slide"></center>
    </div>
      <div class="carousel-item">
      <center><img src ="images/9logo.png"  style="width: 95%; alt="Third slide"></center>
    </div>
      <div class="carousel-item">
      <center><img src ="images/10logo.png"  style="width: 95%; alt="Third slide"></center>
    </div>
      <div class="carousel-item">
      <center><img src ="images/11logo.png"  style="width: 95%; alt="Third slide"></center>
    </div>
  </div>
  <a class="carousel-control-prev" href="#corva" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#corva" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
              </div>
              <div class="col-lg-1 col-md-1"></div><!-- Empty -->
            </div>

            <br/>

            <!-- CoRVA program objectives -->
           <div class='row'>
              <div class="col-lg-12 col-md-12">
                <p>In spite of their importance and contributions to Filipinos, our marine ecosystems have been constantly taken for granted. Destructive fishing practices, unregulated coastal development, pollution, rapid population growth, and other factors, such as the impacts of climate change, have led to the continuous decline of the health of these ecosystems.</p>
              </div>
            </div>
    <div class='row'>
        <div class="col-lg-12 col-md-12">
        <p><p><h3>What is the <a href="files/nipas_act/RA-7586-NIPAS-Act.pdf" target="_blank">NIPAS Act?</a></h3></p>
        Philippine reefs and associated habitats are biodiversity hotspots because the numerous unique species inhabiting these ecosystems are highly threatened with extinction. With this, the National Integrated Protected Areas System (NIPAS) Act of 1992 (Republic Act No. 7586) was made to provide the laws for establishing and managing protected areas in the country. The NIPAS Act is one of the Philippines’ legislative milestones towards biodiversity conservation and sustainable development.
      </div>
    </div>
 
<div class='row'>
        <div class="col-lg-12 col-md-12">
        <p><h3>Why the need for assessment?</h3></p>
      To maximize the impact of protecting our coral reefs and other marine habitats, we must first know what we need to protect. We need to know the baseline information of all resources: Where are they located? How healthy are they? What else lives here?  After establishing baselines, we constantly need to monitor what changes are happening in our marine ecosystems and evaluate if management is effective.
      
      <br><p>The first nationwide coral mapping was done in the late 1970s. Since then, many Philippine institutions have engaged in different efforts to try to protect existing reefs, rehabilitate degraded ones, and study the different ecosystems functions that can be derived from them.</p>
    </div>
  </div>
 <div class='row'>
        <div class="col-lg-12 col-md-12">
        <p><h3>Assessing our NIPAS site</h3></p>
        In order to effectively manage our NIPAS areas, we need to conduct a nationwide assessment to update 1970s survey and assess the state of the reefs in terms of extent, health, biodiversity and connectivity. For this, we came up with a consensus on the systematic monitoring of reefs using easily accessible <a href="#" onClick="viewMethodDescription('arras-link')"> tools and methods</a>.</p>
 
        Aside from databasing all assessment results, this map-based NIPAS website aims to introduce and showcase to Filipinos our NIPAS sites, and hopefully influence them to respect and protect these critically-important areas.
 
 
       <br><br><p style="font-size: 1.1em; font-size: 14px"><i>The Coral Reef Visualization and Assessment (CoRVA) Program was part of the CMEMP Program that initiated the nationwide assessment of all the marine NIPAS Sites by standardizing assessment and monitoring protocols, integrating survey results, capacitating DENR-BMB and regional personnel and higher education institutions (HEIs) with the standardized protocols, and developing a database and website as repository of all NIPAS assessment results.</i></p></br></br></p>
                <!-- <p>This program seeks to conduct the first nationwide coral mapping since the late 70’s and assess the state of the reefs in terms of extent, health, biodiversity and connectivity.</p>
                <p><h3>Objectives:</h3></p>
                <ol>
                  <li>To build a consensus among existing researchers on the systematic monitoring of reefs using easily accessible tools.</li>
                  <li>To map and assess the current state of the reefs (including deep water ones), and other associated benthic habitat</li>
                  <li>To map and evaluate the associated demersal fish in these sites as it relates to biodiversity and potential fisheries</li>
                  <li>To map the current state of the associated shoreline and bathymetry in front of the shoreline up to a depth of 200m</li>
                  <li>To develop a high resolution currents and connectivity model for the Philippine coastal ocean.</li>
                  <li>To use these data to make initial inferences on the vulnerability and resilience of these coral sites</li>
                  <li>To capacitate government institutions nation-wide (DENR-BMB; HEIs; LGUs) to engage in long-term coral monitoring project.</li>
                </ol> -->
              </div>
              <div class="col-lg-1 col-md-1"></div> <!-- Empty -->
            </div>

            <br/>

            <div class='row'>
            <!--   <p><h3>Project Components:</h3></p> -->
              <div class="col-lg-11 col-md-11">
               <!--  <center><img src='images/CoRVA-Diagram.png' style="width: 95%;"></center> <!-- Diagram on different CoRVA components --> 
              </div>
              <div class="col-lg-1 col-md-1"></div> <!-- Empty -->
            </div>

          </div> <!-- /End container -->
        </div> <!-- /End sidebar pane -->

        <!-- 
              // PROJECT COMPONENTS component
              // Detailed information on the different projects under the CoRVA Program
              // Each program separated  
        -->
        <div class="sidebar-pane" id="projects">
            <!-- Header for PROJECT COMPONENTS -->
            <h1 class="sidebar-header" style="background-color: #5388CD;">MONITORING THE NIPAS SITES
                <span class="sidebar-close"><i class="fa fa-caret-left"></i></span>
            </h1>

            <!-- External link to the PHP file -->
            <?Php include('projectComponents.php'); ?>
        </div> <!-- /End sidebar pane -->

        <!-- 
              // DATABASE component
              // Contains a list of NIPAS sites under the CoRVA program
              // Each item is clickable 
        -->
        <div class="sidebar-pane" id="database">
            <!-- Header for DATABASE component -->
            <h1 class="sidebar-header" style="background-color: #00B26A;">LIST OF NIPAS SITES
              <span class="sidebar-close"><i class="fa fa-caret-left"></i></span>
            </h1>
            <br/>

            <!-- 
                  // Dropdown menu for Regions
                  // Filter the NIPAS list by region 
            -->
            <div class="form-row">
              <label for="regionDropdown" class='col-form-label'><strong>Region:</strong></label>
              <div class='col-lg-3 col-md-3'>
                <select class='form-control form-control-sm' id='regionDropdown'><option value=''>Select Region</option>
                  <?Php
                    /* Fetch regions from the database */
                    require('./inc/connect.php');
                    $regionQuery = "SELECT * FROM region";  /* SQL Query */

                    /* Add each region on a dropdown list */
                    foreach($dbo->query($regionQuery) as $regionResults){
                      /* 
                       * Label: Region Name
                       * VAlue: Region ID
                       */
                      echo '<option value='.$regionResults['region_id'].'>'.$regionResults['region'].'</option>'; 
                    }
                  ?>
                </select> <!-- /End SELECT tag -->
              </div>
              <div class='col'><button class="btn btn-info btn-sm" onclick="filter()">FILTER</button></div> <!-- Filter button -->
            </div> <!-- /End form row -->

            <br/>

            <!-- 
                // List of NIPAS Sites 
                // Bootstrap list group
            -->
            <h3>NIPAS SITES</h3>
            <div class='container-fluid'>
              <div class='row'>
                <div class="col-lg-10 col-md-10"> 
                  <div class='list-group'  style='font-size: 1.2em;' id='list-nipasSites'>
                    <?Php
                      /* Fetch data from an external JSON file */
                      $nipasJsonFile = file_get_contents("nipas-results.json");
                      $nipasJson = json_decode($nipasJsonFile, true);

                      /* 
                       *  Add each result on a list group 
                       *  Each item, clickable, invoking 'viewnipasInfo' function from script.js
                       */

                      foreach ($nipasJson as $key => $nipas) {
                        echo '<a href="#" onClick=\'viewnipasInfo('.$key.')\' class=\'list-group-item list-group-item-action\'>'.$nipas['nipas_name'].'</a>';
                      }
                    ?>
                  </div> <!--  /End list group -->
                </div>
              </div> <!-- /End row -->
              <br/>

              <div class='row'>
                <div class="col-lg-10 col-md-10">
                  <!-- Displays total area of NIPAS sites in hectares -->
                  <div class="alert alert-info" role="alert" id='nipas-totalArea'>
                    <strong style='font-size: 1.2em;'>Total Area:</strong> 3,091,298.77 HECTARES.
                  </div>

                </div>
              </div>
            </div> <!-- /End row -->
            
        </div> <!-- /End sidebar pane -->

        <!-- 
                // NIPAS DETAILS 
        -->
        <div class="sidebar-pane" id="nipas-details">
            <!-- Header for NIPAS DETAILS -->
            <h1 class="sidebar-header" style="background-color: #9A9738;">SITE DETAILS
              <span class="sidebar-close"><i class="fa fa-caret-left"></i></span>
            </h1>

            <br>
            <div class='container-fluid'>
              <div class='row'>
                <div class="col-lg-12 col-md-12">
                  <div class='fontSize-large' id='nipas-content'>
                    <!-- 
                          // Default content 
                          // Content dynamically changed by script.js function viewnipasInfo()
                    -->
                    <br/><strong>Note:</strong>
                    <p>This area displays data from each NIPAS site when markers are clicked.</p>
                  </div>
                </div>
              
                <div class="col-lg-12 col-md-12"> 
                  <ul class='nav nav-tabs nav-tabs-responsive'>
                    <!-- Nav tabs container -->
                    <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#nipas-data" aria-controls="nipas-data">NIPAS DATA</a></li>
                  </ul>
                  <br>
                  <div id="nipas-tab" class="tab-content" style="display: none;">
                    <!-- Empty container by default -->
                    <div id='nipas-data' class="tab-pane active"></div>
                  </div>
                </div> 

              </div>  <!-- /End Row -->
            </div>    <!-- /End container -->
        </div>        <!-- /End sidebar pane -->

    </div>            <!-- /End sidebar content -->
  </div>              <!-- /End sidebar -->
</div>                <!-- /End NIPAS map -->

<!-- JavaScript Files for Leaflet JS map -->
<script src='https://api.mapbox.com/mapbox.js/plugins/leaflet-omnivore/v0.2.0/leaflet-omnivore.min.js'></script>
<script type='text/javascript' src='js/leaf-demo2.js'></script>