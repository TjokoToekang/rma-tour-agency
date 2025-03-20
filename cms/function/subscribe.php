<?php
// Handle CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}
// Include the existing database connection
require_once 'connect.php';

// Debug output
error_log("Database connection result: " . ($mysqli ? "Success" : "Failure"));

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the email from $_POST
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    
    // Debug output
    error_log("Received email: " . $email);
    
    if (!empty($email)) {
        // Make sure $mysqli is not null before using it
        if ($mysqli) {
            $email = $mysqli->real_escape_string($email);
            $date = date('Y-m-d');
            
            // Insert the email into the database
            $sql = "INSERT INTO tb_subscribe (user_email, subs_date) VALUES ('$email', '$date')";
            
            // Debug output
            error_log("SQL query: " . $sql);
            
            if ($mysqli->query($sql) === TRUE) {
                echo json_encode(array("message" => "Email subscribed successfully."));
            } else {
                echo json_encode(array("message" => "Error: " . $sql . "<br>" . $mysqli->error));
            }
        } else {
            echo json_encode(array("message" => "Database connection failed."));
        }
    } else {
        echo json_encode(array("message" => "Email is required."));
    }
} else {
    echo json_encode(array("message" => "Invalid request method. Use POST."));
}

// Close the connection if it's not handled in connect.php
if ($mysqli && !defined('CONN_CLOSED')) {
    $mysqli->close();
}
?>