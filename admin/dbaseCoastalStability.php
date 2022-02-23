<!--           C O A S T A L          -->
<!--         Default: Hidden          -->
<link rel="stylesheet" href="css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<div>
	<br><h4>Coastal Stability Component</h3><br/>
	<?Php
		if(isset($locID) && !empty($locID)){
			require_once('includes/connect.php');
			$sql = "SELECT * FROM coastal_stability WHERE loc_id ='$locID'";
			foreach ($dbo->query($sql) as $row) { 
	?>

	<form  class='col-lg-8 col-md-8'>
		<div class="form-group row">
			<label for="coastalSite" class="col-sm-4 col-form-label">Monitoring Site: </label>
			<div class="col-sm-6">
			  <input type="text" class="form-control" id="coastalSite" value="<?=$row['monitoring_site'];?>">
			</div>
		</div>
		<div class="form-group row">
			<label for="coastalLength" class="col-sm-4 col-form-label">Survey Length: </label>
			<div class="col-sm-6">
			  <input type="text" class="form-control" id="coastalLenght" value="<?=$row['survey_length'];?>">
			</div>
		</div>
		<div class="form-group row">
			<label for="coastalDate" class="col-sm-4 col-form-label">Survey Date: </label>
			<div class="col-sm-6">
			  <input type="text" class="form-control" id="coastalDate" value="<?=$row['survey_date'];?>">
			</div>
		</div>
		<div class="form-group row">
			<label for="coastalRemarks" class="col-sm-4 col-form-label">Remarks: </label>
			<div class="col-sm-8">
			  <textarea type="text" class="form-control" id="coastalRemarks" row=5><?=$row['survey_remarks'];?></textarea>
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

<!--           C O A S T A L          -->