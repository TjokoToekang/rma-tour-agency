<?php
require_once 'connect.php'; // Adjust this to your database connection file

$maxFileSize = 1024 * 1024; // 1MB in bytes
$uploadDir = 'uploads/'; // Make sure this directory exists and is writable
$allowedTypes = ['image/png', 'image/jpeg'];
$maxFiles = 4;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $productType = $_POST['product_type'];
    $productName = $_POST['product_name'];
    $rprice = $_POST['rprice'];
    $mprice = $_POST['mprice'];
    $productDesc = nl2br(htmlspecialchars($_POST['product_desc']));
    $isPopular = $_POST['is_popular'];

    // Validate inputs
    if (empty($productName) || empty($rprice) || empty($mprice)) {
        echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
        exit;
    }

    // Start transaction
    $mysqli->begin_transaction();

    try {
        // Insert product data into the database
        $stmt = $mysqli->prepare("INSERT INTO tb_product (name, rprice, mprice, description, is_popular) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("ssdsi", $productName, $rprice, $mprice, $productDesc, $isPopular);
        $stmt->execute();
        $productId = $stmt->insert_id;
        $stmt->close();

        $uploadedFiles = [];
        $fileCount = isset($_FILES['product-images']['tmp_name']) ? count($_FILES['product-images']['tmp_name']) : 0;

        if ($fileCount > $maxFiles) {
            throw new Exception("Maximum of {$maxFiles} files allowed.");
        }

        for ($i = 0; $i < $fileCount; $i++) {
            $file_name = $_FILES['product-images']['name'][$i];
            $file_size = $_FILES['product-images']['size'][$i];
            $file_tmp = $_FILES['product-images']['tmp_name'][$i];
            $file_type = $_FILES['product-images']['type'][$i];

            if ($file_size > $maxFileSize) {
                continue; // Skip files larger than 1MB
            }

            if (!in_array($file_type, $allowedTypes)) {
                continue; // Skip files that are not PNG or JPG
            }

            $file_extension = pathinfo($file_name, PATHINFO_EXTENSION);
            $new_file_name = uniqid() . '.' . $file_extension; // Ensure unique filenames
            $file_destination = $uploadDir . $new_file_name;

            if (move_uploaded_file($file_tmp, $file_destination)) {
                $uploadedFiles[] = $file_destination;

                // Insert image info into the database
                $stmt = $mysqli->prepare("INSERT INTO tb_images (product_id, product_type, image_path) VALUES (?, ?, ?)");
                $stmt->bind_param("iss", $productId, $productType, $file_destination);
                $stmt->execute();
                $stmt->close();
            }
        }

        if (count($uploadedFiles) === 0) {
            throw new Exception('No valid images were uploaded');
        }

        // Commit transaction
        $mysqli->commit();

        echo json_encode(['success' => true, 'message' => 'Product added successfully']);
    } catch (Exception $e) {
        // Rollback transaction on error
        $mysqli->rollback();
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}