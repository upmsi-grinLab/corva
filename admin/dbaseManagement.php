<html>
<head>
	<title>Database Management | Admin Panel</title>
	<link href="css/default.css" rel="stylesheet">
	<link rel="stylesheet" href="css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
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
					<!-- Dropdown for NIPAS sites -->
					<?Php 
						if(isset($_POST['nipasSite']) && !empty($_POST['nipasSite'])){
							$nipasID = $_POST['nipasSite'];
						}
					?>
					<form method="POST" action="" style="padding-left:22px;">
						<div class="form-row">
							<label for="nipasDropdown" class='col-form-label'><strong>NIPAS Site:</strong></label>
							<div class='col-lg-3 col-md-3'>
								<select class='form-control form-control-sm' id='nipasDropdown' name='nipasDropdown'><option value=''>Select NIPAS Site</option>
									<?Php
									require_once('includes/connect.php');
									$sql = 'SELECT * FROM nipas';
									foreach($dbo->query($sql) as $row){
										echo "<option value=$row[loc_id]>$row[nipas_name]</option>"; 
									}
									?>
								</select>
							</div>
							<div class='col'><button class="btn btn-info btn-sm" type="submit">FILTER</button></div>
						</div>
					</form>
					<hr>
					<div class="row">
						<div class='col-md-10 col-lg-10' style="padding-left:35px;">
							<?Php 
								if(isset($_POST['nipasDropdown']) && !empty($_POST['nipasDropdown'])){
									$locID = $_POST['nipasDropdown'];
									$_SESSION['nipasID'] = $locID;
									require_once('includes/connect.php');
									
									$sql = "SELECT * FROM nipas WHERE loc_id = '$locID'";
									foreach ($dbo->query($sql) as $row) {
										echo '<h2>'.$row['nipas_name'].'</h2><br>';
									}
								}
							?>
							<ul class="nav nav-pills" id="pills-tab" role="tablist" style="font-size: 0.85rem">
								<li class="nav-item">
									<a class="nav-link active" id="pills-nipas-tab" data-toggle="pill" href="#pills-nipas" role="tab">NIPAS Info</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" id="pills-arras-tab" data-toggle="pill" href="#pills-arras" role="tab">ARRAS</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" id="pills-shallow-tab" data-toggle="pill" href="#pills-shallow" role="tab">Shallow Reef</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" id="pills-deep-tab" data-toggle="pill" href="#pills-deep" role="tab">Deep Reef</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" id="pills-coastal-tab" data-toggle="pill" href="#pills-coastal" role="tab" >Coastal Stability</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" id="pills-seagrass-tab" data-toggle="pill" href="#pills-seagrass" role="tab" >Seagrass</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" id="pills-connectivity-tab" data-toggle="pill" href="#pills-connectivity" role="tab" >Connectivity</a>
								</li>     
							</ul>
							<div class="tab-content" id="pills-tabContent">
								<div class="tab-pane active" id="pills-nipas" role="tabpanel"><?Php include('dbaseNipasInfo.php'); ?></div>
								<div class="tab-pane" id="pills-arras" role="tabpanel"><?Php include('dbaseArras.php');	 ?></div>
								<div class="tab-pane" id="pills-shallow" role="tabpanel"><?Php include('dbaseShallow.php');	 ?></div>
								<div class="tab-pane" id="pills-deep" role="tabpanel"><?Php include('dbaseDeep.php');	 ?></div>
								<div class="tab-pane" id="pills-coastal" role="tabpanel"><?Php include('dbaseCoastalStability.php'); ?></div>
								<div class="tab-pane" id="pills-seagrass" role="tabpanel"><?Php include('dbaseSeagrass.php'); ?></div>
								<div class="tab-pane" id="pills-connectivity" role="tabpanel"><?Php include('dbaseConnectivity.php'); ?></div>
						</div>	
					</div>
			    </div>
			</main>
		</div>
	</div>
	
</body>	
</html>