<?php

/**
 *	This is a PHP file concerning the connection
 *	of the website to the database

 * 	Author: John Christopher E. Azcarraga
 *	Date: January 2017
 */

	/* 
	 *	Necessary variables for database connection
	 *	LIVE configration
	 */
	
	$host_name 	= "localhost";
	$database 	= "corva"; 	// Database Name
	$username 	= "root"; 			// Database user id
	$password 	= "admin"; 		// Password

	//////// DO NOT EDIT BELOW /////////
	try {
	$dbo = new PDO('mysql:host='.$host_name.';dbname='.$database, $username, $password);
	} catch (PDOException $e) {
		print "Error!: " . $e->getMessage() . "<br/>";
		die();
	}
	
?>


