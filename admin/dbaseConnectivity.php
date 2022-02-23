<!--    C O N N E C T I V I T Y       -->
<!--         Default: Hidden          -->

<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<script>
	// D A T E  P I C K E R
	// Source: https://jqueryui.com/datepicker/
	$(function(){ 
		$( "#connectivityDate" ).datepicker({
			changeMonth:true,
			changeYear:true,
			yearRange:"-100:+0",
			dateFormat:"MM dd yy"
		});
	});
</script>

<div>
	<br><h4>Connectivity Component</h3><br/>
	<?Php
		if(isset($locID) && !empty($locID)){
			require_once('includes/connect.php');
			$sql = "SELECT * FROM connectivity WHERE loc_id ='$locID'";
			foreach ($dbo->query($sql) as $row) { 
	?>

	<form method='POST' action='uploadFile.php' enctype='multipart/form-data' class='col-lg-8 col-md-8'>
		<div class="form-group row">
			<label for="connectivityDate" class="col-sm-2 col-form-label">Date: </label>
			<div class="col-sm-6">
			  <input type="text" class="form-control" id="connectivityDate" value="<?=$row['date'];?>">
			</div>
		</div>
		<div class="form-group row">
			<label for="connectivityMovie" class="col-sm-2 col-form-label">GIF File: </label>
			<div class="col-sm-6">
				<?Php
					if(isSetAndNotEmpty($row['movie'])){
				?>	<input type="text" class="form-control" name="connectivityMovie" id="connectivityMovie" value="<?=$row['movie'];?>" >
				<?Php }else{ ?>
					<input type='file' class="form-control" id='connectivityMovieFile' name='fileToUpload' accept=".gif">
				<?Php } ?>
			</div>
		</div>
		<div class="form-group row">
			<label for="connectivityRemarks" class="col-sm-2 col-form-label">Remarks: </label>
			<div class="col-sm-10">
			  <textarea class="form-control" id="connectivityRemarks" rows="5"><?=$row['remarks'];?></textarea>
			</div>
		</div>
	</form>

	<?Php
		echo '<br/><button type=\'submit\' id=\'updateConnectivity\' name=\'updateConnectivity\' class="btn btn-info" ';

		if(true){ echo 'disabled'; }
			echo '>Update</button></form>';
		}}	
	?>
</div>

<!--    C O N N E C T I V I T Y       -->