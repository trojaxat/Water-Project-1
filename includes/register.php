<?php

if (isset($_POST['Register'])) {
	include_once 'checklogin.php';
	
	$Name = mysqli_real_escape_string($conn, $_POST['Name']);
	$Last = mysqli_real_escape_string($conn, $_POST['Last']);
	$Username = mysqli_real_escape_string($conn, $_POST['Username']);
	$Email = mysqli_real_escape_string($conn, $_POST['Email']);
	$DOB L= mysqli_real_escape_string($conn, $_POST['DOB']);
	$Gender = mysqli_real_escape_string($conn, $_POST['Gender']);
	
if(empty($Name) || empty($Last) || empty($Username) || empty($Email) || empty($DOB) || empty($Gender)) {
	header("Location: ../register.php")
	exit();
} else {
	if (!preg_match("/^[a-zA-Z]*$", $Name) || !preg_match("/^[a-zA-Z]*$", $Last)) {	
		header("Location: ../register.php")
		exit();
	} else {
		if (!filter_var($Email, FILTER_VALIDATE_EMAIL)) {
			header("Location: ../Register.php?Register=Email");
			exit();
		} else {
			$sql = "SELECT * FROM web_members WHERE Username = '$Username'";
			$result = mysqli_query($conn, $sql);
			$resultCheck = mysql_num_rows($result);
			
			if ($resultCheck > 0) {
				header("Location: ../Register.php?Register=usertaken");
				exit();
			} else {
				$hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);
				$sql = "INSERT INTO web_members (Name, Last, Username, Email, DOB, Gender) VALUES ('$Name', '$Last', '$Username', '$Email', '$DOB', '$Gender');";
				mysqli_query($conn, $sql);
				header("Location: ../Register.php?Register=login_success");
				exit();
} else {
		header("Location: ../register.php")
		exit();
}