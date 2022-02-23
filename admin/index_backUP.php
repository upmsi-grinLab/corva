<html>
<head>
	<title>Admin Panel</title>
	<?Php echo "<link href=\"css/default.css\" rel=\"stylesheet\">"; ?>
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

	<?php 
		header("Cache-Control: no-cache, must-revalidate");

		include('functions.php');

		// Make a JSON file of all visitors grouped 
		// according to month of visit
		visitorDataToJSON();	
	?>
	<div class='container'>
		<div class='left-panel'>
			<div class='wrapper'>
				<div class='corvaLogo bg-whiteTrans_v2'><img src='img/corvaLogo.png'></div>
			</div>
			<div class='stick-bottom small-font'><span class='bg-whiteTrans white-font charSpace-small'>&copy; <?Php  echo date("Y"); ?>&nbsp;| Marine Science Institute</span></div>
		</div>
		<div class='right-panel'>
			<div class='right-panel header'>
				<?Php include('titleBar.php'); ?>
			</div>
			<div class='right-panel content'>
				<div class='content-container float-left shadow'>
					<div class='content-info' style='padding: 0 10px 0 10px'>
						<!-- total number of visits on the website -->
						<span style="color: #D9853B;font-size: 50px;"><center><?Php echo(getNumberOfVisits()); ?></center></span><br/>
						<span>total site visits</span>
					</div>
				</div>
				<div class='content-container float-left shadow'>
					<div class='content-info'>
						<div id='visitorsDateChart'></div>
					</div>
				</div>
			</div>
			<div class='right-panel footer'>
				<!-- <span class='float-left' style="padding-top:10px;">&copy; <?Php  echo date("Y"); ?> CoRVA | Marine Science Institute</span> -->
			</div>
		</div>
	</div>
</body>	
</html>