<?php

if (isset($_POST['excercise'])) {
	
  include_once 'adblogin.php';
	
	$username = mysqli_real_escape_string($conn, $_POST['username']);
    $Excercise = mysqli_real_escape_string($conn, $_POST['Excercise']);
    $Duration = mysqli_real_escape_string($conn, $_POST['Duration']);
	$Intensity = mysqli_real_escape_string($conn, $_POST['Intensity']);
	$Outside = mysqli_real_escape_string($conn, $_POST['Outside']);
    $Date = mysqli_real_escape_string($conn, $_POST['Date']);
    
  if(empty($username) || empty($Excercise) || empty($Duration) || empty($Intensity) || empty($Outside) ||empty($Date)) {
	  header("Location: ../waterregister.php?register=empty");
	  exit();
	} else {
			if (!preg_match("/^[a-zA-Z]*$/", $username) || !preg_match("/^[a-zA-Z]*$/", $Excercise) || !preg_match("/[^0-9]/", $Duration) || !preg_match("/[^0-9]/", $Intensity) || !preg_match("/^[a-zA-Z]*$/", $Outside)){
            header("Location: ../waterregister.php?register=invalid");
		    exit();
		  } else {
			  $sql = "SELECT * FROM excercise WHERE username='$username'";
			  $result = mysqli_query($conn, $sql);
			  $resultCheck = mysqli_num_rows($result);
			
			  if ($resultCheck > 0) {
				  header("Location: ../waterregister.php?register=usertaken");
				  exit();
			  } else {
                  $sql = "INSERT INTO excercise (username, Excercise, Duration, Intensity, Outside, Date) VALUES ('$username', '$Excercise', '$Duration', '$Intensity', '$Outside', '$Date');";
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