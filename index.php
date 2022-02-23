<!-- 
    // Main PHP File
    // Contains external links to JS, CSS and PHP files
-->
<!DOCTYPE HTML>
<html lang='en'>
  <head>
    <!-- Webpage title  -->
    <title>CoRVA | HOME</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel='shortcut icon' href='images/db-icon.png'> <!-- Favicon -->

    <!-- Stylesheets -->
    <link rel="stylesheet" href="css/leaflet.css">
    <link rel="stylesheet" href="css/pruneClusterStyle.css"/>
    <link rel="stylesheet" href="css/L.Control.Sidebar2.css"/>
    <link rel="stylesheet" href="css/export.css" media="all" />
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1" crossorigin="anonymous">
    <link rel="stylesheet" href="css/control.layers.minimap.css" />
    <link rel="stylesheet" href="css/introjs.css"> <!-- IntroJS css -->
    <link rel="stylesheet" href="css/introjs-flattener.css"> <!-- IntroJS css theme-->
    <link rel="stylesheet" href="css/style.css"/>


    <!-- External JS files for AmCharts -->
    <script type='text/javascript' src='js/amCharts/amcharts.js'></script>
    <script type='text/javascript' src='js/amCharts/serial.js'></script>
    <script src="https://www.amcharts.com/lib/3/plugins/export/export.min.js"></script>
    <script type='text/javascript' src='js/amCharts/light.js'></script>
    <script type='text/javascript' src='js/amCharts/radar.js'></script>
    <script type='text/javascript' src='js/amCharts/xy.js'></script>
    
    <!-- JS Files for AmCharts Pie Chart -->
    <script src="https://www.amcharts.com/lib/3/pie.js"></script>
    <script src="https://www.amcharts.com/lib/3/plugins/animate/animate.min.js"></script>

    <!-- Other JS files i.e. JQuery, Leaflet JS  -->
    <script type='text/javascript' src='js/jquery.min.js'></script>
    <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
    <script type='text/javascript' src='js/PruneCluster.js'></script>
    <script type='text/javascript' src='js/L.Control.Sidebar2.js'></script>
    <script type='text/javascript' src='js/L.Control.Layers.Minimap.js'></script>
    <script type='text/JavaScript' src='js/togeojson.js'></script>
    <script type='text/javascript' src='js/script.js'></script>
    <script type='text/javascript' src='js/intro.js'></script>
    <script type='text/javascript' src='js/HowToUse.js'></script>

  </head>
<body>

  <?Php 

    require('getNipasData.php');                /* Create JSON files for the map */
    include('title-bar.php');                   /* Title bar */
   
    // include('inc/connect.php');                 /* DBO configuration for MySQL database */
    // include('inc/class.visitorTracking.php');   /* External PHP file for visitor tracking */
    
    // Instance of the visitor tracking class
    // $visitors = new visitorTracking();
  
  ?> <!-- /End nav -->

  <!-- Map Container -->

  <?Php include('nipas-map.php'); ?>

  <!-- /End map container -->

  <!-- Footer -->
  <?Php include('footer.php'); ?>
  <!-- /End footer -->
  
  <!-- Other JS files i.e. Pooper, Tether and Bootstrap -->
  <scrip src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js"></scrip>
  <script type="text/javascript" src="js/tether.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>

</body> <!-- /End Body -->
</html> <!-- /End HTML -->

