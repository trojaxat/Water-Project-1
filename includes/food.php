<?php
	
  include_once 'adblogin.php';

  $conn = new mysqli($dbServername, $dbUsername, $dbPassword, $dbName);
	
	$username = mysqli_real_escape_string($conn, $_POST['username']);
    $food = mysqli_real_escape_string($conn, $_POST['food']);
    $amount = mysqli_real_escape_string($conn, $_POST['amount']);
	$cooking = mysqli_real_escape_string($conn, $_POST['cooking']);
    $date = mysqli_real_escape_string($conn, $_POST['date']);
    
  if(empty($username) || empty($food) || empty($amount) || empty($cooking) || empty($date)) {
	  echo("One of the fields is empty");
	  exit();
	} else {
			if (!preg_match("/^[a-zA-Z0-9]*$/", $food) || !preg_match("/[0-9]/", $amount) || !preg_match("/[A-Za-z0-9]+/", $cooking)) {
	        echo("Inappropriate Input");
		    exit();
        } else {
              $sql = "INSERT INTO food (username, food, amount, cooking, date) VALUES ('$username', '$food', '$amount', '$cooking', '$date');";
              mysqli_query($conn, $sql);
              echo("Food item added");
              exit();
            }
        }
    
?>

