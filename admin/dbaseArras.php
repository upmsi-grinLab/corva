<!--             A R R A S            -->
<!--         Default: Hidden          -->
<!-- 
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> 
-->

<script>
	// D A T E  P I C K E R
	// Source: https://jqueryui.com/datepicker/
	$(function(){ 
		$( "#arrasSurveyDate" ).datepicker({
			changeMonth:true,
			changeYear:true,
			yearRange:"-100:+0",
			dateFormat:"MM dd yy"
		});
	});
</script>


<div>
	<br><h4>ARRAS Component</h4><br/>
	<?Php
		if(isset($locID) && !empty($locID)){
			require_once('includes/connect.php');
			$sql = "SELECT * FROM arras WHERE loc_id ='$locID'";
			foreach ($dbo->query($sql) as $row) { 
	?>
	<form class='col-lg-8 col-md-8'>
		<div class="form-group row">
			<label for="arrasSurveyDate" class="col-sm-4 col-form-label">Survey Date: </label>
			<div class="col-sm-6">
			  <input type="text" class="form-control" id="arrasSurveyDate" value="<?=$row['survey_date'];?>">
			</div>
		</div>		
		<div class="form-group row">
			<label for="arrasRemarks" class="col-sm-4 col-form-label">Remarks: </label>
			<div class="col-sm-8">
			  <textarea type="text" class="form-control" id="arrasRemarks" row=10><?=$row['remarks'];?></textarea>
			</div>
		</div>
		
		<?Php
		
			echo '<br/><button type=\'submit\' id=\'updateArras\' name=\'updateArras\' class="btn btn-info" ';

			if(true){ echo 'disabled'; }
				echo '>Update</button></form>';
			}}	
		?> 

</div>

<!--             A R R A S            -->