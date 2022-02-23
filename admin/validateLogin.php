	<?Php
// This is a PHP file for VALIDATING log in 
// credentials for the CoRVA database.
//
// Author: John Christopher E. Azcarraga
// Date: January 2017
	
	session_start();
	// includes
	include('includes/connect.php');

	// variables from the LogIn form
	$username = $_POST['username'];
	$passwd = $_POST['password'];

	$username = htmlspecialchars($username);
	$passwd = htmlspecialchars($passwd);

	// Database query
	$sql = "SELECT * FROM auth_user WHERE username = '$username' AND password = SHA1('$passwd')";
	$row=$dbo->prepare($sql);
	$row->execute();
	$result=$row->fetch(PDO::FETCH_ASSOC);

	// Check if username and password combination
	// exists. Set SESSION variables
	if($result){
		$_SESSION["user_id"] = $result["id"];
		$_SESSION["fname"] = $result["firstName"];
		$_SESSION["lname"] = $result["lastName"];
		$_SESSION["username"] = $result["username"];
		$_SESSION["email"] = $result["emailAddress"];
		$_SESSION["isSuperUser"] = $result["isSuperUser"];
		$_SESSION["timeLogged"] = time();
	}

	header('Location: index.php');

?>
