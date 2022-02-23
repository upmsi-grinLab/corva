<html>
<head>
	<title>CoRVA | Admin Panel</title>
	<link href="css/default.css" rel="stylesheet">
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link rel='shortcut icon' href='img/db-icon.png'>
</head>
<body>

    <!-- AM Charts -->
    <link rel="stylesheet" href="https://www.amcharts.com/lib/3/plugins/export/export.css" type="text/css" media="all" />
   	<script src="https://www.amcharts.com/lib/3/amcharts.js"></script>
	<script src="https://www.amcharts.com/lib/3/serial.js"></script>
	<script src="https://www.amcharts.com/lib/3/plugins/export/export.min.js"></script>
	<script src="https://www.amcharts.com/lib/3/themes/light.js"></script>
																
	<script language="JavaScript" type='text/javascript' src='js/jquery.min.js'></script>
    <script language="JavaScript" type='text/javascript' src='js/script.js'></script>
    <script language="JavaScript" type='text/javascript' src='js/bootstrap.min.js'></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>

	<?php 
		header("Cache-Control: no-cache, must-revalidate");

		include('functions.php');

		// Make a JSON file of all visitors grouped 
		// according to month of visit
		visitorDataToJSON();	
	?>
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-1 col-md-1 left-panel">
				<div class='corvaLogo'><img src='img/corvaLogo.png' width="100%"></div>
				<div style='bottom: 10px; position: absolute; text-align: center;' class='white-font small-font'>
					Marine Science Institute <br/> &copy; <?Php  echo date("Y"); ?>
				</div>
			</div>
			<main class="col-lg-11 col-md-11" style="padding: 0px;">
			  	<nav class="navbar navbar-expand-lg navbar-light bg-light">
			  		<div class="collapse navbar-collapse">
			    		<?Php include('titleBar.php'); ?>
			  		</div>
			    </nav>
			    <br/>
			    <div class='container-fluid' style="padding: 0px;">
			    	<h1 style="padding-left: 22px;">Dashboard</h1>
					<div class="jumbotron jumbotron-fluid">
					  <div class="container text-center">
					    <h1 class="display-1"><?Php echo(getNumberOfVisits()); ?></h1>
					    <p class="lead">total site visits.</p>
					  </div>
					</div>
					<h2 style="padding-left: 22px;">Visitors</h2>
					<hr style="margin-left: 22px; width:90%;">
					
					<div id='visitorsDateChart' style="width: 90%; height: 500px;"></div>
			    </div>
			</main>
		</div>
	</div>
	
</body>	
</html>