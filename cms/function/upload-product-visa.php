<?php
require_once 'connect.php'; // Adjust the path as needed

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve and sanitize input data
    $country = isset($_POST['country']) ? $mysqli->real_escape_string($_POST['country']) : '';
    $visa_type = isset($_POST['visa_type']) ? $mysqli->real_escape_string($_POST['visa_type']) : '';
    $entry = isset($_POST['entry']) ? $mysqli->real_escape_string($_POST['entry']) : '';
    $price = isset($_POST['price']) ? floatval($_POST['price']) : 0;
    $remarks = isset($_POST['remarks']) ? $mysqli->real_escape_string($_POST['remarks']) : '';

    // Validate input
    if (empty($country) || empty($visa_type) || empty($entry) || $price <= 0 || empty($remarks)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required and price must be greater than 0.']);
        exit;
    }

    // Prepare SQL statement
    $stmt = $mysqli->prepare("INSERT INTO tb_visa (country, visa_type, entry, price, remarks) VALUES (?, ?, ?, ?, ?)");

    if ($stmt === false) {
        echo json_encode(['success' => false, 'message' => 'Failed to prepare statement: ' . $mysqli->error]);
        exit;
    }

    // Bind parameters and execute
    $stmt->bind_param("sssds", $country, $visa_type, $entry, $price, $remarks);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Visa product added successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to add visa product: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

$mysqli->close();