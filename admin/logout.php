<?Php
// This is a PHP file for LOGGING OUT of the
// database portal. Unsets the $_SESSION variable
// and destroys the any active sessions.
//
// Author: John Christopher E. Azcarraga
// Date: January 2017

	session_start();

	session_unset();
	session_destroy();
	header('Location: index.php');
	exit;
?>