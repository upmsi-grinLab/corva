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
			    <div class='container col-md-3 col-lg-3' style="padding-top: 8%;">
					<form class="form-signin" method='POST' action='validateLogin.php' style='border: 1px solid #ccc; padding: 50px 20px 35px 20px;'>
						<h4 class="form-signin-heading">PLEASE SIGN IN</h4><hr/>
						<label for="inputUsername" class="sr-only">Username</label>
							<input type="text" id="inputUsername" class="form-control" name="username" placeholder="Username" required autofocus style="margin-bottom: 10px">
						<label for="inputPassword" class="sr-only">Password</label>
							<input type="password" id="inputPassword" class="form-control" name="password" placeholder="Password" required>
							<br>
						<center><button class="btn btn-info" type="submit">Sign in</button></center>
					</form>
			    </div>
			</main>
		</div>
	</div>
	
</body>	
</html>