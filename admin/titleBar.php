<?php
	if(loggedIn()){
		if(autoLogout()){
			include('logout.php');
		}
?>
		<ul class="navbar-nav mr-auto">
			<li class="nav-item"><a class='nav-link' href='index.php'>Home</a></li>
			<li class="nav-item"><a class='nav-link' href='profile.php'>Profile</a></li>
			<li class="nav-item"><a class='nav-link' href='dbaseManagement.php'>Database Management</a></li>
			<li class="nav-item"><?Php if(isSuperUser()){ echo "<a class='nav-link' href='dbaseMigration.php'>Data Migration</a>";}?></li>
		</ul>

		<span class="navbar-text navbar-right">
			Signed in as <?Php echo $_SESSION['fname'].'. | '; ?>
			<a href='logout.php' class="navbar-link">Log Out</a>
		</span>
<?php
	}else{
?>
			<ul class="navbar-nav mr-auto">
				<li class="nav-item active"><a class='nav-link' href='index.php' class="navbar-link">Home</a></li>
				<li class="nav-item"><a class='nav-link' href='login.php' class="navbar-link">Log In</a></li>
			</span>
<?php
	}
?>
