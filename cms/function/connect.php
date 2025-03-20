<?php
date_default_timezone_set('Asia/Jakarta');
// Database configuration
$host = 'localhost';
$dbname = 'rmatourc_web';
$user = 'rmatourc_admin';
$password = 'rma!2024';

// Establish a database connection
$mysqli = new mysqli($host, $user, $password, $dbname);

// Check the connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

?>