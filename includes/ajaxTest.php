<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "water_login";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        echo("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT username, Food, Amount, Cooking, Date FROM food";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo "username: " . $row["username"] . "Food: " . $row["Food"] . "Amount: " . $row["Amount"] ."Cooking: " . $row["Cooking"] . "Date: " . $row["Date"] ."<br>";
        }
    } else {
        echo "0 results";
    }
?>