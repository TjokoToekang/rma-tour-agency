<?php
require_once 'connect.php';

function getProduct($id) {
    global $mysqli;
    $stmt = $mysqli->prepare("SELECT * FROM tb_product WHERE id_product = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $product = $result->fetch_assoc();

    if ($product) {
        // Fetch images for this product
        $imageQuery = $mysqli->query("SELECT image_path FROM tb_images WHERE product_id = $id");
        $images = array();
        while ($imageRow = $imageQuery->fetch_assoc()) {
            $images[] = $imageRow['image_path'];
        }
        $product['images'] = $images;
        return $product;
    } else {
        return null;
    }
}

function updateProduct($id, $data) {
    global $mysqli;
    
    $stmt = $mysqli->prepare("UPDATE tb_product SET name = ?, rprice = ?, mprice = ?, is_popular = ?, description = ? WHERE id_product = ?");
    
    if (!$stmt) {
        error_log("Prepare failed: " . $mysqli->error);
        return false;
    }

    $stmt->bind_param("sddisi", 
        $data['name'], 
        $data['rprice'], 
        $data['mprice'], 
        $data['popular'], 
        $data['description'], 
        $id
    );

    $result = $stmt->execute();

    if (!$result) {
        error_log("Execute failed: " . $stmt->error);
    }

    return $result;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id_product'])) {
        $product = getProduct($_GET['id_product']);
        if ($product) {
            echo json_encode($product);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Product not found"));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Product ID is required"));
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['id_product'])) {
        $result = updateProduct($_POST['id_product'], $_POST);
        if ($result) {
            echo json_encode(array("success" => true, "message" => "Product updated successfully"));
        } else {
            http_response_code(500);
            echo json_encode(array("success" => false, "message" => "Failed to update product: " . $mysqli->error));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("success" => false, "message" => "Product ID is required"));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed"));
}