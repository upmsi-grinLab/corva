<html>
<head>
	<title>Profile | Admin Panel</title>
	<link href="css/default.css" rel="stylesheet">
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link rel='shortcut icon' href='img/db-icon.png'>
</head>
<body>

	<script language="JavaScript" type='text/javascript' src='js/jquery.min.js'></script>
    <script language="JavaScript" type='text/javascript' src='js/default.js'></script>
    <script language="JavaScript" type='text/javascript' src='js/bootstrap.min.js'></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>

	<?Php
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
					<h2 style="padding-left: 22px;"> User Profile </h2>
					<hr style="margin-left: 22px; width:90%;">
					<form class='col-lg-8 col-md-8' method='POST' action='updateUserCredentials.php' style="padding-left: 22px;">
					  <div class="form-group row">
					    <label for="staticUsername" class="col-sm-2 col-form-label">Username: </label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control" name="username" id="username" value="<?=$_SESSION["username"];?>">
					    </div>
					  </div>
					  <div class="form-group row">
					    <label for="inputFirstname" class="col-sm-2 col-form-label">First Name: </label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control" name="firstName" id="firstName" value="<?=$_SESSION["fname"];?>">
					    </div>
					  </div>
					  <div class="form-group row">
					    <label for="inputLastname" class="col-sm-2 col-form-label">Last Name: </label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control" name="lastName" id="lastName" value="<?=$_SESSION["lname"];?>">
					    </div>
					  </div>
					  <div class="form-group row">
					    <label for="inputEmail" class="col-sm-2 col-form-label">Email Address: </label>
					    <div class="col-sm-6">
					      <input type="email" class="form-control" name="emailAddress" id="emailAddress" value="<?=$_SESSION["email"];?>">
					    </div>
					  </div>
					  <?Php 
					  	echo '<button type="submit" class="btn btn-info"';
					  		if(!isSuperUser()){ echo 'disabled'; }
					  	echo '>Update</button>'; 
					  ?>
					</form>
			    </div>
			</main>
		</div>
	</div>
	
</body>	
</html>