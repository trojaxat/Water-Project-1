<?php

if (isset($_POST['drink'])) {
	
  include_once 'dblogin.php';
	
	$username = mysqli_real_escape_string($conn, $_POST['username']);
    $Drink = mysqli_real_escape_string($conn, $_POST['Drink']);
    $Volulme = mysqli_real_escape_string($conn, $_POST['Volume']);
	$Alcohol = mysqli_real_escape_string($conn, $_POST['Alcohol']);
    $Date = mysqli_real_escape_string($conn, $_POST['Date']);
    
  if(empty($username) || empty($Drink) || empty($Volume) || empty($Alcohol) || empty($Date)) {
	  header("Location: ../waterregister.php?register=empty");
	  exit();
	} else {
			if (!preg_match("/^[a-zA-Z]*$/", $username) || !preg_match("/^[a-zA-Z]*$/", $Drink) || !preg_match("/^[a-zA-Z]*$/", $Volume)) {
            header("Location: ../waterregister.php?register=invalid");
		    exit();
		  } else {
			  $sql = "SELECT * FROM drink WHERE username='$username'";
			  $result = mysqli_query($conn, $sql);
			  $resultCheck = mysqli_num_rows($result);
			
			  if ($resultCheck > 0) {
				  header("Location: ../waterregister.php?register=usertaken");
				  exit();
			  } else {
                  $sql = "INSERT INTO drink (username, Drink, Volume, Volume, Date) VALUES ('$username', '$Drink', '$Volume', '$Volume', '$Date');";
                  mysqli_query($conn, $sql);
				  header("Register updated!", TRUE, 200);
				  exit();
                }
			}
		}
    
} else {
		header("Location: ../waterregister.php"); 
		exit();
}

?>