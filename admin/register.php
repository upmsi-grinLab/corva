<html>
<head>
	<title>Register | Admin Panel</title>
</head>
<body>
	<?php 
		include('includes/connect.php'); 
		include('functions.php');
		include('titleBar.php');
	?>

<h2> Register Here </h2>
<form method='POST'>
<?php
	if(isset($_POST['register'])){
		$username = $_POST['username'];
		$password = $_POST['password'];
		if(empty($username) or empty($password)){
			echo "<p>Fields Empty!</p>";
		}else{
			mysql_query("INSERT INTO auth_user (`username`,`password`) VALUES ('$username',SHA1('$password'))");
			mysql_close();		
		}
	}
?>
Username: <input type='text' name='username' /><br/>
Password: <input type='password' name='password' /><br/><br/>
<input type='submit' name='register' value='Register!' />
</form>
</body>	
</html>