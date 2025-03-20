<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require_once 'connect.php';

function getAllProducts() {
    global $mysqli;
    $result = $mysqli->query("SELECT * FROM tb_product ORDER BY id_product DESC");
    $products = array();

    while ($row = $result->fetch_assoc()) {
        $productId = $row['id_product'];
        
        // Fetch all images for this product
        $imageQuery = $mysqli->query("SELECT image_path FROM tb_images WHERE product_id = $productId");
        $images = array();
        while ($imageRow = $imageQuery->fetch_assoc()) {
            $images[] = $imageRow['image_path'];
        }
        $row['images'] = $images; // Add all images to the product data
        
        $products[] = $row;
    }

    echo json_encode($products);
}

getAllProducts();