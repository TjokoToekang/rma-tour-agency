<?php
require_once 'connect.php';

$maxFileSize = 1024 * 1024; // 1MB in bytes
$uploadDir = 'uploads/';
$allowedTypes = ['image/jpeg', 'image/png'];
$maxFiles = 3;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['product_id']) || !isset($_FILES['product-images'])) {
        echo json_encode(['success' => false, 'message' => 'Missing required parameters']);
        exit;
    }

    $productId = $_POST['product_id'];
    $productType = $_POST['product_type'];
    
    // Check existing images count
    $stmt = $mysqli->prepare("SELECT COUNT(*) as count FROM tb_images WHERE product_id = ?");
    $stmt->bind_param("i", $productId);
    $stmt->execute();
    $result = $stmt->get_result();
    $existingCount = $result->fetch_assoc()['count'];
    
    // Check if new files would exceed limit
    $fileCount = count($_FILES['product-images']['name']);
    if (($existingCount + $fileCount) > $maxFiles) {
        echo json_encode(['success' => false, 'message' => "Maximum of {$maxFiles} files allowed. You can upload " . ($maxFiles - $existingCount) . " more images."]);
        exit;
    }

    $uploadedFiles = [];
    $mysqli->begin_transaction();

    try {
        for ($i = 0; $i < $fileCount; $i++) {
            $file = [
                'name' => $_FILES['product-images']['name'][$i],
                'type' => $_FILES['product-images']['type'][$i],
                'tmp_name' => $_FILES['product-images']['tmp_name'][$i],
                'error' => $_FILES['product-images']['error'][$i],
                'size' => $_FILES['product-images']['size'][$i]
            ];

            // Validate file
            if ($file['size'] > $maxFileSize) {
                throw new Exception("File {$file['name']} is too large (max 1MB)");
            }

            if (!in_array($file['type'], $allowedTypes)) {
                throw new Exception("File {$file['name']} has invalid type (only JPG and PNG allowed)");
            }

            // Generate unique filename
            $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
            $newFilename = uniqid() . '.' . $extension;
            $destination = $uploadDir . $newFilename;

            // Move file
            if (move_uploaded_file($file['tmp_name'], $destination)) {
                $uploadedFiles[] = $destination;

                // Insert into database
                $stmt = $mysqli->prepare("INSERT INTO tb_images (product_id, product_type, image_path) VALUES (?, ?, ?)");
                $stmt->bind_param("iss", $productId, $productType, $destination);
                if (!$stmt->execute()) {
                    throw new Exception("Failed to save file info to database");
                }
                $stmt->close();
            } else {
                throw new Exception("Failed to move uploaded file");
            }
        }

        $mysqli->commit();
        echo json_encode(['success' => true, 'message' => 'Images uploaded successfully']);
    } catch (Exception $e) {
        $mysqli->rollback();
        // Delete any uploaded files
        foreach ($uploadedFiles as $file) {
            if (file_exists($file)) {
                unlink($file);
            }
        }
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}