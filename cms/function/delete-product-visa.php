<?php
require_once 'connect.php';

function deleteProduct($id) {
    global $mysqli;
    
    // Start transaction
    $mysqli->begin_transaction();

    try {

        // Delete product from database
        $stmt = $mysqli->prepare("DELETE FROM tb_visa WHERE id_visa = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();

        if ($stmt->affected_rows === 0) {
            throw new Exception("Product not found");
        }

        // Commit transaction
        $mysqli->commit();

        echo json_encode(array("message" => "Product deleted successfully"));
    } catch (Exception $e) {
        // Rollback transaction on error
        $mysqli->rollback();
        http_response_code(500);
        echo json_encode(array("message" => $e->getMessage()));
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['id_visa'])) {
        deleteProduct($_POST['id_visa']);
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Product ID is required"));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed"));
}