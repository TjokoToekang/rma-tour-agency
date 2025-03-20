<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With");
// Include the database connection file
require_once 'connect.php';

// Set headers for JSON response
header('Content-Type: application/json');

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Add error reporting for debugging
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    // Check if unique_id is provided in the query string
    if (isset($_GET['unique_id'])) {
        $unique_id = $_GET['unique_id'];
        
        // Debug: Log the received unique_id
        error_log("Received unique_id: " . $unique_id);

        // SQL query to join tb_visa and order_visa
        $stmt = $mysqli->prepare("
            SELECT order_visa.*, tb_visa.* 
            FROM order_visa 
            JOIN tb_visa ON tb_visa.id_visa = order_visa.id_visa
            WHERE order_visa.unique_id LIKE CONCAT(?, '%')
        ");
        $stmt->bind_param("s", $unique_id);
        $stmt->execute();
        $result = $stmt->get_result();

      
        // Check if a record was found
        if ($result->num_rows > 0) {
            $visa_data = $result->fetch_assoc();
            echo json_encode(['status' => 'success', 'data' => $visa_data]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No visa found with the provided ID']);
        }

        $stmt->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Missing unique_id parameter']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method. Use GET.']);
}

// Close the database connection
$mysqli->close();