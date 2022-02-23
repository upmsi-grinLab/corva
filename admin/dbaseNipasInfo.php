<!-- N I P A S  I N F O R M A T I O N -->
<!--       Default: Shown             -->
<!--<link rel="stylesheet" href="css/bootstrap.min.css">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
 -->
<div>
	<?Php
		if(isset($locID) && !empty($locID)){
			require_once('includes/connect.php');
			$sql = "SELECT * FROM nipas INNER JOIN region ON nipas.region_id=region.region_id INNER JOIN province ON nipas.province_id=province.province_id WHERE loc_id='$locID'";
			foreach ($dbo->query($sql) as $row) { 
	?>
	<br>
	<h4>NIPAS Information</h4><br/>
	<form class='col-lg-8 col-md-8'>
		<div class="form-group row">
			<label for="nipasRegion" class="col-sm-4 col-form-label">Region: </label>
			<div class="col-sm-6">
			  <input type="text" class="form-control" id="nipasRegion" value="<?=$row['region'];?>">
			</div>
		</div>		
		<div class="form-group row">
			<label for="nipasProvince" class="col-sm-4 col-form-label">Province: </label>
			<div class="col-sm-6">
			  <input type="text" class="form-control" id="nipasProvince" value="<?=$row['province_name'];?>">
			</div>
		</div>	
		<div class="form-group row">
			<label for="nipasMunicipality" class="col-sm-4 col-form-label">Municipality: </label>
			<div class="col-sm-6">
			  <input type="text" class="form-control" id="nipasMunicipality" value="<?=$row['municipality'];?>">
			</div>
		</div>	
		<div class="form-group row">
			<label for="nipasName" class="col-sm-4 col-form-label">NIPAS Name: </label>
			<div class="col-sm-6">
			  <input type="text" class="form-control" id="nipasName" value="<?=$row['nipas_name'];?>">
			</div>
		</div>	
		<div class="form-group row">
			<label for="nipasLandArea" class="col-sm-4 col-form-label">Area: </label>
			<div class="col-sm-6">
			  <input type="text" class="form-control" id="nipasLandArea" value="<?=$row['area'];?>">
			</div>
		</div>	
		<div class="form-group row">
			<label for="nipasLegalBasis" class="col-sm-4 col-form-label">Legal Basis: </label>
			<div class="col-sm-6">
			  <input type="text" class="form-control" id="nipasLegalBasis" value="<?=$row['legal_basis'];?>">
			</div>
		</div>	
		<div class="form-group row">
			<label for="nipasYearEstablished" class="col-sm-4 col-form-label">Year Established: </label>
			<div class="col-sm-6">
			  <input type="text" class="form-control" id="nipasYearEstablished" value="<?=$row['year_established'];?>">
			</div>
		</div>	

		<!--
			Edit button
			Disabled when the user is not a SUPERUSER.
		-->
		<?Php  
			echo '<button type=\'submit\' id=\'updateBtn\' name=\'updateUser\' class="btn btn-info"';
			if(true){ echo 'disabled'; }
			echo '>Update</button></form>';
			}}
		?>
</div>

<!-- N I P A S  I N F O R M A T I O N -->