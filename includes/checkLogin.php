<?php

if (isset($_POST['login'])) {
	
  include_once 'dblogin.php';


	$username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        echo("Connection failed: " . $conn->connect_error);
        header("Location: ../waterregister.php?login=connectionerror");
	    exit();
    } else {
        if(empty($username) || empty($password)) {
	       header("Location: ../waterregister.php?login=empty");
	       exit();
        } else {
            $stmt = $conn->prepare("SELECT username FROM web_members where username = '$username' and password = '$password'");
            $stmt->bind_param("ss", $username, $password);

            if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                echo "username: " . $row["username"] . "Password: " . $row["Password"] ."<br>";
        }

        } else {
        echo "0 results";
                }
            
            }
        }
    
            
} else {
		header("Location: ../waterlogged.html"); 
		exit();
}
        
?>