<?php 
// include the database connection
require_once 'connect.php';

function insertOTPAndToken($otp, $token) {
    global $mysqli;
    
    $currentDateTime = date('Y-m-d H:i:s');
    $stmt = $mysqli->prepare("INSERT INTO tb_access (otp, token, created_at) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $otp, $token, $currentDateTime);
    
    if ($stmt->execute()) {
        return true;
    } else {
        return false;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    
    $otp = isset($_POST['otp']) ? $_POST['otp'] : '';
    $token = isset($_POST['token']) ? $_POST['token'] : '';
    
    if (empty($otp) || empty($token)) {
        echo json_encode(['success' => false, 'message' => 'OTP and token are required']);
        exit;
    }
    
    if (insertOTPAndToken($otp, $token)) {
        echo json_encode(['success' => true, 'message' => 'OTP and token inserted successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to insert OTP and token']);
    }
}
?>