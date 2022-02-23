<?Php
	session_start();

	function loggedIn(){
		if(isset($_SESSION['user_id']) && !empty($_SESSION['user_id'])){
			return true;
		}else{
			return false;
		}
	}

	function isSuperUser(){
		if(isset($_SESSION['isSuperUser']) && !empty($_SESSION['isSuperUser']) && $_SESSION['isSuperUser'] == 1){
			return true;
		}else{
			return false;
		}
	}

	// Cookie expires after 10 minute inactivity
	// Source: http://stackoverflow.com/questions/9124560/how-to-expire-php-session-if-user-is-inactive-for-15-mins
	function autoLogout(){
		if(isset($_SESSION['user_id']) && !empty($_SESSION['user_id'])){
			$currentTime = time();
			$timeDiff = $currentTime - $_SESSION['timeLogged'];
			if( $timeDiff > 600 ){ return true; }
			else{ $_SESSION['timeLogged'] = time(); return false; }
		}
	}

	// Check variable if set and not empty
	function isSetAndNotEmpty($var){
		if(isset($var) && !empty($var)){ return true; }
		else{ return false; }
	}

	// Get total number of visits on the CoRVA website
	function getNumberOfVisits(){
		include('includes/config.php');

		// Database query
		$sql = "SELECT COUNT(*) as 'count' FROM visitors";
		$row=$dbo->prepare($sql);
		$row->execute();
		$result=$row->fetch(PDO::FETCH_ASSOC);

		if($result){
			echo($result['count']);
		}
	}

	function visitorDataToJSON(){
		include('includes/config.php');

		// Database query
		$sql = "SELECT DATE(`visitor_date`) AS 'visitDate', COUNT(*) AS 'visits' FROM visitors GROUP BY visitDate";
		//$sql = "SELECT visitor_date AS 'Date', COUNT(*) AS 'Visits' FROM visitors GROUP BY Date";
		$row=$dbo->prepare($sql);
		$row->execute();
		$results=$row->fetchAll(PDO::FETCH_ASSOC);

		$fp = fopen('visitors.json','w');
		fwrite($fp,json_encode($results));
		fclose($fp);
	}
?>