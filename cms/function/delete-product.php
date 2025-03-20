<?php
require_once 'connect.php';

function deleteProduct($id) {
    global $mysqli;
    
    // Start transaction
    $mysqli->begin_transaction();

    try {
        // Get image paths
        $stmt = $mysqli->prepare("SELECT image_path FROM tb_images WHERE product_id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $imagePaths = array();
        while ($row = $result->fetch_assoc()) {
            $imagePaths[] = $row['image_path'];
        }

        // Delete images from database
        $stmt = $mysqli->prepare("DELETE FROM tb_images WHERE product_id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();

        // Delete product from database
        $stmt = $mysqli->prepare("DELETE FROM tb_product WHERE id_product = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();

        if ($stmt->affected_rows === 0) {
            throw new Exception("Product not found");
        }

        // Delete image files
        foreach ($imagePaths as $path) {
            if (file_exists($path)) {
                unlink($path);
            }
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
    if (isset($_POST['id'])) {
        deleteProduct($_POST['id']);
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Product ID is required"));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed"));
}