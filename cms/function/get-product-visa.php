<?php
require_once 'connect.php';

function getProduct($id) {
    global $mysqli;
    $stmt = $mysqli->prepare("SELECT * FROM tb_visa WHERE id_visa = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $product = $result->fetch_assoc();

    return $product;
}

function updateProduct($id, $data) {
    global $mysqli;
    
    // Log the received data
    error_log("Received data: " . print_r($data, true));

    $stmt = $mysqli->prepare("UPDATE tb_visa SET country = ?, visa_type = ?, entry = ?, price = ?, remarks = ? WHERE id_visa = ?");
    
    if (!$stmt) {
        error_log("Prepare failed: " . $mysqli->error);
        return false;
    }

    $stmt->bind_param("sssdsi", 
        $data['country'], 
        $data['visa_type'], 
        $data['entry'], 
        $data['price'], 
        $data['remarks'], 
        $id
    );

    $result = $stmt->execute();

    if (!$result) {
        error_log("Execute failed: " . $stmt->error);
    }

    return $result;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id_visa'])) {
        $product = getProduct($_GET['id_visa']);
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
    if (isset($_POST['id_visa'])) {
        $result = updateProduct($_POST['id_visa'], $_POST);
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