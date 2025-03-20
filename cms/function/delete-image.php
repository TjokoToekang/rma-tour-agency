<?php
require_once 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['product_id']) || !isset($_POST['image_path'])) {
        echo json_encode(['success' => false, 'message' => 'Missing required parameters']);
        exit;
    }

    $product_id = $_POST['product_id'];
    $image_path = $_POST['image_path'];

    // Check remaining images count
    $stmt = $mysqli->prepare("SELECT COUNT(*) as count FROM tb_images WHERE product_id = ?");
    $stmt->bind_param("i", $product_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $imageCount = $result->fetch_assoc()['count'];

    if ($imageCount <= 1) {
        echo json_encode(['success' => false, 'message' => 'Cannot delete the last image. Minimum 1 image required.']);
        exit;
    }

    // Delete from database
    $stmt = $mysqli->prepare("DELETE FROM tb_images WHERE product_id = ? AND image_path = ?");
    $stmt->bind_param("is", $product_id, $image_path);
    
    if ($stmt->execute()) {
        // Delete the actual file
        if (file_exists($image_path)) {
            unlink($image_path);
        }
        header('Content-Type: application/json');
        echo json_encode(['success' => true]);
        exit;
    } else {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $mysqli->error]);
        exit;
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}