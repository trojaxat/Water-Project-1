<?php

  include_once 'adblogin.php';


	$username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    
    // Create connection
    $conn = new mysqli($dbServername, $dbUsername, $dbPassword, $dbName);

    // Check connection
    if ($conn->connect_error) {
        echo("Connection failed: " . $conn->connect_error);
	    exit();
    } else {
        if(empty($username) || empty($password)) {
            echo"User name or password empty";
            exit();
        } else {
            //$stmt = $conn->prepare("SELECT * FROM web_members where username='$username' and password='$password'");
            //$stmt->bind_param("ss", $username, $password);
             $sql = "SELECT * FROM web_members WHERE username = '$username'";
             $result = $conn->query($sql);
            if (mysqli_num_rows($result) == 1) {
                 while($row = $result->fetch_assoc()) {
                    $hash = $row["password"];
                    $verify=password_verify($password,$hash);
                     if($verify){
                        $_SESSION["username"]=$username;
                        echo "Login successful";
                    } else {
                        echo "Incorrect user name or password";
                    }       
             
                }
            } else {
                echo "Incorrect user name or password";

            }
        }
    }

?>