<?php

  include_once 'adblogin.php';

  $conn = new mysqli($dbServername, $dbUsername, $dbPassword, $dbName);
	
	$username = mysqli_real_escape_string($conn, $_POST['username']);
    $excercise = mysqli_real_escape_string($conn, $_POST['excercise']);
    $intensity = mysqli_real_escape_string($conn, $_POST['intensity']);
    $duration = mysqli_real_escape_string($conn, $_POST['duration']);
	$outside = mysqli_real_escape_string($conn, $_POST['outside']);
    $date = mysqli_real_escape_string($conn, $_POST['date']);
    
  if(empty($username) || empty($excercise) || empty($intensity) || empty($duration) || empty($outside) || empty($date)) {
	  echo("One of the fields is empty");
	  exit();
	} else {
			if (!preg_match("/^[a-zA-Z0-9]*$/", $excercise) || !preg_match("/^[0-9]*$/", $duration) || !preg_match("/^[0-9]*$/", $intensity) || !preg_match("/^[a-zA-Z0-9]*$/", $outside)) {
	        echo("Inappropriate Input");
		    exit();
        } else {
              $sql = "INSERT INTO excercise (username, excercise, duration, intensity, outside, date) VALUES ('$username', '$excercise', '$duration', '$intensity', '$outside', '$date');";
              mysqli_query($conn, $sql);
              echo("Excercise item added");
              exit();
            }
        }
    
?>