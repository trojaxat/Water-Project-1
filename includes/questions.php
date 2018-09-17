<?php
	
  include_once 'adblogin.php';

  $conn = new mysqli($dbServername, $dbUsername, $dbPassword, $dbName);
	
	$username = mysqli_real_escape_string($conn, $_POST['username']);
    $weight = mysqli_real_escape_string($conn, $_POST['weight']);
    $height = mysqli_real_escape_string($conn, $_POST['height']);
	$fitness = mysqli_real_escape_string($conn, $_POST['fitness']);
    $disease = mysqli_real_escape_string($conn, $_POST['disease']);
    
  if(empty($username) || empty($weight) || empty($height) || empty($fitness) || empty($disease)) {
	  echo("One of the fields is empty");
	  exit();
	} else {
			if (!preg_match("/^[0-9]*$/", $weight) || !preg_match("/^[0-9]*$/", $height) || !preg_match("/^[0-9]*$/", $fitness) || !preg_match("/^[a-zA-Z0-9]*$/", $disease)) {
	        echo("Inappropriate Input");
		    exit();
        } else {
              $sql = "UPDATE web_members SET weight = '$weight', height = '$height', fitness = '$fitness', disease = '$disease' WHERE username = '$username';";
              mysqli_query($conn, $sql);
              echo("Questions updated");
              exit();
            }
        }
    
?>