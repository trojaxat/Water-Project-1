<?php

  include_once 'adblogin.php';
    

    $username = mysqli_real_escape_string($conn, $_POST['username']);
    //Empty array
    $JSONr1 = array();
    $JSONr2 = array();
    $JSONr3 = array();
    $JSONresponse = array();

    // Create connection
    $conn = new mysqli($dbServername, $dbUsername, $dbPassword, $dbName);

    // Check connection
    if ($conn->connect_error) {
        echo("Connection failed: " . $conn->connect_error);
    } else {

        $sql1 = "SELECT food, amount, cooking, date          FROM food WHERE username = '$username'";
        $sql2 = "SELECT excercise, intensity, duration, date FROM excercise WHERE username = '$username'";
        $sql3 = "SELECT drink, volume, alcohol, date         FROM drink WHERE username = '$username'";
        $result1 = $conn->query($sql1);
        $result2 = $conn->query($sql2);
        $result3 = $conn->query($sql3);
            if (mysqli_num_rows($result1) >= 1) {
                $JSONr1 = mysqli_fetch_all ($result1, MYSQLI_ASSOC);
                $JSONresponse = array_merge((array)$JSONresponse, (array)$JSONr1);
            } else {
                //echo "No food items \n";       instead of echo, maybe send empty food/exc/drink array to be able to test in JS
                    }


            if (mysqli_num_rows($result2) >= 1) {
                $JSONr2 = mysqli_fetch_all ($result2, MYSQLI_ASSOC);
                $JSONresponse = array_merge((array)$JSONr1, (array)$JSONr2);
            } else {
                //echo "No excercise items \n";
                    }

            if (mysqli_num_rows($result3) >= 1) {
                $JSONr3 = mysqli_fetch_all ($result3, MYSQLI_ASSOC);
                $JSONresponse = array_merge((array)$JSONresponse, (array)$JSONr3);
            } else {
                //echo "No drink items \n";
                    }

            echo json_encode($JSONresponse);
    }


 
?>