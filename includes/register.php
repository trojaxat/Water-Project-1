<?php

if (isset($_POST['register'])) {
	include_once 'checklogin.php';
	
	$name = mysqli_real_escape_string($conn, $_POST['name']);
	$last = mysqli_real_escape_string($conn, $_POST['last']);
	$username = mysqli_real_escape_string($conn, $_POST['username']);
	$email = mysqli_real_escape_string($conn, $_POST['email']);
	$DOB L= mysqli_real_escape_string($conn, $_POST['DOB']);
	$gender = mysqli_real_escape_string($conn, $_POST['gender']);
	
if(empty($name) || empty($last) || empty($username) || empty($email) || empty($DOB) || empty($gender)) {
	header("Location: ../register.php")
	exit();
} else {
	if (!preg_match("/^[a-zA-Z]*$/", $name) || !preg_match("/^[a-zA-Z]*$/", $last)) {	
		header("Location: ../register.php")
		exit();
	} else {
		if (!filter_var($Email, FILTER_VALIDATE_EMAIL)) {
			header("Location: ../register.php?register=Email");
			exit();
		} else {
			$sql = "SELECT * FROM web_members WHERE Username = '$username'";
			$result = mysqli_query($conn, $sql);
			$resultCheck = mysql_num_rows($result);
			
			if ($resultCheck > 0) {
				header("Location: ../register.php?register=usertaken");
				exit();
			} else {
				$hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);
				$sql = "INSERT INTO web_members (name, last, username, email, DOB, gender) VALUES ('$name', '$last', '$username', '$email', '$DOB', '$gender');";
				mysqli_query($conn, $sql);
				header("Location: ../register.php?register=login_success");
				exit();
} else {
		header("Location: ../register.php")
		exit();
}