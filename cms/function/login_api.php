<?php
require_once 'connect.php';

function checkUser($email, $access_code) {
    global $mysqli;
    
    $stmt = $mysqli->prepare("SELECT * FROM tb_admin WHERE email = ? AND access_code = ?");
    $stmt->bind_param("ss", $email, $access_code);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        return $user;
    } else {
        return false;
    }
}

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $access_code = isset($_POST['access_code']) ? $_POST['access_code'] : '';
    
    if (empty($email) || empty($access_code)) {
        echo json_encode(['success' => false, 'message' => 'Please provide both email and access code']);
        exit;
    }
    
    $user = checkUser($email, $access_code);
    
    if ($user) {
        echo json_encode(['success' => true, 'message' => 'Login successful', 'user' => $user]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid email or access code']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}