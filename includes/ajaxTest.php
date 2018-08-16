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

    $sql = "SELECT id, name FROM Water";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo "id: " . $row["id"] . " - Name: " . $row["name"] . "<br>";
        }
    } else {
        echo "0 results";
    }
?>