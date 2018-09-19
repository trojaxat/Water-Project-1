<?php

//if (isset($_POST['register'])) {              // required for json 
	
  include_once 'adblogin.php';
	
	$name = mysqli_real_escape_string($conn, $_POST['name']);
	$last = mysqli_real_escape_string($conn, $_POST['last']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
	$username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    $day = mysqli_real_escape_string($conn, $_POST['day']);
	$month = mysqli_real_escape_string($conn, $_POST['month']);
    $year = mysqli_real_escape_string($conn, $_POST['year']);
    $gender = mysqli_real_escape_string($conn, $_POST['gender']);
    
  if(empty($name) || empty($last) || empty($username) || empty($email) || empty($day) || empty($month) || empty($year) || empty($gender) || empty($password)) {
	  echo"One of the fields is empty";
	  exit();
	} else {
			if (!preg_match("/^[a-zA-Z]*$/", $name) || !preg_match("/^[a-zA-Z]*$/", $last)) {
	        echo"One of the fields has got the wrong format";
		    exit();
	    } else {
		    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                echo"Email address is invalid";
			    exit();
		  } else {
			  $sql = "SELECT * FROM web_members WHERE username='$username'";
			  $result = mysqli_query($conn, $sql);
			  $resultCheck = mysqli_num_rows($result);
			
			  if ($resultCheck > 0) {
                  echo"Username is already taken";
				  exit();
			  } else {
                  $hashedPwd = password_hash($password, PASSWORD_DEFAULT);
                  $sql = "INSERT INTO web_members (name, last, username, email, password, day, month, year, gender) VALUES ('$name', '$last', '$username', '$email', '$hashedPwd', '$day', '$month', '$year', '$gender');";
                  mysqli_query($conn, $sql);
                  echo"Register successful";
				  exit();
                }
			}
		}
	}  

?>