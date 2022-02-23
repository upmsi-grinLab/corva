<?Php
// This is a PHP file for the current user
// PROFILE. Editing credentials is possible
// for superusers ONLY!
//
// Author: John Christopher E. Azcarraga
// Date: January 2017

	session_start();
	include('includes/connect.php');

	// updated variables from input fields
	$userID = $_SESSION['user_id'];
	$updatedUserName = ($_POST['username'] === $_SESSION['username']) ? $_SESSION['username'] : $_POST['username'] ;
	$updatedFirstName = ($_POST['firstName'] === $_SESSION['firstName']) ? $_SESSION['firstName'] : $_POST['firstName'];
	$updatedLastName = ($_POST['lastName'] === $_SESSION['lastName']) ? $_SESSION['lastName'] : $_POST['lastName'];
	$updatedEmail = ($_POST['emailAddress'] === $_SESSION['emailAddress']) ? $_SESSION['emailAddress'] : $_POST['emailAddress'];

	$sql = "UPDATE auth_user SET username = '$updatedUserName', firstName = '$updatedFirstName', lastName = '$updatedLastName', emailAddress = '$updatedEmail' WHERE id = '$userID'";
	$row=$dbo->prepare($sql);
	$row->execute();

	//update session variables
	$_SESSION['username'] = $updatedUserName;
	$_SESSION['fname'] = $updatedFirstName;
	$_SESSION['lname'] = $updatedLastName;
	$_SESSION['email'] = $updatedEmail;

	header('Location: index.php');
?>

