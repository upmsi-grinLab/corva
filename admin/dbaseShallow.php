<!--       S H A L L O W  R E E F     -->
<!--         Default: Hidden          -->
<!-- 
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> 
-->

<div>
	<br><h4>Shallow Reef Component</h3><br/>
	<?Php
		if(isset($locID) && !empty($locID)){
			require_once('includes/connect.php');
			$sql = "SELECT * FROM coral_shallow WHERE loc_id ='$locID'";
			foreach ($dbo->query($sql) as $row) { 
	?>

	<form  class='col-lg-8 col-md-8'>
		<div class="form-group row">
			<label for="shallowSite" class="col-sm-4 col-form-label">Monitoring Site: </label>
			<div class="col-sm-6">
			  <input type="text" class="form-control" id="shallowSite" value="<?=$row['monitor_site'];?>">
			</div>
		</div>
		<div class="form-group row">
			<label for="shallowYear" class="col-sm-4 col-form-label">Year: </label>
			<div class="col-sm-6">
			  <input type="text" class="form-control" id="shallowYear" value="<?=$row['monitor_year'];?>">
			</div>
		</div>
		<div class="form-group row">
			<label for="shallowRemarks" class="col-sm-4 col-form-label">Remarks: </label>
			<div class="col-sm-8">
			  <textarea type="text" class="form-control" id="shallowRemarks" row=5><?=$row['remarks'];?></textarea>
			</div>
		</div>

	<?Php
		echo '<br/><button type=\'submit\' id=\'updateCoastal\' name=\'updateCoastal\' class="btn btn-info" ';

		if(true){ echo 'disabled'; }
			echo '>Update</button></form>';
		}
	}	
	?>
</div>

<!--       S H A L L O W  R E E F     -->