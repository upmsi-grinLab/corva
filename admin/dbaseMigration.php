<?Php
// This is a PHP file for editing entries
// within the CoRVA database. Superuser ONLY!
//
// Author: John Christopher E. Azcarraga
// Date: January 2017
?>

<html>
<head>
	<title>Database Migration | Admin Panel</title>
	
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/default.css" rel="stylesheet">
	<link rel='shortcut icon' href='img/db-icon.png'>
</head>
<body>

	<script language="JavaScript" type='text/javascript' src='js/jquery.min.js'></script>
    <script language="JavaScript" type='text/javascript' src='js/default.js'></script>
    <script language="JavaScript" type='text/javascript' src='js/bootstrap.min.js'></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>


	<?php 
		header("Cache-Control: no-cache, must-revalidate");

		include('includes/connect.php'); 
		include('functions.php');
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
			    <br>
			    <div class='container-fluid' style="padding: 0px;">
					<h2 style="padding-left: 22px;"> Data Upload </h2>
					<p class='col-lg-7 col-md-7 medium-font' style="margin-left: 10px;">This module is for data upload to the CoRVA database. XLSX template files can be downloaded here. </p>
					<p class='col-lg-7 col-md-7 medium-font' style="margin-left: 10px;"><i>Save individual sheet into separate <strong>CSV</strong> files before upload</i>. Upload CSV files one by one.</p>
					<hr style="margin-left: 22px; width:90%;">
					<br>
					<label style="padding-left: 40px;" for="nipasSites">NIPAS Sites Lookup</label>
					<a href="files/download/NIPAS Sites Look-Up.xlsx" download name="nipasSites"><img src="img/excel-icon.png" width="2%"></a>

					<label style="padding-left: 40px;" for="coral_deep">Deep Coral</label>
					<a href="files/download/coral_deep.xlsx" download name="coral_deep"><img src="img/excel-icon.png" width="2%"></a>
					
					<label style="padding-left: 40px;" for="coral_shallow">Shallow Coral</label>
					<a href="files/download/coral_shallow.xlsx" download name="coral_shallow"><img src="img/excel-icon.png" width="2%"></a>
					
					<label style="padding-left: 40px;" for="fish_sp">Fish Species Count</label>
					<a href="files/download/fish_sp.xlsx" download name="fish_sp"><img src="img/excel-icon.png" width="2%"></a>

					<label style="padding-left: 40px;" for="fish_den">Fish Mean Abundance</label>
					<a href="files/download/fish_den.xlsx" download name="fish_den"><img src="img/excel-icon.png" width="2%"></a>

					<label style="padding-left: 40px;" for="fish_bio">Fish Mean Biomass</label>
					<a href="files/download/fish_bio.xlsx" download name="fish_bio"><img src="img/excel-icon.png" width="2%"></a>

					<label style="padding-left: 40px;" for="mangrove">Mangrove</label>
					<a href="files/download/mangrove.xlsx" download name="mangrove_data"><img src="img/excel-icon.png" width="2%"></a>

					<label style="padding-left: 40px;" for="seagrass">Seagrass Density</label>
					<a href="files/download/seagrass_density.xlsx" download name="seagrass_density"><img src="img/excel-icon.png" width="2%"></a>

					<label style="padding-left: 40px;" for="seagrass">Seagrass Cover</label>
					<a href="files/download/seagrass_cover.xlsx" download name="seagrass_cover"><img src="img/excel-icon.png" width="2%"></a>

					<br><hr style="margin-left: 22px; width:90%;"><br>

					<div style="padding-left: 22px;"> <?Php include("uploadParseCSV.php"); ?> </div>
			    </div>
			</main>
		</div>
	</div>
	
</body>	
</html>