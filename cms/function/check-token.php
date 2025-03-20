<?php 
// include the database connection
require_once 'connect.php';

function checkTokenExists($token) {
    global $mysqli;
    
    $stmt = $mysqli->prepare("SELECT COUNT(*) as count FROM tb_access WHERE token = ?");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    
    return $row['count'] > 0;
}

// REST API to check if OTP exists and return the token
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    
    $token = isset($_POST['token']) ? $_POST['token'] : '';
    
    if (empty($token)) {
        echo json_encode(['success' => false, 'message' => 'Token is required']);
        exit;
    }
    
    $exists = checkTokenExists($token);
    echo json_encode(['success' => true, 'exists' => $exists]);
}
?>