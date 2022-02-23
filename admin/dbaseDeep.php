<!--           D E E P R E E F        -->
<!--         Default: Hidden          -->
<!-- 
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> 
-->

<div>
	<br><h4>Deep Reef Component</h3><br/>
	<?Php
		if(isset($locID) && !empty($locID)){
			require_once('includes/connect.php');
			$sql = "SELECT * FROM coral_deep WHERE loc_id ='$locID'";
			foreach ($dbo->query($sql) as $row) { 
	?>

	<form  class='col-lg-8 col-md-8'>
		<div class="form-group row">
			<label for="deepYear" class="col-sm-4 col-form-label">Survey Date: </label>
			<div class="col-sm-2">
			  <input type="text" class="form-control" id="deepYear" value="<?=$row['survey_date'];?>">
			</div>
		</div>
		<div class="form-group row">
			<label for="deepSite" class="col-sm-4 col-form-label">Species Observed: </label>
			<div class="col-sm-8">
			  <i><textarea type="text" class="form-control" id="deepSite"><?=$row['species_richness'];?></textarea></i>
			</div>
		</div>
		<div class="form-group row">
			<label for="deepRemarks" class="col-sm-4 col-form-label">Remarks: </label>
			<div class="col-sm-8">
			  <textarea type="text" class="form-control" id="deepRemarks" row=5><?=$row['remarks'];?></textarea>
			</div>
		</div>
	</form>

	<?Php
		echo '<br/><button type=\'submit\' id=\'updateCoastal\' name=\'updateCoastal\' class="btn btn-info" ';

		if(true){ echo 'disabled'; }
			echo '>Update</button></form>';
		}}	
	?>
</div>

<!--           D E E P R E E F        -->