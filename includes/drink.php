<?php
	
  include_once 'adblogin.php';

  $conn = new mysqli($dbServername, $dbUsername, $dbPassword, $dbName);
	
	$username = mysqli_real_escape_string($conn, $_POST['username']);
    $drink = mysqli_real_escape_string($conn, $_POST['drink']);
    $volume = mysqli_real_escape_string($conn, $_POST['volume']);
	$alcohol = mysqli_real_escape_string($conn, $_POST['alcohol']);
    $date = mysqli_real_escape_string($conn, $_POST['date']);
    
  if(empty($username) || empty($drink) || empty($volume) || empty($alcohol) || empty($date)) {
	  echo("One of the fields is empty");
	  exit();
	} else {
			if (!preg_match("/^[a-zA-Z0-9]*$/", $drink) || !preg_match("/^[0-9]*$/", $volume) || !preg_match("/^[a-zA-Z0-9]*$/", $alcohol)) {
	        echo("Inappropriate Input");
		    exit();
        } else {
              $sql = "INSERT INTO drink (username, drink, volume, alcohol, date) VALUES ('$username', '$drink', '$volume', '$alcohol', '$date');";
              mysqli_query($conn, $sql);
              echo("Drink item added");
              exit();
            }
        }
    
?>

