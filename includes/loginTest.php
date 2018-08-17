<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "dan_water";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        echo("Connection failed: " . $conn->connect_error);
        die("oh no");
    }

    $username = $_POST["username"];
    $password = $_POST["password"];

   $stmt = $conn->prepare("SELECT name FROM user where name = ? and password = ?");
   $stmt->bind_param("ss", $username, $password);

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo "{username: \"" . $row["name"] . "\"}";
        }
    } else {
        echo "Invalid login";
    }
?>