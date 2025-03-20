<?php
// Handle CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require_once 'connect.php'; // Adjust the path as needed

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Prepare SQL statement
    $stmt = $mysqli->prepare("SELECT * FROM tb_visa ORDER BY id_visa DESC");

    if ($stmt === false) {
        echo json_encode(['success' => false, 'message' => 'Failed to prepare statement: ' . $mysqli->error]);
        exit;
    }

    // Execute the statement
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $products = [];

        while ($row = $result->fetch_assoc()) {
            // Format the price as currency
            $row['price'] = number_format($row['price'], 0, ',', '.');
            
            $products[] = $row;
        }

        echo json_encode(['success' => true, 'data' => $products]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to fetch visa products: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

$mysqli->close();