<?Php
	session_start();

	if(isset($_POST['updateConnectivity'])){
		$nipasID = $_SESSION['nipasID'];
		$targetDir = 'files/connectivity/';
		$targetFile = $targetDir . basename($_FILES["fileToUpload"]["name"]);
		$targetFileType = pathinfo($targetFile,PATHINFO_EXTENSION);
		$targetFileName = $nipasID.'.'.$targetFileType;

		if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $targetFile)) {
        	require_once('includes/connect.php');
			$sql = "UPDATE connectivity SET movie = '$targetFileName' WHERE loc_id = '$nipasID'";
			$row=$dbo->prepare($sql);
			$row->execute();
        	header('Location: dbaseManagement.php');
    	} else {
        	echo "Sorry, there was an error uploading your file.";
    	}
	}
?>