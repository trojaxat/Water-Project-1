<?php

if (isset($_POST['food'])) {
	
  include_once 'dblogin.php';
	
	$username = "dan";
    $Food = mysqli_real_escape_string($conn, $_POST['Food']);
    $Amount = mysqli_real_escape_string($conn, $_POST['Amount']);
	$Cooking = mysqli_real_escape_string($conn, $_POST['Cooking']);
    $Date = date("Y-m-d");       
    
  if(empty($Food) || empty($Amount) || empty($Cooking)) {
	  header("Location: ../waterregister.php?register=empty");
	  exit();
	} else {
			if (!preg_match("/^[a-zA-Z]*$/", $Food) || !preg_match("/[^0-9]/", $Amount) || !preg_match("/^[a-zA-Z]*$/", $Cooking)) {
                header("Location: ../includes/food.php?register=invalid");
		        exit();
		  } else {
			  $sql = "SELECT * FROM food WHERE username='$username'";
			  $result = mysqli_query($conn, $sql);
			  $resultCheck = mysqli_num_rows($result);
			
			  if ($resultCheck > 0) {
				  header("Location: ../waterregister.php?register=usertaken");
				  exit();
			  } else {
                  $sql = "INSERT INTO food (username, Food, Amount, Cooking, Date) VALUES ('$username', '$Food', '$Amount', '$Cooking', '$Date');";
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