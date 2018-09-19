<?php

  include_once 'adblogin.php';
    

    $username = mysqli_real_escape_string($conn, $_POST['username']);
    //Empty array
    $JSONresponse = array();

    // Create connection
    $conn = new mysqli($dbServername, $dbUsername, $dbPassword, $dbName);

    // Check connection
    if ($conn->connect_error) {
        echo("Connection failed: " . $conn->connect_error);
    } else {

        $sql = "SELECT * FROM web_members WHERE username = '$username'";
        $result = $conn->query($sql);
            if (mysqli_num_rows($result) >= 1) {
                while($row = $result->fetch_assoc()) {
                    $JSONresponse[] = $row;
                    echo json_encode($JSONresponse);
                }
            }
        }

?>