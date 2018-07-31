<?php

if (isset($_POST['register'])) {
	
  include_once 'dblogin.php';
	
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
	  header("Location: ../waterregister.php?register=empty");
	  exit();
	} else {
			if (!preg_match("/^[a-zA-Z]*$/", $name   ) || !preg_match("/^[a-zA-Z]*$/", $last)) {
				header("Location: ../waterregister.php?register=invalid");
		    exit();
	    } else {
		    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			    header("Location: ../waterregister.php?register=email");
			    exit();
		  } else {
			  $sql = "SELECT * FROM web_members WHERE username='$username'";
			  $result = mysqli_query($conn, $sql);
			  $resultCheck = mysqli_num_rows($result);
			
			  if ($resultCheck > 0) {
				  header("Location: ../waterregister.php?register=usertaken");
				  exit();
			  } else {
                  $hashedPwd = password_hash($password, PASSWORD_DEFAULT);
                  $sql = "INSERT INTO web_members (name, last, username, email, password, day, month, year, gender) VALUES ('$name', '$last', '$username', '$email', '$hashedPwd', '$day', '$month', '$year', '$gender');";
                  mysqli_query($conn, $sql);
				  header("Register updated!", TRUE, 200);
                  checkRegister();
				  exit();
                }
			}
		}
	}


} else {
		header("Location: ../waterregister.php"); 
		exit();
}