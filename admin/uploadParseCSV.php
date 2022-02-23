<?php
// This is a PHP file for uploading CSV file
// of CoRVA data
//
// Author: John Christopher E. Azcarraga
// Date: March 2017
// Source: https://gist.github.com/plasticbrain/3702841
?>

<form action="" method="post" accept-charset="utf-8" enctype="multipart/form-data">
	<br><input type="file" name="fileToUpload" id="fileToUpload" accept=".csv" class="btn btn-light">
	<button type="submit" name="btn_submit" class="btn btn-info">Upload File</button>
	
</form>

<?php
	if(isset($_POST['btn_submit'])){
		$targetDir = 'files/uploads/';
		$targetFile = $targetDir . basename($_FILES['fileToUpload']['name']);
		$targetFileType = pathinfo($targetFile,PATHINFO_EXTENSION);

		// To which table should data be placed
		$filename = basename($_FILES['fileToUpload']['name'],".csv");	
	
	if(move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $targetFile)){
				echo "<script language='javascript'>";
				echo "console.log('filename: $filename');";
				echo "</script>";
			

			$fh = fopen($targetFile, 'r+');
			$csvAsArray = array_map('str_getcsv', file($targetFile));	

			// Required files
			require_once('includes/config.php');
			require_once('DataSource.php');

			$csv = new File_CSV_DataSource;
			$csv->load($targetFile);

			$csvData = $csv->connect();

			echo "<script language='javascript'>";
			echo "console.log('csv data: $csvData');";
			echo "</script>";

			$affected = '';

			// Source: https://stackoverflow.com/questions/11810599/in-php-to-dynamically-get-table-name-and-fields-from-csv-file-and-import-to-mysq
			foreach($csvData as $key => $value){
				
				// Initialize empty keys and values
				$keys = '';
				$values = '';

				foreach ($value as $k => $v) {
					$keys .= $k.",";
            		$values .= "'".$v."',";
				}

				// SUBSTR function returns a part of a string
				$keys = substr($keys, 0, -1);
        		$values = substr($values, 0, -1);

        		echo "<script language='javascript'>";
        		echo "console.log('keys: $keys');";
        		echo "console.log('values: $values');";
        		echo "</script>";

        		$sql = "INSERT INTO ".$filename." (".$keys.") VALUES (".$values.")";
				// echo "<script language='javascript'>console.log(".$sql. ");</script>";

				$row = $dbo->prepare($sql);
				$row->execute();

				$affected = $row->rowCount();

				echo "<script language='javascript'>";
				echo "console.log('affected: $affected');";
				echo "</script>";
			}

			if ($affected>0) {
				// Sucessful upload of data
				echo '<script language="javascript">';
				echo 'alert("Uploading Successful!!")';
				echo '</script>';
			}			
			else {
				echo '<script language="javascript">';
				echo 'alert("Error uploading. Please check your file.")';
				echo '</script>';
			}
		}	
	}
?>

